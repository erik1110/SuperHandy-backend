const Notify = require('../models/notifyModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

const initNotify = async () => {
    try {
        // 刪除現有的所有類別
        await Notify.deleteMany({});
        const tasks = await Task.find().select('userId');
        const userCase1 = await User.findOne({ email: 'user1@example.com' }).select('lastName firstName phone');
        const userCase2 = await User.findOne({ email: 'user2@example.com' }).select('lastName firstName phone');
        const userCase3 = await User.findOne({ email: 'chiayu@example.com' }).select('lastName firstName phone');
        const userCase5 = await User.findOne({ email: 'weiyu@example.com' }).select('lastName firstName phone');
        const taskCase1 = tasks.find((task) => task.userId._id.equals(userCase1._id));

        const notify = [
            {
                userId: userCase5._id,
                tag: '幫手通知',
                read: true,
                description: '您媒合的任務：「陪我家狗玩 」成功，您可以進行任務囉！',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-16T13:34:56'),
            },
            {
                userId: userCase3._id,
                tag: '幫手通知',
                read: true,
                description: '您媒合的任務：「陪我家狗玩 」失敗',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-16T13:34:56'),
            },
            {
                userId: userCase2._id,
                tag: '幫手通知',
                read: true,
                description: '您媒合的任務：「陪我家狗玩 」失敗',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-16T13:34:56'),
            },
            {
                userId: userCase1._id,
                tag: '案主通知',
                read: true,
                description: '您媒合的任務：「陪我家狗玩 」成功，幫手可以進行任務囉！',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-16T13:34:56'),
            },
            {
                userId: userCase5._id,
                tag: '幫手通知',
                read: true,
                description: '您的任務：「陪我家狗玩 」已經提交驗收!',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-17T13:55:56'),
            },
            {
                userId: userCase1._id,
                tag: '案主通知',
                read: true,
                description: '您的任務：「陪我家狗玩 」幫手已提交驗收內容，請進行驗收',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-17T13:55:56'),
            },
            {
                userId: userCase5._id,
                tag: '幫手通知',
                read: true,
                description: '您的任務：「陪我家狗玩 」案主已驗收完成，後續系統將自動提撥款項，並請進行評價',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-19T19:15:50'),
            },
            {
                userId: userCase1._id,
                tag: '案主通知',
                read: false,
                description: '您的任務：「陪我家狗玩 」 已結案，後續系統將自動提撥款項給幫手，並請進行評價',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-19T19:15:50'),
            },
            {
                userId: userCase5._id,
                tag: '幫手通知',
                read: false,
                description: '您的任務：「陪我家狗玩 」，案主給您評價囉！',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-22T08:19:50'),
            },
            {
                userId: userCase1._id,
                tag: '案主通知',
                read: false,
                description: '您的任務：「陪我家狗玩 」 ，幫手給您評價囉！',
                taskId: taskCase1._id,
                createdAt: new Date('2022-02-23T08:19:50'),
            },
            {
                userId: userCase1._id,
                tag: '系統通知',
                read: false,
                description: '端午節點數大贈送，點我了解更多',
                createdAt: new Date('2023-05-15T08:19:50'),
            },
            {
                userId: userCase1._id,
                tag: '系統通知',
                read: false,
                description: '系統儲值成功',
                createdAt: new Date('2023-05-01T08:19:50'),
            },
        ];

        // 插入新的類別
        await Notify.insertMany(notify);
        console.log('通知資料初始化成功');
    } catch (err) {
        console.error('通知資料初始化失敗', err);
    }
};

module.exports = initNotify;
