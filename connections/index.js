const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const initCategories = require('../service/initCategories');
const initPlans = require('../service/initPlans');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(async () => {
    console.log('資料庫連接成功');
    await initCategories(); // 呼叫初始化類別的函式
    await initPlans(); // 呼叫初始化方案的函式
  })
  .catch(err => console.error('資料庫連接失敗', err));