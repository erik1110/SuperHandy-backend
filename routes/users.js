var express = require('express');
var router = express.Router();
const UserController = require('../controller/userController');

/* 註冊 */
router.post('/sign-up', function(req, res, next) {
    /**
      * #swagger.tags = ['Sign-in']
      * #swagger.summary = 'Register an Account'
    */
    /**
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: 'nickName is optional, while all the others are required.',
      schema: {
        $email: 'test@gmail.com',
        $phone: '0912345678',
        $firstName: 'Ho',
        $lastName: 'Erik',
        'nickName': 'Erik',
        $password: 'a1234567',
        'confirmPassword': "a1234567"
      }
    }
    */
  /**
    #swagger.responses[200] = {
      description: '登入成功',
      schema: { $ref: '#/definitions/Sign' }
    }
    #swagger.responses[400] = {
      description: '登入失敗',
      schema: { $ref: '#/definitions/Error400' }
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
  UserController.signUp(req, res, next);
});

/* 登入 */
router.post('/sign-in', function(req, res, next) {
  /**
    * #swagger.tags = ['Sign-in']
    * #swagger.summary = 'Login an Account'
  */
  /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: 'nickName is optional, while all the others are required.',
    schema: {
      $account: 'test@gmail.com',
      $password: 'a1234567'
    }
  }
  */
/**
  #swagger.responses[200] = {
    description: '登入成功',
    schema: { $ref: '#/definitions/Sign' }
  }
  #swagger.responses[400] = {
    description: '登入失敗',
    schema: { $ref: '#/definitions/Error400' }
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
  UserController.signIn(req, res, next);
});

module.exports = router;
