const { handleErrorAsync, appError } = require('../utils/errorHandler');
const User = require('../models/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const devAuth = handleErrorAsync(async (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        // return next(appError(400, "40300", "你尚未登入"));
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                err ? next(appError(400, '40300', 'Token 驗證錯誤')) : resolve(payload);
            });
        });

        const currentUser = await User.findById(decoded.id);
        if (currentUser) {
            req.user = currentUser;
            return next();
        } else {
            return next(appError(400, '40010', '使用者不存在'));
        }
    } else {
        const accountId = req.query.accountId;
        const uid = req.query.uid;
        if (!uid && !accountId) {
            return next(appError(400, '40300', '查無此帳號'));
        }
        if (!!uid) {
            req.user = await User.findById(uid);
            if (req.user) {
                return next();
            }
        }
        let isEmail = validator.isEmail(accountId);
        if (isEmail) {
            req.user = await User.findOne({ email: accountId }).select('+password');
        } else {
            req.user = await User.findOne({ phone: accountId }).select('+password');
        }
        if (req.user) {
            return next();
        }
    }
    return next(appError(400, '40300', '查無此帳號'));
});

module.exports = {
    devAuth,
};
