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
            role: role,
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
};

module.exports = tasks;
