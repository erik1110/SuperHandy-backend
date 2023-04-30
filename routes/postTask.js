var express = require('express')
var router = express.Router()
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const accounts = require('../controller/accountController')
const tasks = require('../controller/postTaskController')

router.get('/check-location', async function (req, res, next) {
  req.user = req.user || req.query.uid || '64469189880b866621b40eeb' //'6444b5a30dc68dc4fd63a1ea'
  console.log(req.query)
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '檢查地址(取得經緯度)'
   */
  /**
    #swagger.security=[{"jwt": []}],
    #swagger.parameters['address'] = {
      in: 'query',
      description: '完整地址',
      schema: {
        'address': '台北市信義區市府路45號'
      }
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

module.exports = router
