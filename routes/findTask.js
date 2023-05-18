var express = require('express');
var router = express.Router();
const tasks = require('../controller/findTaskController');

/* 取得特定任務之詳情 */
router.get('/detail/:taskId', async function (req, res, next) {
    /**
   * #swagger.tags = ['Find-tasks']
   * #swagger.summary = '取得任務詳情 (Get task details)'
  /**
   #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/findTaskDetails' }
  }
  #swagger.responses[400] = {
    description: 'Id 格式錯誤、任務狀態錯誤、查無此任務',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40214, 40212]',
        'statusCode': 400,
        'isOperational': true
      }
    }
  }
  #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
  }
*/
    tasks.getTaskDetails(req, res, next);
});

module.exports = router;
