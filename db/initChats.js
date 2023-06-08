const Task = require('../models/taskModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

const initChats = async () => {
    const userCase1 = await User.findOne({ email: 'user1@example.com' }).select('lastName firstName phone');
    const userCase2 = await User.findOne({ email: 'user2@example.com' }).select('lastName firstName phone');
    const userCase3 = await User.findOne({
        email: 'chiayu@example.com',
    }).select('lastName firstName phone');
    const userCase4 = await User.findOne({
        email: 'yunshan@example.com',
    }).select('lastName firstName phone');
    const userCase5 = await User.findOne({ email: 'weiyu@example.com' }).select('lastName firstName phone');
    const tasks = await Task.find().select('userId title');
    const taskCase1 = tasks.find((task) => task.title === '急！幫忙代購王國之淚'); //poster user1,helper user2,new Date('2023-05-17T13:34:56'),
    // const taskCase2 = tasks.find((task) => task.title === '幫忙打王國之淚的Boss');
    const taskCase3 = tasks.find((task) => task.title === '陪我家狗玩'); //poster user1,helper user5,new Date('2023-02-17T13:34:56'),
    const taskCase4 = tasks.find((task) => task.title === '幫忙做畢業專題'); //poster user2,helper user1,new Date('2023-05-13T09:00:00'),
    // const taskCase5 = tasks.find((task) => task.title === '協助居家清潔');
    const taskCase6 = tasks.find((task) => task.title === '陪我練習開車'); //poster user4,helper user1,new Date('2023-05-14T09:00:00'),
    // const taskCase7 = tasks.find((task) => task.title === 'Notion 教學');
    const chats = [
        {
            taskId: taskCase1._id,
            userId: userCase1._id,
            message: '哈囉，麻煩你幫我搶購王國之淚，我想當第一個救出公主的人！',
            createdAt: new Date('2023-05-16T13:35:30'),
        },
        {
            taskId: taskCase1._id,
            userId: userCase2._id,
            message: '沒問題，我是職業代購，放心交給我就好！',
            createdAt: new Date('2023-05-16T13:36:30'),
        },

        {
            taskId: taskCase3._id,
            userId: userCase5._id,
            message: '你好，我可以陪你家狗玩，請問你家狗狗的品種是什麼呢？',
            createdAt: new Date('2023-02-17T13:34:56'),
        },
        {
            taskId: taskCase3._id,
            userId: userCase1._id,
            message: '你好，我家狗狗是柴犬，請問你有養狗狗嗎？',
            createdAt: new Date('2023-02-17T13:35:56'),
        },
        {
            taskId: taskCase3._id,
            userId: userCase5._id,
            message: '有呀，我家的狗都會用湯匙吃飯，你家的狗狗會嗎？',
            createdAt: new Date('2023-02-17T13:36:56'),
        },
        {
            taskId: taskCase4._id,
            userId: userCase1._id,
            message: '你好，我可以幫你做畢業專題，請問你的專題是什麼呢？',
            createdAt: new Date('2023-05-13T09:01:00'),
        },
        {
            taskId: taskCase4._id,
            userId: userCase2._id,
            message: '你好，我的專題是做一個類似找打工的網站，請問你會寫網站嗎？',
            createdAt: new Date('2023-05-13T09:02:00'),
        },
        {
            taskId: taskCase4._id,
            userId: userCase1._id,
            message: '一塊小蛋糕',
            createdAt: new Date('2023-05-13T09:03:00'),
        },
        {
            taskId: taskCase6._id,
            userId: userCase1._id,
            message: '你好，我可以陪你練習開車，請問你想練習哪些部分呢？',
            createdAt: new Date('2023-05-17T13:35:56'),
        },
        {
            taskId: taskCase6._id,
            userId: userCase4._id,
            message: '我想練習倒車入庫。在開始練習之前，請你先去買保險',
            createdAt: new Date('2023-05-17T13:36:56'),
        },
        {
            taskId: taskCase6._id,
            userId: userCase1._id,
            message: '好的，我知道了',
            createdAt: new Date('2023-05-17T13:37:56'),
        },
        {
            taskId: taskCase6._id,
            userId: userCase4._id,
            message: '今天的練習很愉快，下次再見',
            createdAt: new Date('2023-05-17T13:38:56'),
        },
    ];

    try {
        // 刪除現有的全部聊天紀錄
        await Chat.deleteMany({});

        // 插入新的類別
        await Chat.insertMany(chats);

        console.log('聊天紀錄初始化成功');
    } catch (err) {
        console.error('聊天紀錄初始化失敗', err);
    }
};

module.exports = initChats;
