const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        lowercase: true,
        select: false,
        trim: true,
    },
    googleId: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        minlength: 8,
        select: false,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    avatarPath: {
        type: String,
        trim: true,
    },
    nickname: {
        type: String,
        trim: true,
    },
    location: {
        city: {
            type: String,
            required: false,
            default: '',
        },
        dist: {
            type: String,
            required: false,
            default: '',
        },
        address: {
            type: String,
            required: false,
            default: '',
        },
    },
    posterIntro: {
        type: String,
        trim: true,
        default: '',
    },
    helperIntro: {
        type: String,
        trim: true,
        default: '',
    },
    helperSkills: {
        type: [String],
        default: [],
    },
    thirdPartyId: {
        type: String,
    },
    thirdPartyType: {
        type: String,
        enum: ['facebook', 'google', 'line', ''],
    },
    isVerifiedEmail: {
        type: Boolean,
        default: false,
    },
    isForgotPassword: {
        type: Boolean,
        default: false,
    },
    superCoin: {
        type: Number,
        default: 0,
    },
    helperCoin: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    loginCounts: {
        type: Number,
        default: 0,
    },
    lastLoginAt: {
        type: Date,
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

const User = mongoose.model('User', userSchema);

module.exports = User;
