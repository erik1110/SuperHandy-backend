const Plan = require('../models/planModel');

const plans = [
    {
        title: '一般曝光',
        price: 20,
        items: ['無理由修改', '極速退點', '刊登時間30天'],
        expireDay: 30,
        isUrgent: false,
    },
    {
        title: '限時曝光',
        price: 30,
        items: ['無理由修改', '極速退點', '刊登時間7天', '手機端優先排序', '電腦端優先排序', '具有醒目急件標示'],
        expireDay: 7,
        isUrgent: true,
    },
    {
        title: '黃金曝光',
        price: 50,
        items: ['無理由修改', '極速退點', '刊登時間30天', '手機端優先排序', '電腦端優先排序', '具有醒目置頂標示'],
        expireDay: 30,
        isUrgent: false,
    },
    {
        title: '限時黃金曝光',
        price: 70,
        items: ['無理由修改', '極速退點', '刊登時間30天', '手機端優先排序', '電腦端優先排序', '具有醒目置頂標示', '具有醒目急件標示', '限時推薦專區'],
        expireDay: 7,
        isUrgent: true,
    },
];

const initPlans = async () => {
    try {
        // 刪除現有的所有類別
        await Plan.deleteMany();

        // 插入新的類別
        await Plan.insertMany(plans);

        console.log('曝光方案資料初始化成功');
    } catch (err) {
        console.error('曝光方案初始化失敗', err);
    }
};

module.exports = initPlans;
