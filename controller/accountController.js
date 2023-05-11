const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const UserTrans = require('../models/userTransModel');
const getHttpResponse = require('../utils/successHandler');

const accounts = {
    getProfile: handleErrorAsync(async (req, res, next) => {
        const user = await User.findOne({ _id: req.user._id }).select('firstName lastName nickname email avatarPath');
        if (!user) {
            return next(appError(404, '40200', '查詢不到此用戶'));
        }
        return res.status(200).json(
            getHttpResponse({
                message: '查詢成功',
                data: user,
            }),
        );
    }),
    getInfoForm: handleErrorAsync(async (req, res, next) => {
        const userInfoForm = await User.findOne({ _id: req.user._id }).select(
            'firstName lastName nickname email posterIntro helperIntro avatarPath address phone helperSkills -_id',
        );
        if (!userInfoForm) {
            return next(appError(404, '40200', '查詢不到此用戶'));
        }
        return res.status(200).json(
            getHttpResponse({
                message: '查詢成功',
                data: userInfoForm,
            }),
        );
    }),
    updateInfoForm: handleErrorAsync(async (req, res, next) => {
        const updateFields = {};
        const acceptedFields = ['firstName', 'lastName', 'nickname', 'address', 'posterIntro', 'helperIntro', 'helperSkills'];
        const checkField = (field) => {
            if (req.body.hasOwnProperty(field)) {
                updateFields[field] = req.body[field];
            }
        };
        updateFields.updatedAt = new Date();
        acceptedFields.forEach(checkField);
        acceptedFields.push('email updatedAt phone -_id');
        const userInfoForm = await User.findOneAndUpdate({ _id: req.user._id }, updateFields, {
            new: true, // 返回更新後的 user 物件
            select: acceptedFields.join(' '), //'nickname phone address posterIntro helperIntro -email'
        });
        if (!userInfoForm) {
            return next(appError(404, '40200', '查詢不到此用戶'));
        }
        return res.status(200).json(
            getHttpResponse({
                message: '更新成功',
                data: userInfoForm,
            }),
        );
    }),
    getPoints: handleErrorAsync(async (req, res, next) => {
        const user = await User.findOne({ _id: req.user._id });
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: {
                    superCoin: user.superCoin,
                    helperCoin: user.helperCoin,
                },
            }),
        );
    }),
    getProfileStats: handleErrorAsync(async (req, res, next) => {
        const user = await User.findOne({ _id: req.user._id });
        const numOfPostTasks = await Task.countDocuments({
            userId: req.user._id,
        });
        const numOfCompletedTasks = await Task.countDocuments({
            helpers: { $elemMatch: { helperId: user._id, status: 'paired' } },
        });
        const posterData = await Task.find({
            userId: req.user._id,
            status: 'completed',
        }).populate({
            path: 'reviews',
            select: 'helper.star',
        });
        const posterScore = posterData.flatMap((task) => task.reviews.map((review) => review.helper.star));
        const ratingPoster = posterScore.length ? Number((posterScore.reduce((acc, val) => acc + val) / posterScore.length).toFixed(2)) : null;
        const helperData = await Task.find({
            helpers: {
                $elemMatch: { helperId: req.user._id, status: 'paired' },
            },
            status: 'completed',
        }).populate({
            path: 'reviews',
            select: 'poster.star',
        });
        const helperScore = helperData.flatMap((task) => task.reviews.map((review) => review.poster.star));
        const ratingHelper = helperScore.length ? Number((helperScore.reduce((acc, val) => acc + val) / helperScore.length).toFixed(2)) : null;
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: {
                    superCoin: user.superCoin,
                    helperCoin: user.helperCoin,
                    numOfPostTasks: numOfPostTasks,
                    numOfCompletedTasks: numOfCompletedTasks,
                    ratingPoster: ratingPoster,
                    ratingHelper: ratingHelper,
                },
            }),
        );
    }),
    getPointsHistory: handleErrorAsync(async (req, res, next) => {
        const userTrans = await UserTrans.find({ userId: req.user._id });
        const taskTrans = await TaskTrans.find({ userId: req.user._id });
        const formattedUserTrans = userTrans.map(trans => {
            return {
              tag: trans.tag,
              taskId: trans.taskId || null,
              taskName: trans.taskName || null,
              money: {
                salary: trans.salary || 0,
                exposurePlan: trans.exposurePlan || 0,
                platform: trans.platform || 0,
                superCoin: trans.superCoin || 0,
                helperCoin: trans.helperCoin || 0
              },
              desc: trans.desc || [],
              role: trans.role,
              createdAt: trans.createdAt
            };
        });
        const formattedTaskTrans = taskTrans.map(trans => {
            return {
              tag: trans.tag,
              taskId: trans.taskId,
              taskName: trans.taskName,
              money: {
                salary: trans.salary || 0,
                exposurePlan: trans.exposurePlan || 0,
                platform: trans.platform || 0,
                superCoin: trans.superCoin || 0,
                helperCoin: trans.helperCoin || 0
              },
              desc: trans.desc || [],
              role: trans.role,
              createdAt: trans.createdAt
            };
        });
        const result = formattedUserTrans.concat(formattedTaskTrans);
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: result,
            }),
        );
    }),
};

module.exports = accounts;
