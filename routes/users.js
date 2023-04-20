var express = require('express');
var router = express.Router();

/* 登入 */
router.post('/sign-in', function(req, res, next) {
    /**
      * #swagger.tags = ['Login']
      * #swagger.summary = '登入'
    */
    /**
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: '登入資料',
      schema: {
        $email: 'test@gmail.com',
        $phone: '0912345678',
        $first_name: '王',
        $last_name: '小明',
        "nick_name": "Wang",
        $password: 'a1234567',
        "confirm_password": "a1234567"
      }
    }
    */
  /**
    #swagger.responses[201] = {
      description: '登入成功',
      schema: { $ref: '#/definitions/Sign' }
    }
    #swagger.responses[400] = {
      description: '登入失敗',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
      description: '無此路由',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  res.send('respond with a resource');
});

module.exports = router;
