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

/* 取得未媒合之任務列表(一般查詢)*/
router.get('/list/query', async function (req, res, next) {
    /**
 * #swagger.tags = ['Find-tasks']
 * #swagger.summary = '取得未媒合之任務列表(一般查詢)'
/**
  #swagger.parameters['city'] = {in: 'query',description: '篩選縣市',default:  '台北市'}, 
  #swagger.parameters['dist'] = {in: 'query',description: '篩選地區',default:  '信義區'}, 
  #swagger.parameters['isUrgent'] = {in: 'query',description: '是否為急件',default:  'true'}, 
  #swagger.parameters['sortBy'] = {
    in: 'query',
    description: '排序依據(newest,highestSalary,mostEnquiries)(最新刊登 最高薪資 最高詢問度)',
    default:  'newest'}, 
  #swagger.parameters['keyword'] = {in: 'query',description: '關鍵字查詢(任務標題、任務說明)',default:  ''}, 
  #swagger.parameters['services'] = {in: 'query',description: '服務類別，可複選(使用,區隔)',default:  ''}, 
  #swagger.parameters['limit'] = {in: 'query',description: '每一頁的資料筆數(default:6)',default:  '6'}, 
  #swagger.parameters['page'] = {in: 'query',description: '第幾頁(default:1)',default:  '1'}, 
 #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getTaskListGeneral' }
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
    tasks.getTaskListGeneral(req, res, next);
});

module.exports = router;
