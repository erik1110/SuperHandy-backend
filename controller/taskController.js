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
    checkGeocoding: handleErrorAsync(async (req, res, next) => {
        const { address } = req.query;
        const geocodingResult = await geocoding(address);
        if (geocodingResult.status === 'OK') {
            return res.status(200).json(geocodingResult);
        } else {
            return res.status(404).json(geocodingResult);
        }
    }),
    createDraft: handleErrorAsync(async (req, res, next) => {
        const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body;
        const { _id } = req.user || '55665566';
        try {
            draftModel = await Task.create({
                userId: _id,
                title,
                status,
                category,
                description,
                salary,
                exposurePlan,
                imagesUrl,
                contactInfo,
                location,
            });
        } catch (err) {
            return res.status(404).json({
                message: '40404儲存失敗',
                error: err.errors,
            });
        }
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
    // getDraft 考慮修改成 getTask
    getDraft: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        console.log('check point userId:', userId);
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId
        try {
            taskModel = await Task.findOne({ _id: taskId, userId: userId });
            console.log('check point taskModel:', taskModel);
        } catch (err) {
            return res.status(404).json({
                message: '找不到任務',
                error: err.errors,
            });
        }
        if (!taskModel) return res.status(404).json({ message: '找不到任務' });
        //check if the task is draft
        if (taskModel.status !== 'draft') return res.status(404).json({ message: '此任務之狀態不可編輯' });
        //return task
        res.status(200).json({
            message: '找到任務',
            data: taskModel,
        });
    }),
    updateTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const { _id } = req.user;
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId
        try {
            draftModel = await Task.updateOne(
                { _id: taskId, userId: _id },
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
                },
            );
        } catch (err) {
            return res.status(404).json({
                message: '40404找不到任務',
                error: err.errors,
            });
        }
    }),
    publishTask: handleErrorAsync(async (req, res, next) => {
        const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body;
        const { _id } = req.user || '55665566';
        try {
            newTask = await Task.create({
                userId: _id,
                title,
                status,
                category,
                description,
                salary,
                exposurePlan,
                imagesUrl,
                contactInfo,
                location,
            });
        } catch (err) {
            return res.status(404).json({
                message: '40404儲存失敗',
                error: err.errors,
            });
        }
        if (!newTask) {
            return res.status(404).json({
                message: '儲存失敗',
                newTask,
            });
        }
        res.status(200).json({
            message: '儲存成功',
            newTask,
        });
    }),
    deleteTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId
        try {
            taskModel = await Task.updateOne({ _id: taskId, userId: userId }, { status: 'deleted', deletedAt: Date.now() });
        } catch (err) {
            return res.status(404).json({
                message: '找不到任務',
                error: err.errors,
            });
        }
        if (!taskModel) return res.status(404).json({ message: '找不到任務' });
        //return task
        res.status(200).json({
            message: '刪除任務成功',
        });
    }),
    modifyTaskStatus: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        const nextStatus = req.body.status;
        if (!taskId) return res.status(404).json({ message: '請傳入taskId' });
        //find task by taskId
        try {
            checkModel = await Task.findOne({ _id: taskId, userId: userId });
            if (!checkModel) return res.status(404).json({ message: '找不到任務' });
            //use isStatusFlowValid to check if the status flow is valid
            if (!isStatusFlowValid(checkModel.status, nextStatus)) return res.status(404).json({ message: '狀態流程不合法' });
            taskModel = await Task.updateOne({ _id: taskId, userId: userId }, { status: nextStatus });
            res.status(200).json({
                message: '修改成功',
                data: taskModel,
            });
        } catch (err) {
            return res.status(404).json({
                message: '找不到任務',
                error: err.errors,
            });
        }
        if (!taskModel) return res.status(404).json({ message: '找不到任務' });
    }),
};

module.exports = tasks;
