const mongoose = require('mongoose');
const { appError, handleErrorAsync} = require('../utils/errorHandler');
const getHttpResponse = require("../utils/successHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateJwtToken } = require("../middleware/auth");
const Validator = require("../service/validator");

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
      }),
  signIn: handleErrorAsync(async (req, res, next) => {

      }),
}

module.exports = users;