const SuperhandyReview = require('../models/superhandyReviewModel');
const User = require('../models/userModel');

const initReviews = async () => {
    const users = await User.find().select('email');
    const userCase1 = users.find((user) => user.email === 'user1@example.com');
    const userCase2 = users.find((user) => user.email === 'user2@example.com');
    const userCase3 = users.find((user) => user.email === 'user4@example.com');
    const superhandyReviews = [
        {
            userId: userCase1._id,
            comment: '個人物品多 之前透過此平台搜尋到 此清潔整理員工作時都會注意細節 每次需要時依舊還是會想要主動聯繫此清潔整理員',
        },
        {
            userId: userCase2._id,
            comment:
                '非常推薦使用超人幫手 自從使用超人幫手，才發現生活變得如此輕鬆和方便。它完成我許多瑣碎生活雜事，讓我專注於重要的事情，享受更輕鬆自在的生活！',
        },
        {
            userId: userCase3._id,
            comment: '一直以來都是超人幫手的愛用者，最近嘗試在這邊找到幫忙搬家的助手，想不到才半天就找到了！超快！',
        },
    ];

    try {
        // 刪除現有的所有類別
        await SuperhandyReview.deleteMany();

        // 插入新的類別
        await SuperhandyReview.insertMany(superhandyReviews);

        console.log('本平台的評論資料初始化成功');
    } catch (err) {
        console.error('本平台的評論資料初始化失敗', err);
    }
};

module.exports = initReviews;
