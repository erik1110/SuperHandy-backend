const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Task = require('../models/taskModel');
const Notify = require('../models/notifyModel');
const geocoding = require('../utils/geocoding');
const { taskStatusMapping } = require('../service/statusMapping');

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
                select: 'lastName firstName phone email avatarPath',
            });
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (!task.userId) {
            return next(appError(400, '40200', '查詢不到此用戶'));
        }
        const isRelatedUser =
            task.userId._id.toString() == userId.toString() || task.helpers.some((helper) => helper.helperId?._id?.toString() == userId.toString());
        const posterPhone = isRelatedUser ? task.userId.phone : `${task.userId.phone.slice(0, 4)}******`;
        const posterEmail = isRelatedUser ? task.userId.email : `*****@********`;

        const posterData = await Task.find({
            userId: task.userId._id,
            status: { $in: ['completed', 'inProgress', 'submitted', 'confirmed'] },
        })
            .select('reviews category status')
            .populate({
                path: 'reviews',
            });
        let reviewRank = {};
        let totalStars = [];
        let categories = [];
        categories.forEach((category) => (reviewRank[category.name] = []));
        posterData.forEach((task) => {
            if (task.status != 'completed') return;
            if (task.reviews?.helper?.star) {
                if (!reviewRank[task.category]) {
                    reviewRank[task.category] = { name: task.category, stars: [], totalReviews: 0 };
                }
                reviewRank[task.category].stars.push(task.reviews.helper.star);
                reviewRank[task.category].totalReviews++;
                totalStars.push(task.reviews.helper.star);
            }
        });
        Object.keys(reviewRank).forEach((key) => {
            const { name, stars, totalReviews } = reviewRank[key];
            const star = Number(stars.reduce((sum, star) => sum + star, 0) / totalReviews).toFixed(1);
            categories.push({ name, star, totalReviews });
        });
        categories.sort((a, b) => b.star - a.star);
        if (categories.length > 3) categories.length = 3;

        let completedTaskCount = posterData.filter((task) => task.status === 'completed').length;
        let completedTaskPercent = Math.round((completedTaskCount / posterData.length) * 100);
        let avgStar = Number((totalStars.reduce((sum, star) => sum + star, 0) / totalStars.length).toFixed(1));

        const viewerId = userId ? userId : req.ip;
        const isViewerExist = task.viewers.includes(viewerId);
        if (!isViewerExist) {
            task.viewers.push(viewerId);
            await task.save();
        }

        const formattedTask = {
            taskId: task._id,
            publishedAt: task.time.publishedAt,
            status: taskStatusMapping[task.status] || '',
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
                lastName: task.userId.lastName,
                phone: posterPhone,
                email: posterEmail,
                avatar: task.userId.avatarPath,
                completedTasks: completedTaskCount,
                completionRate: completedTaskPercent,
                rating: {
                    overall: avgStar,
                    categories,
                },
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
        let { city, dist, isUrgent, sortBy, keyword, services, limit, page } = req.query;
        isUrgent = isUrgent === 'true' ? true : false;
        services = services ? services.split(',') : [];
        limit = Number(limit) || 10;
        page = Number(page) || 1;
        switch (sortBy) {
            case 'newest':
                sortBy = { 'time.publishedAt': -1 };
                break;
            case 'highestSalary':
                sortBy = { salary: -1 };
                break;
            case 'mostEnquiries':
                sortBy = { helperCount: -1 };
                break;
            default:
                sortBy = { 'time.publishedAt': -1 };
        }

        //find all tasks
        const tasks = await Task.aggregate([
            {
                $match: { status: 'published' }, // 添加匹配条件
            },
            {
                $lookup: {
                    from: 'users', // 用户表的集合名
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $addFields: {
                    helperCount: { $size: '$helpers' }, // 添加一个新的字段helperCount，表示helpers数组的长度
                },
            },
            {
                $sort: sortBy, // 按照helperCount字段降序排序
            },
        ]);

        if (!tasks) {
            return next(appError(404, '40210', '查無資料'));
        }

        //filter tasks by city, dist, urgent, keyword, services
        const filteredTasks = tasks.filter((task) => {
            // 檢查是否存在縣市條件
            if (city && task.location.city.replace('台', '臺') !== city.replace('台', '臺')) {
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
            const posterName = `${task.user[0].lastName}**`;
            return {
                taskId: task._id,
                publishedAt: task.time.publishedAt,
                status: taskStatusMapping[task.status] || '',
                title: task.title,
                isUrgent: task.isUrgent,
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}`,
                category: task.category,
                description: task.description,
                imgUrls: task.imgUrls,
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
        // 限制搜尋半徑最大為10公里，預設為3公里，0公里表示不使用半徑作為條件
        if (!radius) {
            radius = 3;
        } else {
            radius = Number(radius) > 10 ? 10 : Number(radius);
        }

        const hasCityLocation = !!city && !!dist;
        const hasGPS = !!centerLongitude && !!centerLatitude;
        if (!hasCityLocation && !hasGPS) {
            return next(appError(400, '40105', '請輸入經緯度或縣市區域'));
        }
        if (hasCityLocation) {
            const geocodingResult = await geocoding(`${city}${dist}`);
            if (geocodingResult.status !== 'OK') {
                return next(appError(400, '40400', '找不到該地址'));
            }
            centerLongitude = geocodingResult.location.lng;
            centerLatitude = geocodingResult.location.lat;
        } else {
            if (radius <= 0) {
                return next(appError(400, '40106', '無檔案或格式不正確(半徑必須大於0)'));
            }
        }
        isUrgent = isUrgent === 'true' ? true : false;
        services = services ? services.split(',') : [];

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
                console.log('check point A', task.title);
                return false;
            }

            // 檢查是否存在關鍵字條件
            if (keyword && !(task.title.includes(keyword) || task.description.includes(keyword))) {
                console.log('check point B', task.title);
                return false;
            }

            // 檢查是否存在服務類別條件
            if (services.length > 0 && !services.some((service) => task.category.includes(service))) {
                console.log('check point C', task.title);
                return false;
            }

            const isValidCityDist = task.location.city.replace('台', '臺') === city.replace('台', '臺') && task.location.dist === dist;
            const isValidDistance = validDistance(centerLongitude, centerLatitude, task.location.longitude, task.location.latitude, radius);
            // 如果有使用縣市地區作為條件，則檢查是否符合縣市地區條件。使用經緯度作為條件，則檢查是否符合距離條件
            if (hasCityLocation) {
                console.log('check point D', task.title);
                // 檢查是否有吻合縣市地區
                if (!isValidCityDist) {
                    console.log('check point D1', task.title);
                    console.log(task.location.city, city, task.location.dist, dist);
                    return false;
                }
            } else {
                console.log('check point E', task.title);
                // 檢查是否符合經緯度條件
                if (!isValidDistance) {
                    console.log('check point E1', task.title);
                    return false;
                }
            }
            console.log('check point F', task.title);
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
                status: taskStatusMapping[task.status] || '',
                title: task.title,
                isUrgent: task.isUrgent,
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}`,
                category: task.category,
                description: task.description,
                location: task.location,
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
        const tasks = await Task.find({ status: 'published' }).sort({ 'viewers.length': -1 }).select('_id title imgUrls category');
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
                    category: task.category,
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
    applyTask: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
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
            return next(appError(400, '40212', '查無此任務'));
        }

        if (task.userId._id.toString() == userId.toString()) {
            return next(appError(400, '40216', '無法應徵自己的任務'));
        }
        if (task.helpers.some((helper) => helper.helperId._id.toString() == userId.toString())) {
            return next(appError(400, '40217', '已應徵過此任務'));
        }
        const helper = {
            helperId: userId,
            status: 'waiting',
        };
        task.helpers.push(helper);
        await task.save();

        const currentTime = Date.now();
        //發送通知給案主
        await Notify.create({
            userId: task.userId._id,
            tag: '案主通知',
            description: `您待媒合的任務：「${task.title} 」已有幫手應徵囉，請至任務詳情查看`,
            taskId: taskId,
            createdAt: currentTime,
        });
        //發送通知給幫手
        await Notify.create({
            userId: userId,
            tag: '幫手通知',
            description: `您媒合中的任務：「${task.title} 」正在等待案主審核`,
            taskId: taskId,
            createdAt: currentTime,
        });
        res.status(200).json(getHttpResponse({ message: '等待媒合中' }));
    }),
};

module.exports = tasks;
