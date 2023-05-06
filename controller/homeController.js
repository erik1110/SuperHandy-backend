const mongoose = require('mongoose');
const moment = require('moment');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Task = require('../models/taskModel');
const Review = require('../models/reviewModel');
const SuperhandyReview = require('../models/superhandyReviewModel');
const fakeExcellentHelperData = require('../service/fakeExcellentHelpers');

const home = {
    getCompeletedCases: handleErrorAsync(async (req, res, next) => {
        const tasks = await Task.find(
            {},
            {
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
                    latitude: '$location.latitude',
                },
                salary: 1,
            },
        );
        res.status(200).json(
            getHttpResponse({
                data: tasks,
                message: '取得成功',
            }),
        );
    }),
    getCompeletedReviews: handleErrorAsync(async (req, res, next) => {
        const reviews = await SuperhandyReview.find({})
            .populate({
                path: 'userId',
                select: 'lastName',
            })
            .select({
                comment: 1,
            });
        const formattedReviews = reviews.map((review) => ({
            _id: review._id,
            comment: review.comment,
            name: review.userId.lastName,
        }));
        res.status(200).json(
            getHttpResponse({
                data: formattedReviews,
                message: '取得成功',
            }),
        );
    }),
    getTaskStats: handleErrorAsync(async (req, res, next) => {
        const firstDayOfMonth = moment().startOf('month');
        const lastDayOfMonth = moment().endOf('month');

        const publishedFilter = {
            $and: [
                { 'time.publishedAt': { $gte: firstDayOfMonth.toDate() } },
                { 'time.publishedAt': { $lte: lastDayOfMonth.toDate() } },
            ],
        };

        const completedFilter = {
            $and: [
                { 'time.completedAt': { $gte: firstDayOfMonth.toDate() } },
                { 'time.completedAt': { $lte: lastDayOfMonth.toDate() } },
            ],
        };

        const publishedPipeline = [
            { $match: publishedFilter },
            { $group: { _id: null, count: { $sum: 1 } } },
        ];

        const completedPipeline = [
            { $match: completedFilter },
            { $group: { _id: null, count: { $sum: 1 } } },
        ];

        const [publishedResult, completedResult] = await Promise.all([
            Task.aggregate(publishedPipeline),
            Task.aggregate(completedPipeline),
        ]);

        const totalPublished = publishedResult.length
            ? publishedResult[0].count
            : 0;
        const totalCompleted = completedResult.length
            ? completedResult[0].count
            : 0;

        const output = {
            totalPublished,
            totalCompleted,
        };

        res.status(200).json(
            getHttpResponse({
                data: output,
                message: '取得成功',
            }),
        );
    }),
    getExcellentHelpers: handleErrorAsync(async (req, res, next) => {
        res.status(200).json(
            getHttpResponse({
                data: fakeExcellentHelperData,
                message: '取得成功',
            }),
        );
    }),
};

module.exports = home;
