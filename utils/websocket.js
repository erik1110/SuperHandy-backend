const socket = require('../service/socket-io.js');
const userSockets = require('./userSockets');

function emitNotification(userId, message) {
    const io = socket.getIO();
    if (userSockets[userId.toString()]) {
        userSockets[userId.toString()].forEach((socketId) => {
            io.sockets.to(socketId).emit('notification', message);
        });
    }
}

function emitCreateNewChat(userId, newChatObj) {
    const io = socket.getIO();
    if (userSockets[userId.toString()]) {
        userSockets[userId.toString()].forEach((socketId) => {
            io.sockets.to(socketId).emit('createNewChat', newChatObj);
        });
    }
}

module.exports = {
    emitNotification,
    emitCreateNewChat,
};
