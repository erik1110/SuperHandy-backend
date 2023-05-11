var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const { isAuth } = require('../middleware/auth');

/* 註冊+寄信 */
router.post('/sign-up', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = 'Register an Account and send a verification email'
     */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: 'nickname is optional, while all the others are required.',
    schema: {
      $email: 'test@gmail.com',
      $phone: '0912345678',
      $firstName: 'Ho',
      $lastName: 'Erik',
      'nickname': 'Erik',
      $password: '12345678',
      'confirmPassword': "12345678"
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '註冊成功',
    schema: { $ref: '#/definitions/RegisterEmailSuccess' }
  }
  #swagger.responses[400] = {
    description: '註冊失敗',
    schema: { $ref: '#/definitions/RegisterEmailError' }
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
    userController.signUp(req, res, next);
});

/* 驗證註冊信 */
router.get('/verify-email', isAuth, function (req, res, next) {
    /**
    * #swagger.tags = ['Sign-in']
    * #swagger.summary = 'Verify the registration email'
    * #swagger.security = [{
        "Bearer": []
      }]
  */
    /**
  #swagger.responses[200] = {
    description: '驗證成功',
  }
  #swagger.responses[400] = {
    description: '驗證失敗',
    schema: { $ref: '#/definitions/ValidateEmailError' }
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
    userController.validateEmail(req, res, next);
});

module.exports = router;
