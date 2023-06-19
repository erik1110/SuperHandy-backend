var express = require('express');
var router = express.Router();
const notifyController = require('../controller/notifyController');

/* 取得通知清單 */
router.get('/list', function (req, res, next) {
    /**
     * #swagger.tags = ['Notifications']
     * #swagger.summary = '取得通知清單 (Get all notifications)'
     * #swagger.security=[{"Bearer": []}]
    /**
    #swagger.responses[200] = {
      description: '取得通知成功',
      schema: { $ref: '#/definitions/getNotifyList' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
    notifyController.getNotifyList(req, res, next);
});
/* 將某個通知標記為已讀 */
router.patch('/read/:notifyId', function (req, res, next) {
    /**
     * #swagger.tags = ['Notifications']
     * #swagger.summary = '將某個通知標記為已讀 (Mark a notification as read)'
     * #swagger.security=[{"Bearer": []}]
    /**
     #swagger.responses[200] = {
        description: '已讀通知成功'
    }
    #swagger.responses[500] = {
        description: '系統錯誤',
        schema: { $ref: '#/definitions/Error500' }
    }
*/
    notifyController.markRead(req, res, next);
});
/* 全部已讀 */
router.patch('/all-read', function (req, res, next) {
    /**
   * #swagger.tags = ['Notifications']
   * #swagger.summary = '全部已讀 (Mark ａll notifications as read)'
   * #swagger.security=[{"Bearer": []}]
  /**
   #swagger.responses[200] = {
      description: '已讀通知成功'
  }
  #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
  }
*/
    notifyController.markAllRead(req, res, next);
});

module.exports = router;
