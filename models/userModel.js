const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, '請填寫 email'],
      unique: true,
      lowercase: true,
      select: false,
      trim: true
    },
    password: {
      type: String,
      required: [true, '請填寫密碼'],
      minlength: 8,
      select: false,
      trim: true
    },
    firstName: {
      type: String,
      required: [true, '請填寫名字'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, '請填寫姓氏'],
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    avatarPath: {
      type: String,
      trim: true
    },
    nickName: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    posterIntro: {
      type: String,
      trim: true
    },
    helperIntro: {
      type: String,
      trim: true
    },
    thirdPartyId: {
      type: String,
    },
    thirdPartyType: {
      type: String,
      enum: ['facebook', 'google', 'line'],
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
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
  },
  {
    versionKey: false
  }
  );

const User = mongoose.model('User', userSchema);

module.exports = User;