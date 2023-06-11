const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const UserTrans = require('../models/userTransModel');
const moneyValidator = require('../service/moneyValidator');
const reviewValidator = require('../service/reviewValidator');
const getHttpResponse = require('../utils/successHandler');
const { reviewStatusMapping, reviewStatusReverseMapping } = require('../service/statusMapping');

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
            'firstName lastName nickname email posterIntro helperIntro avatarPath location phone helperSkills -_id',
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
        const acceptedFields = ['firstName', 'lastName', 'nickname', 'location', 'posterIntro', 'helperIntro', 'helperSkills', 'avatarPath'];
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
            status: 'completed',
        });
        const posterData = await Task.find({
            userId: req.user._id,
            status: 'completed',
        }).populate({
            path: 'reviews',
            select: 'helper.star',
        });

        let ratingPoster;
        if (posterData.length === 0) {
            ratingPoster = null;
        } else {
            const totalStars = posterData.reduce((sum, task) => {
                if (task.reviews && task.reviews.helper && task.reviews.helper.star) {
                    return sum + task.reviews.helper.star;
                }
                return sum;
            }, 0);
            ratingPoster = Number((totalStars / posterData.length).toFixed(2));
        }
        const helperData = await Task.find({
            helpers: {
                $elemMatch: { helperId: req.user._id, status: 'paired' },
            },
            status: 'completed',
        }).populate({
            path: 'reviews',
            select: 'poster.star',
        });
        let ratingHelper;
        if (helperData.length === 0) {
            ratingHelper = null;
        } else {
            const totalStars = helperData.reduce((sum, task) => {
                if (task.reviews && task.reviews.helper && task.reviews.poster.star) {
                    return sum + task.reviews.poster.star;
                }
                return sum;
            }, 0);
            ratingHelper = Number((totalStars / helperData.length).toFixed(2));
        }
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
        let userTrans = await UserTrans.find({ userId: req.user._id });
        userTrans = userTrans.filter((trans) => {
            if (trans.linepay.status) {
                return trans.linepay.status === '交易完成';
            }
            return true;
        });
        const taskTrans = await TaskTrans.find({ userId: req.user._id });
        const formattedUserTrans = userTrans.map((trans) => {
            return {
                tag: trans.tag,
                taskId: trans.taskId || null,
                taskName: trans.taskName || null,
                money: {
                    salary: trans.salary || 0,
                    exposurePlan: trans.exposurePlan || 0,
                    platform: trans.platform || 0,
                    superCoin: trans.superCoin || 0,
                    helperCoin: trans.helperCoin || 0,
                },
                desc: trans.desc || [],
                role: trans.role,
                createdAt: trans.createdAt,
            };
        });
        const formattedTaskTrans = taskTrans.map((trans) => {
            return {
                tag: trans.tag,
                taskId: trans.taskId,
                taskName: trans.taskName,
                money: {
                    salary: trans.salary || 0,
                    exposurePlan: trans.exposurePlan || 0,
                    platform: trans.platform || 0,
                    superCoin: trans.superCoin || 0,
                    helperCoin: trans.helperCoin || 0,
                },
                desc: trans.desc || [],
                role: trans.role,
                createdAt: trans.createdAt,
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
    purchasePoints: handleErrorAsync(async (req, res, next) => {
        const validatorResult = moneyValidator.checkPurchasePlan(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const user = await User.findOne({ _id: req.user._id });
        const money = req.body.money;
        const purchasePlan = { 100: 0, 500: 50, 1000: 200 };
        let desc = ['購買點數'];
        if (purchasePlan[money] > 0) {
            desc.push('點數贈送');
        }
        // 更新使用者點數
        user.superCoin += money;
        user.helperCoin += purchasePlan[money];
        await user.save();
        // 新增一筆交易資訊
        await UserTrans.create({
            userId: req.user._id,
            tag: '系統儲值',
            superCoin: money,
            helperCoin: purchasePlan[money],
            desc: desc,
            role: '系統',
        });
        res.status(200).json(
            getHttpResponse({
                message: '購買成功',
                data: {
                    superCoin: user.superCoin,
                    helperCoin: user.helperCoin,
                },
            }),
        );
    }),
    cashbackPoints: handleErrorAsync(async (req, res, next) => {
        const validatorResult = moneyValidator.checkCashback(req.body);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const user = await User.findOne({ _id: req.user._id });
        const { point, bank, bankNo, bankAcct } = req.body;
        if (point >= user.superCoin) {
            return next(appError(400, '40211', `超人幣不足： ${user.superCoin}`));
        }
        // 更新使用者點數
        user.superCoin -= point;
        await user.save();
        // 新增一筆交易資訊
        await UserTrans.create({
            userId: req.user._id,
            tag: '取出點數',
            superCoin: -point,
            helperCoin: 0,
            desc: [bank, bankNo, bankAcct.slice(-5)],
            bank: {
                bank: bank,
                bankNo: bankNo,
                bankAcct: bankAcct,
            },
            role: '系統',
        });
        res.status(200).json(
            getHttpResponse({
                message: '返還成功',
                data: {
                    superCoin: user.superCoin,
                    helperCoin: user.helperCoin,
                },
            }),
        );
    }),
    getReviewHistory: handleErrorAsync(async (req, res, next) => {
        const validatorResult = reviewValidator.checkReview(req.query);
        if (!validatorResult.status) {
            return next(appError(400, '40102', validatorResult.msg));
        }
        const userId = req.user._id;
        let { role, categories, reviewStatus, yourStar, limit, page } = req.query;
        categories = categories ? categories.split(',') : [];
        limit = Number(limit) || 10;
        page = Number(page) || 1;
        if (page <= 0) {
            page = 1;
        }
        if (limit <= 0) {
            limit = 10;
        } else if (limit > 100) {
            limit = 100;
        }
        if (role === '案主') {
            query = { 'poster.posterId': userId };
            if (yourStar) {
                query['helper.star'] = { $eq: Number(yourStar) };
            }
            if (reviewStatus) {
                query['poster.status'] = reviewStatusReverseMapping[reviewStatus];
            }
        } else if (role === '幫手') {
            query = { 'helper.helperId': userId };
            if (yourStar) {
                query['poster.star'] = { $eq: Number(yourStar) };
            }
            if (reviewStatus) {
                query['helper.status'] = reviewStatusReverseMapping[reviewStatus];
            }
        }
        const reviews = await Review.find(query)
            .populate({
                path: 'taskId',
                select: 'title category salary time location imgUrls',
            })
            .populate({
                path: 'poster.posterId',
                select: 'lastName firstName',
            })
            .populate({
                path: 'helper.helperId',
                select: 'lastName firstName',
            });
        const formattedReviews = reviews.map((review) => {
            const yourStar = role === '案主' ? review.helper.star : review.poster.star;
            return {
                yourStar: yourStar || null,
                category: review.taskId.category,
                title: review.taskId.title,
                address: review.taskId.location.address,
                salary: review.taskId.salary,
                helper: review.helper.helperId ? `${review.helper.helperId.lastName}${review.helper.helperId.firstName}` : '',
                publishedAt: review.taskId.time.publishedAt,
                helperReview: {
                    star: review.helper.star,
                    status: reviewStatusMapping[review.helper.status],
                    comment: review.helper.comment,
                },
                posterReview: {
                    star: review.poster.star,
                    status: reviewStatusMapping[review.poster.status],
                    comment: review.poster.comment,
                },
                taskId: review.taskId._id,
                imgUrls: review.taskId.imgUrls || null,
            };
        });
        const filterCategory = categories.length > 0 ? categories : null;
        const filteredReviews = filterCategory ? formattedReviews.filter((review) => filterCategory.includes(review.category)) : formattedReviews;
        const filteredReviewSlice = filteredReviews.slice((page - 1) * limit, page * limit);
        const totalCount = filteredReviews.length;
        const totalPages = Math.ceil(totalCount / limit);
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: {
                    reviews: filteredReviewSlice,
                    totalPages: totalPages,
                    totalCount: totalCount,
                },
            }),
        );
    }),
    getStarCounts: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const role = req.query.role;
        let starCountMap;
        if (role === '案主') {
            const aggregateQuery = [
                { $match: { 'poster.posterId': userId } },
                {
                    $group: {
                        _id: '$helper.star',
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        star: '$_id',
                        count: 1,
                    },
                },
            ];
            const starCounts = await Review.aggregate(aggregateQuery);
            // 轉換成以星星數為鍵、計數為值的物件
            starCountMap = starCounts.reduce((acc, { star, count }) => {
                acc[star] = count;
                return acc;
            }, {});
        } else if (role === '幫手') {
            const aggregateQuery = [
                { $match: { 'helper.helperId': userId } },
                {
                    $group: {
                        _id: '$poster.star',
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        star: '$_id',
                        count: 1,
                    },
                },
            ];
            const starCounts = await Review.aggregate(aggregateQuery);
            console.log(starCounts);
            // 轉換成以星星數為鍵、計數為值的物件
            starCountMap = starCounts.reduce((acc, { star, count }) => {
                acc[star] = count;
                return acc;
            }, {});
        } else {
            return next(appError(400, '40102', '缺少角色參數'));
        }
        // 補充未被評價的次數
        const starRatings = [null, 1, 2, 3, 4, 5];
        for (const starRating of starRatings) {
            starCountMap[starRating] = starCountMap[starRating] || 0;
        }
        // 計算平均
        const starRatings2 = [1, 2, 3, 4, 5];
        const totalReviews = starRatings2.reduce((total, starRating2) => total + starCountMap[starRating2], 0);
        const averageRating = totalReviews > 0 ? starRatings.reduce((sum, starRating) => sum + starRating * starCountMap[starRating], 0) / totalReviews : 0;
        starCountMap.avg = Number(averageRating.toFixed(2));

        // 計算全部加總
        starCountMap.totalCount = starRatings.reduce((total, starRating) => total + starCountMap[starRating], 0);
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: starCountMap,
            }),
        );
    }),
};

module.exports = accounts;
