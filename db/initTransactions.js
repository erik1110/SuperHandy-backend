const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const User = require('../models/userModel');
const UserTrans = require('../models/userTransModel');

const initTransactions = async () => {
    try {
        const users = await User.find().select('email');
        const tasks = await Task.find().select('userId');
        const userCase1 = users.find((user) => user.email === 'user1@example.com');
        const userCase2 = users.find((user) => user.email === 'user2@example.com');
        const userCase3 = users.find((user) => user.email === 'chiayu@example.com');
        const userCase4 = users.find((user) => user.email === 'yunshan@example.com');
        const userCase5 = users.find((user) => user.email === 'weiyu@example.com');
        const taskCase1 = tasks.find((task) => task.userId._id.equals(userCase1._id));
        const taskCase2 = tasks.find((task) => task.userId._id.equals(userCase2._id));
        const taskCase3 = tasks.find((task) => task.userId._id.equals(userCase3._id));
        const taskCase4 = tasks.find((task) => task.userId._id.equals(userCase4._id));
        const taskCase5 = tasks.find((task) => task.userId._id.equals(userCase5._id));
        await TaskTrans.deleteMany({
            _id: {
                $in: [taskCase1._id, taskCase2._id, taskCase3._id, taskCase4._id, taskCase5._id],
            },
        });
        await UserTrans.deleteMany({
            email: {
                $in: [userCase1._id, userCase2._id, userCase3._id, userCase4._id, userCase5._id],
            },
        });
        const taskTransactions = [
            {
                taskId: taskCase1._id,
                tag: '刊登任務',
                superCoin: -230,
                helperCoin: -100,
                desc: ['預扣薪水', '黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase2._id,
                tag: '刊登任務',
                superCoin: -900,
                helperCoin: -530,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase3._id,
                tag: '刊登任務',
                superCoin: -733,
                helperCoin: 0,
                desc: ['預扣薪水', '一般曝光'],
                role: '案主',
            },
            {
                taskId: taskCase4._id,
                tag: '刊登任務',
                superCoin: -500,
                helperCoin: -124,
                desc: ['預扣薪水', '限時曝光'],
                role: '案主',
            },
            {
                taskId: taskCase5._id,
                tag: '刊登任務',
                superCoin: -1000,
                helperCoin: -99,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase1._id,
                tag: '完成任務',
                superCoin: 300,
                helperCoin: 0,
                desc: ['薪資'],
                role: '幫手',
            },
            {
                taskId: taskCase2._id,
                tag: '完成任務',
                superCoin: 1300,
                helperCoin: 0,
                desc: ['薪資'],
                role: '案主',
            },
            {
                taskId: taskCase3._id,
                tag: '刊登任務',
                superCoin: 666,
                helperCoin: 0,
                desc: ['薪資'],
                role: '案主',
            },
            {
                taskId: taskCase4._id,
                tag: '刊登任務',
                superCoin: 567,
                helperCoin: -124,
                desc: ['薪資'],
                role: '案主',
            },
            {
                taskId: taskCase5._id,
                tag: '刊登任務',
                superCoin: 999,
                helperCoin: 0,
                desc: ['薪資'],
                role: '案主',
            },
        ];
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
        await TaskTrans.insertMany(taskTransactions);
        await UserTrans.insertMany(userTransactions);
        console.log('交易資料初始化成功');
    } catch (err) {
        console.error('交易資料初始化失敗', err);
    }
};

module.exports = initTransactions;
