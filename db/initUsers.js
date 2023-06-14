const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const initUsers = async () => {
    try {
        // 刪除現有的所有類別
        await User.deleteMany({});
        const password = await bcrypt.hash('12345678', 12);
        const users = [
            {
                email: 'user1@example.com',
                password: password,
                firstName: '文方',
                lastName: '翁',
                phone: '0932345678',
                avatarPath:
                    'https://storage.googleapis.com/superhandy.appspot.com/images/28613b4d-61b5-4b7c-9706-aac181adf707.jpg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=NujvEfpN%2Ftd7SUtE6nFx%2B5lntpR4W3UBdvjpzLMwTNujtqb9DujOyMI11KPdulHOmD%2BAiDGtDyfr2%2FMXo17xFo3zCF5Moe1o5P2y%2FsktBqK%2FhWCZoHLVN1LmOW8UlKv7Ioa6%2Bqq9Wa%2FSFkxrQy24D4KcA7wEqUyc2AllPOn%2B%2B3Mn6MGN80SleJN2r%2BEiV2zNs7UsfnGsbCO7FPmj3to%2F6jkxGGpAvfcJenBPmdFvsqvR2d3U%2FtauvCJjZwyN6yq9e%2FCpYd918lFbTw186udFEs5t01A1nWeTrB5NEZZjuFzOEe5DhlZk3Z5Pe3N%2BFGyMbi1Cy0XI%2F%2BmTx75yvZp9pA%3D%3D',
                nickname: '小文',
                location: {
                    city: '臺北市',
                    dist: '中正區',
                    address: '忠孝東路二段100號',
                },
                posterIntro: '我是公正黨文宣部副主任兼黨部發言人。',
                helperIntro: '',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: true,
                status: true,
                superCoin: 5000,
                helperCoin: 1000,
                loginCounts: 10,
                lastLoginAt: new Date(),
            },
            {
                email: 'user2@example.com',
                password: password,
                firstName: '亞靜',
                lastName: '張',
                phone: '0923556789',
                avatarPath: 'https://storage.googleapis.com/superhandy.appspot.com/images/f4f43a27-9be9-4787-9bd8-7006dbbd45d7.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=PeUiR1CzkJFKWB6vJmCVJVBVhU25olJT1MVd8qncdzS%2Bi0hBplBT64UgDKd%2F0v4JXAMIHEJPqpNiVch4wGN0oUVfyXsARGCTwPjGqAI7Auxyob2ALEnKw1CppiOTwM5F5Xq%2B%2Fu9Z%2BkOU0rc1QM01h0dN9hARItWQIAQ2PJKsEQb0OD67RmJAC%2Fr4kOKNGDU8HZgGMwFCZiymC1dJdL4mjU%2B8s418621YlISKWeccQ8azol5kUEMZU3v83KvJcHa2MFSoj0P3iMI8wnehXqOLg3ltIPHmoeKknGfjHo4TXMPzfpJ9IYylZqcndDRnZXhzS%2Fd0DKoKTftS0vJODbQsrQ%3D%3D',
                nickname: '',
                location: {
                    city: '臺北市',
                    dist: '中正區',
                    address: '重慶南路一段122號',
                },
                posterIntro: '',
                helperIntro: '我可以幫你代購任何你需要的物品。',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: true,
                status: true,
                superCoin: 1000,
                helperCoin: 200,
                loginCounts: 5,
                lastLoginAt: new Date(),
            },
            {
                email: 'user3@example.com',
                password: password,
                firstName: '家鏡',
                lastName: '陳',
                phone: '0934567895',
                avatarPath:
                    'https://storage.googleapis.com/superhandy.appspot.com/images/22a3d07b-0f4d-49e6-a10a-4ecc89bb41bd.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=msVmyLKR2AS0EiwiP0V7%2BRKAJZp9cP8B8Z0eY3ZCLIJPvb0Puebcq5A2rEyKQui3kWAvWORVAZE1W3natoJxsl1GVkktwhdiBxJLyV1CbPzZt6XKywKhn6qjmExUz3d8CRs9wexTQbPlQL628Osd2xNz2dIyTAu6EPmM5CEF8cCs0Ng4SgoLnKyatZmXYauWj7kiZrHIc3qrCxbAtsw1wcsAUwjrPUJUVuEv%2BCgX9c%2B16ReOz5iKxtT8sdQENB2tNyuDpzKkWp7o6S%2F2G7Z4bO0%2BD%2BZ%2B%2BAphNj%2BElEdj1v%2FKqLa53secKv%2BuXcIBX0chWOZCm05N6uc0z5dNuLOgnw%3D%3D',
                nickname: '',
                location: {
                    city: '臺北市',
                    dist: '信義區',
                    address: '基隆路300號',
                },
                posterIntro: '',
                helperIntro: '',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: true,
                status: true,
                superCoin: 0,
                helperCoin: 0,
                loginCounts: 0,
                lastLoginAt: null,
            },
            {
                email: 'user4@example.com',
                password: password,
                firstName: '省瑞',
                lastName: '都',
                phone: '0912775678',
                avatarPath:
                    'https://storage.googleapis.com/superhandy.appspot.com/images/e78929a7-c8e1-4bf8-a159-fabc0150a6cb.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=LXG84tZ0Wy2KZ6NtbeMu%2FPeF0fmANXzmhZEhob6cYfXLzBIzXiMvBYVc6N7GMZeSPandS7HAFRibEH1Q55TnaSuK7htvuvSJ2sgrV7NyUZCtRlJHP5OLe5yUVf8JsNseNnpbEgfjclUzwUwiDEaFkRvQ%2B5cLUAQF9Z4gwqAXdbynRIXuFYtbRj%2BJ1O8Lzrmu46WjdEFHDKybDdzhbr3gi49gHyYAS2T6P0LCIOhQZGq%2B0sKKAypoL8h1lMK0acuGhpucYC1BSDcC5S1G8QYWfy%2FK5isYeFkG7y3Ij4AY3Gj%2B5yeFuo%2FAvs7eiNIt1XrRHSJKOFPSfynFNW72nYMI3w%3D%3D',
                nickname: '阿滴',
                location: {
                    city: '臺北市',
                    dist: '信義區',
                    address: '松智路17號',
                },
                posterIntro: '我是一名設計師，擅長UI/UX設計。',
                helperIntro: '我是一名網頁工程師，熟悉Vue框架。',
                thirdPartyId: '1234567890',
                thirdPartyType: 'facebook',
                isVerifiedEmail: true,
                status: true,
                superCoin: 100,
                helperCoin: 0,
                loginCounts: 5,
                lastLoginAt: new Date('2022-04-30T12:34:56'),
                createdAt: new Date('2022-04-15T00:00:00'),
                updatedAt: new Date('2022-04-30T12:34:56'),
            },
            {
                email: 'user5@example.com',
                password: password,
                firstName: '冠伶',
                lastName: '都',
                phone: '0923467989',
                avatarPath:
                    'https://storage.googleapis.com/superhandy.appspot.com/images/431b34a0-b4f0-444c-885e-1ec199ba0888.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=YuQqn79ptErLX4UI5pvXhfOmKkttNilYEtWJtqc1KiRVT3A9gPLWhJ7w7NNz%2BZxsLZFTQscrKJAAhYs2FCQqY85pBrUlqpZl0Y574fNci718G39N7EiaVdFcIwwUYZmwbrqhBPq1Tf7JWwMETO8FISPd8%2BBgOBwJYhOElZjX0MyXZQxh1M9gR%2Bb3eOF70FwHQlF3iY2hRl5glb55hJ0khpeMF9E6nZDb5J1NfC%2BimFNvdhydTdmzD1LkXYgbiorlo8RFhQ3L1QCNlqumaBOgjsLTe6964ocT6BSrLy77clgiSyas%2B7ONKmB%2FkhrgvM1Dg2JcfeL8Qbs%2BSJtZkFPyXQ%3D%3D',
                nickname: '滴妹',
                location: {
                    city: '臺北市',
                    dist: '大安區',
                    address: '光復南路300號',
                },
                posterIntro: '我是一名插畫家，繪畫風格清新可愛。',
                helperIntro: '我是一名資料分析師，精通Python語言。',
                thirdPartyId: '0987654321',
                thirdPartyType: 'google',
                isVerifiedEmail: true,
                status: true,
                superCoin: 500,
                helperCoin: 50,
                loginCounts: 10,
                lastLoginAt: new Date('2022-04-30T12:34:56'),
                createdAt: new Date('2022-04-20T00:00:00'),
                updatedAt: new Date('2022-04-30T12:34:56'),
            },
            {
                email: 'user6@example.com',
                password: password,
                firstName: '雋明',
                lastName: '翁',
                phone: '0919694069',
                avatarPath:
                    'https://storage.googleapis.com/superhandy.appspot.com/images/462e9834-4a26-4841-815e-22c1ada96559.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=eOy4SRQ9yXsroLNtRXSYxU6vMxXYkCemp6TBO5F%2B4%2BcTbN7zH0Dy%2BB4D3mZqow8gJg%2FDy8tc2DVU6tecJaANReIKF5gaphDeUv01BKP40bByX1wcuIerz%2FRoaIbkeTONJlsfhN5zGOVcrldmD%2F%2BgRlOOj2o9qTnGH7I3OrMCTYbBKyxJVggkuapTYhwbgvNl70FbIITfc5GebRr%2FXuxsZpLhBXM64dLKAXeRVyFIHrV1fgNwjCRdkQ%2BuNLPMGzjIq0ms8vj%2Fz8q6XLueANfmVbDOgSij2cUvjzQkUJpI%2BWfH0L9XRiUSIoDkPuLAZFuraCasfOdEXfoKsryfEQNKgQ%3D%3D',
                nickname: 'Joeman',
                location: {
                    city: '臺北市',
                    dist: '中山區',
                    address: '南京西路15號',
                },
                posterIntro: '我是一名攝影師，喜歡捕捉生活中的美好瞬間。',
                helperIntro: '我是一名資訊工程師，熟悉Java開發。',
                thirdPartyId: '',
                thirdPartyType: '',
                isVerifiedEmail: true,
                status: true,
                superCoin: 1500,
                helperCoin: 250,
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
