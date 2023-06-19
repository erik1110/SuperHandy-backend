var express = require('express');
var router = express.Router();
const tasksManageController = require('../controller/tasksManageController');

/* 列出發案歷史紀錄(篩選模式)*/
router.get('/poster/query', async function (req, res, next) {
  /**
  * #swagger.tags = ['Tasks']
  * #swagger.summary = '列出發案歷史紀錄(篩選模式)'
  * #swagger.security=[{"Bearer": []}]
  * /
  /**
  #swagger.parameters['status'] = {
    in: 'query',
    description: '篩選狀態',
    default: '全部',
    enum: ['全部', '草稿', '媒合中', '進行中', '已完成', '已下架', '未成立']
  };
  #swagger.parameters['city'] = {in: 'query',description: '篩選縣市',default:  '臺北市'},
  #swagger.parameters['dist'] = {in: 'query',description: '篩選地區',default:  '信義區'},
  #swagger.parameters['isUrgent'] = {in: 'query',description: '是否為急件',default:  'true'},
  #swagger.parameters['sortBy'] = {
    in: 'query',
    description: '排序依據(newest,highestSalary,mostEnquiries)(最新刊登 最高薪資 最高詢問度)',
    default:  'newest'},
  #swagger.parameters['keyword'] = {in: 'query',description: '關鍵字查詢(任務標題、任務說明)',default: ''},
  #swagger.parameters['services'] = {in: 'query',description: '服務類別，可複選(使用,區隔)',default: ''},
  #swagger.parameters['limit'] = {in: 'query',description: '每一頁的資料筆數(default:10)',default: '10'},
  #swagger.parameters['page'] = {in: 'query',description: '第幾頁(default:1)',default:  '1'},
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getTaskQuery' }
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
  tasksManageController.getPostedTasksHistQuery(req, res, next);
});

/* 列出接案歷史紀錄(篩選模式)*/
router.get('/helper/query', async function (req, res, next) {
  /**
  * #swagger.tags = ['Tasks']
  * #swagger.summary = '列出接案歷史紀錄(篩選模式)'
  * #swagger.security=[{"Bearer": []}]
  * /
  /**
  #swagger.parameters['status'] = {
    in: 'query',
    description: '篩選狀態',
    default: '全部',
    enum: ['全部', '媒合中', '進行中', '已完成', '已下架', '未成立']
  };
  #swagger.parameters['city'] = {in: 'query',description: '篩選縣市',default:  '臺北市'}, 
  #swagger.parameters['dist'] = {in: 'query',description: '篩選地區',default:  '信義區'}, 
  #swagger.parameters['isUrgent'] = {in: 'query',description: '是否為急件',default:  'true'}, 
  #swagger.parameters['sortBy'] = {
    in: 'query',
    description: '排序依據(newest,highestSalary,mostEnquiries)(最新刊登 最高薪資 最高詢問度)',
    default:  'newest'}, 
  #swagger.parameters['keyword'] = {in: 'query',description: '關鍵字查詢(任務標題、任務說明)',default: ''},
  #swagger.parameters['services'] = {in: 'query',description: '服務類別，可複選(使用,區隔)',default: ''},
  #swagger.parameters['limit'] = {in: 'query',description: '每一頁的資料筆數(default:10)',default: '10'},
  #swagger.parameters['page'] = {in: 'query',description: '第幾頁(default:1)',default:  '1'}, 
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getTaskQuery' }
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
  tasksManageController.getAppliedTasksHistQuery(req, res, next);
});


/* 列出發案歷史紀錄 */
router.get('/poster', function (req, res, next) {
    /**
     * #swagger.tags = ['Tasks']
     * #swagger.summary = '列出發案歷史紀錄 (Get all posted tasks history records)'
     * #swagger.security=[{"Bearer": []}]
    /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getPostedTasksHist' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
    tasksManageController.getPostedTasksHist(req, res, next);
});
/* 列出接案歷史紀錄 */
router.get('/helper', function (req, res, next) {
    /**
     * #swagger.tags = ['Tasks']
     * #swagger.summary = '列出接案歷史紀錄 (Get all applied tasks history records)'
     * #swagger.security=[{"Bearer": []}]
    /**
     #swagger.responses[200] = {
        description: '取得成功',
        schema: { $ref: '#/definitions/getAppliedTasksHist' }
    }
    #swagger.responses[500] = {
        description: '系統錯誤',
        schema: { $ref: '#/definitions/Error500' }
    }
*/
    tasksManageController.getAppliedTasksHist(req, res, next);
});

/* 取得任務詳情 */
router.get('/:taskId', function (req, res, next) {
    /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = '取得任務詳情 (Get task details)'
   * #swagger.security=[{"Bearer": []}]
  /**
   #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getTaskDetails' }
  }
  #swagger.responses[400] = {
    description: 'Id 格式錯誤、任務狀態錯誤、查無此任務、沒有權限',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40214, 40212, 40302]',
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
    tasksManageController.getTaskDetails(req, res, next);
});

/* 刪除任務 */
router.delete('/:taskId', function (req, res, next) {
    /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = '刪除任務 (Delete task)'
   * #swagger.security=[{"Bearer": []}]
  /**
   #swagger.responses[200] = {
      description: '刪除成功'
  }
   #swagger.responses[400] = {
    description: 'Id 格式錯誤、任務狀態錯誤、查無此任務、沒有權限',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40214, 40212, 40302]',
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
    tasksManageController.deleteTask(req, res, next);
});

/* 案主確認驗收 */
router.post('/confirm-acceptance/:taskId', function (req, res, next) {
    /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = '案主確認驗收 (Confirm acceptance)'
   * #swagger.security=[{"Bearer": []}]
  /**
   #swagger.responses[200] = {
      description: '確認成功'
  }
   #swagger.responses[400] = {
    description: 'Id 格式錯誤、任務狀態錯誤、查無此任務、沒有權限',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40214, 40212, 40302]',
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
    tasksManageController.confirmAcceptance(req, res, next);
});

/* 案主退回驗收 */
router.post('/refuse-acceptance/:taskId', function (req, res, next) {
    /**
 * #swagger.tags = ['Tasks']
 * #swagger.summary = '案主退回驗收 (Refuse acceptance)'
 * #swagger.security=[{"Bearer": []}]
  /**
    #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '上傳內容',
    schema: {$ref: "#/definitions/refuseAcceptanceReq"}
    },
/**
 #swagger.responses[200] = {
    description: '退回成功'
}
#swagger.responses[400] = {
  description: 'Id 格式錯誤、任務狀態錯誤、查無此任務、沒有權限、該幫手未申請或不存在',
  schema: {
    'status': 'false',
    'message': '錯誤訊息',
    'error': {
      'name': '[40104, 40214, 40212, 40302, 40215]',
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
    tasksManageController.refuseAcceptance(req, res, next);
});

/* 幫手上傳驗收內容 */
router.post('/upload-acceptance/:taskId', function (req, res, next) {
    /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = '幫手上傳驗收內容 (Upload acceptance)'
   * #swagger.security=[{"Bearer": []}]
  /**
    #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '上傳內容',
    schema: {$ref: "#/definitions/uploadAcceptanceReq"}
    },
   #swagger.responses[200] = {
      description: '上傳成功'
  }
   #swagger.responses[400] = {
    description: 'Id 格式錯誤、任務狀態錯誤、查無此任務、沒有權限',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40214, 40212, 40302]',
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
    tasksManageController.uploadAcceptance(req, res, next);
});

/* 評分與留言 */
router.post('/comment/:taskId', function (req, res, next) {
    /**
 * #swagger.tags = ['Tasks']
 * #swagger.description = '會看 userId 決定是幫手還是案主，前端無需帶此參數'
 * #swagger.summary = '評分與留言 (Rating and Review)'
 * #swagger.security=[{"Bearer": []}]
/**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '評價資料',
    schema: { $ref: '#/definitions/ratingAndReviewReq' }
  },
 #swagger.responses[200] = {
    description: '確認成功',
}
#swagger.responses[400] = {
  description: 'Id 格式錯誤、任務狀態錯誤、查無此任務、沒有權限',
  schema: {
    'status': 'false',
    'message': '錯誤訊息',
    'error': {
      'name': '[40104, 40214, 40212, 40302]',
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
    tasksManageController.ratingAndReview(req, res, next);
});

/* 案主確認幫手人選 */
router.post('/confirm-helper/:taskId/:helperId', function (req, res, next) {
    /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = '案主確認幫手人選 (Confirm selected helper)'
   * #swagger.security=[{"Bearer": []}]
  /**
   #swagger.responses[200] = {
      description: '確認成功'
  }
  #swagger.responses[400] = {
    description: 'Id 格式錯誤、任務狀態錯誤、查無此任務、沒有權限、該幫手未申請或不存在',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40104, 40214, 40212, 40302, 40215]',
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
    tasksManageController.confirmHelper(req, res, next);
});

module.exports = router;
