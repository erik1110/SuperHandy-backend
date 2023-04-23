var express = require('express')
var router = express.Router()
const User = require('../models/userModel')
// const bodyParser = require("body-parser");
// const handleErrorAsync = require('../service/handleErrorAsync')

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

router.get('/profile', async function (req, res, next) {
  req.user = '6444b5a30dc68dc4fd63a1ea'
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
