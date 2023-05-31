const mongoose = require('mongoose');
const getHttpResponse = require('../utils/successHandler');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const TaskValidator = require('../service/taskValidator');
const Notify = require('../models/notifyModel');
const getexposurePlanPrices = require('../service/exposurePlan');
const geocoding = require('../utils/geocoding');
const statusMapping = require('../service/statusMapping');

const tasks = {
    /* 確認地理資訊 */
    checkGeocoding: handleErrorAsync(async (req, res, next) => {
        const { address } = req.query;
        const geocodingResult = await geocoding(address);
        if (geocodingResult.status === 'OK') {
            return res.status(200).json(getHttpResponse({ data: geocodingResult }));
        } else {
            return next(appError(400, '40400', '找不到該地址'));
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
            imgUrls: req.body.imgUrls || null,
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
                data: {
                    taskId: draftModel._id,
                },
            }),
        );
    }),
    /* 發佈草稿 */
    publishDraft: handleErrorAsync(async (req, res, next) => {
        const validatorResult = TaskValidator.checkPublish(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const { title, category, taskTrans, description, salary, exposurePlan, imgUrls, contactInfo, location } = req.body;
        const userId = req.user._id;
        const taskId = req.params.taskId;
        const address = location.address;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return next(appError(400, '40302', '沒有權限'));
        }
        if (task.status !== 'draft') {
            return next(appError(400, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        const user = await User.findOne({ _id: userId });
        if (taskTrans.superCoin >= user.superCoin) {
            return next(appError(400, '40211', `超人幣不足： ${user.superCoin}`));
        }
        if (taskTrans.helperCoin >= user.helperCoin) {
            return next(appError(400, '40211', `幫手幣不足： ${user.helperCoin}`));
        }
        const geocodingResult = await geocoding(address);
        if (geocodingResult.status !== 'OK') {
            return next(appError(400, '40400', '找不到該地址'));
        }
        // 更新使用者點數
        user.superCoin -= taskTrans.superCoin;
        user.helperCoin -= taskTrans.helperCoin;
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
            latitude: geocodingResult.location.lat,
        };
        const currentDate = Date.now();
        let expiredAt;
        if (exposurePlan === '一般曝光' || exposurePlan === '黃金曝光') {
            expiredAt = new Date(currentDate + 30 * 24 * 60 * 60 * 1000); // 30 天後
        } else if (exposurePlan === '限時曝光' || exposurePlan === '限時黃金曝光') {
            expiredAt = new Date(currentDate + 7 * 24 * 60 * 60 * 1000); // 7 天後
        } else {
            // 預設為 1 天後
            expiredAt = new Date(currentDate + 1 * 24 * 60 * 60 * 1000);
        }
        // 將草稿更新為正式發佈
        await Task.findByIdAndUpdate(
            {
                _id: req.params.taskId,
            },
            {
                userId: userId,
                title: title,
                status: 'published',
                category: category,
                description: description,
                salary: salary,
                exposurePlan: exposurePlan,
                imgUrls: imgUrls,
                contactInfo: contactInfo,
                location: locationFormat,
                time: {
                    updatedAt: currentDate,
                    publishedAt: currentDate,
                    expiredAt: expiredAt,
                },
            },
        );
        res.status(200).json(
            getHttpResponse({
                message: '發佈草稿成功',
            }),
        );
    }),
    /* 取得草稿 */
    getDraft: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId }).lean();
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return next(appError(403, '40302', '沒有權限'));
        }
        if (task.status !== 'draft') {
            return next(appError(405, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        delete task.__v;
        task.taskId = task._id;
        delete task._id;
        delete task.location.landmark;
        delete task.location.longitude;
        delete task.location.latitude;
        res.status(200).json(
            getHttpResponse({
                message: '取得草稿成功',
                data: task,
            }),
        );
    }),
    /* 更新草稿 */
    updateDraft: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        const validatorResult = TaskValidator.checkDraft(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return next(appError(403, '40302', '沒有權限'));
        }
        if (task.status !== 'draft') {
            return next(appError(405, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    title: req.body.title,
                    category: req.body.category || null,
                    description: req.body.description || null,
                    salary: req.body.salary || null,
                    exposurePlan: req.body.exposurePlan || null,
                    imgUrls: req.body.imgUrls || null,
                    contactInfo: req.body.contactInfo || null,
                    location: req.body.location || null,
                    'time.updatedAt': Date.now(),
                },
            },
            { new: true },
        );
        return res.status(200).json(
            getHttpResponse({
                message: '更新草稿成功',
            }),
        );
    }),
    /* 刪除草稿 */
    deleteDraft: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return next(appError(403, '40302', '沒有權限'));
        }
        if (task.status !== 'draft') {
            return next(appError(405, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'deleted',
                    'time.deletedAt': Date.now(),
                },
            },
            { new: true },
        );
        return res.status(200).json(
            getHttpResponse({
                message: '刪除草稿成功',
            }),
        );
    }),
    /* 發佈任務 */
    publishTask: handleErrorAsync(async (req, res, next) => {
        const validatorResult = TaskValidator.checkPublish(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const { title, category, taskTrans, description, salary, exposurePlan, imgUrls, contactInfo, location } = req.body;
        const userId = req.user._id;
        const address = location.address;
        const user = await User.findOne({ _id: userId });
        if (taskTrans.superCoin >= user.superCoin) {
            return next(appError(400, '40211', `超人幣不足： ${user.superCoin}`));
        }
        if (taskTrans.helperCoin >= user.helperCoin) {
            return next(appError(400, '40211', `幫手幣不足： ${user.helperCoin}`));
        }
        const geocodingResult = await geocoding(address);
        if (geocodingResult.status !== 'OK') {
            return next(appError(404, '40400', '找不到該地址'));
        }
        const locationFormat = {
            city: req.body.location.city,
            dist: req.body.location.dist,
            address: req.body.location.address,
            longitude: geocodingResult.location.lng,
            latitude: geocodingResult.location.lat,
        };
        // 更新使用者點數
        user.superCoin -= taskTrans.superCoin;
        user.helperCoin -= taskTrans.helperCoin;
        await user.save();
        const currentDate = Date.now();
        let expiredAt;
        if (exposurePlan === '一般曝光' || exposurePlan === '黃金曝光') {
            expiredAt = new Date(currentDate + 30 * 24 * 60 * 60 * 1000); // 30 天後
        } else if (exposurePlan === '限時曝光' || exposurePlan === '限時黃金曝光') {
            expiredAt = new Date(currentDate + 7 * 24 * 60 * 60 * 1000); // 7 天後
        } else {
            // 預設為 1 天後
            expiredAt = new Date(currentDate + 1 * 24 * 60 * 60 * 1000);
        }
        // 正式發佈
        const publishTask = await Task.create({
            userId: userId,
            title: title,
            status: 'published',
            category: category,
            description: description,
            salary: salary,
            exposurePlan: exposurePlan,
            imgUrls: imgUrls,
            contactInfo: contactInfo,
            location: locationFormat,
            time: {
                createdAt: currentDate,
                updatedAt: currentDate,
                publishedAt: currentDate,
                expiredAt: expiredAt,
            },
        });
        // 新增一筆交易資訊
        await TaskTrans.create({
            taskId: publishTask._id,
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
        res.status(200).json(
            getHttpResponse({
                message: '發佈任務成功',
                data: {
                    taskId: publishTask._id,
                },
            }),
        );
    }),
    /* 編輯下架任務 */
    unpublishEditTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const validatorResult = TaskValidator.checkUnpublishEdit(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return next(appError(403, '40302', '沒有權限'));
        }
        if (task.status !== 'unpublished') {
            return next(appError(405, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        const { category, description, imgUrls, contactInfo, location } = req.body;
        const address = location.address;
        const geocodingResult = await geocoding(address);
        if (geocodingResult.status !== 'OK') {
            return next(appError(404, '40400', '找不到該地址'));
        }
        const locationFormat = {
            city: location.city,
            dist: location.dist,
            address: location.address,
            longitude: geocodingResult.location.lng,
            latitude: geocodingResult.location.lat,
        };
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    category: category,
                    description: description,
                    imgUrls: imgUrls,
                    contactInfo: contactInfo,
                    location: locationFormat,
                    'time.updatedAt': Date.now(),
                },
            },
            { new: true },
        );
        return res.status(200).json(
            getHttpResponse({
                message: '編輯下架任務成功',
            }),
        );
    }),
    /* 重新發佈任務 */
    republishTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return next(appError(403, '40302', '沒有權限'));
        }
        if (task.status !== 'unpublished') {
            return next(appError(405, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        // 這邊需要發送幫手被踢除的推播
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'published',
                    'time.publishedAt': Date.now(),
                    'time.updatedAt': Date.now(),
                },
            },
            { new: true },
        );
        return res.status(200).json(
            getHttpResponse({
                message: '重新發佈任務成功',
            }),
        );
    }),
    /* 下架任務 */
    unpublishTask: handleErrorAsync(async (req, res, next) => {
        const taskId = req.params.taskId;
        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return next(appError(404, '40212', '查無此任務'));
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return next(appError(403, '40302', '沒有權限'));
        }
        if (task.status !== 'published') {
            return next(appError(405, '40214', `任務狀態錯誤： ${statusMapping.taskStatusMapping[task.status]}`));
        }
        // 推播通知
        const helpers = task.helpers;
        const notifications = helpers.map((helper) => {
            const helpId = helper.helperId;
            return {
                userId: helpId,
                tag: '幫手通知',
                description: `您待媒合的任務：「${task.title} 」已下架`,
                taskId: taskId,
                createdAt: Date.now(),
            };
        });
        await Notify.insertMany(notifications);
        await Notify.create({
            userId: req.user._id,
            tag: '案主通知',
            description: `您待媒合的任務：「${task.title} 」已下架，無法被其他人查看該任務`,
            taskId: taskId,
            createdAt: Date.now(),
        });
        // 更新任務狀態為`已下架`
        await Task.findOneAndUpdate(
            { _id: taskId },
            {
                $set: {
                    status: 'unpublished',
                    helpers: task.helpers.map((helper) => ({
                        helperId: helper.helperId,
                        status: 'dropped',
                    })),
                    'time.unpublishedAt': Date.now(),
                    'time.updatedAt': Date.now(),
                },
            },
            { new: true },
        );
        return res.status(200).json(
            getHttpResponse({
                message: '下架任務成功',
            }),
        );
    }),
};

module.exports = tasks;
