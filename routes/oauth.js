var express = require('express');
var router = express.Router();
const oauthController = require('../controller/oauthController');

/* 第三方登入 - google 轉向同意頁 */
router.get('/google', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = '第三方登入 - google 轉向同意頁'
     */
    /**
    #swagger.responses[302] = {
      description: '第三方登入 - google 轉向同意頁',
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
    oauthController.authenticate(req, res, next);
});
/* 第三方登入 - 取得 google 資訊 */
router.get('/google/callback', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = '第三方登入 - 取得 google 資訊'
     */
    /**
  #swagger.responses[200] = {
    description: '第三方登入 - 取得 google 資訊',
    schema: { $ref: '#/definitions/googleCallback' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    oauthController.authenticateCallback(req, res, next);
});

/* 第三方登入 - 註冊 */
router.post('/google/sign-in/:userId', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = '第三方登入 - 註冊'
     */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '請將 /google/callback 回傳資訊提供到這支 api',
    schema: {
      $phone: '0912345678',
      $firstName: '小明',
      $lastName: '王',
    }
  }
  #swagger.responses[200] = {
    description: '第三方登入 google - 註冊',
    schema: { $ref: '#/definitions/googleSignUp' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    oauthController.oauthSignUp(req, res, next);
});

module.exports = router;
