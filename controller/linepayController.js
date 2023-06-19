const axios = require('axios');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const { createLinePayBody, createSignature } = require('../service/linePay.js');
const User = require('../models/userModel');
const UserTrans = require('../models/userTransModel');
const moneyValidator = require('../service/moneyValidator');
const getHttpResponse = require('../utils/successHandler');

// 環境變數
const {
    LINEPAY_CHANNEL_ID,
    LINEPAY_RETURN_HOST,
    LINEPAY_SITE,
    LINEPAY_VERSION,
    LINEPAY_CHANNEL_SECRET_KEY,
    LINEPAY_RETURN_CONFIRM_URL,
    LINEPAY_RETURN_CANCEL_URL,
} = process.env;

const linepay = {
    paymentRequest: handleErrorAsync(async (req, res, next) => {
        const validatorResult = moneyValidator.checkPurchasePlan(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const money = req.body.money;
        const purchasePlan = { 100: 0, 500: 50, 1000: 200 };
        let desc = ['購買點數'];
        if (purchasePlan[money] > 0) {
            desc.push('點數贈送');
        }
        const time = parseInt(new Date().getTime() / 1000);
        const orderId = req.user._id + '-' + time.toString();
        const order = {
            amount: money,
            currency: 'TWD',
            orderId: orderId,
            packages: [
                {
                    id: 'products_1',
                    amount: money,
                    products: [
                        {
                            name: '儲值超人幣',
                            quantity: 1,
                            price: money,
                        },
                    ],
                },
            ],
        };
        // 建立 LINE Pay 請求規定的資料格式
        const linePayBody = createLinePayBody(order);
        // CreateSignature 建立加密內容
        const uri = '/payments/request';
        const headers = createSignature(uri, linePayBody);
        // API 位址
        const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
        const linePayRes = await axios.post(url, linePayBody, { headers });
        // 請求成功...
        if (linePayRes?.data?.returnCode === '0000') {
            let desc = ['linepay 購買點數'];
            const purchasePlan = { 100: 0, 500: 50, 1000: 200 };
            if (purchasePlan[money] > 0) {
                desc.push('點數贈送');
            }
            // 新增一筆交易資訊
            const trans = await UserTrans.create({
                userId: req.user._id,
                tag: '系統儲值',
                superCoin: money,
                helperCoin: purchasePlan[money],
                desc: desc,
                linepay: {
                    orderId: orderId,
                    status: '等待交易中',
                },
                role: '系統',
            });
            res.status(200).json(
                getHttpResponse({
                    message: '建立 linepay 訂單成功',
                    data: {
                        redirectURL: linePayRes?.data?.info.paymentUrl.web,
                        orderId: orderId,
                    },
                }),
            );
        } else {
            return next(appError(400, '40402', 'linePay 訂單不存在'));
        }
    }),
    paymentConfirm: handleErrorAsync(async (req, res, next) => {
        const { transactionId, orderId } = req.query;
        const userTrans = await UserTrans.findOne({ 'linepay.orderId': orderId });
        // 建立 LINE Pay 請求規定的資料格式
        const uri = `/payments/${transactionId}/confirm`;
        const linePayBody = {
            amount: userTrans.superCoin,
            currency: 'TWD',
        };
        // CreateSignature 建立加密內容
        const headers = createSignature(uri, linePayBody);
        // API 位址
        const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
        const linePayRes = await axios.post(url, linePayBody, { headers });
        // 請求成功...
        if (linePayRes?.data?.returnCode === '0000') {
            const trans = await UserTrans.findOneAndUpdate({ 'linepay.orderId': orderId }, { $set: { 'linepay.status': '交易完成' } }, { new: true });
            // 更新使用者點數
            const user = await User.findOne({ _id: req.user._id });
            user.superCoin += trans.superCoin;
            user.helperCoin += trans.helperCoin;
            await user.save();
            res.status(200).json(
                getHttpResponse({
                    message: 'linepay 交易成功',
                }),
            );
        } else {
            await UserTrans.findOneAndUpdate({ 'linepay.orderId': orderId }, { $set: { 'linepay.status': '交易失敗' } }, { new: true });
            return next(appError(400, '40402', 'linePay 交易失敗'));
        }
    }),
    paymentStatus: handleErrorAsync(async (req, res, next) => {
        const orderId = req.params.orderId;
        const userTrans = await UserTrans.findOne({ 'linepay.orderId': orderId });
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: userTrans.linepay.status,
            }),
        );
    }),
};

module.exports = linepay;
