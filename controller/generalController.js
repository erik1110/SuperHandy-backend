const mongoose = require('mongoose');
const { appError, handleErrorAsync} = require('../utils/errorHandler');
const getHttpResponse = require("../utils/successHandler");
const Category = require("../models/categoryModel");

const general = {
  getCategories: handleErrorAsync(async (req, res, next) => {
    const categories = await Category.find({}, { _id: 0, name: 1, template: 1 });

    res.status(200).json(getHttpResponse({
      data: categories,
      message: "取得成功"
    }));
  }),
}

module.exports = general;