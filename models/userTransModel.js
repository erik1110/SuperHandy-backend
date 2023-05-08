const mongoose = require('mongoose');
const userTransSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tag: {
        type: String,
        enum: ['系統儲值', '取出點數'],
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
        enum: ['系統'],
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

const UserTrans = mongoose.model('UserTrans', userTransSchema);

module.exports = UserTrans;
