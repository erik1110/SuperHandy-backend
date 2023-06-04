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
            '_id userId currentHelperId time',
        )
            .populate('userId', '_id firstName lastName nickname avatarPath')
            .populate('currentHelperId', '_id firstName lastName nickname avatarPath');

        const chatRooms = relatedTasks.map((task) => ({
            taskId: task._id,
            role: task.userId._id.toString() === userId.toString() ? 'poster' : 'helper',
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
            time: task.time.inProgressAt,
        }));

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
        const lastChatId = req.query.lastChatId; // 從請求的查詢參數中獲取最後一條chat的_id

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

        let query = Chat.find({ taskId: taskId });

        if (!lastChatId) {
            // 如果沒有提供lastChatId，則查詢所有未讀訊息的數量
            const unreadCount = await Chat.countDocuments({ taskId: taskId, read: false });
            if (unreadCount < 20) {
                // 如果未讀訊息少於20，則查詢最新的20筆資料
                query = query.limit(20).sort({ _id: -1 });
            } else {
                // 否則，只查詢未讀訊息
                query = query.where({ read: false });
            }
        } else {
            if (!mongoose.isValidObjectId(lastChatId)) {
                return next(appError(400, '40104', 'Id 格式錯誤'));
            }
            // 如果提供了lastChatId，則僅查詢_id小於lastChatId的數據
            query = query.where('_id').lt(lastChatId).sort({ _id: -1 }).limit(20);
        }

        let chatHistory = await query.populate('taskId', '_id userId');

        chatHistory = chatHistory.map((chat) => {
            const role = chat.taskId.userId.toString() === chat.userId.toString() ? 'poster' : 'helper';
            return { taskId: chat.taskId._id, role, message: chat.message, read: chat.read, createdAt: chat.createdAt };
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
