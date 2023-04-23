const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Please enter your email.'],
      unique: true,
      lowercase: true,
      select: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please enter your password.'],
      minlength: 8,
      select: false,
      trim: true
    },
    firstName: {
      type: String,
      required: [true, 'Please enter your first name.'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name.'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Please enter your phone.'],
      unique: true,
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
  });

const User = mongoose.model('User', userSchema);

module.exports = User;