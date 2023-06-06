const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const User = require('../models/userModel');

const {
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
} = process.env;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const oauth = {
    authenticate: handleErrorAsync(async (req, res, next) => {
        passport.authenticate('google', {
            scope: ['email', 'profile'],
        })(req, res, next);
    }),
    authenticateCallback: handleErrorAsync(async (req, res, next) => {
        passport.authenticate('google', { session: false }, (err, user) => {
          if (err) {
            // 处理错误情况
            return next(err);
          }
          if (!user) {
            // 用户不存在或未通过验证
            return res.status(401).json({ status: false, message: 'Unauthorized' });
          }
          // 用户已通过验证
          res.send({
            status: true,
            data: {
              id: req.user.id,
              name: req.user.displayName
            }
          });
        })(req, res, next);
    }),
      
};

module.exports = oauth;
