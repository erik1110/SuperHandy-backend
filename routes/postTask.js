var express = require('express')
var router = express.Router()
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const accounts = require('../controller/accountController')
const tasks = require('../controller/taskController')

router.get('/check-location', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '檢查地址(取得經緯度)'
   * #swagger.description = '用token開發不方便，先暫時用_id或是email、手機號碼，來模擬登入狀態'
   */
  /**
    #swagger.security=[{"Bearer": []}],
    #swagger.parameters['uid'] = {
      in: 'query',
      description: '[dev]使用者_id',
    },
    #swagger.parameters['accountId'] = {
      in: 'query',
      description: '[dev]使用者email或手機號碼',
      default: '0912775678'
    },
    #swagger.parameters['address'] = {
      in: 'query',
      description: '完整地址',
      default:  '台北市信義區市府路45號'
    },    
    #swagger.responses[200] = {
      description: 'OK',
      schema: {
        'formatted_address': 'No. 45, City Hall Rd, Xinyi District, Taipei City, Taiwan 110',
        'location': {
            'lat': 25.0341222,
            'lng': 121.5640212
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
  tasks.checkGeocoding(req, res, next)
})
router.post('/save-draft', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '儲存新草稿'
   * #swagger.description = '用token開發不方便，先暫時用_id或是email、手機號碼，來模擬登入狀態'
   */
  /**
   #swagger.security=[{"Bearer": []}]
   #swagger.parameters['uid'] = {
      in: 'query',
      description: '[dev]使用者_id',
    },
    #swagger.parameters['accountId'] = {
      in: 'query',
      description: '[dev]使用者email或手機號碼',
      default: '0912775678'
    },
   #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '任務資料',
    schema: {
        'title': '任務標題',
        'status': 'draft',
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
      'message': '儲存成功'
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
  tasks.saveDraft(req, res, next)
})
router.post('/apply', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '發布任務'
   * #swagger.description = '用token開發不方便，先暫時用_id或是email、手機號碼，來模擬登入狀態'
   */
  /**
   #swagger.security=[{"Bearer": []}]
   #swagger.parameters['uid'] = {
      in: 'query',
      description: '[dev]使用者_id',
    },
    #swagger.parameters['accountId'] = {
      in: 'query',
      description: '[dev]使用者email或手機號碼',
      default: '0912775678'
    },
   #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: '任務資料',
    schema: {
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
      'message': '儲存成功'
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
  tasks.publishTask(req, res, next)
})
router.get('/:taskId', async function (req, res, next) {
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得草稿'
   * #swagger.description = '用token開發不方便，先暫時用_id或是email、手機號碼，來模擬登入狀態'
   */
  /**
   #swagger.security=[{"Bearer": []}]
   #swagger.parameters['uid'] = {
      in: 'query',
      description: '[dev]使用者_id',
    },
    #swagger.parameters['accountId'] = {
      in: 'query',
      description: '[dev]使用者email或手機號碼',
      default: '0912775678'
    },
    #swagger.parameters['taskId'] = {
      in: 'path',
      description: '任務ID',
    },    
    #swagger.responses[200] = {
      description: 'OK',
      schema: {
      'message': '儲存成功',
      'data': {
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
  tasks.getDraft(req, res, next)
})

module.exports = router
