const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Notify = require('../models/notifyModel');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');

const statusDict = {
    draft: '草稿',
    published: '媒合中',
    inProgressed: '進行中',
    submitted: '進行中',
    confirmed: '已完成',
    completed: '已完成',
    unpublished: '已下架',
    deleted: '未成立',
};

const tasks = {
    getPostedTasksHist: handleErrorAsync(async (req, res, next) => {
        const userId = req.user._id;
        const tasks = await Task.aggregate([
            { $match: { userId: userId } },
            {
                $lookup: {
                  from: 'users',
                  localField: 'helpers.helperId',
                  foreignField: '_id',
                  as: 'helperDetails',
                  pipeline: [
                    { $project: { lastName: 1, firstName: 1 } }
                  ],
                },
              },
              {
                $project: {
                  title: 1,
                  'location.city': 1,
                  'location.dist': 1,
                  'location.address': 1,
                  salary: 1,
                  status: 1,
                  'time.createdAt': 1,
                  'time.publishedAt': 1,
                  'time.expiredAt': 1,
                  helpers: {
                    $filter: {
                      input: '$helpers',
                      as: 'helper',
                      cond: { $eq: ['$$helper.status', 'paired'] },
                    },
                  },
                  helperDetails: {
                    $arrayElemAt: ['$helperDetails', 0],
                  },
                },
              },
        ]);
        const formattedTasks = tasks.map((task) => ({
            title: task.title,
            status: statusDict[task.status] || task.status,
            salary: task.salary,
            address: `${task.location.city}${task.location.dist}${task.location.address}`,
            createdAt: task.time.createdAt,
            publishedAt: task.time.publishedAt,
            expiredAt: task.time.expiredAt,
            helpers: task.helperDetails ? `${task.helperDetails.lastName}${task.helperDetails.firstName}` : '',
        }));
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedTasks,
            }),
        );
    }),
 };

module.exports = tasks;
