const io = require('socket.io');
const userSockets = require('./userSockets');

function emitNotification(userId, message) {
    if (userSockets[userId.toString()]) {
        userSockets[userId.toString()].forEach((socketId) => {
            io.to(socketId).emit('notification', message);
        });
    }
}

function emitCreateNewChat(userId, newChatObj) {
    if (userSockets[userId.toString()]) {
        userSockets[userId.toString()].forEach((socketId) => {
            io.to(socketId).emit('createNewChat', newChatObj);
        });
    }
}

module.exports = {
    emitNotification,
    emitCreateNewChat,
};
