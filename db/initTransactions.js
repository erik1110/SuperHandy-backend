const Task = require('../models/taskModel');
const TaskTrans = require('../models/taskTransModel');
const User = require('../models/userModel');
const UserTrans = require('../models/userTransModel');

const initTransactions = async () => {
    try {
        const users = await User.find().select('email');
        const tasks = await Task.find().select('userId title');
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
        const taskCase8 = tasks.find((task) => task.title === '兼職家教數學');
        const taskCase9 = tasks.find((task) => task.title === '需求短期家庭清潔工');
        const taskCase10 = tasks.find((task) => task.title === '需要網頁設計師');
        const taskCase11 = tasks.find((task) => task.title === '需求運動教練');
        const taskCase12 = tasks.find((task) => task.title === '需要翻譯人員');
        const taskCase13 = tasks.find((task) => task.title === '好想吃南部粽');
        const taskCase14 = tasks.find((task) => task.title === '李多慧後援會');
        const taskCase15 = tasks.find((task) => task.title === '蘋果發表會的產品試用心得');
        const taskCase16 = tasks.find((task) => task.title === '羽球教練');
        const taskCase17 = tasks.find((task) => task.title === '居家風水');
        const taskCase18 = tasks.find((task) => task.title === '幫忙洗車');
        const taskCase19 = tasks.find((task) => task.title === '吉他伴奏');
        const taskCase20 = tasks.find((task) => task.title === '日文家教');
        const taskCase21 = tasks.find((task) => task.title === 'line貼圖');
        const taskCase22 = tasks.find((task) => task.title === '一起唱歌');
        const taskCase23 = tasks.find((task) => task.title === '吃大餐');
        const taskCase24 = tasks.find((task) => task.title === '媽媽想學鋼琴');
        const taskCase25 = tasks.find((task) => task.title === '總統大選隨機詢問');
        const taskCase26 = tasks.find((task) => task.title === '烘焙證照');
        await TaskTrans.deleteMany({});
        await UserTrans.deleteMany({});
        const taskTransactions = [
            {
                taskId: taskCase13._id,
                userId: userCase3._id,
                tag: '刊登任務',
                salary: 1000,
                exposurePlan: 30,
                platform: 0,
                superCoin: -1000,
                helperCoin: -30,
                desc: ['預扣薪水', '限時曝光'],
                role: '案主',
            },
            {
                taskId: taskCase14._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 5000,
                exposurePlan: 30,
                platform: 0,
                superCoin: -5030,
                helperCoin: 0,
                desc: ['預扣薪水', '限時曝光'],
                role: '案主',
            },
            {
                taskId: taskCase15._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 3000,
                exposurePlan: 30,
                platform: 0,
                superCoin: -3000,
                helperCoin: -30,
                desc: ['預扣薪水', '限時曝光'],
                role: '案主',
            },
            {
                taskId: taskCase16._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 3600,
                exposurePlan: 30,
                platform: 0,
                superCoin: -3600,
                helperCoin: -30,
                desc: ['預扣薪水', '限時曝光'],
                role: '案主',
            },
            {
                taskId: taskCase17._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 2000,
                exposurePlan: 30,
                platform: 0,
                superCoin: -2000,
                helperCoin: -30,
                desc: ['預扣薪水', '限時曝光'],
                role: '案主',
            },
            {
                taskId: taskCase18._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 2500,
                exposurePlan: 70,
                platform: 0,
                superCoin: -2500,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase19._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 2500,
                exposurePlan: 70,
                platform: 0,
                superCoin: -2500,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase20._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 3300,
                exposurePlan: 70,
                platform: 0,
                superCoin: -3300,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase21._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 1800,
                exposurePlan: 70,
                platform: 0,
                superCoin: -1800,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase22._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 3000,
                exposurePlan: 70,
                platform: 0,
                superCoin: -3000,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase23._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 6666,
                exposurePlan: 70,
                platform: 0,
                superCoin: -6666,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase24._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 6666,
                exposurePlan: 70,
                platform: 0,
                superCoin: -6666,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase25._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 5555,
                exposurePlan: 20,
                platform: 0,
                superCoin: -5555,
                helperCoin: -20,
                desc: ['預扣薪水', '一般曝光'],
                role: '案主',
            },
            {
                taskId: taskCase26._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 600,
                exposurePlan: 20,
                platform: 0,
                superCoin: -600,
                helperCoin: -20,
                desc: ['預扣薪水', '一般曝光'],
                role: '案主',
            },
            {
                taskId: taskCase1._id,
                userId: userCase1._id,
                tag: '刊登任務',
                salary: 300,
                exposurePlan: 50,
                platform: 0,
                superCoin: -300,
                helperCoin: -50,
                desc: ['預扣薪水', '黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase2._id,
                userId: userCase1._id,
                tag: '刊登任務',
                salary: 500,
                exposurePlan: 50,
                platform: 0,
                superCoin: -500,
                helperCoin: -50,
                desc: ['預扣薪水', '黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase3._id,
                userId: userCase1._id,
                tag: '刊登任務',
                salary: 300,
                exposurePlan: 50,
                platform: 0,
                superCoin: -300,
                helperCoin: -50,
                desc: ['預扣薪水', '黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase4._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 1300,
                exposurePlan: 70,
                platform: 0,
                superCoin: -1300,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase5._id,
                userId: userCase3._id,
                tag: '刊登任務',
                salary: 666,
                exposurePlan: 20,
                platform: 0,
                superCoin: -666,
                helperCoin: -20,
                desc: ['預扣薪水', '一般曝光'],
                role: '案主',
            },
            {
                taskId: taskCase6._id,
                userId: userCase4._id,
                tag: '刊登任務',
                salary: 567,
                exposurePlan: 50,
                platform: 0,
                superCoin: -617,
                helperCoin: 0,
                desc: ['預扣薪水', '限時曝光'],
                role: '案主',
            },
            {
                taskId: taskCase7._id,
                userId: userCase5._id,
                tag: '刊登任務',
                salary: 999,
                exposurePlan: 70,
                platform: 0,
                superCoin: -1069,
                helperCoin: 0,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
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
            {
                taskId: taskCase8._id,
                userId: userCase2._id,
                tag: '刊登任務',
                salary: 400,
                exposurePlan: 50,
                platform: 0,
                superCoin: -400,
                helperCoin: -50,
                desc: ['預扣薪水', '黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase9._id,
                userId: userCase1._id,
                tag: '刊登任務',
                salary: 350,
                exposurePlan: 50,
                platform: 0,
                superCoin: -350,
                helperCoin: -50,
                desc: ['預扣薪水', '黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase10._id,
                userId: userCase1._id,
                tag: '刊登任務',
                salary: 600,
                exposurePlan: 50,
                platform: 0,
                superCoin: -600,
                helperCoin: -50,
                desc: ['預扣薪水', '黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase11._id,
                userId: userCase1._id,
                tag: '刊登任務',
                salary: 450,
                exposurePlan: 70,
                platform: 0,
                superCoin: -450,
                helperCoin: -70,
                desc: ['預扣薪水', '限時黃金曝光'],
                role: '案主',
            },
            {
                taskId: taskCase12._id,
                userId: userCase3._id,
                tag: '刊登任務',
                salary: 1550,
                exposurePlan: 30,
                platform: 0,
                superCoin: -1550,
                helperCoin: -30,
                desc: ['預扣薪水', '限時曝光'],
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
        await TaskTrans.deleteMany({});
        await UserTrans.deleteMany({});
        await TaskTrans.insertMany(taskTransactions);
        await UserTrans.insertMany(userTransactions);
        console.log('交易資料初始化成功');
    } catch (err) {
        console.error('交易資料初始化失敗', err);
    }
};

module.exports = initTransactions;
