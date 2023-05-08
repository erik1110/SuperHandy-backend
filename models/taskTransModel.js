const mongoose = require('mongoose');
const taskTransSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    tag: {
        type: String,
        enum: ['刊登任務', '完成任務', '刪除任務'],
    },
    superCoin: {
        type: Number,
    },
    helperCoin: {
        type: Number,
    },
    desc: {
        type: Array,
    },
    role: {
        type: String,
        enum: ['幫手', '案主', '系統'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const TaskTrans = mongoose.model('TaskTrans', taskTransSchema);

module.exports = TaskTrans;
