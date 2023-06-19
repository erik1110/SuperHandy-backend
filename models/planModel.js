const mongoose = require('mongoose');
const planSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    items: {
        type: Array,
    },
    expireDay: {
        type: Number,
    },
    isUrgent: {
        type: Boolean,
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

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
