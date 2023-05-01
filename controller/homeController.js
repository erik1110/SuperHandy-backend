const mongoose = require('mongoose');
const { appError, handleErrorAsync} = require('../utils/errorHandler');
const getHttpResponse = require("../utils/successHandler");
const Category = require("../models/categoryModel");
const Plan = require("../models/planModel");

const home = {
  getCategories: handleErrorAsync(async (req, res, next) => {
    const categories = await Category.find({}, { _id: 0, name: 1, template: 1 });

    res.status(200).json(getHttpResponse({
      data: categories,
      message: "取得成功"
    }));
  }),
  getPlans: handleErrorAsync(async (req, res, next) => {
    const plans = await Plan.find({}, { _id: 0, title: 1, price: 1, items: 1});
    res.status(200).json(getHttpResponse({
      data: plans,
      message: "取得成功"
    }));
  }),
}

module.exports = home;