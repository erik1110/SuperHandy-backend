const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const User = require('../models/userModel');
const UserTrans = require('../models/userTransModel');
const getExposurePlanPrices = require('../service/exposurePlan');

const initTransactions = async () => {
    try {
        const users = await User.find().select('email');
        const tasks = await Task.find();
        const userCase1 = users.find((user) => user.email === 'user1@example.com');
        const userCase2 = users.find((user) => user.email === 'user2@example.com');
        const userCase3 = users.find((user) => user.email === 'user4@example.com');
        const userCase4 = users.find((user) => user.email === 'user5@example.com');
        const userCase5 = users.find((user) => user.email === 'user6@example.com');
        const taskCase1 = tasks.find((task) => task.title === '急！幫忙代購王國之淚');
        const taskCase2 = tasks.find((task) => task.title === '幫忙打王國之淚的Boss');
        const taskCase3 = tasks.find((task) => task.title === '陪我家狗玩');
        const taskCase4 = tasks.find((task) => task.title === '幫忙做畢業專題');
        const taskCase5 = tasks.find((task) => task.title === '協助居家清潔');
        const taskCase6 = tasks.find((task) => task.title === '陪我練習開車');
        const taskCase7 = tasks.find((task) => task.title === 'Notion 教學');
        const taskTransactions = [
            {
                taskId: taskCase3._id,
                userId: userCase5._id,
                tag: '完成任務',
                salary: 300,
                exposurePlan: 0,
                platform: 30,
                superCoin: 270,
                helperCoin: 0,
                desc: ['薪資'],
                role: '幫手',
            },
            {
                taskId: taskCase4._id,
                userId: userCase1._id,
                tag: '完成任務',
                salary: 1300,
                exposurePlan: 0,
                platform: 130,
                superCoin: 1170,
                helperCoin: 0,
                desc: ['薪資'],
                role: '幫手',
            },
            {
                taskId: taskCase5._id,
                userId: userCase1._id,
                tag: '完成任務',
                salary: 666,
                exposurePlan: 0,
                platform: 67,
                superCoin: 599,
                helperCoin: 0,
                desc: ['薪資'],
                role: '幫手',
            },
            {
                taskId: taskCase6._id,
                userId: userCase1._id,
                tag: '完成任務',
                salary: 567,
                exposurePlan: 0,
                platform: 57,
                superCoin: 510,
                helperCoin: 0,
                desc: ['薪資'],
                role: '幫手',
            },
            {
                taskId: taskCase7._id,
                userId: userCase2._id,
                tag: '完成任務',
                salary: 999,
                exposurePlan: 0,
                platform: 100,
                superCoin: 899,
                helperCoin: 0,
                desc: ['薪資'],
                role: '幫手',
            },
        ];
        // 假交易資料，刊登用迴圈方式建立
        const taskCasesPublish = [];
        const taskCases = tasks;
        for (let i = 0; i < taskCases.length; i++) {
            const taskCase = taskCases[i];
            const taskData = {
                taskId: taskCase._id,
                userId: taskCase.userId,
                tag: '刊登任務',
                salary: taskCase.salary,
                exposurePlan: getExposurePlanPrices(taskCase.exposurePlan),
                platform: 0,
                superCoin: -taskCase.salary,
                helperCoin: -getExposurePlanPrices(taskCase.exposurePlan),
                desc: ['預扣薪水', taskCase.exposurePlan],
                role: '案主',
            };
            taskCasesPublish.push(taskData);
        }
        const userTransactions = [
            {
                userId: userCase1._id,
                tag: '系統儲值',
                superCoin: 5000,
                helperCoin: 1000,
                desc: ['購買點數', '點數贈送'],
                role: '系統',
            },
            {
                userId: userCase2._id,
                tag: '系統儲值',
                superCoin: 1000,
                helperCoin: 200,
                desc: ['購買點數', '點數贈送'],
                role: '系統',
            },
            {
                userId: userCase3._id,
                tag: '系統儲值',
                superCoin: 100,
                helperCoin: 0,
                desc: ['購買點數'],
                role: '系統',
            },
            {
                userId: userCase4._id,
                tag: '系統儲值',
                superCoin: 300,
                helperCoin: 0,
                desc: ['購買點數'],
                role: '系統',
            },
            {
                userId: userCase5._id,
                tag: '系統儲值',
                superCoin: 500,
                helperCoin: 50,
                desc: ['購買點數', '點數贈送'],
                role: '系統',
            },
        ];

        // 插入新的類別
        await TaskTrans.deleteMany({});
        await UserTrans.deleteMany({});
        await TaskTrans.insertMany(taskTransactions);
        await TaskTrans.insertMany(taskCasesPublish);
        await UserTrans.insertMany(userTransactions);
        console.log('交易資料初始化成功');
    } catch (err) {
        console.error('交易資料初始化失敗', err);
    }
};

module.exports = initTransactions;
