var express = require('express');
var router = express.Router();
const tasksManageController = require('../controller/tasksManageController');

/* 過期任務檢查 */
router.post('/check-expired-tasks', function (req, res, next) {
    /**
   * #swagger.tags = ['Scheduler']
   * #swagger.summary = '過期任務檢查 (Check Expired Tasks)'
  /**
   #swagger.responses[200] = {
      description: '確認成功'
  }
  #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
  }
*/
    tasksManageController.checkExpiredTasks(req, res, next);
});


module.exports = router;
