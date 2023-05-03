const mongoose = require('mongoose')
const { appError, handleErrorAsync } = require('../utils/errorHandler')
const User = require('../models/userModel')
const Validator = require('../service/validator')

const accounts = {
  getProfile: handleErrorAsync(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user }).select('firstName lastName nickName email avatarPath')
    if (!user) {
      return res.status(404).json({
        message: '查不到啦'
      })
    }
    res.status(200).json({
      user
    })
  }),
  getInfoForm: handleErrorAsync(async (req, res, next) => {
    const userInfoForm = await User.findOne({ _id: req.user }).select(
      'firstName lastName nickName email posterIntro helperIntro avatarPath address phone helprSpecialties -_id'
    )
    if (!userInfoForm) {
      return res.status(404).json({
        message: '查不到啦'
      })
    }
    res.status(200).json({
      userInfoForm
    })
  }),
  updateInfoForm: handleErrorAsync(async (req, res, next) => {
    const updateFields = {}
    const acceptedFields = ['firstName', 'lastName', 'nickName', 'address', 'posterIntro', 'helperIntro', 'helprSpecialties']
    const checkField = (field) => {
      if (req.body.hasOwnProperty(field)) {
        updateFields[field] = req.body[field]
      }
    }
    updateFields.updatedAt = new Date()
    acceptedFields.forEach(checkField)
    acceptedFields.push('email updatedAt phone -_id')
    const userInfoForm = await User.findOneAndUpdate({ _id: req.user }, updateFields, {
      new: true, // 返回更新後的 user 物件
      select: acceptedFields.join(' ') //'nickName phone address posterIntro helperIntro -email'
    })
    if (!userInfoForm) {
      return res.status(404).json({
        message: '查不到啦'
      })
    }
    res.json(userInfoForm)
  })
}

module.exports = accounts
