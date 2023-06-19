var express = require('express');
var router = express.Router();
const homeController = require('../controller/homeController');

/* 取得已完成之案例 */
router.get('/completed-cases', function (req, res, next) {
    /**
     * #swagger.tags = ['Home']
     * #swagger.summary = '取得已完成之案例 (Get Completed Cases)'
     */
    /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getCompletedCasesSuccess' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
    homeController.getCompeletedCases(req, res, next);
});
/* 取得真實心得評價 */
router.get('/completed-reviews', function (req, res, next) {
    /**
     * #swagger.tags = ['Home']
     * #swagger.summary = '取得真實心得評價 (Get Completed Reviews)'
     */
    /**
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getSuperhandyReviewSuccess' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    homeController.getCompeletedReviews(req, res, next);
});

/* 取得任務統計數量 */
router.get('/task-stats', function (req, res, next) {
    /**
     * #swagger.tags = ['Home']
     * #swagger.summary = '取得任務統計數量 (Get task statistics count)'
     */
    /**
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getTaskStatsSuccess' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    homeController.getTaskStats(req, res, next);
});

/* 取得優秀幫手資料 */
router.get('/excellent-helpers', function (req, res, next) {
    /**
     * #swagger.tags = ['Home']
     * #swagger.summary = '取得優秀幫手資料 (Get excellent helpers)'
     */
    /**
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getExcellentHelpersSuccess' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    homeController.getExcellentHelpers(req, res, next);
});

module.exports = router;
