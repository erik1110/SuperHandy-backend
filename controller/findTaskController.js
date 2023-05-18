const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Task = require('../models/taskModel');

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

const tasks = {
    getTaskDetails: handleErrorAsync(async (req, res, next) => {
        const userId = req?.user?._id || '';
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId })
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
        const disallowedStatuses = ['draft', 'deleted'];
        if (disallowedStatuses.includes(task.status)) {
            return next(appError(400, '40214', '任務狀態錯誤'));
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
    getTaskListGeneral: handleErrorAsync(async (req, res, next) => {
        let { city, dist, isUrgent, sortby, keyword, services, limit, page } = req.query;
        isUrgent = isUrgent === 'true' ? true : false;
        services = services ? services.split(',') : [];
        limit = Number(limit) || 6;
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
};

module.exports = tasks;
