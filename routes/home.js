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
  */
    homeController.getCompeletedCases(req, res, next);
});
/* 取得真實心得評價 */
router.get('/completed-reviews', function(req, res, next) {
  /**
    * #swagger.tags = ['Home']
    * #swagger.summary = 'Get Completed Reviews'
  */
/**
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getSuperhandyReviewSuccess' }
  }
*/
  homeController.getCompeletedReviews(req, res, next);
});

module.exports = router;
