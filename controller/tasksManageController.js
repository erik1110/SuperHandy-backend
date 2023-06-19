const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Notify = require('../models/notifyModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const TaskValidator = require('../service/taskValidator');
const statusMapping = require('../service/statusMapping');
const { emitNotification, emitCreateNewChat } = require('../utils/websocket');

const tasks = {
    getPostedTasksHistQuery: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        let { status, city, dist, isUrgent, sortBy, keyword, services, limit, page } = req.query;
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
                $match: { userId: userId},
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $addFields: {
                    helperCount: { $size: '$helpers' },
                },
            },
            {
                $sort: sortBy,
            },
        ]);

        if (!tasks) {
            return next(appError(404, '40210', '查無資料'));
        }

        const filteredTasks = tasks.filter((task) => {
            // 檢查狀態條件
            if (status && !(statusMapping.taskStatusMappingRev[status].includes(task.status))) {
                return false;
            }
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
        }
        const pagingTasks = filteredTasks.filter((task, index) => {
            if (index >= (page - 1) * limit && index < page * limit) {
                return task;
            }
        });
        let formattedTasks = pagingTasks.map((task) => {
            const posterName = `${task.user[0].lastName}${task.user[0].firstName}`;
            return {
                taskId: task._id,
                createdAt: task.time.createdAt,
                publishedAt: task.time.publishedAt || null,
                expiredAt: task.time.expiredAt || null,
                updatedAt: task.time.updatedAt,
                status: statusMapping.taskStatusMapping[task.status] || '',
                title: task.title,
                isUrgent: task.isUrgent,
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}${task.location.address}`,
                category: task.category,
                description: task.description,
                imgUrls: task.imgUrls,
                viewerCount: task.viewers.length,
                helperCount: task.helpers.length,
                posterName: posterName,
                contactName: `${task.contactInfo.name}`,
            };
        });
        formattedTasks = formattedTasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
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
    getAppliedTasksHistQuery: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        let { status, city, dist, isUrgent, sortBy, keyword, services, limit, page } = req.query;
        if (status === '草稿') {
            return next(appError(400, '40101', '接案沒有「草稿」狀態'));
        }
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
                $match: {
                    helpers: {
                        $elemMatch: {
                            helperId: userId,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $addFields: {
                    helperCount: { $size: '$helpers' },
                },
            },
            {
                $sort: sortBy,
            },
        ]);

        if (!tasks) {
            return next(appError(404, '40210', '查無資料'));
        }

        const filteredTasks = tasks.filter((task) => {
            // 檢查狀態條件
            if (status && !(statusMapping.taskStatusMappingRev[status].includes(task.status))) {
                return false;
            }
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
                console.log('急件')
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
        }
        const pagingTasks = filteredTasks.filter((task, index) => {
            if (index >= (page - 1) * limit && index < page * limit) {
                return task;
            }
        });
        let formattedTasks = pagingTasks.map((task) => {
            const posterName = `${task.user[0].lastName}${task.user[0].firstName}`;
            return {
                taskId: task._id,
                createdAt: task.time.createdAt,
                publishedAt: task.time.publishedAt || null,
                expiredAt: task.time.expiredAt || null,
                updatedAt: task.time.updatedAt,
                status: statusMapping.taskStatusMapping[task.status] || '',
                title: task.title,
                isUrgent: task.isUrgent,
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}${task.location.address}`,
                category: task.category,
                description: task.description,
                imgUrls: task.imgUrls,
                viewerCount: task.viewers.length,
                helperCount: task.helpers.length,
                posterName: posterName,
                contactName: `${task.contactInfo.name}`,
            };
        });
        formattedTasks = formattedTasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
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
    getPostedTasksHist: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const tasks = await Task.find({ userId: userId }).populate({
            path: 'helpers.helperId',
            select: 'lastName firstName',
        });
        const formattedTasks = tasks.map((task) => {
            const helper = task.helpers.find((helper) => helper.status === 'paired');
            const helperName = helper ? `${helper.helperId.lastName}${helper.helperId.firstName}` : null;
            return {
                taskId: task._id,
                title: task.title,
                isUrgent: task.isUrgent,
                status: statusMapping.taskStatusMapping[task.status] || task.status,
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}${task.location.address}`,
                createdAt: task.time.createdAt,
                publishedAt: task.time.publishedAt || null,
                expiredAt: task.time.expiredAt || null,
                helper: helperName,
                imgUrls: task.imgUrls,
            };
        });
        formattedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedTasks,
            }),
        );
    }),
    getAppliedTasksHist: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const tasks = await Task.find({
            helpers: {
                $elemMatch: {
                    helperId: userId,
                },
            },
        }).populate({
            path: 'userId',
            select: 'lastName firstName',
        });
        const formattedTasks = tasks.map((task) => {
            const posterName = task.userId ? `${task.userId.lastName}${task.userId.firstName}` : null;
            const filteredHelper = task.helpers.find((helper) => helper.helperId.toString() === userId.toString());
            return {
                taskId: task._id,
                title: task.title,
                isUrgent: task.isUrgent,
                status: statusMapping.taskStatusMapping[task.status] || task.status,
                helperStatus: statusMapping.helperStatusMapping[filteredHelper.status],
                salary: task.salary,
                address: `${task.location.city}${task.location.dist}${task.location.address}`,
                createdAt: task.time.createdAt,
                publishedAt: task.time.publishedAt || null,
                expiredAt: task.time.expiredAt || null,
                poster: posterName,
                imgUrls: task.imgUrls,
            };
        });
        formattedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedTasks,
            }),
        );
    }),
    getTaskDetails: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const taskId = req.params.taskId;
        let role;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId })
            .populate({
                path: 'helpers.helperId',
                select: 'lastName firstName helperSkills',
            })
            .populate({
                path: 'userId',
                select: 'lastName firstName',
            });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        if (task.status === 'draft') {
            return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        const isTaskOwner = task.userId._id.toString() === userId.toString();
        const isTaskHelper = task.helpers.some((helper) => {
            const isMatchingHelper = helper.helperId._id.toString() === userId.toString();
            const isMatchingStatus = helper.status === 'paired' || helper.status === 'waiting';
            return isMatchingHelper && isMatchingStatus;
        });
        const helper = task.helpers.find((helper) => helper.status === 'paired');
        const helperName = helper ? `${helper.helperId.lastName}${helper.helperId.firstName}` : null;
        const posterName = task.userId ? `${task.userId.lastName}${task.userId.firstName}` : null;
        let formatHelpers;
        if (isTaskOwner) {
            role = '案主';
            formatHelpers = await Promise.all(
                task.helpers.map(async (helper) => {
                    const completedTasks = await Task.countDocuments({
                        helpers: { $elemMatch: { helperId: helper.helperId._id, status: 'paired' } },
                        status: 'completed',
                    });
                    const numOfTasks = await Task.countDocuments({
                        helpers: { $elemMatch: { helperId: helper.helperId._id, status: 'paired' } },
                    });
                    const completionRate = (completedTasks / numOfTasks) * 100 || 0;
                    const helperData = await Task.find({
                        helpers: {
                            $elemMatch: { helperId: helper.helperId._id, status: 'paired' },
                        },
                        status: 'completed',
                    }).populate({
                        path: 'reviews',
                        select: 'poster.star',
                    });
                    const categories = helperData.reduce((acc, task) => {
                        const existingCategory = acc.find((category) => category.name === task.category);
                        if (existingCategory) {
                            existingCategory.star += task.reviews.poster.star || 0;
                            existingCategory.totalReviews++;
                        } else {
                            acc.push({
                                name: task.category,
                                star: task.reviews.poster.star || 0,
                                totalReviews: 1,
                            });
                        }
                        return acc;
                    }, []);
                    categories.forEach((category) => {
                        category.star = category.star / category.totalReviews;
                    });
                    const sortedCategories = categories.sort((a, b) => b.star - a.star);
                    const topThreeCategories = sortedCategories.slice(0, 3);
                    let totalStars = 0;
                    let totalCount = 0;

                    for (const category of categories) {
                        totalStars += category.star * category.totalReviews;
                        totalCount += category.totalReviews;
                    }
                    const averageStar = totalStars / totalCount;
                    return {
                        helperId: helper.helperId._id,
                        helperSkills: helper.helperId.helperSkills || null,
                        status: statusMapping.helperStatusMapping[helper.status],
                        lastName: helper.helperId.lastName,
                        completedTasks: completedTasks,
                        completionRate: Number(completionRate.toFixed(2)),
                        rating: {
                            overall: averageStar,
                            categories: topThreeCategories,
                        },
                    };
                }),
            );
        } else if (isTaskHelper) {
            role = '幫手';
        } else {
            return next(appError(400, '40302', '沒有權限'));
        }
        const formattedTask = {
            taskId: task._id,
            role: role,
            publishedAt: task.time.publishedAt,
            expiredAt: task.time.expiredAt,
            status: statusMapping.taskStatusMapping[task.status] || '',
            helper: helperName,
            poster: posterName,
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
            exposurePlan: task.exposurePlan,
            location: {
                city: task.location.city,
                dist: task.location.dist,
                address: task.location.address,
            },
            category: task.category,
            description: task.description,
            imgUrls: task.imgUrls,
            helpers: formatHelpers || null,
            contactInfo: task.contactInfo,
            submittedInfo: task.submittedInfo,
        };
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedTask,
            }),
        );
    }),
    deleteTask: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== userId.toString()) {
            return next(appError(400, '40302', '沒有權限'));
        }
        if (!['published', 'unpublished'].includes(task.status)) {
            return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        // 推播通知
        const helpers = task.helpers;
        const notifications = helpers.map((helper) => {
            const helpId = helper.helperId;
            return {
                userId: helpId,
                tag: '幫手通知',
                description: `您待媒合的任務：「${task.title} 」已刪除`,
                taskId: taskId,
                createdAt: Date.now(),
            };
        });
        await Notify.insertMany(notifications);
        await Notify.create({
            userId: req.user._id,
            tag: '案主通知',
            description: `您待媒合的任務：「${task.title} 」已刪除，無法被其他人查看該任務`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        // 更新任務狀態為`刪除`
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'deleted',
                    helpers: task.helpers.map((helper) => ({
                        helperId: helper.helperId,
                        status: 'dropped',
                    })),
                    'time.updatedAt': Date.now(),
                    'time.deletedAt': Date.now(),
                },
            },
            { new: true },
        );
        // 退款
        const taskTrans = await TaskTrans.findOne({ taskId: taskId, tag: '刊登任務' });
        await TaskTrans.create({
            taskId: taskId,
            userId: userId,
            tag: '刪除任務',
            salary: Math.abs(taskTrans.salary),
            exposurePlan: 0,
            platform: 0,
            superCoin: Math.abs(taskTrans.superCoin),
            helperCoin: 0,
            desc: ['退還薪水'],
            role: '案主',
        });
        const user = await User.findOne({ _id: userId });
        user.superCoin += Math.abs(taskTrans.salary);
        await user.save();
        res.status(200).json(
            getHttpResponse({
                message: '刪除成功',
            }),
        );
    }),
    confirmAcceptance: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== userId.toString()) {
            return next(appError(400, '40302', '沒有權限'));
        }
        if (task.status !== 'submitted') {
            if (task.status === 'inProgress') {
                return next(appError(400, '40214', `任務狀態錯誤： 幫手尚未上傳驗收內容`));
            } else {
                return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
            }
        }
        const pairedHelpers = task.helpers.filter((helper) => helper.status === 'paired');
        const helperId = pairedHelpers.map((helper) => helper.helperId)[0];
        // 推播通知
        await Notify.create({
            userId: userId,
            tag: '案主通知',
            description: `您的任務：「${task.title} 」已結案，後續系統將自動提撥款項給幫手，並請進行評價`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        await Notify.create({
            userId: helperId,
            tag: '幫手通知',
            description: `您的任務：「${task.title} 」案主已驗收完成，後續系統將自動提撥款項，並請進行評價`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        // 更新使用者點數：撥款給幫手
        const user = await User.findOne({ _id: helperId });
        const platformFee = Math.floor(task.salary * 0.1);
        const realSalary = task.salary - platformFee;
        user.superCoin += realSalary;
        await user.save();
        // 新增一筆交易資訊
        await TaskTrans.create({
            taskId: taskId,
            userId: helperId,
            tag: '完成任務',
            salary: task.salary,
            exposurePlan: 0,
            platform: platformFee,
            superCoin: realSalary,
            helperCoin: 0,
            desc: ['薪水'],
            role: '幫手',
        });
        // 初始化評價
        const reviewCreate = await Review.create({
            taskId: taskId,
            poster: {
                posterId: userId,
            },
            helper: {
                helperId: helperId,
            },
            status: 'waiting',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        // 更新任務狀態為`已完成 (confirmed)`
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'confirmed',
                    'time.confirmedAt': Date.now(),
                    'time.updatedAt': Date.now(),
                },
            },
            { new: true },
        );
        res.status(200).json(
            getHttpResponse({
                message: '確認成功',
            }),
        );
    }),
    refuseAcceptance: handleErrorAsync(async (req, res, next) => {
        const validatorResult = TaskValidator.checkUploadAcceptance(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const submittedInfo = req.body.submittedInfo;
        submittedInfo.role = '案主';
        const userId = req.user._id;
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== userId.toString()) {
            return next(appError(400, '40302', '沒有權限'));
        }
        if (task.status !== 'submitted') {
            if (task.status === 'inProgress') {
                return next(appError(400, '40214', `任務狀態錯誤： 幫手尚未上傳驗收內容`));
            } else {
                return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
            }
        }
        const pairedHelpers = task.helpers.filter((helper) => helper.status === 'paired');
        const helperId = pairedHelpers.map((helper) => helper.helperId)[0];
        // 推播通知
        await Notify.create({
            userId: userId,
            tag: '案主通知',
            description: `您的任務：「${task.title} 」已退回驗收`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        await Notify.create({
            userId: helperId,
            tag: '幫手通知',
            description: `您的任務：「${task.title} 」案主已退回驗收，請重新申請驗收`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        // 更新任務狀態為`進行中 (inProgress)`
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'inProgress',
                    'time.submittedAt': '',
                    'time.inProgressAt': Date.now(),
                    'time.updatedAt': Date.now(),
                },
                $push: {
                    submittedInfo: submittedInfo,
                },
            },
            { new: true },
        );
        res.status(200).json(
            getHttpResponse({
                message: '退回成功',
            }),
        );
    }),
    uploadAcceptance: handleErrorAsync(async (req, res, next) => {
        const validatorResult = TaskValidator.checkUploadAcceptance(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const helperId = req.user._id;
        const taskId = req.params.taskId;
        const submittedInfo = req.body.submittedInfo;
        submittedInfo.role = '幫手';
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (task.status !== 'inProgress') {
            if (task.status === 'submitted') {
                return next(appError(400, '40214', `任務狀態錯誤：幫手已完成上傳驗收`));
            } else {
                return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
            }
        }
        const isTaskHelper = task.helpers.some((helper) => {
            const isMatchingHelper = helper.helperId.toString() === helperId.toString();
            const isMatchingStatus = helper.status === 'paired';
            return isMatchingHelper && isMatchingStatus;
        });
        if (!isTaskHelper) {
            return next(appError(400, '40302', '沒有權限'));
        }
        // 推播通知
        await Notify.create({
            userId: task.userId,
            tag: '案主通知',
            description: `您的任務：「${task.title} 」幫手已提交驗收內容，請進行驗收`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        await Notify.create({
            userId: helperId,
            tag: '幫手通知',
            description: `您的任務：「${task.title} 」已經提交驗收!`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        // 更新任務狀態為`進行中 (submitted)`
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'submitted',
                    'time.submittedAt': Date.now(),
                    'time.updatedAt': Date.now(),
                },
                $push: {
                    submittedInfo: submittedInfo,
                },
            },
            { new: true },
        );
        res.status(200).json(
            getHttpResponse({
                message: '上傳成功',
            }),
        );
    }),
    ratingAndReview: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const taskId = req.params.taskId;
        let role;
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
                select: 'lastName firstName',
            });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        if (task.status === 'completed') {
            return next(appError(400, '40214', `任務狀態錯誤：任務已完成 (completed)`));
        }
        if (task.status !== 'confirmed') {
            return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        const isTaskOwner = task.userId._id.toString() === userId.toString();
        const isTaskHelper = task.helpers.some((helper) => {
            const isMatchingHelper = helper.helperId._id.toString() === userId.toString();
            const isMatchingStatus = helper.status === 'paired';
            return isMatchingHelper && isMatchingStatus;
        });
        if (isTaskOwner) {
            role = '案主';
        } else if (isTaskHelper) {
            role = '幫手';
        } else {
            return next(appError(400, '40302', '沒有權限'));
        }
        const pairedHelpers = task.helpers.filter((helper) => helper.status === 'paired');
        const posterId = task.userId;
        const helperId = pairedHelpers.map((helper) => helper.helperId)[0];
        const review = await Review.findOne({ taskId: taskId });
        let reviewUpdate;
        if (review.poster.status === 'waiting' || review.helper.status === 'waiting') {
            if (role === '案主') {
                reviewUpdate = await Review.findOneAndUpdate(
                    { taskId: taskId },
                    {
                        $set: {
                            status: 'waiting',
                            poster: {
                                posterId: userId,
                                status: 'completed',
                                star: req.body.star,
                                comment: req.body.comment,
                            },
                            updatedAt: Date.now(),
                        },
                    },
                    { new: true },
                );
                await Notify.create({
                    userId: helperId,
                    tag: '幫手通知',
                    description: `您的任務：「${task.title} 」，案主給您評價囉！`,
                    taskId: taskId,
                    createdAt: Date.now(),
                });
            } else {
                reviewUpdate = await Review.findOneAndUpdate(
                    { taskId: taskId },
                    {
                        $set: {
                            status: 'completed',
                            helper: {
                                helperId: userId,
                                status: 'completed',
                                star: req.body.star,
                                comment: req.body.comment,
                            },
                            updatedAt: Date.now(),
                        },
                    },
                    { new: true },
                );
                await Notify.create({
                    userId: posterId,
                    tag: '案主通知',
                    description: `您的任務：「${task.title} 」，幫手給您評價囉！`,
                    taskId: taskId,
                    createdAt: Date.now(),
                });
            }
        }
        // 更新任務狀態為`已完成 (completed)`
        if (reviewUpdate.poster.status === 'completed' && reviewUpdate.helper.status === 'completed') {
            await Task.findOneAndUpdate(
                { _id: taskId },
                {
                    $set: {
                        status: 'completed',
                        'time.completedAt': Date.now(),
                        'time.updatedAt': Date.now(),
                    },
                },
                { new: true },
            );
        }
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
            }),
        );
    }),
    confirmHelper: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const taskId = req.params.taskId;
        const helperId = req.params.helperId;
        if (!mongoose.isValidObjectId(taskId) || !mongoose.isValidObjectId(helperId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== userId.toString()) {
            return next(appError(400, '40302', '沒有權限'));
        }
        if (task.status !== 'published') {
            return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        const isTaskHelper = task.helpers.some((helper) => {
            const isMatchingHelper = helper.helperId.toString() === helperId.toString();
            return isMatchingHelper;
        });
        if (!isTaskHelper) {
            return next(appError(400, '40215', '該幫手未申請或不存在'));
        }
        // 更新任務狀態為`進行中 (inProgress)`
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'inProgress',
                    currentHelperId: helperId,
                    helpers: task.helpers.map((helper) => ({
                        helperId: helper.helperId,
                        status: helper.helperId.toString() === helperId.toString() ? 'paired' : 'unpaired',
                    })),
                    'time.inProgressAt': Date.now(),
                    'time.updatedAt': Date.now(),
                },
            },
            { new: true },
        );
        //建立newChatObj for websocket emit 'createNewChat'
        const poster = await User.findById(task.userId);
        const helper = await User.findById(helperId);
        let newChatObj = {
            taskId: task._id,
            title: task.title,
            selfRole: '',
            partnerRole: '',
            poster: {
                firstName: poster.firstName,
                lastName: poster.lastName,
                nickname: poster.nickname,
                avatarPath: poster.avatarPath,
            },
            helper: {
                firstName: helper.firstName,
                lastName: helper.lastName,
                nickname: helper.nickname,
                avatarPath: helper.avatarPath,
            },
            unreadCount: 0,
            time: null,
        };
        emitCreateNewChat(task.userId, { ...newChatObj, selfRole: 'poster', partnerRole: 'helper' });
        emitCreateNewChat(helperId, { ...newChatObj, selfRole: 'helper', partnerRole: 'poster' });
        // 推播通知
        const helpers = task.helpers;
        let descriptionNew;
        const notifications = helpers.map((helper) => {
            const helpId = helper.helperId;
            const status = helper.helperId.toString() === helperId.toString() ? 'paired' : 'unpaired';
            if (status === 'paired') {
                descriptionNew = `您待媒合的任務：「${task.title}」媒合成功，您可以進行任務囉！`;
            } else if (status === 'unpaired') {
                descriptionNew = `您待媒合的任務：「${task.title}」媒合失敗`;
            } else {
                return next(appError(500, '50001', `系統錯誤`));
            }
            emitNotification(helpId, descriptionNew);
            return {
                userId: helpId,
                tag: '幫手通知',
                description: descriptionNew,
                taskId: taskId,
                createdAt: Date.now(),
            };
        });
        await Notify.insertMany(notifications);
        await Notify.create({
            userId: req.user._id,
            tag: '案主通知',
            description: `您待媒合的任務：「${task.title} 」媒合成功，幫手可以進行任務囉！`,
            taskId: taskId,
            createdAt: Date.now(),
        });

        emitNotification(req.user._id, `您待媒合的任務：「${task.title} 」媒合成功，幫手可以進行任務囉！`);

        res.status(200).json(
            getHttpResponse({
                message: '確認成功',
            }),
        );
    }),
    checkExpiredTasks: handleErrorAsync(async (req, res, next) => {
        let tasks = await Task.find({}).select('title status time helpers userId');
        const currentTime = Date.now();
        let count = 0
        for (const task of tasks) {
            if (task.status === 'published' && task.time.expiredAt < currentTime) {
                // 推播通知
                if (task.helpers && task.helpers.length > 0) {
                    task.helpers.forEach(async (helper) => {
                    if (helper.status === 'waiting') {
                        await Notify.create({
                            userId: helper.helperId,
                            tag: '幫手通知',
                            description: `您待媒合的任務：「${task.title} 」已過期，本任務已自動下架！`,
                            taskId: task._id,
                            createdAt: currentTime,
                        });
                    }
                    });
                }
                await Notify.create({
                    userId: task.userId,
                    tag: '案主通知',
                    description: `您的任務：「${task.title} 」已過期，本任務已自動下架！`,
                    taskId: task._id,
                    createdAt: currentTime,
                });
                task.status = 'deleted';
                await Task.findByIdAndUpdate(task._id, { $set: { status: 'deleted', 'time.updatedAt': Date.now() }});
                count++;
                console.log(count)
            }
        };
        res.status(200).json(
            getHttpResponse({
                message: '確認成功',
                data: `本次共有 ${count} 個任務過期`
            }),
        );
    }),
};

module.exports = tasks;
