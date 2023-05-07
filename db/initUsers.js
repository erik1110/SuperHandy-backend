const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const initUsers = async () => {
    try {
        // 刪除現有的所有類別
        await User.deleteMany({
            email: {
                $in: ['user1@example.com', 'user2@example.com', 'user3@example.com', 'chiayu@example.com', 'yunshan@example.com', 'weiyu@example.com'],
            },
        });
        const password = await bcrypt.hash('12345678', 12);
        const users = [
            {
                email: 'user1@example.com',
                password: password,
                firstName: '文方',
                lastName: '翁',
                phone: '0932345678',
                avatarPath: '',
                nickename: '小文',
                address: '',
                posterIntro: '我是公正黨文宣部副主任兼黨部發言人。',
                helperIntro: '',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: true,
                status: true,
                loginCounts: 10,
                lastLoginAt: new Date(),
            },
            {
                email: 'user2@example.com',
                password: password,
                firstName: '亞靜',
                lastName: '張',
                phone: '0923556789',
                avatarPath: '',
                nickename: '',
                address: '',
                posterIntro: '',
                helperIntro: '我可以幫你代購任何你需要的物品。',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: true,
                status: true,
                loginCounts: 5,
                lastLoginAt: new Date(),
            },
            {
                email: 'user3@example.com',
                password: password,
                firstName: '家鏡',
                lastName: '陳',
                phone: '0934567895',
                avatarPath: '',
                nickename: '',
                address: '',
                posterIntro: '',
                helperIntro: '',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: true,
                status: true,
                loginCounts: 0,
                lastLoginAt: null,
            },
            {
                email: 'chiayu@example.com',
                password: password,
                firstName: '佳宇',
                lastName: '林',
                phone: '0912775678',
                nickename: '小佳',
                address: '台北市大安區敦化南路二段',
                posterIntro: '我是一名設計師，擅長UI/UX設計。',
                helperIntro: '我是一名網頁工程師，熟悉Vue框架。',
                thirdPartyId: '1234567890',
                thirdPartyType: 'facebook',
                isVerifiedEmail: true,
                status: true,
                loginCounts: 5,
                lastLoginAt: new Date('2022-04-30T12:34:56'),
                createdAt: new Date('2022-04-15T00:00:00'),
                updatedAt: new Date('2022-04-30T12:34:56'),
            },
            {
                email: 'yunshan@example.com',
                password: password,
                firstName: '芸珊',
                lastName: '葉',
                phone: '0923467989',
                nickename: '小珊',
                address: '新北市三峽區',
                posterIntro: '我是一名插畫家，繪畫風格清新可愛。',
                helperIntro: '我是一名資料分析師，精通Python語言。',
                thirdPartyId: '0987654321',
                thirdPartyType: 'google',
                isVerifiedEmail: true,
                status: true,
                loginCounts: 10,
                lastLoginAt: new Date('2022-04-30T12:34:56'),
                createdAt: new Date('2022-04-20T00:00:00'),
                updatedAt: new Date('2022-04-30T12:34:56'),
            },
            {
                email: 'weiyu@example.com',
                password: password,
                firstName: '瑋宇',
                lastName: '陳',
                phone: '0919694069',
                nickename: '小瑋',
                address: '台中市南區',
                posterIntro: '我是一名攝影師，喜歡捕捉生活中的美好瞬間。',
                helperIntro: '我是一名資訊工程師，熟悉Java開發。',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: false,
                status: true,
                loginCounts: 2,
                lastLoginAt: new Date('2022-04-29T18:23:45'),
                createdAt: new Date('2022-04-25T00:00:00'),
                updatedAt: new Date('2022-04-29T18:23:45'),
            },
        ];

        // 插入新的類別
        await User.insertMany(users);
        console.log('使用者資料初始化成功');
    } catch (err) {
        console.error('使用者資料初始化失敗', err);
    }
};

module.exports = initUsers;
