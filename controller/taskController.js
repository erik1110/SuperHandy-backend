const mongoose = require('mongoose');
const getHttpResponse = require('../utils/successHandler');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const TaskValidator = require('../service/taskValidator');
const getexposurePlanPrices = require('../service/exposurePlan');
const geocoding = require('../utils/geocoding');

const timeFields = {
    published: 'publishedAt',
    unpublished: 'publishedAt',
    closed: 'closedAt',
    deleted: 'deletedAt',
    inProgress: 'inProgressAt',
    submitted: 'submittedAt',
    confirmed: 'confirmedAt',
    completed: 'completedAt',
    expired: 'expiredAt',
};

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
    /* 確認地理資訊 */
    checkGeocoding: handleErrorAsync(async (req, res, next) => {
        const { address } = req.query;
        const geocodingResult = await geocoding(address);
        if (geocodingResult.status === 'OK') {
            return res.status(200).json(getHttpResponse({ data: geocodingResult }));
        } else {
            return next(appError(404, '40400', '找不到該地址'));
        }
    }),
    /* 儲存草稿 */
    saveDraft: handleErrorAsync(async (req, res, next) => {
        const validatorResult = TaskValidator.checkDraft(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const draftModel = await Task.create({
            userId: req.user._id,
            title: req.body.title,
            status: 'draft',
            category: req.body.category || null,
            description: req.body.description || null,
            salary: req.body.salary || null,
            exposurePlan: req.body.exposurePlan || null,
            imagesUrl: req.body.imagesUrl || null,
            contactInfo: req.body.contactInfo || null,
            location: req.body.location || null,
            time: {
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
        });
        return res.status(200).json(
            getHttpResponse({
                message: '儲存草稿成功',
                data: draftModel,
            }),
        );
    }),
    /* 發佈草稿 */
    publishDraft: handleErrorAsync(async (req, res, next) => {
        const validatorResult = TaskValidator.checkPublish(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const { title, category, taskTrans, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body;
        const userId = req.user._id;
        const taskId = req.params.taskId;
        const address = location.address;
        const geocodingResult = await geocoding(address);
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(400, '40212', '查無此 TaskId'));
        }
        if (task.status!=='draft') {
            return next(appError(405, '40500', `任務狀態錯誤： ${task.status}`));
        }
        const user = await User.findOne({ _id: userId });
        if (taskTrans.superCoin >= user.superCoin) {
            return next(appError(400, '40211', `超人幣不足： ${user.superCoin}`));
        }
        if (taskTrans.helperCoin >= user.helperCoin) {
            return next(appError(400, '40211', `幫手幣不足： ${user.helperCoin}`));
        }
        if (geocodingResult.status !== 'OK') {
            return next(appError(404, '40400', '找不到該地址'));
        }
        // 更新使用者點數
        user.superCoin -= taskTrans.superCoin ;
        user.helperCoin -= taskTrans.helperCoin ;
        await user.save();
        // 新增一筆交易資訊
        await TaskTrans.create({
            taskId: taskId,
            userId: userId,
            tag: '刊登任務',
            salary: salary,
            exposurePlan: getexposurePlanPrices(exposurePlan),
            platform: 0,
            superCoin: -taskTrans.superCoin,
            helperCoin: -taskTrans.helperCoin,
            desc: ['預扣薪水', exposurePlan],
            role: '案主',
        });
        const locationFormat = {
            city: req.body.location.city,
            dist: req.body.location.dist,
            address: req.body.location.address,
            longitude: geocodingResult.location.lng,
            latitude: geocodingResult.location.lat
        }
        // 將草稿更新為正式發佈
        const publishModel = await Task.findByIdAndUpdate(
            {
                _id: req.params.taskId,
            },
            {
            userId: userId,
            title: title,
            status: 'publish',
            category: category,
            description: description,
            salary: salary,
            exposurePlan: exposurePlan,
            imagesUrl: imagesUrl,
            contactInfo: contactInfo,
            location: locationFormat,
            time: {
              createdAt: Date.now(),
              updatedAt: Date.now(),
              publishedAt: Date.now()
            },
        });
        res.status(200).json(
            getHttpResponse({
                message: '發佈草稿成功',
                data: publishModel,
            }),
        );
    }),
    //P02 待補金流
    publishTask: handleErrorAsync(async (req, res, next) => {
        const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location, taskId: _id } = req.body;
        const userId = req.user._id;
        // use TaskValidator to validate
        const taskValidator = TaskValidator.validateTaskAllField({
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
        if (!taskValidator.isValid) return next(appError(400, '40102', taskValidator.msg));

        // check if task exists
        let taskModel;
        const currentTime = Date.now();
        if (!!_id) {
            taskModel = await Task.findOne({ _id: _id, userId: userId });
        }
        if (taskModel) {
            // 更新任務
            taskModel.status = 'published';
            taskModel.description = description;
            taskModel.imagesUrl = imagesUrl;
            taskModel.time.publishedAt = currentTime;
            taskModel.time.updatedAt = currentTime;
            await taskModel.save();
            taskModel.taskId = taskModel._id;
            return res.status(200).json(getHttpResponse({ data: taskModel }));
        } else {
            // todo 20230511 待補: check if user has enough coin to pay salary
            // if not, return error
            const newTaskModel = await Task.create({
                userId: userId,
                title,
                status: 'published',
                category,
                description,
                salary,
                exposurePlan,
                imagesUrl,
                contactInfo,
                location,
                time: {
                    createdAt: currentTime,
                    publishedAt: currentTime,
                    updatedAt: currentTime,
                },
            });
            if (!newTaskModel) return next(appError(400, '40005', '不明錯誤'));
            // todo 20230511 待補: deduct user's coin
            newTaskModel.taskId = newTaskModel._id;
            return res.status(200).json(getHttpResponse({ data: newTaskModel }));
        }
    }),
    //P01-01 OK OK
    getDraft: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        if (!taskId) return next(appError(400, '40102', '請填入任務id'));

        let taskModel = await Task.findOne({ _id: taskId, userId: userId });

        if (!taskModel) return next(appError(404, '40210', '找不到任務'));
        //check if the task is draft
        if (taskModel.status !== 'draft' || taskModel.status !== 'unpublished') return next(appError(400, '40103', '此任務之狀態不可編輯'));
        //return task
        taskModel.taskId = taskModel._id;
        res.status(200).json(getHttpResponse({ data: taskModel }));
    }),
    //P01-02 OK OK
    updateTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body;
        if (!taskId) return next(appError(400, '40102', '請填入任務id'));
        let taskModel = await Task.findOne({ _id: taskId, userId: userId });
        if (taskModel.status !== 'draft' || taskModel.status !== 'unpublished') return next(appError(400, '40103', '此任務之狀態不可編輯'));

        if (!taskModel.publishedAt) {
            let draftModel = await Task.updateOne(
                { _id: taskId, userId: userId },
                {
                    title,
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
            if (!draftModel) return next(appError(400, '40208', '無效的請求'));
            //get newTaskModel
            let newTaskModel = await Task.findOne({ _id: taskId, userId: userId });
            //return task
            newTaskModel.taskId = newTaskModel._id;
            return res.status(200).json(getHttpResponse({ data: newTaskModel }));
        } else {
            const taskValidator = TaskValidator.validateTaskAllFields({
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
            if (!taskValidator.isValid) return next(appError(400, '40102', taskValidator.message));
            taskModel.description = description;
            taskModel.imagesUrl = imagesUrl;
            taskModel.time.updatedAt = Date.now();
            await taskModel.save();
            taskModel.taskId = taskModel._id;
            return res.status(200).json(getHttpResponse({ data: taskModel }));
        }
    }),
    //P01-03 OK
    deleteTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        if (!taskId) return next(appError(400, '40102', '請填入任務id'));

        let taskModel = await Task.findOne({ _id: taskId, userId: userId }, { status: 1 });

        if (!isStatusFlowValid(taskModel.status, 'deleted')) return next(appError(400, '40210', '此任務之狀態不可刪除'));

        taskModel.status = 'deleted';
        taskModel.time.deletedAt = Date.now();
        taskModel.time.updatedAt = Date.now();
        await taskModel.save();
        taskModel.taskId = taskModel._id;
        return res.status(200).json(getHttpResponse({ data: taskModel }));
    }),
    //P01-04 OK
    updateTaskStatus: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const userId = req.user._id;
        const nextStatus = req.body.status;
        if (!taskId) return next(appError(400, '40102', '請填入任務id'));
        //find task by taskId
        taskModel = await Task.findOne({ _id: taskId, userId: userId });
        if (!taskModel) return next(appError(400, '40210', '查無資料'));
        //use isStatusFlowValid to check if the status flow is valid
        if (!isStatusFlowValid(taskModel.status, nextStatus)) return next(appError(400, '40103', '任務狀態錯誤'));
        taskModel.status = nextStatus;
        taskModel.time.updatedAt = Date.now();

        if (timeFields.hasOwnProperty(nextStatus)) {
            taskModel.time[timeFields[nextStatus]] = Date.now();
        }
        if (nextStatus === 'unpublished' && taskModel.helpers?.length > 0) {
            taskModel.helpers.forEach((x) => (x.status = 'dropped'));
            // todo 20230511 待補: 發送通知給helpers
        }
        await taskModel.save();
        taskModel.taskId = taskModel._id;
        return res.status(200).json(getHttpResponse({ data: taskModel }));
    }),
};

module.exports = tasks;
