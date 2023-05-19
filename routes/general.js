var express = require('express');
var router = express.Router();
const generalController = require('../controller/generalController');

/* 取得服務類別(包含任務說明的template) */
router.get('/categories', function (req, res, next) {
    /**
     * #swagger.tags = ['General']
     * #swagger.summary = '取得服務類別，包含任務說明的template (Get Service Category (including task description template)'
     */
    /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getCategorySuccess' }
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
    generalController.getCategories(req, res, next);
});

/* 取得曝光方案 */
router.get('/exposure-plan', function (req, res, next) {
    /**
     * #swagger.tags = ['General']
     * #swagger.summary = '取得曝光方案 (Get exposure plan)'
     */
    /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getPlanSuccess' }
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
    generalController.getPlans(req, res, next);
});

module.exports = router;
