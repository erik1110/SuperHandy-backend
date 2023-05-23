var express = require('express');
var router = express.Router();
const accountController = require('../controller/accountController');

router.get('/profile', async function (req, res, next) {
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '取得使用者資料概要 (Summary of User Data)'
     */
    /**
    #swagger.security=[{"Bearer": []}],
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/getProfileSuccess' }
    }    
    */
    accountController.getProfile(req, res, next);
});
router.get('/info-form', async function (req, res, next) {
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '取得使用者表單資料 (Get User Form Data)'
     */
    /**
    #swagger.security=[{"Bearer": []}],
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/getInfoFormSuccess' }
    }    
    */
    accountController.getInfoForm(req, res, next);
});
router.patch('/info-form', async function (req, res, next) {
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '更新使用者表單資料 (Update User Form Data)'
     */
    /**
    #swagger.security=[{"Bearer": []}],
    /**
    #swagger.parameters['parameter'] = {
      in: 'body',
      description: '可更新部分欄位',
      schema: {
        'nickname': 'Erik',
        'firstName': 'Erik',
        'lastName': 'Chen',
        'email': 'erik@gmail.com',
        'phone': '0912345678',
        'address': '台北市',
        'posterIntro': '我是海報人',
        'helperIntro': '我是幫手人',
        'helperSkills':['人力派遣','市場調查'],
        'updatedAt': '2021-05-20T08:00:00.000Z'
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/updateInfoForm' }
    }
    #swagger.responses[404] = {
      description: 'Not Found',
      schema: {        
        'message':'查不到啦'
      }
    }
  */
    accountController.updateInfoForm(req, res, next);
});

/* 取得目前超人幣、幫手幣的餘額 */
router.get('/points', function (req, res, next) {
    /**
  * #swagger.tags = ['Account']
  * #swagger.summary = '取得目前超人幣、幫手幣的餘額 (Get the current balance of Super Coins and Helper Coins)'
  * #swagger.security = [{
      "Bearer": []
    }]
  */
    /**
  #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getPoints' }
  }
  #swagger.responses[400] = {
    description: 'Token 失敗',
    schema: { $ref: '#/definitions/ErrorToken' }
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
    accountController.getPoints(req, res, next);
});

/* 取得6組數字統計 */
router.get('/profile-stats', function (req, res, next) {
    /**
    * #swagger.tags = ['Account']
    * #swagger.summary = '取得6組數字統計 (Get user statistics figures)'
    * #swagger.security = [{
        "Bearer": []
      }]
    */
    /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getProfileStats' }
    }
    #swagger.responses[400] = {
      description: 'Token 失敗',
      schema: { $ref: '#/definitions/ErrorToken' }
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
    accountController.getProfileStats(req, res, next);
});

/* 點數歷史紀錄 */
router.get('/points/history', function (req, res, next) {
    /**
    * #swagger.tags = ['Account']
    * #swagger.summary = '點數歷史紀錄 (Get the history of points)'
    * #swagger.security = [{
        "Bearer": []
      }]
    */
    /**
    #swagger.responses[200] = {
      description: '取得成功',
      schema: { $ref: '#/definitions/getProfileStats' }
    }
    #swagger.responses[400] = {
      description: 'Token 失敗',
      schema: { $ref: '#/definitions/ErrorToken' }
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
    accountController.getPointsHistory(req, res, next);
});

/* 購買點數 */
router.post('/points/purchase', function (req, res, next) {
    /**
  * #swagger.tags = ['Account']
  * #swagger.summary = '購買點數 (Purchase the super coin)'
  * #swagger.security = [{
      "Bearer": []
    }]
  */
    /**
    #swagger.parameters['parameter_name'] = {
    in: 'body',
    schema: {
      $money: 500,
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '購買成功',
    schema: { $ref: '#/definitions/cashbackPoints' }
  }
  #swagger.responses[400] = {
    description: 'Token 失敗',
    schema: { $ref: '#/definitions/ErrorToken' }
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
    accountController.purchasePoints(req, res, next);
});

/* 返還現金 */
router.post('/points/cashback', function (req, res, next) {
    /**
  * #swagger.tags = ['Account']
  * #swagger.summary = '返還現金 (Refund in cash)'
  * #swagger.security = [{
      "Bearer": []
    }]
  */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    schema: {
      $point: 300,
      $bank: '台新銀行',
      $bankNo: '812',
      $bankAcct: '19011485059700'
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '返還成功',
    schema: { $ref: '#/definitions/cashbackPoints' }
  }
  #swagger.responses[400] = {
    description: 'Token 失敗',
    schema: { $ref: '#/definitions/ErrorToken' }
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
    accountController.cashbackPoints(req, res, next);
});

/* 查看評論的歷史紀錄 */
router.get('/comments', function (req, res, next) {
  /**
* #swagger.tags = ['Account']
* #swagger.summary = '查看評論的歷史紀錄 (Get review history)'
* #swagger.security = [{
    "Bearer": []
  }]
*/
/**
  #swagger.parameters['role'] = {
      in: 'query',
      description: '角色',
      type: 'string',
      enum: ['幫手', '案主'],
      default: '案主'
   }
  #swagger.parameters['categories'] = {in: 'query',description: '服務類別，可複選(使用,區隔) (沒有給參數代表全部)', default:  '寵物陪伴'},
  #swagger.parameters['reviewStatus'] = {
    in: 'query',
    description: '角色的評價狀態 (沒有給參數代表全部)',
    type: 'string',
    enum: ['待評價', '已評價'],
    default: '已評價'
  }
  #swagger.parameters['yourStar'] = {
  in: 'query',
  description: '你的星星數(1,2,3,4,5, 沒有給參數代表全部，沒評價也算在全部)',
  type: 'integer',
  enum: [1, 2, 3, 4, 5],
  default: 4
}
  #swagger.parameters['limit'] = {
  in: 'query',
  description: '每一頁的資料筆數(預設為10)',
  type: 'integer',
  default: 10
}
  #swagger.parameters['page'] = {
  in: 'query',
  description: '第幾頁(預設為1)',
  type: 'integer',
  default: 1
}
 #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getCommentsHist' }
}
#swagger.responses[400] = {
  description: 'Token 失敗',
  schema: { $ref: '#/definitions/ErrorToken' }
}
#swagger.responses[500] = {
  description: '系統錯誤',
  schema: { $ref: '#/definitions/Error500' }
}
*/
  accountController.getReviewHistory(req, res, next);
});

/* 查看評論的歷史紀錄 */
router.get('/comments', function (req, res, next) {
  /**
* #swagger.tags = ['Account']
* #swagger.summary = '查看評論的歷史紀錄 (Get review history)'
* #swagger.security = [{
    "Bearer": []
  }]
*/
/**
  #swagger.parameters['role'] = {
      in: 'query',
      description: '角色',
      type: 'string',
      enum: ['幫手', '案主'],
      default: '案主'
   }
  #swagger.parameters['categories'] = {in: 'query',description: '服務類別，可複選(使用,區隔) (沒有給參數代表全部)', default:  '寵物陪伴'},
  #swagger.parameters['reviewStatus'] = {
    in: 'query',
    description: '角色的評價狀態 (沒有給參數代表全部)',
    type: 'string',
    enum: ['待評價', '已評價'],
    default: '已評價'
  }
  #swagger.parameters['yourStar'] = {
  in: 'query',
  description: '你的星星數(1,2,3,4,5, 沒有給參數代表全部，沒評價也算在全部)',
  type: 'integer',
  enum: [1, 2, 3, 4, 5],
  default: 4
}
  #swagger.parameters['limit'] = {
  in: 'query',
  description: '每一頁的資料筆數(預設為10)，最多100',
  type: 'integer',
  default: 10
}
  #swagger.parameters['page'] = {
  in: 'query',
  description: '第幾頁(預設為1)',
  type: 'integer',
  default: 1
}
 #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getCommentsHist' }
}
  #swagger.responses[400] = {
    description: '欄位錯誤提示',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40102]',
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
  accountController.getReviewHistory(req, res, next);
});

/* 在評價頁面查看星星記數 */
router.get('/comments/starCounts', function (req, res, next) {
  /**
* #swagger.tags = ['Account']
* #swagger.summary = '在評價頁面查看星星記數 (View star counts on the review page)'
* #swagger.security = [{
    "Bearer": []
  }]
*/
/**
  #swagger.parameters['role'] = {
      in: 'query',
      description: '角色',
      type: 'string',
      enum: ['幫手', '案主'],
      default: '案主'
   }
 #swagger.responses[200] = {
    description: '取得成功',
    schema: { $ref: '#/definitions/getStarCounts' }
}
}
  #swagger.responses[400] = {
    description: '缺少角色參數',
    schema: {
      'status': 'false',
      'message': '錯誤訊息',
      'error': {
        'name': '[40102]',
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
  accountController.getStarCounts(req, res, next);
});

module.exports = router;
