const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Validator = require('../service/validator');
const geocoding = require('../utils/geocoding');

const taskStatusRole = {
    draft: ['draft', 'published', 'deleted'],
    published: ['unpublished', 'deleted', 'inProgress', 'expired'],
    unpublished: ['published', 'deleted', 'expired'],
    deleted: [],
    inProgress: ['submitted'],
    submitted: ['confirmed'],
    confirmed: ['completed'],
    completed: [],
    expired: [],
};

const isStatusFlowValid = (currentStatus, nextStatus) => {
    return taskStatusRole[currentStatus].includes(nextStatus);
};

const tasks = {
    //P04
    checkGeocoding: handleErrorAsync(async (req, res, next) => {
        const { address } = req.query;
        const geocodingResult = await geocoding(address);
        if (geocodingResult.status === 'OK') {
            return res.status(200).json(geocodingResult);
        } else {
            return res.status(404).json(geocodingResult);
        }
    }),
    //P03
    createDraft: handleErrorAsync(async (req, res, next) => {
        const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body;
        const userId = req.user._id;
        draftModel = await Task.create({
            userId: userId,
            title,
            status,
            category,
            description,
            salary,
            exposurePlan,
            imagesUrl,
            contactInfo,
            location,
            time: {
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        });
        if (!draftModel) {
            return res.status(404).json({
                message: '儲存失敗.',
            });
        }
        res.status(200).json({
            message: '儲存成功',
            data: draftModel,
        });
    }),
    //P02
    publishTask: handleErrorAsync(async (req, res, next) => {
        const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location, _id } = req.body;
        const userId = req.user._id;
        if (!_id) {
            return res.status(404).json({
                message: '請填入任務id',
                error: err.errors,
            });
        }
        checkTaskModel = await Task.findOne({ _id: _id, userId: userId });
        if (checkTaskModel) {
            oldTaskModel = await Task.updateOne(
                { _id: _id, userId: userId },
                {
                    title,
                    status,
                    category,
                    description,
                    salary,
                    exposurePlan,
                    imagesUrl,
                    contactInfo,
                    location,
                    'time.publishedAt': Date.now(),
                    'time.updatedAt': Date.now(),
                },
            );
            return res.status(200).json({
                message: '發佈任務成功',
                data: oldTaskModel,
            });
        } else {
            newTaskModel = await Task.create({
                userId: userId,
                title,
                status,
                category,
                description,
                salary,
                exposurePlan,
                imagesUrl,
                contactInfo,
                location,
                time: {
                    createdAt: Date.now(),
                    publishedAt: Date.now(),
                    updatedAt: Date.now(),
                },
            });
        }
        if (!newTaskModel) {
            return res.status(404).json({ message: '儲存失敗' });
        }
        return res.status(200).json({
            message: '儲存成功',
            data: newTaskModel,
        });
    }),
    //P01-01
    getDraft: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId

        taskModel = await Task.findOne({ _id: taskId, userId: userId });

        if (!taskModel) return res.status(404).json({ message: '找不到任務' });
        //check if the task is draft
        if (taskModel.status !== 'draft') return res.status(404).json({ message: '此任務之狀態不可編輯' });
        //return task
        res.status(200).json({
            message: '找到任務',
            data: taskModel,
        });
    }),
    //P01-02
    updateTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body;
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId
        draftModel = await Task.updateOne(
            { _id: taskId, userId: userId },
            {
                title,
                status,
                category,
                description,
                salary,
                exposurePlan,
                imagesUrl,
                contactInfo,
                location,
                'time.updatedAt': Date.now(),
            },
        );
        if (!draftModel) return res.status(404).json({ message: '找不到任務' });
        //return task
        return res.status(200).json({
            message: '更新任務成功',
            data: draftModel,
        });
    }),
    //P01-03
    deleteTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId
        taskModel = await Task.updateOne({ _id: taskId, userId: userId }, { status: 'deleted', 'time.deletedAt': Date.now(), 'time.updatedAt': Date.now() });
        if (!taskModel) return res.status(404).json({ message: '找不到任務' });
        //return task
        return res.status(200).json({
            message: '刪除任務成功',
        });
    }),
    //P01-04
    updateTaskStatus: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        const nextStatus = req.body.status;
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId
        checkModel = await Task.findOne({ _id: taskId, userId: userId });
        if (!checkModel) return res.status(404).json({ message: '找不到任務' });
        //use isStatusFlowValid to check if the status flow is valid
        if (!isStatusFlowValid(checkModel.status, nextStatus)) return res.status(400).json({ message: '狀態流程不合法' });
        taskModel = await Task.updateOne({ _id: taskId, userId: userId }, { status: nextStatus, time: { updatedAt: Date.now() } });
        res.status(200).json({
            message: '修改成功',
            data: taskModel,
        });
        if (!taskModel) return res.status(404).json({ message: '找不到任務' });
    }),
};

module.exports = tasks;
