var express = require('express');
var router = express.Router();
const oauthController = require('../controller/oauthController');

/* 第三方登入 google */
router.get('/google', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = '第三方登入 google'
    */
    /**
    #swagger.responses[200] = {
      description: '第三方登入 google',
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
    oauthController.authenticate(req, res, next);
});
/* 第三方登入 google callback */
router.get('/google/callback', function (req, res, next) {
    /**
     * #swagger.tags = ['Sign-in']
     * #swagger.summary = '第三方登入 google callback'
     */
    /**
  #swagger.responses[200] = {
    description: '第三方登入 google callback',
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    oauthController.authenticateCallback(req, res, next);
});

module.exports = router;
