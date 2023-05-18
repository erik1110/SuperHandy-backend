const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Notify = require('../models/notifyModel');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const statusMapping = require('../service/statusMapping');

const tasks = {
    getPostedTasksHist: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const tasks = await Task.find({ userId: userId }).populate({
            path: 'helpers.helperId',
            select: 'lastName firstName',
        });
        const formattedData = tasks.map((task) => {
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
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedData,
            }),
        );
    }),
    getAppliedTasksHist: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const tasks = await Task.find({
            helpers: {
                $elemMatch: {
                    helperId: userId
                },
            },
        }).populate({
            path: 'userId',
            select: 'lastName firstName',
        });
        const formattedTasks = tasks.map((task) => {
            const posterName = task.userId ? `${task.userId.lastName}${task.userId.firstName}` : null;
            const filteredHelper = task.helpers.find(helper => helper.helperId.toString() === userId.toString());
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
        if (task.status==='draft') {
            return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        const isTaskOwner = task.userId._id.toString() === userId.toString();
        const isTaskHelper = task.helpers.some((helper) => {
            return helper.status === 'paired' && helper.helperId._id.toString() === userId.toString();
        });
        const helper = task.helpers.find((helper) => helper.status === 'paired');
        const helperName = helper ? `${helper.helperId.lastName}${helper.helperId.firstName}` : '';
        const posterName = task.userId ? `${task.userId.lastName}${task.userId.firstName}` : '';
        let formatHelpers;
        if (isTaskOwner) {
            role = '案主';
            formatHelpers = task.helpers.map((helper) => ({
                helperId: helper.helperId._id,
                status: statusMapping.helperStatusMapping[helper.status],
                lastName: helper.helperId.lastName,
            }));
        } else if (isTaskHelper) {
            role = '幫手';
            formatHelpers = task.helpers
                .filter((helper) => helper.status === 'paired')
                .map((helper) => ({
                    helperId: helper.helperId._id,
                    status: statusMapping.helperStatusMapping[helper.status],
                    lastName: helper.helperId.lastName,
                }));
        } else {
            return next(appError(400, '40212', '查無此任務'));
        }
        const formattedTask = {
            taskId: task._id,
            role: role,
            publishedAt: task.time.publishedAt,
            status: statusMapping[task.status] || '',
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
            address: `${task.location.city}${task.location.dist}${task.location.address}`,
            category: task.category,
            description: task.description,
            imgUrls: task.imgUrls,
            helpers: formatHelpers,
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
        if (!["published", "unpublished"].includes(task.status)) {
            return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping[task.status]}`));
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
        res.status(200).json(
            getHttpResponse({
                message: '刪除成功'
            }),
        );
    }),
};

module.exports = tasks;
