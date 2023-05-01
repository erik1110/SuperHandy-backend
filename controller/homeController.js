const mongoose = require('mongoose');
const { appError, handleErrorAsync} = require('../utils/errorHandler');
const getHttpResponse = require("../utils/successHandler");
const Task = require("../models/taskModel");
const Review = require("../models/reviewModel");
const SuperhandyReview = require("../models/superhandyReviewModel");

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
    res.status(200).json(getHttpResponse({
      data: tasks,
      message: "取得成功"
    }));
  }),
  getCompeletedReviews: handleErrorAsync(async (req, res, next) => {
    const reviews = await SuperhandyReview.find({})
                    .populate({
                      path: 'userId',
                      select: 'lastName',
                    })
                    .select({
                      comment: 1,
                    })
    const formattedReviews = reviews.map(review => ({
        _id: review._id,
        comment: review.comment,
        name: review.userId.lastName,
    }));
    res.status(200).json(getHttpResponse({
      data: formattedReviews,
      message: "取得成功"
    }));
  }),
}

module.exports = home;