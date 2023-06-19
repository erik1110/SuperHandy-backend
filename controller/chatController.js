const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Chat = require('../models/chatModel');
const Task = require('../models/taskModel');

const chatController = {
    getChatRoomList: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const relatedTasks = await Task.find(
            {
                $and: [{ currentHelperId: { $exists: true } }, { $or: [{ userId: userId }, { currentHelperId: userId }] }],
            },
            '_id title userId currentHelperId time',
        )
            .populate('userId', '_id firstName lastName nickname avatarPath')
            .populate('currentHelperId', '_id firstName lastName nickname avatarPath');

        const chatRooms = await Promise.all(
            relatedTasks.map(async (task) => {
                const unreadCount = await Chat.countDocuments({ taskId: task._id, userId: { $ne: userId }, read: false });
                const lastChat = await Chat.findOne({ taskId: task._id }).sort({ _id: -1 });
                let time;
                if (lastChat) {
                    time = lastChat.createdAt;
                } else {
                    time = task.time.inProgressAt;
                }
                const selfRole = task.userId._id.toString() === userId.toString() ? 'poster' : 'helper';
                const partnerRole = selfRole === 'poster' ? 'helper' : 'poster';
                return {
                    taskId: task._id,
                    title: task.title,
                    selfRole,
                    partnerRole,
                    poster: {
                        firstName: task.userId.firstName,
                        lastName: task.userId.lastName,
                        nickname: task.userId.nickname,
                        avatarPath: task.userId.avatarPath,
                    },
                    helper: {
                        firstName: task.currentHelperId.firstName,
                        lastName: task.currentHelperId.lastName,
                        nickname: task.currentHelperId.nickname,
                        avatarPath: task.currentHelperId.avatarPath,
                    },
                    unreadCount,
                    lastMessage: lastChat ? lastChat.message : null,
                    updatedAt: time,
                };
            }),
        );

        chatRooms.sort((a, b) => {
            if (a.updatedAt && b.updatedAt) {
                return b.updatedAt - a.updatedAt; // If both have updatedAt, sort by updatedAt in descending order
            } else if (a.updatedAt) {
                return -1; // If only a has updatedAt, a comes first
            } else if (b.updatedAt) {
                return 1; // If only b has updatedAt, b comes first
            } else {
                return a.taskId < b.taskId ? -1 : 1; // If neither has updatedAt, sort by taskId
            }
        });

        res.status(200).json(
            getHttpResponse({
                message: '取得聊天室列表成功',
                data: chatRooms,
            }),
        );
    }),
    getChatHistory: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const taskId = req.query.taskId;

        if (!mongoose.isValidObjectId(taskId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        // 檢查Task是否存在並且用戶是Task的創建者或當前助手
        const task = await Task.findById(taskId);
        if (!task) {
            return next(appError(400, '40212', '查無此任務'));
        }
        if (!(task.userId.toString() === userId.toString() || task.currentHelperId.toString() === userId.toString())) {
            return next(appError(400, '40302', '沒有權限'));
        }

        //查詢所有與此taskId相關的聊天訊息
        let query = Chat.find({ taskId: taskId }).sort({ _id: 1 });

        let chatHistory = await query.populate('taskId', '_id userId');

        chatHistory = chatHistory.map((chat) => {
            const role = chat.taskId.userId.toString() === chat.userId.toString() ? 'poster' : 'helper';
            return { _id: chat._id, taskId: chat.taskId._id, role, message: chat.message, read: chat.read, createdAt: chat.createdAt };
        });

        res.status(200).json(
            getHttpResponse({
                message: '取得聊天室歷史訊息成功',
                data: chatHistory,
            }),
        );
    }),
};

module.exports = chatController;
