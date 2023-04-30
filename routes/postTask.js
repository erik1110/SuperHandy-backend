var express = require('express')
var router = express.Router()
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const accounts = require('../controller/accountController')

router.get('/:taskId', async function (req, res, next) {
  req.user = req.user || req.query.uid || '64469189880b866621b40eeb' //'6444b5a30dc68dc4fd63a1ea'
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得使用者資料概要'
   */
  /**
    #swagger.security=[{"jwt": []}],
    #swagger.parameters['uid'] = {
      in: 'query',
      description: '[dev]如果沒有token，可以用uid取得資料',
      schema: {
        'uid': '64469189880b866621b40eeb'
      }
    },
    #swagger.responses[200] = {
      description: 'OK',
      schema: { 
        "firstName": "John",
        "lastName": "Doe",
        "email": "abc123@gmail.com",
        "avatarPath": "http://"
      }
    }    
    */
  accounts.getProfile(req, res, next)
})
router.post('/save-draft', async function (req, res, next) {
  req.user = req.user || req.query.uid || '64469189880b866621b40eeb' //'6444b5a30dc68dc4fd63a1ea'
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得使用者表單資料'
   */
  /**
    #swagger.security=[{"jwt": []}],
    #swagger.parameters['uid'] = {
      in: 'query',
      description: '[dev]如果沒有token，可以用uid取得資料',
      schema: {
        'uid': '64469189880b866621b40eeb'
      }
    },
    #swagger.responses[200] = {
      description: 'OK',
      schema: {
        '_id':'uhf8vufbv88fv8hf8v',
        'nickName': 'Erik',
        'email': 'erik@gmail.com'
        'phone': '0912345678',
        'address': '台北市',
        'posterIntro': '我是海報人',
        'helperIntro': '我是幫手人',
        'updatedAt': '2021-05-20T08:00:00.000Z'
      }
    }    
    */
  accounts.getInfoForm(req, res, next)
})
router.get('/check-location', async function (req, res, next) {
  req.user = req.user || req.query.uid || '64469189880b866621b40eeb' //'6444b5a30dc68dc4fd63a1ea'
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '更新使用者表單資料'
   */
  /**
    #swagger.security=[{"jwt": []}],
    #swagger.parameters['uid'] = {
      in: 'query',
      description: '[dev]如果沒有token，可以用uid取得資料',
      schema: {
        'uid': '64469189880b866621b40eeb'
      }
    },
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: '可僅更新部分欄位',
      schema: {
        'nickName': 'Erik',
        'phone': '0912345678',
        'address': '台北市',
        'posterIntro': '我是海報人',
        'helperIntro': '我是幫手人'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: {
        '_id':'uhf8vufbv88fv8hf8v',
        'nickName': 'Erik',
        'email': 'erik@gmail.com'
        'phone': '0912345678',
        'address': '台北市',
        'posterIntro': '我是海報人',
        'helperIntro': '我是幫手人',
        'updatedAt': '2021-05-20T08:00:00.000Z'
      }
    }    
    */
  accounts.updateInfoForm(req, res, next)
})

module.exports = router
