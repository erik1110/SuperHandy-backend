var express = require('express');
var router = express.Router();
const tasks = require('../controller/taskController');

/* 確認地理資訊 */
router.get('/check-location', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '檢查地址 (Check Location)'
     */
    /**
    #swagger.security=[{"Bearer": []}],    
    #swagger.parameters['address'] = {
      in: 'query',
      description: '完整地址',
      default:  '臺北市信義區市府路45號'
    },    
    #swagger.responses[200] = {
      description: 'OK',
      schema: {
        'status': 'success',
        'data': {
        'formatted_address': 'No. 45, City Hall Rd, Xinyi District, Taipei City, Taiwan 110',
        'location': {
            'lat': 25.0341222,
            'lng': 121.5640212
        }
      }
      }
    },
    #swagger.responses[400] = {
      description: '找不到該地址',
      schema: {
        'status': 'false',
        'message': '找不到該地址',
        'error': {
          'name': '40400',
          'statusCode': 400,
          'isOperational': true
        }
      }
    }
    */
    tasks.checkGeocoding(req, res, next);
});
/* 儲存草稿 */
router.post('/draft', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '儲存草稿 (Save draft)'
     */
    /**
 #swagger.security=[{"Bearer": []}]
 #swagger.parameters['parameter_name'] = {
  in: 'body',
  description: '任務資料',
  schema: {$ref: "#/definitions/draftTaskDetail"}
  }, 
  #swagger.responses[200] = {
    description: 'OK',
    schema: {
    'status': 'success',
    'message': '儲存草稿成功',
    'data': { 'taskId' : '645be336a6b4506a5506be10'}
    }
  }
  #swagger.responses[400] = {
    description: '欄位錯誤提示',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '40102',
        'statusCode': 400,
        'isOperational': true
      }
    }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: {'message': '系統錯誤，請稍後再試'}
  }
 */
    tasks.saveDraft(req, res, next);
});
/* 發佈草稿 */
router.post('/draft/:taskId', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '發佈草稿 (Publish draft)'
     */
    /**
 #swagger.security=[{"Bearer": []}]
 #swagger.parameters['parameter_name'] = {
  in: 'body',
  description: '任務資料',
  schema: {$ref: "#/definitions/publishTaskDetail"}
  }, 
  #swagger.responses[200] = {
    description: '發佈草稿成功',
    schema: {
    'status': 'success',
    'message': '發佈草稿成功',
    }
  }
  #swagger.responses[400] = {
    description: 'Id 格式錯誤、欄位錯誤提示、查無此任務、沒有權限、任務狀態錯誤、超人幣不足、幫手幣不足、找不到該地址',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40102, 40212, 40302, 40214, 40211, 40211, 40400]',
        'statusCode': 400,
        'isOperational': true
      }
    }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: {'message': '系統錯誤，請稍後再試'}
  }
 */
    tasks.publishDraft(req, res, next);
});
/* 取得草稿 */
router.get('/draft/:taskId', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '取得草稿 (Get the draft)'
     */
    /**
    #swagger.security=[{"Bearer": []}]
    #swagger.responses[200] = {
      description: 'OK',
      schema: {$ref: '#/definitions/getDraftResponse'}
    }
    #swagger.responses[400] = {
      description: 'Id 格式錯誤、查無此任務、沒有權限、任務狀態錯誤',
      schema: {
        'status': 'false',
        'message': '錯誤訊息',
        'error': {
          'name': '[40104, 40212, 40302, 40214]',
          'statusCode': 400,
          'isOperational': true
        }
      }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: {'message': '系統錯誤，請稍後再試'}
    }
  */
    tasks.getDraft(req, res, next);
});
/* 更新草稿 */
router.put('/draft/:taskId', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '更新草稿 (Update the draft)'
     */
    /**
   #swagger.security=[{"Bearer": []}]
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '任務資料',
    schema: {$ref: "#/definitions/draftTaskDetail"}
    },
    #swagger.responses[200] = {
      description: 'OK',
      schema: {
      'status': 'success',
      'message': '更新草稿成功'
      }
    }
    #swagger.responses[400] = {
      description: 'Id 格式錯誤、欄位錯誤提示、查無此任務、沒有權限、任務狀態錯誤',
      schema: {
        'status': 'false',
        'message': '錯誤訊息',
        'error': {
          'name': '[40104, 40102, 40212, 40302, 40214]',
          'statusCode': 400,
          'isOperational': true
        }
      }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: {'message': '系統錯誤，請稍後再試'}
    }
  */
    tasks.updateDraft(req, res, next);
});
/* 刪除草稿 */
router.delete('/draft/:taskId', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '刪除草稿(Delete the draft)'
     */
    /**
    #swagger.security=[{"Bearer": []}]
        #swagger.responses[200] = {
      description: 'OK',
      schema: {
      'status': 'success',
      'message': '刪除草稿成功'
      }
    }
    #swagger.responses[400] = {
      description: 'Id 格式錯誤、查無此任務、沒有權限、任務狀態錯誤',
      schema: {
        'status': 'false',
        'message': '錯誤訊息',
        'error': {
          'name': '[40104, 40212, 40302, 40214]',
          'statusCode': 400,
          'isOperational': true
        }
      }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: {'message': '系統錯誤，請稍後再試'}
    }
  */
    tasks.deleteDraft(req, res, next);
});
/* 發佈任務 */
router.post('/publish', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '發佈任務 (Publish a task)'
     */
    /**
   #swagger.security=[{"Bearer": []}]
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '任務資料',
    schema: {$ref: "#/definitions/publishTaskDetail"}
    },
  #swagger.responses[200] = {
    description: '發佈任務成功',
    schema: {
    'status': 'success',
    'message': '發佈任務成功',
    'data': { 'taskId' : '645be336a6b4506a5506be10'}
    }
  }
  #swagger.responses[400] = {
    description: '欄位錯誤提示、超人幣不足、幫手幣不足、找不到該地址',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40102, 40211, 40211, 40400]',
        'statusCode': 400,
        'isOperational': true
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Server Error',
    schema: {
    'message': '伺服器錯誤'
    }
  }
 */
    tasks.publishTask(req, res, next);
});

/* 編輯下架任務 */
router.post('/edit/:taskId', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '編輯下架任務 (Edit the unpublished task)'
     */
    /**
  #swagger.security=[{"Bearer": []}]
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '任務資料',
    schema: {$ref: "#/definitions/unpublishEditDetail"}
    },
  #swagger.responses[200] = {
    description: '編輯下架任務成功',
    schema: {
      'status': 'success',
      'message': '編輯下架任務成功',
    }
  }
  #swagger.responses[400] = {
    description: 'Id 格式錯誤、欄位錯誤提示、沒有權限、任務狀態錯誤、找不到該地址',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40102, 40302, 40214, 40400]',
        'statusCode': 400,
        'isOperational': true
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Server Error',
    schema: {
    'message': '伺服器錯誤'
    }
  }
 */
    tasks.unpublishEditTask(req, res, next);
});

/* 重新發佈任務 */
router.post('/republish/:taskId', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '重新發佈任務 (Republish the task)'
     */
    /**
  #swagger.security=[{"Bearer": []}]
  #swagger.responses[200] = {
    description: '重新發佈任務成功',
    schema: {
    'status': 'success',
    'message': '重新發佈任務成功',
    }
  }
  #swagger.responses[400] = {
    description: 'Id 格式錯誤、查無此任務、沒有權限、任務狀態錯誤',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40212, 40302, 40214]',
        'statusCode': 400,
        'isOperational': true
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Server Error',
    schema: {
    'message': '伺服器錯誤'
    }
  }
 */
    tasks.republishTask(req, res, next);
});

/* 下架任務 */
router.post('/unpublish/:taskId', async function (req, res, next) {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '下架任務 (Unpublish the task)'
     */
    /**
  #swagger.security=[{"Bearer": []}]
  #swagger.responses[200] = {
    description: '下架任務成功',
    schema: {
    'status': 'success',
    'message': '下架任務成功',
    }
  }
  #swagger.responses[400] = {
    description: 'Id 格式錯誤、查無此任務、沒有權限、任務狀態錯誤',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40212, 40302, 40214]',
        'statusCode': 400,
        'isOperational': true
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Server Error',
    schema: {
    'message': '伺服器錯誤'
    }
  }
 */
    tasks.unpublishTask(req, res, next);
});

module.exports = router;
