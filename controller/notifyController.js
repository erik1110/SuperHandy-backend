const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Notify = require('../models/notifyModel');

const notify = {
    getNotifyList: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const notifications = await Notify.find({ userId: userId }, { __v: 0 }).sort({ createdAt: -1 }).lean();

        const transformedNotifications = notifications.map((notification) => {
            return { notifyId: notification._id, ...notification };
        });
        delete transformedNotifications._id;
        res.status(200).json(
            getHttpResponse({
                message: '取得通知成功',
                data: transformedNotifications,
            }),
        );
    }),
    markRead: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const notifyId = req.params.notifyId;
        const notify = await Notify.findOne({ _id: notifyId });
        if (!mongoose.isValidObjectId(notifyId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        if (!notify) {
            return next(appError(404, '40212', '查無此通知'));
        }
        if (notify.userId.toString() !== userId.toString()) {
            return next(appError(403, '40302', '沒有權限'));
        }
        if (notify.read) {
            return next(appError(404, '40213', '該通知已經已讀了'));
        }
        await Notify.findOneAndUpdate(
            { _id: notifyId },
            {
                $set: {
                    read: true,
                },
            },
        );
        res.status(200).json(
            getHttpResponse({
                message: '已讀通知成功',
            }),
        );
    }),
    markAllRead: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        await Notify.updateMany(
            { userId: userId },
            {
                $set: {
                    read: true,
                },
            },
        );
        res.status(200).json(
            getHttpResponse({
                message: '已讀通知成功',
            }),
        );
    }),
};

module.exports = notify;
