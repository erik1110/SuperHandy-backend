const Review = require('../models/reviewModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

const initReviews = async () => {
  const users = await User.find().select('email');
  const tasks = await Task.find().select('userId');
  const userCase1 = users.find(user => user.email === 'user1@example.com')
  const taskCase1 = tasks.find(task => task.userId._id.equals(userCase1._id))
  const reviews = [
    {
      taskId: taskCase1._id,
      helper: {
        status: 'completed',
        star: 5,
        comment: '案主態度好，狗好很帶'
      },
      poster: {
        status: 'completed',
        star: 4,
        comment: '早上八點有點遲到，讓我等了十分鐘'
      }
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
      await Task.updateOne({ _id: taskId }, { $push: { reviews: reviewId } });
    }
    console.log('評論資料初始化成功');
  } catch (err) {
    console.error('評論資料初始化失敗', err);
  }
};

module.exports = initReviews;
