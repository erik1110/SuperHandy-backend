var express = require('express');
var router = express.Router();
const tasks = require('../controller/findTaskController');
const { isAuth, isMember } = require('../middleware/auth');

/* 取得特定任務之詳情 */
router.get('/detail/:taskId', isMember, async function (req, res, next) {
    /**
   * #swagger.tags = ['Find-tasks']
   * #swagger.summary = '取得任務詳情 (Get task details)'
   * /
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
    tasks.findTaskDetails(req, res, next);
});

/* 取得未媒合之任務列表(列表模式)*/
router.get('/list/query', async function (req, res, next) {
    /**
 * #swagger.tags = ['Find-tasks']
 * #swagger.summary = '取得未媒合之任務列表(列表模式)'
 * /
/**
  #swagger.parameters['city'] = {in: 'query',description: '篩選縣市',default:  '臺北市'}, 
  #swagger.parameters['dist'] = {in: 'query',description: '篩選地區',default:  '信義區'}, 
  #swagger.parameters['isUrgent'] = {in: 'query',description: '是否為急件',default:  'true'}, 
  #swagger.parameters['sortBy'] = {
    in: 'query',
    description: '排序依據(newest,highestSalary,mostEnquiries)(最新刊登 最高薪資 最高詢問度)',
    default:  'newest'}, 
  #swagger.parameters['keyword'] = {in: 'query',description: '關鍵字查詢(任務標題、任務說明)',default:  ''}, 
  #swagger.parameters['services'] = {in: 'query',description: '服務類別，可複選(使用,區隔)',default:  ''}, 
  #swagger.parameters['limit'] = {in: 'query',description: '每一頁的資料筆數(default:10)',default:  '6'}, 
  #swagger.parameters['page'] = {in: 'query',description: '第幾頁(default:1)',default:  '1'}, 
 #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/findTaskListGeneral' }
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
    tasks.findTaskListGeneral(req, res, next);
});

/* 取得未媒合之任務列表(地圖模式)*/
router.get('/map/query', async function (req, res, next) {
    /**
* #swagger.tags = ['Find-tasks']
* #swagger.summary = '取得未媒合之任務列表(地圖模式)'
* #swagger.description = '有填寫縣市地區時，僅顯示該區任務(不使用半徑); 使用經緯度時，顯示該半徑內任務。'
* /
/**
#swagger.parameters['longitude'] = {in: 'query',description: '經度(中心點)',default:  '121.5654268'}, 
#swagger.parameters['latitude'] = {in: 'query',description: '緯度(中心點)',default:  '25.0329636'}, 
#swagger.parameters['city'] = {in: 'query',description: '縣市(中心點)',default:  '臺北市'},
#swagger.parameters['dist'] = {in: 'query',description: '地區(中心點)',default:  '信義區'}, 
#swagger.parameters['radius'] = {in: 'query',description: '半徑0~10公里(不包含0，預設3公里)',default:  '3'}, 
#swagger.parameters['isUrgent'] = {in: 'query',description: '是否為急件',default:  'true'}, 
#swagger.parameters['keyword'] = {in: 'query',description: '關鍵字查詢(任務標題、任務說明)',default:  ''}, 
#swagger.parameters['services'] = {in: 'query',description: '服務類別，可複選(使用,區隔)',default:  ''}, 
#swagger.responses[200] = {
  description: '取得成功',
  schema: { $ref: '#/definitions/findTaskListMap' }
}
#swagger.responses[400] = {
description: '請輸入經緯度或縣市區域、找不到該地址、查無資料、無檔案或格式不正確(半徑必須大於0)',
schema: {
  'status': 'false',
  'message': '錯誤訊息',
  'error': {
    'name': '[40105, 40400, 40210, 40106]',
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
    tasks.findTaskListMap(req, res, next);
});

/* 取得未媒合之任務列表(限時推薦)*/
router.get('/highlight', async function (req, res, next) {
    /**
* #swagger.tags = ['Find-tasks']
* #swagger.summary = '取得未媒合之任務列表(限時推薦)'
* /
/**
#swagger.responses[200] = {
  description: '取得成功',
  schema: { $ref: '#/definitions/findTaskListHighlight' }
}
#swagger.responses[400] = {
description: '查無資料',
schema: {
  'status': 'false',
  'message': '錯誤訊息',
  'error': {
    'name': '[40210]',
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
    tasks.findTaskListHighlight(req, res, next);
});

/* 我要接案*/
router.post('/apply/:taskId', isAuth, async function (req, res, next) {
    /**
* #swagger.tags = ['Find-tasks']
* #swagger.security=[{"Bearer": []}],  
* #swagger.summary = '我要接案'
* /
/**
#swagger.responses[200] = {
description: 'OK',
schema: { status: 'success',message: '等待媒合中' }
}
#swagger.responses[400] = {
description: 'Id 格式錯誤、查無此任務、無法應徵自己的任務、已應徵過此任務',
schema: {
  'status': 'false',
  'message': '錯誤訊息',
  'error': {
      'name': '[40104,40212,40216,40217]',
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
    tasks.applyTask(req, res, next);
});

module.exports = router;
