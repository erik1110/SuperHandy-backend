const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Task = require('../models/taskModel');
const geocoding = require('../utils/geocoding');

const statusMapping = {
    draft: '草稿',
    published: '媒合中',
    inProgressed: '進行中',
    submitted: '進行中',
    confirmed: '已完成',
    completed: '已完成',
    unpublished: '已下架',
    deleted: '未成立',
};

function calculateDistance(lon1, lat1, lon2, lat2) {
    const radius = 6371; // 地球平均半徑（公里）
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance;
}

function validDistance(centerLongitude, centerLatitude, taskLongitude, taskLatitude, radius) {
    //const radius = 10; // 半徑10公里
    const distance = calculateDistance(centerLongitude, centerLatitude, taskLongitude, taskLatitude);
    if (distance <= radius) {
        return true;
    } else {
        return false;
    }
}

function getRandomIndexList(range, count) {
    count = range < count ? range + 1 : count;
    let numbers = [...Array(range).keys()];
    let selectedNumbers = [];
    // 選取不重複的數字
    while (selectedNumbers.length < count) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        selectedNumbers.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1);
    }
    return selectedNumbers;
}

const tasks = {
    findTaskDetails: handleErrorAsync(async (req, res, next) => {
        const userId = req?.user?._id || '';
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId, status: 'published' })
            .populate({
                path: 'helpers.helperId',
                select: 'lastName firstName',
            })
            .populate({
                path: 'userId',
                select: 'lastName firstName phone email',
            });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        const isRelatedUser = task.userId._id.toString() === userId || task.helpers.some((helper) => helper.helperId._id.toString() === userId);
        const posterName = isRelatedUser ? `${task.userId.lastName}${task.userId.firstName}` : `${task.userId.lastName}**`;
        const posterPhone = isRelatedUser ? task.userId.phone : `${task.userId.phone.slice(0, 4)}******`;
        const posterEmail = isRelatedUser ? task.userId.email : `*****@********`;

        const viewerId = userId ? userId : req.ip;
        const isViewerExist = task.viewers.includes(viewerId);
        if (!isViewerExist) {
            task.viewers.push(viewerId);
            await task.save();
        }

        const formattedTask = {
            taskId: task._id,
            publishedAt: task.time.publishedAt,
            status: statusMapping[task.status] || '',
            progressBar: {
                publishedAt: task.time.publishedAt,
                inProgressAt: task.time.inProgressAt,
                submittedAt: task.time.submittedAt,
                confirmedAt: task.time.confirmedAt,
                completedAt: task.time.completedAt,
            },
            title: task.title,
            isUrgent: task.isUrgent,
            salary: task.salary,
            address: `${task.location.city}${task.location.dist}${task.location.address}`,
            category: task.category,
            description: task.description,
            imgUrls: task.imgUrls,
            viewerCount: task.viewers.length,
            posterInfo: {
                name: posterName,
                phone: posterPhone,
                email: posterEmail,
            },
            contactInfo: {
                name: task.contactInfo.name,
                phone: task.contactInfo.phone,
                email: task.contactInfo.email,
            },
        };
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedTask,
            }),
        );
    }),
    findTaskListGeneral: handleErrorAsync(async (req, res, next) => {
        let { city, dist, isUrgent, sortby, keyword, services, limit, page } = req.query;
        isUrgent = isUrgent === 'true' ? true : false;
        services = services ? services.split(',') : [];
        limit = Number(limit) || 10;
        page = Number(page) || 1;
        switch (sortby) {
            case 'newest':
                sortby = { 'time.publishedAt': -1 };
                break;
            case 'highestSalary':
                sortby = { salary: -1 };
                break;
            case 'mostEnquiries':
                sortby = { 'task.helpers.length': -1 };
                break;
            default:
                sortby = { 'time.publishedAt': -1 };
        }
        //find all tasks
        const tasks = await Task.find({
            status: 'published',
        })
            .populate({
                path: 'userId',
                select: 'lastName firstName phone email',
            })
            .sort(sortby);

        if (!tasks) {
            return next(appError(404, '40210', '查無資料'));
        }

        //filter tasks by city, dist, urgent, keyword, services
        const filteredTasks = tasks.filter((task) => {
            // 檢查是否存在縣市條件
            if (city && task.location.city !== city) {
                return false;
            }

            // 檢查是否存在區域條件
            if (dist && task.location.dist !== dist) {
                return false;
            }

            // 檢查是否存在急件條件
            if (isUrgent === true && task.isUrgent !== isUrgent) {
                return false;
            }

            // 檢查是否存在關鍵字條件
            if (keyword && !(task.title.includes(keyword) || task.description.includes(keyword))) {
                return false;
            }

            // 檢查是否存在服務類別條件
            if (services.length > 0 && !services.some((service) => task.category.includes(service))) {
                return false;
            }

            // 如果沒有任何條件，則返回 true
            return true;
        });
        const total_tasks = filteredTasks.length;
        const total_pages = Math.ceil(total_tasks / limit);
        if (page > total_pages) {
            page = total_pages;
            // return next(appError(400, '40211', '頁數錯誤'));
        }
        const pagingTasks = filteredTasks.filter((task, index) => {
            if (index >= (page - 1) * limit && index < page * limit) {
                return task;
            }
        });

        //format tasks
        const formattedTasks = pagingTasks.map((task) => {
            const posterName = `${task.userId?.lastName}**`;
            return {
                taskId: task._id,
                publishedAt: task.time.publishedAt,
                status: statusMapping[task.status] || '',
                title: task.title,
                isUrgent: task.isUrgent,
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}`,
                category: task.category,
                description: task.description,
                imgUrls: task.imgUrls[0] || '',
                viewerCount: task.viewers.length,
                helperCount: task.helpers.length,
                posterName: posterName,
                contactName: `${task.contactInfo.name.slice(0, 1)}**`,
            };
        });

        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: {
                    tasks: formattedTasks,
                    page: page,
                    limit,
                    total_pages,
                    total_tasks,
                },
            }),
        );
    }),
    findTaskListMap: handleErrorAsync(async (req, res, next) => {
        let { longitude: centerLongitude, latitude: centerLatitude, city, dist, radius, isUrgent, keyword, services } = req.query;
        if (!centerLongitude || !centerLatitude) {
            if (!city || !dist) {
                return next(appError(400, '40105', '請輸入經緯度或縣市區域'));
            }
            const geocodingResult = await geocoding(`${city}${dist}`);
            if (geocodingResult.status !== 'OK') {
                return next(appError(400, '40400', '找不到該地址'));
            }
            centerLongitude = geocodingResult.location.lng;
            centerLatitude = geocodingResult.location.lat;
        }
        isUrgent = isUrgent === 'true' ? true : false;
        services = services ? services.split(',') : [];
        radius = Number(radius) || 3; //km
        //find all tasks
        const tasks = await Task.find({
            status: 'published',
        }).populate({
            path: 'userId',
            select: 'lastName firstName phone email',
        });

        if (!tasks) {
            return next(appError(404, '40210', '查無資料'));
        }
        //filter tasks by city, dist, urgent, keyword, services
        const filteredTasks = tasks.filter((task) => {
            // 檢查是否存在急件條件
            if (isUrgent === true && task.isUrgent !== isUrgent) {
                return false;
            }

            // 檢查是否存在關鍵字條件
            if (keyword && !(task.title.includes(keyword) || task.description.includes(keyword))) {
                return false;
            }

            // 檢查是否存在服務類別條件
            if (services.length > 0 && !services.some((service) => task.category.includes(service))) {
                return false;
            }

            // 檢查是否符合經緯度條件
            const isValidDistance = validDistance(centerLongitude, centerLatitude, task.location.longitude, task.location.latitude, radius);
            if (!isValidDistance) {
                return false;
            }

            // 全數條件通關，則返回 true
            return true;
        });
        const total_tasks = filteredTasks.length;

        //format tasks
        const formattedTasks = filteredTasks.map((task) => {
            const posterName = `${task.userId?.lastName}**`;
            return {
                taskId: task._id,
                publishedAt: task.time.publishedAt,
                status: statusMapping[task.status] || '',
                title: task.title,
                isUrgent: task.isUrgent,
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}`,
                category: task.category,
                description: task.description,
                imgUrls: task.imgUrls[0] || '',
                viewerCount: task.viewers.length,
                helperCount: task.helpers.length,
                posterName: posterName,
                contactName: `${task.contactInfo.name.slice(0, 1)}**`,
            };
        });

        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: {
                    tasks: formattedTasks,
                    total_tasks,
                    longitude: centerLongitude,
                    latitude: centerLatitude,
                },
            }),
        );
    }),
    findTaskListHighlight: handleErrorAsync(async (req, res, next) => {
        //find all tasks sort by viewerCount and limit 5
        const tasks = await Task.find({ status: 'published' }).sort({ 'viewers.length': -1 }).select('_id title imgUrls');
        if (!tasks) {
            return next(appError(404, '40210', '查無資料'));
        }
        const randomIndexList = getRandomIndexList(tasks.length, 5);
        //format tasks
        let formattedTasks = [];
        tasks.forEach((task, index) => {
            if (randomIndexList.includes(index)) {
                formattedTasks.push({
                    taskId: task._id,
                    title: task.title,
                    imgUrls: task.imgUrls[0] || '',
                });
            }
        });

        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: {
                    tasks: formattedTasks,
                },
            }),
        );
    }),
};

module.exports = tasks;
