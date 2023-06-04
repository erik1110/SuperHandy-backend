const socketIO = require('socket.io');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const jwt = require('jsonwebtoken');

function connectSocketIO(server) {
    const io = new socketIO.Server(server);
    const userSockets = {};

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
        userSockets[currentUser] = socket.id;

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
                // 發送消息給任務相關的用戶
                const posterId = task.userId._id.toString();
                const helperId = task.currentHelperId._id.toString();
                const role = currentUser === posterId ? 'poster' : 'helper';
                const createAt = new Date();
                // 將訊息儲存到資料庫
                const chat = new Chat({
                    userId: currentUser,
                    taskId,
                    message,
                    createAt,
                });
                await chat.save();

                // 確保這兩個用戶都在線並已連接
                if (userSockets[posterId]) {
                    io.to(userSockets[posterId]).emit('message', { message, taskId, role, createAt });
                }
                if (userSockets[helperId]) {
                    io.to(userSockets[helperId]).emit('message', { message, taskId, role, createAt });
                }
            } catch (error) {
                console.log('發送訊息失敗', error);
                emitErrorMsg(socket, '發送訊息失敗');
            }
        });

        // 當用戶斷開連接時，從使用者列表中移除
        socket.on('disconnect', () => {
            if (socket.user && socket.user.id) {
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
