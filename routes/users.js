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

/* 重寄驗證信 */
router.post('/resend-verification', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = 'Resend an Email for verification'
     */
    /**
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: 'No matter what email is received, a reply will be sent indicating that the email has been sent.',
      schema: {
        $email: 'test@gmail.com',
      }
    }
    */
    /**
    #swagger.responses[200] = {
      description: '信件已寄出',
    }
    #swagger.responses[400] = {
      description: '信件已寄出',
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
    userController.resendEmail(req, res, next);
});

/* 登入 */
router.post('/sign-in', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = 'Login an Account'
     */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: 'sign in an account',
    schema: {
      $account: 'user1@example.com',
      $password: '12345678'
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
    userController.signIn(req, res, next);
});

/* 忘記密碼 */
router.post('/forgot-password', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = 'forgot password and send an Email for verification'
     */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: 'forgot password and send an Email for verification',
    schema: {
      $email: 'test@gmail.com',
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '信件已寄出',
  }
  #swagger.responses[400] = {
    description: '信件已寄出',
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
    userController.forgotPassword(req, res, next);
});

/* 忘記密碼並重設密碼 */
router.patch('/forgot-reset-password', isAuth, (req, res, next) =>
    /**
    * #swagger.tags = ['Sign-in']
    * #swagger.summary = 'forget password and reset the password from email'
    * #swagger.security = [{
        "Bearer": []
      }]
  */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '',
    schema: {
      $password: 'a1234567',
      $confirmPassword: 'a1234567'
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '重設成功',
  }
  #swagger.responses[400] = {
    description: '重設失敗',
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
    userController.forgotResetPassword(req, res, next),
);

/* 更新密碼 */
router.patch('/update-password', isAuth, (req, res, next) =>
    /**
    * #swagger.tags = ['Sign-in']
    * #swagger.summary = 'update password after sign in'
    * #swagger.security = [{
        "Bearer": []
      }]
  */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '',
    schema: {
      $password: '12345678',
      $confirmPassword: '12345678',
      $oldPassword: '22345678'
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '重設成功',
  }
  #swagger.responses[400] = {
    description: '重設失敗',
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
    userController.updatePassword(req, res, next),
);

module.exports = router;
