var express = require('express')
var router = express.Router()
const User = require('../models/userModel')

router.get('/profile', async function (req, res, next) {
  /**
   * #swagger.tags = ['Account']
   * #swagger.summary = '取得使用者資料概要'
   */
  /**
    #swagger.security=[{"jwt": []}],
    #swagger.responses[200] = {
      description: 'OK',
      schema: { 
        "firstName": "John",
        "lastName": "Doe",
        "email": "abc123@gmail.com",
        "avatarPath": "http://"
      }
    }
    #swagger.responses[401] = {
      description: '尚未登入',
      schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const user = await User.findOne({ _id: req.user }).select('name email avatarPath')
    if (!user) {
      return res.status(404).json({
        message: '查不到啦'
      })
    }
    res.status(200).json({
      user
    })
  } catch (err) {
    next(err)
  }
})

router.patch('/profile', function (req, res, next) {
  res.send('respond your request [patch]/account/profile  ')
})
router.get('/info-form', async function (req, res, next) {
  const newUser = await User.find()
  res.status(200).json({
    newUser
  })
})
router.patch('/info-form', function (req, res, next) {
  res.send('respond your request [patch]/account/info-form  ')
})

router.post('/testSignup', async function (req, res, next) {
  try {
    const newUser = await User.create(req.body)
    res.status(200).json({
      newUser
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errorObj = {}
      const { errors } = err
      Object.keys(errors).forEach((col) => (errorObj[col] = errors[col].message))
      return res.status(400).json({
        message: 'Validation Error',
        errorObj
      })
    }
    next(err)
  }
})

module.exports = router
