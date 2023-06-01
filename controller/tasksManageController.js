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

const tasks = {
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
                select: 'lastName firstName',
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
            desc: ['退完薪水'],
            role: '案主',
        });
        const user = await User.findOne({ _id: userId });
        user.superCoin += Math.abs(taskTrans.superCoin);
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
        const realSalary = Math.round(task.salary * 0.9);
        const platformFee = task.salary - realSalary;
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
        res.status(200).json(
            getHttpResponse({
                message: '確認成功',
            }),
        );
    }),
};

module.exports = tasks;
