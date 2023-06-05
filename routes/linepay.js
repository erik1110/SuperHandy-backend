var express = require('express');
var router = express.Router();
const linepayController = require('../controller/linepayController');

/* 建立 LinePay 訂單 */
router.post('/payment', function (req, res, next) {
    /**
     * #swagger.tags = ['Money']
     * #swagger.summary = '建立 LinePay 訂單 (Create alinePay payment)'
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
      description: '建立 linepay 訂單成功',
      schema: { $ref: '#/definitions/paymentRequest' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
    linepayController.paymentRequest(req, res, next);
});
/* LinePay 確認支付 */
router.get('/confirm', function (req, res, next) {
    /**
     * #swagger.tags = ['Money']
     * #swagger.summary = 'LinePay 確認支付'
     */
    /**
  #swagger.responses[200] = {
    description: 'linepay 交易成功',
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    linepayController.paymentConfirm(req, res, next);
});

module.exports = router;
