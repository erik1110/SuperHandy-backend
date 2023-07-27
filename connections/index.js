const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const initCategories = require('../db/initCategories');
const initPlans = require('../db/initPlans');
const initTasks = require('../db/initTasks');
const initReviews = require('../db/initReviews');
const initNotify = require('../db/initNotify');
const initUsers = require('../db/initUsers');
const initTransactions = require('../db/initTransactions');
const initSuperhandyReviews = require('../db/initSuperhandyReviews');
const initChats = require('../db/initChats');

const DB = process.env.DATABASE
const INIT_DB = process.env.INIT_DB === 'true'; 
mongoose
    .connect(DB)
    .then(async () => {
        console.log('資料庫連接成功');
        if (INIT_DB) {
            console.log('初始化 DB');
            await initCategories.initCategories();
            await initPlans();
            await initUsers();
            await initTasks();
            await initTransactions();
            await initReviews();
            await initNotify();
            await initSuperhandyReviews();
            await initChats();
        }
    })
    .then(() => {
        if (process.env.NODE_ENV === 'dev') {
            console.log('API使用方式請參考: http://localhost:3000/api-doc');
        }
    })
    .catch((err) => console.error('資料庫連接失敗', err));
