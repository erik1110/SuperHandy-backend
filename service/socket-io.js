const socketIO = require('socket.io');
const mongoose = require('mongoose');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const jwt = require('jsonwebtoken');
const userSockets = require('../utils/userSockets');

function connectSocketIO(server) {
    const io = new socketIO.Server(server);

    io.use(async (socket, next) => {
        try {
            // 取得 authorization header
            const token = socket.handshake.auth.Authorization.split(' ')[1];
            if (!token) {
                // 處理匿名用戶
                socket.user = {
                    //使用timestamp當作匿名用戶的id
                    id: Date.now(),
                    firstName: 'Anonymous',
                    lastName: 'User',
                    nickname: 'Anon',
                };
                emitConnectStatus(socket, socket.user);
                return next();
            }

            // 驗證 token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // 將 YOUR_SECRET_KEY 替換成您 JWT 所用的 secret key
            // 根據解碼的 token 尋找用戶
            const user = await User.findById(decoded.id);

            if (!user) {
                emitErrorMsg(socket, '用戶驗證失敗');
                return next(new Error('User not found'));
            }

            // 將用戶資訊儲存到 socket 中，供後續的 socket 事件使用
            socket.user = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                nickname: user.nickname,
            };
            emitConnectStatus(socket, socket.user);
            next();
        } catch (error) {
            emitErrorMsg(socket, '用戶驗證失敗');
            // 若 token 驗證失敗或找不到該用戶，拒絕連線
            return next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        const currentUser = socket.user.id.toString();
        // console.log('check point socket', socket);
        // 將用戶的 socket.id 保存下來
        if (!userSockets[currentUser]) {
            userSockets[currentUser] = [];
        }
        userSockets[currentUser].push(socket.id);

        // 監聽訊息事件
        socket.on('message', async (data) => {
            try {
                const { taskId, message } = data;

                // 根據taskId尋找該任務
                const task = await Task.findById(taskId);
                if (!task || !task.currentHelperId) {
                    emitErrorMsg(socket, 'Task not found');
                    return;
                }

                //計算未讀訊息數量
                const unreadCount = await Chat.countDocuments({ taskId: taskId, userId: { $ne: currentUser }, read: false });

                // 發送消息給任務相關的用戶
                const posterId = task.userId._id.toString();
                const helperId = task.currentHelperId._id.toString();
                const role = currentUser === posterId ? 'poster' : 'helper';
                const createdAt = new Date();
                const read = false;
                // 將訊息儲存到資料庫
                const chat = new Chat({
                    userId: currentUser,
                    taskId,
                    message,
                    createdAt,
                    read,
                });
                await chat.save();

                // 確保這兩個用戶都在線並已連接
                if (userSockets[posterId]) {
                    userSockets[posterId].forEach((socketId) => {
                        io.to(socketId).emit('message', { message, taskId, role, read, unreadCount, createdAt });
                    });
                }
                if (userSockets[helperId]) {
                    userSockets[helperId].forEach((socketId) => {
                        io.to(socketId).emit('message', { message, taskId, role, read, unreadCount, createdAt });
                    });
                }
            } catch (error) {
                console.log('發送訊息失敗', error);
                emitErrorMsg(socket, '發送訊息失敗');
            }
        });

        // 監聽read狀態更新事件
        socket.on('read', async (data) => {
            try {
                const { taskId, chatId } = data;
                //驗證taskId和chatId是否符合格式
                if (!mongoose.isValidObjectId(taskId) || !mongoose.isValidObjectId(chatId)) {
                    emitErrorMsg(socket, 'Id 格式錯誤');
                    return;
                }

                // 根據taskId尋找該任務
                const task = await Task.findById(taskId);
                if (!task || !task.currentHelperId) {
                    emitErrorMsg(socket, 'Task not found');
                    return;
                }

                // 尋找所有的對應且未讀的Chat記錄並將其標記為已讀
                await Chat.updateMany({ taskId: taskId, _id: { $lte: chatId }, read: false }, { read: true });

                // 發送訊息給任務相關的用戶
                const posterId = task.userId._id.toString();
                const helperId = task.currentHelperId._id.toString();
                // 確保這兩個用戶都在線並已連接
                if (userSockets[posterId]) {
                    userSockets[posterId].forEach((socketId) => {
                        io.to(socketId).emit('read', { status: 'success', message: '已成功標記為已讀' });
                    });
                }
                if (userSockets[helperId]) {
                    userSockets[helperId].forEach((socketId) => {
                        io.to(socketId).emit('read', { status: 'success', message: '已成功標記為已讀' });
                    });
                }
            } catch (error) {
                console.log('標記訊息為已讀失敗', error);
                emitErrorMsg(socket, '標記訊息為已讀失敗');
            }
        });

        // 當用戶斷開連接時，從使用者列表中移除
        socket.on('disconnect', () => {
            if (!socket.user || !socket.user.id) return;

            const userSocketIds = userSockets[socket.user.id];
            if (!userSocketIds) return;

            const index = userSocketIds.indexOf(socket.id);
            if (index > -1) {
                userSocketIds.splice(index, 1);
            }
            if (userSocketIds.length === 0) {
                delete userSockets[socket.user.id];
            }
        });
    });
}

function emitConnectStatus(socket, user) {
    socket.emit('connectStatus', {
        status: 'success',
        message: '連線成功',
        user: user,
    });
}
function emitErrorMsg(socket, message) {
    socket.emit('errorMsg', {
        status: 'error',
        message: message,
    });
}

module.exports = connectSocketIO;
