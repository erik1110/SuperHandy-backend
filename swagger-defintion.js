const Success = {
    message: '成功訊息',
};

const Error400 = {
    message: '錯誤訊息',
};

const ErrorToken = {
    status: 'false',
    message: '你尚未登入',
    error: {
        name: '40300',
    },
};

const Error404 = {
    message: '外太空也找不到這個頁面',
};

const Error500 = {
    message: '系統錯誤，請稍後再試',
};

const Sign = {
    token: 'abcde',
    _id: '123456789',
};

const RegisterEmailSuccess = {
    status: 'success',
    message: '請至 Email 查收信件',
};

const RegisterEmailError = {
    message: '請稍後重試或聯絡管理員',
};

const ValidateEmailError = {
    message: '信箱驗證失敗',
};

const getCategorySuccess = {
    status: 'success',
    data: [
        {
            name: '到府驅蟲',
            template: '請填寫以下資訊：\n1. 蟲種：\n2. 家居面積：\n3. 服務時間：',
        },
    ],
    message: '取得成功',
};

const getPlanSuccess = {
    status: 'success',
    data: [
        {
            title: '一般曝光',
            price: '20',
            items: ['無理由修改', '極速退點', '刊登時間30天'],
        },
    ],
    message: '取得成功',
};

const getCompletedCasesSuccess = {
    status: 'success',
    data: [
        {
            location: {
                city: '台北市',
                dist: '松山區',
                address: '復興北路15號',
                landmark: '歌唱大樓',
                longitude: 121.53868,
                latitude: 25.02697,
            },
            _id: '644fc95562a7112b1c72bcfd',
            status: 'completed',
            title: '陪我家狗玩',
            salary: 300,
            createAt: '2023-01-30T04:34:56.000Z',
            completedAt: '2022-02-23T00:19:50.000Z',
        },
    ],
    message: '取得成功',
};

const getSuperhandyReviewSuccess = {
    status: 'success',
    data: [
        {
            _id: '644fdf6b56c25a7e04b77197',
            comment: '個人物品多 之前透過此平台搜尋到 此清潔整理員工作時都會注意細節 每次需要時依舊還是會想要主動聯繫此清潔整理員',
            name: '翁',
        },
    ],
    message: '取得成功',
};

const getTaskStatsSuccess = {
    status: 'success',
    data: {
        totalPublished: 3,
        totalCompleted: 2,
    },
    message: '取得成功',
};

const getExcellentHelpersSuccess = {
    status: 'success',
    data: [
        {
            name: '王',
            avatar: 'https://i.imgur.com/1234567.jpg',
            completedTasks: 130,
            completionRate: 90,
            rating: {
                overall: 4.8,
                categories: [
                    {
                        name: '到府驅蟲',
                        star: 4.9,
                        totalReviews: 50,
                    },
                    {
                        name: '寵物陪伴',
                        star: 4.7,
                        totalReviews: 39,
                    },
                    {
                        name: '排隊代購',
                        star: 4.5,
                        totalReviews: 30,
                    },
                ],
            },
        },
    ],
    message: '取得成功',
};

const getPoints = {
    status: 'success',
    data: {
        superCoin: 0,
        helperCoin: 0,
    },
    message: '取得成功',
};

const getProfileStats = {
    status: 'success',
    data: {
        superCoin: 0,
        helperCoin: 0,
        numOfPostTasks: 1,
        numOfCompletedTasks: 3,
        ratingPoster: 5,
        ratingHelper: 4.67,
    },
    message: '取得成功',
};

const getProfileSuccess = {
    status: 'success',
    data: {
        _id: '645905b344f899648941de61',
        email: 'user1@example.com',
        firstName: '文方',
        lastName: '翁',
        avatarPath: '',
        nickname: '小文',
    },
    message: '查詢成功',
};

const getInfoFormSuccess = {
    status: 'success',
    data: {
        email: 'user1@example.com',
        firstName: '文方',
        lastName: '翁',
        phone: '0932345678',
        avatarPath: '',
        address: '',
        posterIntro: '我是公正黨文宣部副主任兼黨部發言人。',
        helperIntro: '',
        helperSkills: [],
    },
    message: '查詢成功',
};
const updateInfoForm = {
    status: 'success',
    data: {
        email: 'user1@example.com',
        firstName: 'Erik',
        lastName: 'Chen',
        nickname: '小文',
        phone: '0932345678',
        address: '台北市',
        posterIntro: '我是海報人',
        helperIntro: '我是幫手人',
        helperSkills: ['人力派遣', '市場調查'],
        updatedAt: '2023-05-08T14:37:43.829Z',
    },
};
const taskDetail = {
    title: '任務標題',
    status: 'published',
    category: '家事',
    description: '任務描述',
    salary: 1000,
    exposurePlan: '一般曝光',
    imagesUrl: ['https://example.com/image1.jpg', 'https://example.com/mage2.jpg'],
    contactInfo: {
        name: '王小明',
        phone: '0912345678',
        email: 'ming@gmail.com',
    },
    location: {
        city: '台北市',
        dist: '信義區',
        address: '台北市信義區市府路45號',
        landmark: '台北101',
        lng: 121.5337064,
        lat: 25.0296587,
    },
};
const taskDetailWithId = {
    taskId: '645be336a6b4506a5506be10',
    ...taskDetail,
};

module.exports = {
    Success,
    Error400,
    ErrorToken,
    Error404,
    Error500,
    Sign,
    RegisterEmailSuccess,
    RegisterEmailError,
    ValidateEmailError,
    getCategorySuccess,
    getPlanSuccess,
    getCompletedCasesSuccess,
    getSuperhandyReviewSuccess,
    getTaskStatsSuccess,
    getExcellentHelpersSuccess,
    getPoints,
    getProfileStats,
    getProfileSuccess,
    getInfoFormSuccess,
    updateInfoForm,
    taskDetail,
    taskDetailWithId,
};
