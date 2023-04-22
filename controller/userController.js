const mongoose = require('mongoose');
const { appError, handleErrorAsync} = require('../utils/handleError');
const validator = require('validator');
const Validator = require("../utils/validator");

const users = {
    signUp: handleErrorAsync(async (req, res, next) => {
        const validatorResult = Validator.signUp(req.body);
        if (!validatorResult.status) {
            return next(appError(400, "40001", validatorResult.msg));
        }
        const { email } = req.body;
        const user = await User.find({ email });
        if (user.length > 0) {
          return next(appError(400, "40002", "已註冊此用戶"));
        }
        res.status(201).json(getHttpResponse({
          message: "驗證成功"
        }));
      }),
}

module.exports = users;