const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { appError, handleErrorAsync} = require('../utils/errorHandler');
const getHttpResponse = require("../utils/successHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateJwtToken, generateJwtTokenForEmail } = require("../middleware/auth");
const Validator = require("../service/validator");
const validator = require("validator");
const mailer = require('../utils/mailer');

const users = {
  sendEmail: handleErrorAsync(async (req, res, next) => {
    const validatorResult = Validator.emailCheck(req.body);
    if (!validatorResult.status) {
      return next(appError(400, "40001", validatorResult.msg));
    }
    const { email } = req.body;



    await User.updateOne(
      { _id: user._id },
      { $inc: { loginCounts: 1 }, $set: { lastLoginAt: new Date() } }
    );
    res.status(200).json(getHttpResponse({
      data
    }));
  }),
  validateEmail: handleErrorAsync(async (req, res, next) => {
    try {
      const token = req.query.token;
      // 檢查 token 是否存在
      if (!token) {
        return res.status(401).send('信箱驗證失敗');
      }
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
          err ? next(appError(400, "40003", "信箱驗證失敗")) : resolve(payload);
        });
      });
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(appError(400, "40010", "信箱驗證失敗"));
      } else if (currentUser.isVerifiedEmail) {
        return next(appError(400, "40011", "信箱驗證失敗"));
      } else {
        // 在這裡執行用戶驗證的邏輯，將用戶的 isVerifiedEmail 屬性設置為 true
        await User.updateOne(
          { _id: decoded.id },
          { $set: { isVerifiedEmail: true } }
        );
      }

      // 返回 HTML 頁面，顯示驗證成功的信息
      return res.send(`
        <html>
          <head>
            <title>驗證成功</title>
          </head>
          <body>
            <h1>恭喜！您的帳戶已經成功驗證。</h1>
            <p>您現在可以 <a href="/login">登入</a> 您的帳戶。</p>
          </body>
        </html>
      `);
    } catch (err) {
      console.error(err);
      return res.status(500).send('伺服器忙碌中，請稍後再試試');
    }
    }), 
  signUpEmail: handleErrorAsync(async (req, res, next) => {
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
      const token = await generateJwtTokenForEmail(_id);
      if (token.length === 0) {
        return next(appError(400, "40003", "token 建立失敗"));
      }
      mailer(res, next, newUser, token);
    }),
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
      console.log(newUser);
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
      res.status(200).json(getHttpResponse({
        data
      }));
    }),
}

module.exports = users;