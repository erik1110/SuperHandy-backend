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
            status: 'confirmed',
            title: '急！幫忙代購王國之淚',
            category: '排隊代購',
            description: '很急，5/11 晚上請在信義店前排隊代購，12:00準時想拿到遊戲片',
            salary: 300,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://example.com/switch.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '信義區',
                address: '臺北市信義區松智路17號',
                longitude: 121.53868,
                latitude: 25.02697,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase2._id,
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
                createdAt: new Date('2023-05-12T12:34:56'),
                updatedAt: new Date('2022-06-12T08:19:50'),
                publishedAt: new Date('2022-05-13T13:34:56'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2022-05-16T13:34:56'),
                submittedAt: new Date('2022-05-17T13:55:56'),
                confirmedAt: new Date('2022-05-19T19:15:50'),
                completedAt: null,
                expiredAt: new Date('2023-06-12T12:34:56'),
            },
            submittedInfo: {
                imgUrls: ['https://example.com/images/report1.jpg', 'https://example.com/images/report2.jpg'],
                comment: '這個任務簡單啦',
                createAt: new Date('2022-05-17T13:55:56'),
            },
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '幫忙打王國之淚的Boss',
            category: '人力派遣',
            description: 'Boss 好難打，急徵高手幫忙，不可以花我太多素材，意者私聊',
            salary: 500,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://example.com/switch.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
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
                city: '臺北市',
                dist: '松山區',
                address: '臺北市松山區復興北路15號',
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
                createAt: new Date('2022-02-17T13:55:56'),
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
                city: '臺北市',
                dist: '松山區',
                address: '臺北市松山區羅斯福路四段1號',
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
                createAt: new Date('2023-04-13T09:00:00'),
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
                address: '新北市板橋區新站路20號',
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
                createAt: new Date('2023-04-17T09:00:00'),
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
                address: '台中市南區復興南路二段240號',
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
                createAt: new Date('2023-04-17T09:00:00'),
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
                city: '臺北市',
                dist: '中正區',
                address: '臺北市中正區信義路1號',
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
                createAt: new Date('2023-04-17T09:00:00'),
            },
        },
        {
            userId: userCase2._id,
            status: 'published',
            title: '兼職家教數學',
            category: '家教陪讀',
            description: '需要幫忙教授數學科目，學生理解能力稍弱，時薪400，急需人手。',
            salary: 400,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://example.com/tutor.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '中山區',
                address: '忠孝東路二段100號',
                longitude: 121.53512,
                latitude: 25.04942,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase4._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 29)),
            },
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '需求短期家庭清潔工',
            category: '居家服務',
            description: '家中需要進行全面清潔，時薪350，需求立即開始。',
            salary: 350,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://example.com/cleaner.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '大安區',
                address: '忠孝東路三段200號',
                longitude: 121.53494,
                latitude: 25.04198,
            },
            isUrgent: false,
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
                createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 29)),
            },
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '需要網頁設計師',
            category: '網頁設計',
            description: '尋找有經驗的網頁設計師合作專案，時薪600，須具備UI/UX設計能力。',
            salary: 600,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://example.com/webdesign.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '內湖區',
                address: '成功路100號',
                longitude: 121.60601,
                latitude: 25.06828,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase4._id,
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
                createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 25)),
            },
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '需求運動教練',
            category: '運動陪練',
            description: '尋找有經驗的運動教練進行團體訓練，時薪450，場地提供。',
            salary: 450,
            exposurePlan: '限時黃金曝光',
            imgUrls: ['https://example.com/coach.jpg'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '士林區',
                address: '文林路50號',
                longitude: 121.52388,
                latitude: 25.08973,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase4._id,
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
                createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 27)),
            },
        },
        {
            userId: userCase3._id,
            status: 'published',
            title: '需要翻譯人員',
            category: '文書處理',
            description: '招募翻譯人員協助會議翻譯，時薪1550，需要擅長英文和中文。',
            salary: 1550,
            exposurePlan: '限時曝光',
            imgUrls: ['https://example.com/translator.jpg'],
            contactInfo: {
                name: `${userCase3.lastName}${userCase3.firstName}`,
                phone: userCase3.phone,
                email: userCase3.email,
            },
            location: {
                city: '臺北市',
                dist: '中正區',
                address: '中山南路100號',
                longitude: 121.51752,
                latitude: 25.04589,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase2._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date(),
                updatedAt: new Date(),
                publishedAt: new Date(),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
        },
    ];

    try {
        // 刪除現有的所有類別
        await Task.deleteMany({});

        // 插入新的類別
        await Task.insertMany(tasks);

        console.log('任務資料初始化成功');
    } catch (err) {
        console.error('任務資料初始化失敗', err);
    }
};

module.exports = initTasks;
