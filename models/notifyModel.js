const mongoose = require('mongoose');
const notifySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tag: {
        type: String,
        required: true,
        enum: ['案主通知', '幫手通知', '系統通知']
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    taskId: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notify = mongoose.model('notification', notifySchema);

module.exports = Notify;
