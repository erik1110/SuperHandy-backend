const Task = require('../models/taskModel');
const User = require('../models/userModel');

const initTasks = async () => {
  const users = await User.find().select('email');
  const userCase1 = await User.findOne({ email: 'user1@example.com' }).select('lastName firstName phone');
  console.log(userCase1)
  const tasks = [
    {
      userId: userCase1._id,
      status: 'completed',
      title: '陪我家狗玩',
      category: '寵物陪伴',
      description: '我家有黃金獵犬，但我這禮拜很忙，請幫我 2/20 早上 8 點來歌唱大樓找我，並帶他去附近公園陪他散步',
      salary: 300,
      exposurePlan: '黃金曝光',
      imgUrls: ["https://example.com/dog.jpg"],
      contactInfo: {
        name: userCase1.lastName + userCase1.firstName,
        phone: userCase1.phone,
        email: userCase1.email
      },
      location: {
        city: "台北市",
        dist: "松山區",
        address: "復興北路15號",
        landmark: "歌唱大樓",
        longitude: 121.53868,
        latitude: 25.02697
      },
      isUrgent: true,
      time: {
        createAt: new Date("2023-01-30T12:34:56"),
        updateAt: new Date("2022-02-23T08:19:50"),
        publishedAt: new Date("2022-02-15T13:34:56"),
        unpublishedAt: null,
        deletedAt: null,
        inProgressAt: new Date("2022-02-16T13:34:56"),
        submittedAt: new Date("2022-02-17T13:55:56"),
        confirmedAt: new Date("2022-02-19T19:15:50"),
        completedAt: new Date("2022-02-23T08:19:50"),
        expiredAt: null
      },
      submmitInfo: {
        imgUrls: [
          "https://example.com/images/report1.jpg",
          "https://example.com/images/report2.jpg"
        ],
        comment: "你家的狗很乖很聽話",
        submittedAt: new Date("2022-02-17T13:55:56"),
      }
    },
  ];

  try {
    // 刪除現有的所有類別
    await Task.deleteMany();

    // 插入新的類別
    await Task.insertMany(tasks);

    console.log('任務資料初始化成功');
  } catch (err) {
    console.error('任務資料初始化失敗', err);
  }
};

module.exports = initTasks;
