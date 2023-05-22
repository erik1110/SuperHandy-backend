const Review = require('../models/reviewModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

const initReviews = async () => {
    const tasks = await Task.find().select('userId title');
    // const taskCase1 = tasks.find((task) => task.title === '急！幫忙代購王國之淚');
    // const taskCase2 = tasks.find((task) => task.title === '幫忙打王國之淚的Boss');
    const taskCase3 = tasks.find((task) => task.title === '陪我家狗玩');
    const taskCase4 = tasks.find((task) => task.title === '幫忙做畢業專題');
    const taskCase5 = tasks.find((task) => task.title === '協助居家清潔');
    const taskCase6 = tasks.find((task) => task.title === '陪我練習開車');
    const taskCase7 = tasks.find((task) => task.title === 'Notion 教學');
    const reviews = [
        {
            taskId: taskCase3._id,
            helper: {
                status: 'completed',
                star: 5,
                comment: '案主態度好，狗好很帶',
            },
            poster: {
                status: 'completed',
                star: 4,
                comment: '早上八點有點遲到，讓我等了十分鐘',
            },
            status: 'completed',
        },
        {
            taskId: taskCase4._id,
            helper: {
                status: 'completed',
                star: 2,
                comment: '這份工作太難，薪水太少了吧！',
            },
            poster: {
                status: 'completed',
                star: 4,
                comment: '寫得還差強人意，請加油',
            },
            status: 'completed',
        },
        {
            taskId: taskCase5._id,
            helper: {
                status: 'completed',
                star: 3,
                comment: '案主的家太髒亂了吧！',
            },
            poster: {
                status: 'completed',
                star: 5,
                comment: '很用心清潔，五星好評',
            },
            status: 'completed',
        },
        {
            taskId: taskCase6._id,
            helper: {
                status: 'completed',
                star: 5,
                comment: '原po人好美',
            },
            poster: {
                status: 'completed',
                star: 5,
                comment: '教練人好帥',
            },
            status: 'completed',
        },
        {
            taskId: taskCase7._id,
            helper: {
                status: 'completed',
                star: 2,
                comment: '學習力好差 有待加強',
            },
            poster: {
                status: 'completed',
                star: 1,
                comment: '教得好差 態度不好',
            },
            status: 'completed',
        },
    ];

    try {
        // 刪除現有的所有類別
        await Review.deleteMany();

        // 插入新的類別
        const insertedReviews = await Review.insertMany(reviews);

        // 將評論的 _id 插入到對應的任務中
        for (let i = 0; i < insertedReviews.length; i++) {
            const taskId = insertedReviews[i].taskId;
            const reviewId = insertedReviews[i]._id;
            await Task.updateOne({ _id: taskId }, { reviews: reviewId });
        }
        console.log('評論資料初始化成功');
    } catch (err) {
        console.error('評論資料初始化失敗', err);
    }
};

module.exports = initReviews;
