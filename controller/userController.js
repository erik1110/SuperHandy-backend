const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateJwtToken, generateJwtTokenForEmail } = require('../middleware/auth');
const Validator = require('../service/validator');
const validator = require('validator');
const mailer = require('../utils/mailer');

const users = {
    resendEmail: handleErrorAsync(async (req, res, next) => {
        const validatorResult = Validator.emailCheck(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const user = await User.findOne({ email: req.body.email }).select('+email');
        if (!user) {
            return res.status(200).json(
                getHttpResponse({
                    message: '信件已寄出',
                }),
            );
        } else if (user.isVerifiedEmail) {
            return next(appError(404, '40207', '已經驗證過了'));
        }

        const { _id } = user;
        const token = await generateJwtTokenForEmail(_id);
        if (token.length === 0) {
            return res.status(200).json(
                getHttpResponse({
                    message: '信件已寄出',
                }),
            );
        }
        mailer(res, next, user, token, 'verify');
    }),
    validateEmail: handleErrorAsync(async (req, res, next) => {
        try {
            const currentUser = req.user;
            if (!currentUser) {
                return next(appError(400, '40206', '信箱驗證失敗'));
            } else if (currentUser.isVerifiedEmail) {
                return next(appError(400, '40207', '已經驗證過了'));
            } else {
                // 在這裡執行用戶驗證的邏輯，將用戶的 isVerifiedEmail 屬性設置為 true
                await User.updateOne({ _id: currentUser }, { $set: { isVerifiedEmail: true } });
            }

            // 返回 HTML 頁面，顯示驗證成功的信息
            res.status(201).json(
                getHttpResponse({
                    message: '信箱驗證成功',
                }),
            );
        } catch (err) {
            console.error(err);
            return res.status(500).send('系統錯誤，請稍後再試');
        }
    }),
    signUp: handleErrorAsync(async (req, res, next) => {
        const validatorResult = Validator.signUp(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        password = await bcrypt.hash(req.body.password, 12);
        const { email, firstName, lastName, phone, nickname } = req.body;
        let newUser = {};
        try {
            newUser = await User.create({
                email,
                password,
                firstName,
                lastName,
                phone,
                nickname,
            });
        } catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                return next(appError(400, '40204', `此 ${field} 已被註冊`));
            } else if (error.message.includes('ValidationError')) {
                return next(appError(400, '40101', '格式錯誤'));
            }
            return next(appError(400, '40205', '不明錯誤'));
        }
        const { _id } = newUser;
        const token = await generateJwtTokenForEmail(_id);
        if (token.length === 0) {
            return next(appError(400, '40300', 'token 建立失敗'));
        }
        mailer(res, next, newUser, token, 'verify');
    }),
    signIn: handleErrorAsync(async (req, res, next) => {
        const validatorResult = Validator.signIn(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const { account, password } = req.body;
        let isEmail = validator.isEmail(account);
        let user;
        if (isEmail) {
            user = await User.findOne({ email: account }).select('+password');
        } else {
            user = await User.findOne({ phone: account }).select('+password');
        }
        if (!user) {
            return next(appError(400, '40201', '尚未註冊'));
        }
        if (!user.isVerifiedEmail) {
            return next(appError(400, '40202', '尚未進行 email 驗證'));
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return next(appError(400, '40203', '您的密碼不正確'));
        }
        const { _id } = user;
        const token = await generateJwtToken(_id);
        if (token.length === 0) {
            return next(appError(400, '40300', 'token 建立失敗'));
        }
        const data = {
            token,
            id: _id,
        };
        res.status(200).json(
            getHttpResponse({
                data,
            }),
        );
    }),
    forgotPassword: handleErrorAsync(async (req, res, next) => {
        const validatorResult = Validator.emailCheck(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const user = await User.findOne({ email: req.body.email }).select('+email');
        if (!user) {
            return res.status(200).json(
                getHttpResponse({
                    message: '信件已寄出',
                }),
            );
        }

        const { _id } = user;
        const token = await generateJwtTokenForEmail(_id);
        if (token.length === 0) {
            return res.status(200).json(
                getHttpResponse({
                    message: '信件已寄出',
                }),
            );
        }
        await User.findByIdAndUpdate(user._id, { isForgotPassword: true });
        mailer(res, next, user, token, 'forget');
    }),
    forgotResetPassword: handleErrorAsync(async (req, res, next) => {
        const {
            user,
            body: { password, confirmPassword },
        } = req;

        const validatorResult = Validator.forgotPw({
            password,
            confirmPassword,
        });
        if (!validatorResult.status) {
            return next(appError(400, '40101', validatorResult.msg, next));
        }
        const users = await User.findOne({
            _id: user._id,
        }).select('+password');
        if (!users.isForgotPassword) {
            return next(appError(400, '40208', '無效的請求'));
        }
        const compare = await bcrypt.compare(password, users.password);
        if (compare) {
            return next(appError(400, '40209', '不可使用舊密碼'));
        }
        const newPassword = await bcrypt.hash(req.body.password, 12);
        await User.findByIdAndUpdate(user.id, {
            password: newPassword,
            isForgotPassword: false,
        });

        res.status(200).json(
            getHttpResponse({
                message: '更新密碼成功',
            }),
        );
    }),
    updatePassword: handleErrorAsync(async (req, res, next) => {
        const {
            user,
            body: { password, confirmPassword, oldPassword },
        } = req;
        const validatorResult = Validator.updatePw({
            password,
            confirmPassword,
            oldPassword,
        });
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg, next));
        }
        const users = await User.findOne({
            _id: user._id,
        }).select('+password');
        const compare = await bcrypt.compare(oldPassword, users.password);
        if (!compare) {
            return next(appError(400, '40210', '您的舊密碼不正確!'));
        }

        users.password = null;
        const newPassword = await bcrypt.hash(req.body.password, 12);
        await User.updateOne(
            {
                _id: user._id,
            },
            {
                password: newPassword,
            },
        );
        res.status(200).json(
            getHttpResponse({
                message: '更新密碼成功',
            }),
        );
    }),
};

module.exports = users;
