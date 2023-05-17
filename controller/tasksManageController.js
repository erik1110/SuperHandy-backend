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
        const tasks = await Task.find({ userId: userId })
                    .populate({
                      path: 'helpers.helperId',
                      select: 'lastName firstName',
                    });
        const formattedData = tasks.map((task) => {
          const helper = task.helpers.find((helper) => helper.status === 'paired');
          const helperName = helper ? `${helper.helperId.lastName}${helper.helperId.firstName}` : '';
          return {
            title: task.title,
            status: statusMapping[task.status] || task.status,
            salary: task.salary,
            address: `${task.location.city}${task.location.dist}${task.location.address}`,
            createdAt: task.time.createdAt,
            publishedAt: task.time.publishedAt,
            expiredAt: task.time.expiredAt,
            helper: helperName,
          };
        });
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: formattedData,
            }),
        );
    }),
    getAppliedTasksHist: handleErrorAsync(async (req, res, next) => {
      const userId = req.user._id;
      const tasks = await Task.find({
        'helpers.helperId': userId,
        'helpers.status': 'paired',
      }).populate({
        path: 'userId',
        select: 'lastName firstName',
      });
      
      const formattedTasks = tasks.map((task) => {
        const posterName = task.userId ? `${task.userId.lastName}${task.userId.firstName}` : '';
      
        return {
          title: task.title,
          status: task.status,
          salary: task.salary,
          address: `${task.location.city}${task.location.dist}${task.location.address}`,
          createdAt: task.time.createdAt,
          publishedAt: task.time.publishedAt,
          expiredAt: task.time.expiredAt,
          poster: posterName,
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
    const task = await Task.findOne({ _id: taskId })
      .populate({
        path: 'helpers.helperId',
        select: 'lastName firstName',
      })
      .select('_id userId title location.city location.dist location.address salary status time.createdAt time.publishedAt time.expiredAt helpers');
    const isTaskOwner = task.userId.toString() === userId.toString();
    const isTaskHelper = task.helpers.some((helper) => {
      return helper.status === "paired" && helper.helperId._id === userId;
    });

    if (isTaskOwner) {
      role = '案主';
    } else if (isTaskHelper) {
      role = '幫手';
    } else {
      return next(appError(400, '40212', '查無此任務'));
    }
    // console.log(role)
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
            data: task,
        }),
    );
}),
 };

module.exports = tasks;
