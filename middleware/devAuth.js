const { handleErrorAsync, appError } = require('../utils/errorHandler')
const User = require('../models/userModel')
const validator = require('validator')

const devAuth = handleErrorAsync(async (req, res, next) => {
  const accountId = req.query.accountId
  const uid = req.query.uid
  if (!uid && !accountId) {
    return next(appError(400, '40003', '查無此帳號'))
  }
  if (!!uid) {
    req.user = await User.findById(uid)
    if (req.user) {
      return next()
    }
  }
  let isEmail = validator.isEmail(accountId)
  if (isEmail) {
    req.user = await User.findOne({ email: accountId }).select('+password')
  } else {
    req.user = await User.findOne({ phone: accountId }).select('+password')
  }
  if (req.user) {
    return next()
  }
  return next(appError(400, '40003', '查無此帳號'))
})

module.exports = {
  devAuth
}
