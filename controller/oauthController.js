const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const User = require('../models/userModel');
const Validator = require('../service/userValidator');
const { generateJwtToken } = require('../middleware/auth');

const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, cb) => {
            return cb(null, profile);
        },
    ),
);

const oauth = {
    authenticate: handleErrorAsync(async (req, res, next) => {
        passport.authenticate('google', {
            scope: ['email', 'profile'],
        })(req, res, next);
    }),
    authenticateCallback: handleErrorAsync(async (req, res, next) => {
        const authenticate = () => {
            return new Promise((resolve, reject) => {
                passport.authenticate('google', { session: false }, (error, user) => {
                    if (error) {
                        return reject({
                            status: 500,
                            message: 'Passport authentication error',
                        });
                    }
                    if (!user) {
                        return reject({
                            status: 401,
                            message: 'Passport authentication failed',
                        });
                    }
                    resolve(user);
                })(req, res, next);
            });
        };
        let googleUser;
        googleUser = await authenticate();
        let newUser;
        let oauth_register;
        let _id;
        let token;
        const user = await User.findOne({ googleId: { $exists: true, $eq: googleUser.id } });
        if (!user) {
            oauth_register = false;
            try {
                newUser = await User.create({
                    email: googleUser._json.email,
                    googleId: googleUser.id,
                    nickname: googleUser.displayName,
                    avatarPath: googleUser._json.picture,
                    isVerifiedEmail: true,
                });
                _id = newUser._id;
            } catch (error) {
                if (error.code === 11000) {
                    const field = Object.keys(error.keyPattern)[0];
                    return next(appError(400, '40204', `此 ${field} 已被註冊`));
                } else if (error.message.includes('ValidationError')) {
                    return next(appError(400, '40101', '格式錯誤'));
                }
                return next(appError(400, '40205', '不明錯誤'));
            }
        } else if (!user.phone || !user.firstName || !user.lastName) {
            oauth_register = false;
            _id = user._id;
        } else {
            oauth_register = true;
            _id = user._id;
            token = await generateJwtToken(_id);
            if (token.length === 0) {
                return next(appError(400, '40300', 'token 建立失敗'));
            }
        }
        res.status(200).json(
            getHttpResponse({
                message: '第三方登入 - 取得 google 資訊',
                data: {
                    oauth_register: oauth_register,
                    token: token || null,
                    userId: _id,
                    nickname: googleUser.displayName,
                },
            }),
        );
    }),
    oauthSignUp: handleErrorAsync(async (req, res, next) => {
        const userId = req.params.userId;
        if (!mongoose.isValidObjectId(userId)) {
            return next(appError(400, '40104', 'Id 格式錯誤'));
        }
        const validatorResult = Validator.oauthSignUp(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const { firstName, lastName, phone } = req.body;
        const user = await User.findOne({ _id: userId });
        if (user) {
            try {
                await User.findByIdAndUpdate(user._id, {
                    firstName,
                    lastName,
                    phone,
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
        } else {
            return next(appError(400, '40201', '尚未註冊'));
        }
        const token = await generateJwtToken(userId);
        if (token.length === 0) {
            return next(appError(400, '40300', 'token 建立失敗'));
        }
        res.status(200).json(
            getHttpResponse({
                message: '第三方登入 google - 註冊',
                data: {
                    token,
                    id: userId,
                },
            }),
        );
    }),
};

module.exports = oauth;
