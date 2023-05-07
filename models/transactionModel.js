const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    tag: {
        type: String,
        enum: ['刊登任務', '系統儲值', '完成任務', '取出點數', '刪除任務']
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: false,
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
        enum: ['幫手', '案主', '系統']
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

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
