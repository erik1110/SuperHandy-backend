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
      default:  '台北市信義區市府路45號'
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
    #swagger.responses[404] = {
      description: 'Not Found',
      schema: {
        'message': '查無地址'
      }
    } 
    */
    tasks.checkGeocoding(req, res, next);
});
/* 儲存草稿 */
router.post('/draft/save', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '儲存草稿 (Save draft)'
   */
  /**
 #swagger.security=[{"Bearer": []}]
 #swagger.parameters['parameter_name'] = {
  in: 'body',
  description: '任務資料',
  schema: {$ref: "#/definitions/taskDetail"}
  }, 
  #swagger.responses[200] = {
    description: 'OK',
    schema: {
    'status': 'success',
    'data': {$ref: '#/definitions/taskDetailWithId'}
    }
  }
  #swagger.responses[400] = {
    description: '非新的草稿',
    schema: {'message': '打錯API了，儲存已存在的草稿請用put'}
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: {'message': '系統錯誤，請稍後再試'}
  }
 */
  tasks.saveDraft(req, res, next);
});
/* 發佈草稿 */
router.post('/draft/publish', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '發佈草稿 (Publish draft)'
   */
  /**
 #swagger.security=[{"Bearer": []}]
 #swagger.parameters['parameter_name'] = {
  in: 'body',
  description: '任務資料',
  schema: {$ref: "#/definitions/taskDetail"}
  }, 
  #swagger.responses[200] = {
    description: 'OK',
    schema: {
    'status': 'success',
    'data': {$ref: '#/definitions/taskDetailWithId'}
    }
  }
  #swagger.responses[400] = {
    description: '非新的草稿',
    schema: {'message': '打錯API了，儲存已存在的草稿請用put'}
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: {'message': '系統錯誤，請稍後再試'}
  }
 */
  tasks.saveDraft(req, res, next);
});
/* 取得草稿 */
router.get('/draft/:taskId', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得草稿 (Get the draft)'
   */
  /**
    #swagger.security=[{"Bearer": []}]
    #swagger.responses[400] = {
      description: '非新的草稿',
      schema: {'message': '打錯API了，儲存已存在的草稿請用put'}
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: {'message': '系統錯誤，請稍後再試'}
    }
  */
  tasks.createDraft(req, res, next);
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
    schema: {$ref: "#/definitions/taskDetail"}
    }, 
    #swagger.responses[200] = {
      description: 'OK',
      schema: {
      'status': 'success',
      'data': {$ref: '#/definitions/taskDetailWithId'}
      }
    }
    #swagger.responses[400] = {
      description: '非新的草稿',
      schema: {'message': '打錯API了，儲存已存在的草稿請用put'}
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: {'message': '系統錯誤，請稍後再試'}
    }
  */
  tasks.createDraft(req, res, next);
});
/* 刪除草稿 */
router.delete('/draft/:taskId', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '刪除草稿(Delete the draft)'
   */
  /**
    #swagger.security=[{"Bearer": []}]
    #swagger.responses[400] = {
      description: '非新的草稿',
      schema: {'message': '打錯API了，儲存已存在的草稿請用put'}
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: {'message': '系統錯誤，請稍後再試'}
    }
  */
  tasks.createDraft(req, res, next);
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
    schema: {
        'taskId':'645be336a6b4506a5506be10',
        'title': '任務標題',
        'status': 'published',
        'category': '家事',
        'description': '任務描述',
        'salary': 1000,
        'exposurePlan': '一般曝光',
        'imagesUrl': ['https://example.com/image1.jpg', 'https://example.com/mage2.jpg'],
        'contactInfo': {
          'name': '王小明',
          'phone': '0912345678',
          'email': 'ming@gmail.com',
        },
        'location': {
          "city": "台北市",
          "dist": "信義區",
          "address": "台北市信義區市府路45號",
          "landmark": "台北101",
          "lng": 121.5337064,
          "lat": 25.0296587
        }
      }
    },   
  #swagger.responses[200] = {
    description: 'OK',
    schema: {
    'status': 'scuccess',
    'data': {$ref: "#/definitions/taskDetailWithId"}
    }
  }
  #swagger.responses[404] = {
    description: 'Not Found',
    schema: {
    'message': '儲存失敗'
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

/* 編輯任務 */
router.post('/edit/:taskId', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '編輯任務 (Edit the task)'
   */
  /**
  #swagger.security=[{"Bearer": []}]
  #swagger.responses[200] = {
    description: 'OK',
    schema: {
    'status': 'scuccess',
    'data': {$ref: "#/definitions/taskDetailWithId"}
    }
  }
  #swagger.responses[404] = {
    description: 'Not Found',
    schema: {
    'message': '儲存失敗'
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

/* 重新發佈任務 */
router.post('/republish/:taskId', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '重新發佈任務 (Republish the task)'
   */
  /**
  #swagger.security=[{"Bearer": []}]
  #swagger.responses[200] = {
    description: 'OK',
    schema: {
    'status': 'scuccess',
    'data': {$ref: "#/definitions/taskDetailWithId"}
    }
  }
  #swagger.responses[404] = {
    description: 'Not Found',
    schema: {
    'message': '儲存失敗'
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

/* 下架任務 */
router.post('/unpublish/:taskId', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '下架任務 (Unpublish the task)'
   */
  /**
  #swagger.security=[{"Bearer": []}]
  #swagger.responses[200] = {
    description: 'OK',
    schema: {
    'status': 'scuccess',
    'data': {$ref: "#/definitions/taskDetailWithId"}
    }
  }
  #swagger.responses[404] = {
    description: 'Not Found',
    schema: {
    'message': '儲存失敗'
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

module.exports = router;
