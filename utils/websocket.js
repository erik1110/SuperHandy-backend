const io = require('socket.io');
const userSockets = require('./userSockets');

function emitNotification(userId, message) {
    if (userSockets[userId.toString()]) {
        io.to(userSockets[userId.toString()]).emit('notification', message);
    }
}

module.exports = {
    emitNotification,
};
