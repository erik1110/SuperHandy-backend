const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const initCategories = require('../service/initCategories');
const initPlans = require('../service/initPlans');
const initTasks = require('../service/initTasks');
const initReviews = require('../service/initReviews');
const initUsers = require('../service/initUsers');
const initSuperhandyReviews = require('../service/initSuperhandyReviews');

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD,
);

mongoose
    .connect(DB)
    .then(async () => {
        console.log('資料庫連接成功');
        await initCategories();
        await initPlans();
        await initUsers();
        await initTasks();
        await initReviews();
        await initSuperhandyReviews();
    })
    .catch((err) => console.error('資料庫連接失敗', err));
