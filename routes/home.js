var express = require('express');
var router = express.Router();
const homeController = require('../controller/homeController');

/* 取得已完成之案例 */
router.get('/completed-cases', function(req, res, next) {
    /**
      * #swagger.tags = ['Home']
      * #swagger.summary = 'Get Completed Projects'
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
    homeController.getCategories(req, res, next);
  });

/* 取得曝光方案 */
router.get('/exposure-plan', function(req, res, next) {
    /**
      * #swagger.tags = ['Home']
      * #swagger.summary = 'Get Exposure Plan'
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
    homeController.getPlans(req, res, next);
  });

module.exports = router;
