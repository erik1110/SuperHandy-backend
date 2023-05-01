const mongoose = require('mongoose');
const { appError, handleErrorAsync} = require('../utils/errorHandler');
const getHttpResponse = require("../utils/successHandler");
const Task = require("../models/taskModel");

const home = { 
  getCompeletedCases: handleErrorAsync(async (req, res, next) => {
    const tasks = await Task.find({}, {
        title: 1,
        status: 1,
        createAt: '$time.createdAt',
        completedAt: '$time.completedAt',
        location: {
          city: '$location.city',
          dist: '$location.dist',
          address: '$location.address',
          landmark: '$location.landmark',
          longitude: '$location.longitude',
          latitude: '$location.latitude'
        },
        salary: 1
      }
    );
    
    // 印出結果檢查是否符合預期
    console.log(tasks);
    

    res.status(200).json(getHttpResponse({
      data: tasks,
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