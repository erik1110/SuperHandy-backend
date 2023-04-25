const mongoose = require('mongoose');
const { appError, handleErrorAsync} = require('../utils/errorHandler');
const getHttpResponse = require("../utils/successHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateJwtToken } = require("../middleware/auth");
const Validator = require("../service/validator");
const validator = require("validator");
const mailer = require('../utils/mailer');

const users = {
    signUp: handleErrorAsync(async (req, res, next) => {
        const validatorResult = Validator.signUp(req.body);
        if (!validatorResult.status) {
          return next(appError(400, "40001", validatorResult.msg));
        }
        password = await bcrypt.hash(req.body.password, 12);
        const { email, firstName, lastName, phone, nickName } = req.body;
        let newUser = {};
        try {
          newUser = await User.create({
            email,
            password,
            firstName,
            lastName,
            phone,
            nickName
          });
        } catch (error) {
          if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return next(appError(400, "40011", `此 ${field} 已被註冊`));
          } else if (error.message.includes('ValidationError')){
            return next(appError(400, "40001", "格式錯誤"));
          }
          return next(appError(400, "40005", "不明錯誤"));
        }
        const { _id } = newUser;
        const token = await generateJwtToken(_id);
        if (token.length === 0) {
          return next(appError(400, "40003", "token 建立失敗"));
        }
        const data = {
          token,
          "id": _id
        };
        res.status(200).json(getHttpResponse({
          data
        }));
        // const { verification } = await Verification.create({
        //   userId: user._id,
        //   verification: (Math.floor(Math.random() * 90000) + 10000).toString()
        // });
        // user.email = 'oceanuheart@gmail.com'
        // mailer(res, next, user, verification);

      }),
  signIn: handleErrorAsync(async (req, res, next) => {
      const validatorResult = Validator.signIn(req.body);
      if (!validatorResult.status) {
        return next(appError(400, "40001", validatorResult.msg));
      }
      const { account, password } = req.body;
      let isEmail = validator.isEmail(account);
      let user
      if (isEmail) {
        user = await User.findOne({'email': account}).select("+password");
      } else {
        user = await User.findOne({'phone': account}).select("+password");;
      }
      if (!user) {
        return next(appError(400, "40010", "尚未註冊"));
      }
      if (!user.isVerifiedEmail) {
        return next(appError(400, "40010", "尚未進行 email 驗證"));
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return next(appError(400, "40002", "您的密碼不正確"));
      }
      const { _id } = user;
      const token = await generateJwtToken(_id);
      if (token.length === 0) {
        return next(appError(400, "40003", "token 建立失敗"));
      }
      const data = {
        token,
        "id": _id
      };
      await User.updateOne(
        { _id: user._id },
        { $inc: { loginCounts: 1 }, $set: { lastLoginAt: new Date() } }
      );
      res.status(200).json(getHttpResponse({
        data
      }));
    }),
}

module.exports = users;