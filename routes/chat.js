var express = require('express');
var router = express.Router();
const chatController = require('../controller/chatController');

/* 取得聊天室列表 */
router.get('/list', function (req, res, next) {
    /**
     * #swagger.tags = ['Chat']
     * #swagger.summary = '取得聊天室列表 (Get all chatRoom list)'
     * #swagger.description = '使用taskId作為聊天室的id。time表示最後一則訊息的時間。(無訊息時為null)'
     * #swagger.security=[{"Bearer": []}]
     */

    /**     
     #swagger.responses[200] = {
       description: '取得聊天室列表成功',
       schema: { $ref: '#/definitions/getChatRoomList' }
     }
     #swagger.responses[500] = {
       description: '系統錯誤',
       schema: { $ref: '#/definitions/Error500' }
     }
     */
    chatController.getChatRoomList(req, res, next);
});
/* 取得聊天室歷史訊息 */
router.get('/history', function (req, res, next) {
    /**
     * #swagger.tags = ['Chat']
     * #swagger.summary = '取得聊天室歷史訊息 (Get chat history by taskId)'
     * #swagger.description = '查詢該聊天室的全部訊息'
     * #swagger.security=[{"Bearer": []}]
     */

    /**
     #swagger.parameters['taskId'] = {in: 'query',description: '使用taskId作為聊天d'}
     #swagger.responses[200] = {
       description: '取得聊天室歷史訊息成功',
       schema: { $ref: '#/definitions/getChatHistory' }
     }
     #swagger.responses[400] = {
       description: 'Id 格式錯誤、查無此任務、沒有權限',
        schema: {
            'status': 'false',
            'message': '錯誤訊息',
            'error': {
                'name': '[40104, 40212, 40302]',
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
    chatController.getChatHistory(req, res, next);
});

module.exports = router;
