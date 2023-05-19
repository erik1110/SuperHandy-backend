const Task = require('../models/taskModel');
const User = require('../models/userModel');

const initTasks = async () => {
    const userCase1 = await User.findOne({ email: 'user1@example.com' }).select('lastName firstName phone');
    const userCase2 = await User.findOne({ email: 'user2@example.com' }).select('lastName firstName phone');
    const userCase3 = await User.findOne({
        email: 'chiayu@example.com',
    }).select('lastName firstName phone');
    const userCase4 = await User.findOne({
        email: 'yunshan@example.com',
    }).select('lastName firstName phone');
    const userCase5 = await User.findOne({ email: 'weiyu@example.com' }).select('lastName firstName phone');
    const tasks = [
        {
            userId: userCase1._id,
            status: 'published',
            title: '急！幫忙代購王國之淚',
            category: '排隊代購',
            description: '很急，5/11 晚上請在信義店前排隊代購，12:00準時想拿到遊戲片',
            salary: 500,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://example.com/switch.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '台北市',
                dist: '信義區',
                address: '松智路17號',
                longitude: 121.53868,
                latitude: 25.02697,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase3._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase2._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date('2023-04-30T12:34:56'),
                updatedAt: new Date('2022-05-12T08:19:50'),
                publishedAt: new Date('2022-05-10T13:34:56'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date('2023-05-30T12:34:56'),
            },
        },
        {
            userId: userCase1._id,
            status: 'completed',
            title: '陪我家狗玩',
            category: '寵物陪伴',
            description: '我家有黃金獵犬，但我這禮拜很忙，請幫我 2/20 早上 8 點來歌唱大樓找我，並帶他去附近公園陪他散步',
            salary: 300,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://example.com/dog.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '台北市',
                dist: '松山區',
                address: '復興北路15號',
                longitude: 121.53868,
                latitude: 25.02697,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'paired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-01-30T12:34:56'),
                updatedAt: new Date('2022-02-23T08:19:50'),
                publishedAt: new Date('2022-02-15T13:34:56'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2022-02-16T13:34:56'),
                submittedAt: new Date('2022-02-17T13:55:56'),
                confirmedAt: new Date('2022-02-19T19:15:50'),
                completedAt: new Date('2022-02-23T08:19:50'),
                expiredAt: new Date('2023-03-01T12:34:56'),
            },
            submittedInfo: {
                imgUrls: ['https://example.com/images/report1.jpg', 'https://example.com/images/report2.jpg'],
                comment: '你家的狗很乖很聽話',
                submittedAt: new Date('2022-02-17T13:55:56'),
            },
        },
        {
            userId: userCase2._id,
            status: 'completed',
            title: '幫忙做畢業專題',
            category: '文書處理',
            description: '我目前正在進行一份有關自然語言處理的畢業專題，需要一位有相關經驗的助理幫忙實驗和分析數據。',
            salary: 1300,
            exposurePlan: '限時黃金曝光',
            imgUrls: ['https://example.com/project.png'],
            contactInfo: {
                name: `${userCase2.lastName}${userCase2.firstName}`,
                phone: userCase2.phone,
                email: userCase2.email,
            },
            location: {
                city: '台北市',
                dist: '松山區',
                address: '羅斯福路四段1號',
                longitude: 121.537369,
                latitude: 25.017503,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase1._id,
                    status: 'paired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase5._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-05-01T09:00:00'),
                updatedAt: new Date('2023-05-16T09:00:00'),
                publishedAt: new Date('2023-05-01T09:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-05-12T09:00:00'),
                submittedAt: new Date('2023-05-13T09:00:00'),
                confirmedAt: new Date('2023-05-14T09:00:00'),
                completedAt: new Date('2023-05-16T09:00:00'),
                expiredAt: new Date('2023-06-01T09:00:00'),
            },
            submittedInfo: {
                imgUrls: ['https://example.com/images/report3.jpg', 'https://example.com/images/report4.jpg'],
                comment: '這份報告有夠難做，NLP 難啊',
                submittedAt: new Date('2023-04-13T09:00:00'),
            },
        },
        {
            userId: userCase3._id,
            status: 'completed',
            title: '協助居家清潔',
            category: '清潔外包',
            description: '需要一位勤快且細心的人來協助居家清潔，家裡有一些難以清潔的區域需要特別注意。',
            salary: 666,
            exposurePlan: '一般曝光',
            imgUrls: ['https://example.com/project123123124.png'],
            contactInfo: {
                name: `${userCase3.lastName}${userCase3.firstName}`,
                phone: userCase3.phone,
                email: userCase3.email,
            },
            location: {
                city: '新北市',
                dist: '板橋區',
                address: '新站路20號',
                landmark: '板橋火車站',
                longitude: 121.462966,
                latitude: 25.012422,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase1._id,
                    status: 'paired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase5._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-04-02T18:00:00'),
                updatedAt: new Date('2023-04-17T09:00:00'),
                publishedAt: new Date('2023-04-02T20:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-04-13T09:00:00'),
                submittedAt: new Date('2023-04-17T09:00:00'),
                confirmedAt: new Date('2023-04-18T09:00:00'),
                completedAt: new Date('2023-04-19T09:00:00'),
                expiredAt: new Date('2023-04-09T18:00:00'),
            },
            submittedInfo: {
                imgUrls: ['https://example.com/images/report5.jpg', 'https://example.com/images/report6.jpg', 'https://example.com/images/report7.jpg'],
                comment: '這份工作比想像中還要累，但收穫也很多。',
                submittedAt: new Date('2023-04-17T09:00:00'),
            },
        },
        {
            userId: userCase4._id,
            status: 'completed',
            title: '陪我練習開車',
            category: '其他內容',
            description: '我最近剛考到駕照，但還不太有經驗，需要一位有開車經驗的人來陪我練習開車，希望能有耐心且細心的教練。',
            salary: 567,
            exposurePlan: '限時曝光',
            imgUrls: ['https://example.com/projectCar.png'],
            contactInfo: {
                name: `${userCase4.lastName}${userCase4.firstName}`,
                phone: userCase4.phone,
                email: userCase4.email,
            },
            location: {
                city: '台中市',
                dist: '南區',
                address: '復興南路二段240號',
                longitude: 120.637803,
                latitude: 24.178145,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase1._id,
                    status: 'paired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase5._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-05-02T18:00:00'),
                updatedAt: new Date('2023-05-17T09:00:00'),
                publishedAt: new Date('2023-05-02T20:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-05-13T09:00:00'),
                submittedAt: new Date('2023-05-17T09:00:00'),
                confirmedAt: new Date('2023-05-18T09:00:00'),
                completedAt: new Date('2023-05-19T09:00:00'),
                expiredAt: new Date('2023-06-02T18:00:00'),
            },
            submittedInfo: {
                imgUrls: ['https://example.com/images/report8.jpg', 'https://example.com/images/report9.jpg', 'https://example.com/images/report10.jpg'],
                comment: '學生學得很快，很有耐心。',
                submittedAt: new Date('2023-04-17T09:00:00'),
            },
        },
        {
            userId: userCase5._id,
            status: 'completed',
            title: 'Notion 教學',
            category: '電腦教學',
            description: '需要一位有經驗的人來教我如何使用 Notion 管理自己的筆記和待辦事項。',
            salary: 999,
            exposurePlan: '限時黃金曝光',
            imgUrls: ['https://example.com/projectNotion.png'],
            contactInfo: {
                name: `${userCase5.lastName}${userCase5.firstName}`,
                phone: userCase5.phone,
                email: userCase5.email,
            },
            location: {
                city: '台北市',
                dist: '中正區',
                address: '信義路1號',
                longitude: 121.564534,
                latitude: 25.033903,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase2._id,
                    status: 'paired',
                },
                {
                    helperId: userCase1._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-05-03T18:00:00'),
                updatedAt: new Date('2023-06-01T10:00:00'),
                publishedAt: new Date('2023-05-02T20:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-05-27T09:00:00'),
                submittedAt: new Date('2023-05-29T05:00:00'),
                confirmedAt: new Date('2023-06-01T09:00:00'),
                completedAt: new Date('2023-06-01T10:00:00'),
                expiredAt: new Date('2023-06-03T18:00:00'),
            },
            submittedInfo: {
                imgUrls: ['https://example.com/images/report11.jpg', 'https://example.com/images/report12.jpg', 'https://example.com/images/report13.jpg'],
                comment: '',
                submittedAt: new Date('2023-04-17T09:00:00'),
            },
        },
    ];

    try {
        // 刪除現有的所有類別
        await Task.deleteMany({
            title: {
                $in: ['急！幫忙代購王國之淚', '陪我家狗玩', '幫忙做畢業專題', '協助居家清潔', '陪我練習開車', 'Notion 教學'],
            },
        });

        // 插入新的類別
        await Task.insertMany(tasks);

        console.log('任務資料初始化成功');
    } catch (err) {
        console.error('任務資料初始化失敗', err);
    }
};

module.exports = initTasks;
