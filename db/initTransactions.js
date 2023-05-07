const bcrypt = require('bcryptjs');
const Transaction = require('../models/TransactionModel');

const initTransactions = async () => {
    try {
        // 刪除現有的所有類別
        await Transaction.deleteMany({
            email: {
                $in: ['user1@example.com', 'user2@example.com', 'user3@example.com', 'chiayu@example.com', 'yunshan@example.com', 'weiyu@example.com'],
            },
        });

        const transactions = [
            {

            }
        ];

        // 插入新的類別
        await Transaction.insertMany(transactions);
        console.log('交易資料初始化成功');
    } catch (err) {
        console.error('交易資料初始化失敗', err);
    }
};

module.exports = initTransactions;
