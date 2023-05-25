var express = require('express');
var router = express.Router();
const generalController = require('../controller/generalController');
const { isAuth } = require('../middleware/auth');
const upload = require('../middleware/image');

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

/* 上傳圖片 */
router.post('/upload-image', isAuth, upload, function (req, res, next) {
    /**
     * #swagger.tags = ['General']
     * #swagger.summary = '上傳圖片 (Upload image)'
     * #swagger.security=[{"Bearer": []}],  
     #swagger.parameters['file'] = {
        in: 'formData',
        required: true,
      type: 'file',
      description: '圖片檔案'
      }
      #swagger.responses[200] = {
      description: '上傳成功',
      schema: { $ref: '#/definitions/uploadImage' }
      }
      #swagger.responses[400] = {
      description: '無檔案或格式不正確、上傳圖片失敗',
      schema: {
        'status': 'false',
        'message': '錯誤訊息',
        'error': {
            'name': '[40106,40401]',
            'statusCode': 400,
            'isOperational': true
          }
        }
      }
      #swagger.responses[500] = {
      description: '無檔案或格式不正確、上傳圖片失敗',
      schema: {
        'status': 'false',
        'message': 'File too large',
        'error': {
            'name': 'MulterError',
            'message': 'File too large',
            'code': 'LIMIT_FILE_SIZE',
            'field': 'file',
            'storageErrors': [],
            'statusCode': 500
          }
        }
      }
      */
    generalController.uploadImage(req, res, next);
});

module.exports = router;
