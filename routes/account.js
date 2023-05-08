var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const accountController = require('../controller/accountController');
const { isAuth } = require('../middleware/auth');

router.get('/profile', async function (req, res, next) {
    req.user = req.user || req.query.uid || '64469189880b866621b40eeb'; //'6444b5a30dc68dc4fd63a1ea'
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '取得使用者資料概要'
     */
    /**
    #swagger.security=[{"Bearer": []}],
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
    accountController.getProfile(req, res, next);
});
router.get('/info-form', async function (req, res, next) {
    req.user = req.user || req.query.uid || '64469189880b866621b40eeb'; //'6444b5a30dc68dc4fd63a1ea'
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '取得使用者表單資料'
     */
    /**
    #swagger.security=[{"Bearer": []}],
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
        'nickname': 'Erik',
        'firstName': 'Erik',
        'lastName': 'Chen',
        'email': 'erik@gmail.com',
        'phone': '0912345678',
        'address': '台北市',
        'posterIntro': '我是海報人',
        'helperIntro': '我是幫手人',
        'helperSkills':['人力派遣','市場調查'],
        'updatedAt': '2021-05-20T08:00:00.000Z'
      }
    }    
    */
    accountController.getInfoForm(req, res, next);
});
router.patch('/info-form', async function (req, res, next) {
    req.user = req.user || req.query.uid || '64469189880b866621b40eeb'; //'6444b5a30dc68dc4fd63a1ea'
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '更新使用者表單資料'
     */
    /**
    #swagger.security=[{"Bearer": []}],
    #swagger.parameters['uid'] = {
     in: 'query',
      description: '[dev]如果沒有token，可以用uid取得資料',
      schema: {
        'uid': '64469189880b866621b40eeb'
      }
    }
    */
    /**
    #swagger.parameters['parameter'] = {
      in: 'body',
      description: '可更新部分欄位',
      schema: {
        'nickname': 'Erik',
        'firstName': 'Erik',
        'lastName': 'Chen',
        'email': 'erik@gmail.com',
        'phone': '0912345678',
        'address': '台北市',
        'posterIntro': '我是海報人',
        'helperIntro': '我是幫手人',
        'helperSkills':['人力派遣','市場調查'],
        'updatedAt': '2021-05-20T08:00:00.000Z'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: {        
        '_id':'uhf8vufbv88fv8hf8v',
        'nickname': 'Erik',
        'firstName': 'Erik',
        'lastName': 'Chen',
        'email': 'erik@gmail.com',
        'phone': '0912345678',
        'address': '台北市',
        'posterIntro': '我是海報人',
        'helperIntro': '我是幫手人',
        'helperSkills':['人力派遣','市場調查'],
        'updatedAt': '2021-05-20T08:00:00.000Z'
      }
    }
    #swagger.responses[404] = {
      description: 'Not Found',
      schema: {        
        'message':'查不到啦'
      }
    }
  */
    accountController.updateInfoForm(req, res, next);
});

/* 取得目前超人幣、幫手幣的餘額 */
router.get('/points', function (req, res, next) {
    /**
  * #swagger.tags = ['Account']
  * #swagger.summary = 'Get the current balance of Super Coins and Helper Coins'
  * #swagger.security = [{
      "Bearer": []
    }]
  */
    /**
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getPoints' }
  }
  #swagger.responses[400] = {
    description: 'Token 失敗',
    schema: { $ref: '#/definitions/ErrorToken' }
  }
  #swagger.responses[404] = {
    description: '無此路由',
    schema: { $ref: '#/definitions/Error404' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
  */
    accountController.getPoints(req, res, next);
});

/* 取得6組數字統計 */
router.get('/profile-stats', function (req, res, next) {
    /**
    * #swagger.tags = ['Account']
    * #swagger.summary = 'Get user statistics figures'
    * #swagger.security = [{
        "Bearer": []
      }]
    */
    /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getProfileStats' }
    }
    #swagger.responses[400] = {
      description: 'Token 失敗',
      schema: { $ref: '#/definitions/ErrorToken' }
    }
    #swagger.responses[404] = {
      description: '無此路由',
      schema: { $ref: '#/definitions/Error404' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
    }
    */
    accountController.getProfileStats(req, res, next);
});

router.get('/testFindAllUser', async function (req, res, next) {
    /**
     * #swagger.tags = ['Dev']
     * #swagger.summary = 'dev 取得所有user帳號'
     */
    try {
        const allUser = await User.find({}, '_id lastName firstName nickname email password');
        res.status(200).json({
            allUser,
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errorObj = {};
            const { errors } = err;
            Object.keys(errors).forEach((col) => (errorObj[col] = errors[col].message));
            return res.status(400).json({
                message: 'Validation Error',
                errorObj,
            });
        }
        next(err);
    }
});

module.exports = router;
