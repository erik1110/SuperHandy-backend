var express = require('express');
var router = express.Router();
const homeController = require('../controller/homeController');

/* 取得已完成之案例 */
router.get('/completed-cases', function(req, res, next) {
    /**
      * #swagger.tags = ['Home']
      * #swagger.summary = 'Get Completed Cases'
    */
  /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getCompletedCasesSuccess' }
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
    homeController.getCompeletedCases(req, res, next);
});
/* 取得真實心得評價 */
router.get('/completed-reviews', function(req, res, next) {
  /**
    * #swagger.tags = ['Home']
    * #swagger.summary = 'Get Completed Cases'
  */
/**
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getSuperhandyReviewSuccess' }
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
  homeController.getCompeletedReviews(req, res, next);
});

module.exports = router;
