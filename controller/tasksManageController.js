const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Notify = require('../models/notifyModel');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');

const statusMapping = {
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
              _id: 1,
              title: 1,
              'location.city': 1,
              'location.dist': 1,
              'location.address': 1,
              salary: 1,
              status: 1,
              'time.createdAt': 1,
              'time.publishedAt': 1,
              'time.expiredAt': 1,
              helperDetails: {
                $map: {
                  input: '$helpers',
                  as: 'helper',
                  in: {
                    $mergeObjects: [
                      '$$helper',
                      {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$helperDetails',
                              as: 'detail',
                              cond: { $eq: ['$$detail._id', '$$helper.helperId'] },
                            },
                          },
                          0
                        ]
                      }
                    ]
                  }
                }
              },
            },
          },
        ]);
        const formattedTasks = tasks.map((task) => {
          const pairedHelpers = task.helperDetails.filter((helper) => helper.status === 'paired');
          const helperNames = pairedHelpers.map((helper) => `${helper.lastName}${helper.firstName}`);
          return {
            taskId: task._id,
            title: task.title,
            status: statusMapping[task.status] || task.status,
            salary: task.salary,
            address: `${task.location.city}${task.location.dist}${task.location.address}`,
            createdAt: task.time.createdAt,
            publishedAt: task.time.publishedAt,
            expiredAt: task.time.expiredAt,
            helper: helperNames.join(','),
          };
        });
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedTasks,
            }),
        );
    }),
    getAppliedTasksHist: handleErrorAsync(async (req, res, next) => {
      const userId = req.user._id;
      const tasks = await Task.aggregate([
        {
          $match: {
            helpers: {
              $elemMatch: {
                helperId: userId,
                status: 'paired',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
            pipeline: [
              { $project: { lastName: 1, firstName: 1 } }
            ],
          },
        },
        {
          $project: {
            _id: 1,
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
            userDetails: {
              $arrayElemAt: ['$userDetails', 0],
            },
          },
        },
      ]);
      const formattedTasks = tasks.map((task) => {
        return {
          taskId: task._id,
          title: task.title,
          status: statusMapping[task.status] || '',
          salary: task.salary,
          address: `${task.location.city}${task.location.dist}${task.location.address}`,
          createdAt: task.time.createdAt,
          publishedAt: task.time.publishedAt,
          expiredAt: task.time.expiredAt,
          poster: `${task.userDetails.lastName}${task.userDetails.firstName}`,
        };
      });
      res.status(200).json(
          getHttpResponse({
              message: '取得成功',
              data: formattedTasks,
          }),
      );
  }),
  getTaskDetails: handleErrorAsync(async (req, res, next) => {
    const userId = req.user._id;
    const taskId = req.params.taskId;
    console.log("userId", userId)
    console.log("taskId", taskId)
    let role;
    if (!mongoose.isValidObjectId(taskId)) {
      return next(appError(400, '40104', 'Id 格式錯誤'));
    }
    // function isHelper(userId, helper) {
    //   return helper.helperId.toString() === userId.toString() && helper.status === 'paired';
    // }
    
    const tasks = await Task.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(taskId) } },
      {
        $lookup: {
          from: 'users',
          let: { helperIds: '$helpers.helperId' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$helperIds'] } } },
            { $project: { lastName: 1, firstName: 1 } }
          ],
          as: 'helperDetails'
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          'location.city': 1,
          'location.dist': 1,
          'location.address': 1,
          salary: 1,
          status: 1,
          'time.createdAt': 1,
          'time.publishedAt': 1,
          'time.expiredAt': 1,
          helpers: 1,
          helperDetails: {
            $arrayElemAt: ['$helperDetails', 0],
          },
        },
      },
    ]);
    
    
    // const isTaskOwner = task.userId.toString() === userId.toString();
    // const isTaskHelper = task.helpers.some((helper) => isHelper(userId, helper));
    
    // if (isTaskOwner) {
    //   role = '案主';
    // } else if (isTaskHelper) {
    //   role = '幫手';
    // } else {
    //   return next(appError(400, '40212', '查無此任務'));
    // }
    // const disallowedStatuses = ['draft', 'deleted'];

    // if (disallowedStatuses.includes(task.status)) {
    //   return next(appError(400, '40212', '查無此任務'));
    // }
    // const formattedTasks = tasks.map((task) => {
    //   return {
    //     taskId: task._id,
    //     publishedAt: task.time.publishedAt,
    //     helper:  task.helpers.
    //     title: task.title,
    //     status: statusMapping[task.status] || '',
    //     salary: task.salary,
    //     address: `${task.location.city}${task.location.dist}${task.location.address}`,
    //     createdAt: task.time.createdAt,
    //     publishedAt: task.time.publishedAt,
    //     expiredAt: task.time.expiredAt,
    //     poster: `${task.userDetails.lastName}${task.userDetails.firstName}`,
    //   };
    // });

    res.status(200).json(
        getHttpResponse({
            message: '取得成功',
            data: tasks,
        }),
    );
}),
 };

module.exports = tasks;
