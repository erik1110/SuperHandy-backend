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
            status: '已完成',
            title: '陪我家狗玩',
            salary: 300,
            createAt: '2023-01-30T04:34:56.000Z',
            completedAt: '2022-02-23T00:19:50.000Z',
            location: {
                longitude: 121.53868,
                latitude: 25.02697,
                address: '臺北市松山區復興北路15號',
            },
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
            avatar: '',
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
            lastName: '王',
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
        location: {
            city: '臺北市',
            dist: '中正區',
            address: '中正區重慶南路一段122號',
        },
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
        address: '臺北市',
        posterIntro: '我是海報人',
        helperIntro: '我是幫手人',
        helperSkills: ['人力派遣', '市場調查'],
        updatedAt: '2023-05-08T14:37:43.829Z',
    },
};
const draftTaskDetail = {
    title: '任務標題',
    category: '到府驅蟲',
    description: '',
    salary: 1000,
    exposurePlan: '一般曝光',
    imgUrls: ['https://example.com/image1.jpg', 'https://example.com/mage2.jpg'],
    contactInfo: {
        name: '王小明',
        phone: '0912345678',
        email: 'ming@gmail.com',
    },
    location: {
        city: '臺北市',
        dist: '信義區',
        address: '臺北市信義區市府路45號',
    },
};
const publishTaskDetail = {
    title: '任務標題',
    category: '到府驅蟲',
    description: '任務描述',
    taskTrans: {
        superCoin: 1000,
        helperCoin: 0,
    },
    salary: 1000,
    exposurePlan: '一般曝光',
    imgUrls: ['https://example.com/image1.jpg', 'https://example.com/mage2.jpg'],
    contactInfo: {
        name: '王小明',
        phone: '0912345678',
        email: 'ming@gmail.com',
    },
    location: {
        city: '臺北市',
        dist: '信義區',
        address: '臺北市信義區市府路45號',
    },
};
const getDraftResponse = {
    status: 'success',
    data: {
        userId: '645f125ab001884876e3a12a',
        status: 'draft',
        title: '任務標題',
        category: '到府驅蟲',
        description: null,
        salary: 1000,
        exposurePlan: '一般曝光',
        imgUrls: [],
        contactInfo: {
            name: '王小明',
            phone: '0912345678',
            email: 'ming@gmail.com',
        },
        location: {
            city: '臺北市',
            dist: '信義區',
            address: '臺北市信義區市府路45號',
        },
        viewers: [],
        viewerCount: 0,
        isUrgent: false,
        time: {
            createdAt: '2023-05-16T05:21:26.144Z',
            updatedAt: '2023-05-16T05:21:26.144Z',
        },
        reviews: [],
        submittedInfo: { imgUrls: [] },
        helpers: [],
        taskId: '6460a24905b52c47e04f4f38',
    },
    message: '取得草稿成功',
};

const unpublishEditDetail = {
    category: '到府驅蟲',
    description: '這個任務非常困難',
    imgUrls: ['https://example.com/image1.jpg', 'https://example.com/mage2.jpg'],
    contactInfo: {
        name: '王小明',
        phone: '0912345678',
        email: 'ming@gmail.com',
    },
    location: {
        city: '臺北市',
        dist: '信義區',
        address: '臺北市信義區市府路45號',
    },
};

const purchasePoints = {
    status: 'success',
    data: {
        superCoin: 750,
        helperCoin: 1050,
    },
    message: '購買成功',
};

const cashbackPoints = {
    status: 'success',
    data: {
        superCoin: 450,
        helperCoin: 1050,
    },
    message: '返還成功',
};

const getNotifyList = {
    status: 'success',
    data: {
        notifyId: '6462e2fbcc60d505cc83de30',
        userId: '646266a3d7d8ce5010f8c327',
        tag: '案主通知',
        read: true,
        description: '您的任務：「陪我家狗玩 」幫手已提交驗收內容，請進行驗收',
        taskId: '646266a3d7d8ce5010f8c334',
        createdAt: '2022-02-17T05:55:56.000Z',
    },
    message: '取得通知成功',
};
const getPostedTasksHist = {
    status: 'success',
    data: [
        {
            taskId: '646431446cac1cf0dd5acaee',
            title: '陪我家狗玩',
            isUrgent: true,
            status: '已完成',
            salary: 300,
            address: '臺北市松山區復興北路15號',
            createdAt: '2023-01-30T04:34:56.000Z',
            publishedAt: '2022-02-15T05:34:56.000Z',
            expiredAt: '2023-03-01T04:34:56.000Z',
            helper: '張亞靜',
            imgUrls: ['https://example.com/image1.jpg', 'https://example.com/mage2.jpg'],
        },
    ],
    message: '取得成功',
};
const getAppliedTasksHist = {
    status: 'success',
    data: [
        {
            taskId: '646431446cac1cf0dd5acaee',
            title: '幫忙做畢業專題',
            isUrgent: false,
            status: '已完成',
            helperStatus: '媒合成功',
            salary: 300,
            address: '臺北市松山區羅斯福路四段1號',
            createdAt: '2023-01-30T04:34:56.000Z',
            publishedAt: '2022-02-15T05:34:56.000Z',
            expiredAt: '2023-03-01T04:34:56.000Z',
            poster: '張亞靜',
            imgUrls: ['https://example.com/image1.jpg', 'https://example.com/mage2.jpg'],
        },
    ],
    message: '取得成功',
};
const getTaskDetails = {
    status: 'success',
    data: {
        taskId: '646431446cac1cf0dd5acaee',
        role: '案主',
        publishedAt: '2022-02-15T05:34:56.000Z',
        status: '已完成',
        helper: '陳瑋宇',
        poster: '翁文方',
        progressBar: {
            publishedAt: '2022-02-15T05:34:56.000Z',
            inProgressAt: '2022-02-16T05:34:56.000Z',
            submittedAt: '2022-02-17T05:55:56.000Z',
            confirmedAt: '2022-02-19T11:15:50.000Z',
            completedAt: '2022-02-23T00:19:50.000Z',
        },
        title: '陪我家狗玩',
        isUrgent: true,
        salary: 300,
        exposurePlan: '黃金曝光',
        location: {
            city: '臺北市',
            dist: '松山區',
            address: '復興北路15號',
        },
        category: '寵物陪伴',
        description: '我家有黃金獵犬，但我這禮拜很忙，請幫我 2/20 早上 8 點來歌唱大樓找我，並帶他去附近公園陪他散步',
        imgUrls: ['https://example.com/dog.jpg'],
        helpers: [
            {
                helperId: '646431446cac1cf0dd5acae6',
                status: '媒合成功',
                lastName: '陳',
            },
        ],
        contactInfo: {
            name: '翁文方',
            phone: '0932345678',
            email: '',
        },
        submittedInfo: {
            imgUrls: [],
        },
    },
    message: '取得成功',
};

const uploadAcceptanceReq = {
    submittedInfo: {
        imgUrls: ['http://example.com/1.jpg'],
        comment: '好多人好難排，但我拿到了',
    },
};
const refuseAcceptanceReq = {
    submittedInfo: {
        imgUrls: ['http://example.com/1.jpg'],
        comment: '你給的有瑕疵不能玩啊',
    },
};
const findTaskDetails = {
    status: 'success',
    data: {
        taskId: '646431446cac1cf0dd5acaee',
        publishedAt: '2022-02-15T05:34:56.000Z',
        status: '已完成',
        progressBar: {
            publishedAt: '2022-02-15T05:34:56.000Z',
            inProgressAt: '2022-02-16T05:34:56.000Z',
            submittedAt: '2022-02-17T05:55:56.000Z',
            confirmedAt: '2022-02-19T11:15:50.000Z',
            completedAt: '2022-02-23T00:19:50.000Z',
        },
        title: '陪我家狗玩',
        isUrgent: true,
        salary: 300,
        address: '臺北市松山區復興北路15號',
        category: '寵物陪伴',
        description: '我家有黃金獵犬，但我這禮拜很忙，請幫我 2/20 早上 8 點來歌唱大樓找我，並帶他去附近公園陪他散步',
        imgUrls: ['https://example.com/dog.jpg'],
        viewerCount: 1,
        posterInfo: {
            lastName: '陳',
            phone: '0919******',
            email: '*****@********',
        },
        contactInfo: {
            name: '陳瑋宇',
            phone: '0919694069',
            email: '',
        },
    },
    message: '取得成功',
};
const findTaskListGeneral = {
    status: 'success',
    data: {
        tasks: [
            {
                taskId: '645bec484ff0061f89e0b103',
                publishedAt: '2023-05-10T19:11:04.653Z',
                status: '媒合中',
                title: '任務標題',
                isUrgent: false,
                salary: 1000,
                address: '臺北市信義區',
                category: '家事',
                description: '任務描述',
                imgUrls: '',
                viewerCount: 0,
                helperCount: 0,
                posterName: '王**',
                contactName: '王**',
            },
        ],
        page: 1,
        limit: 6,
        total_pages: 1,
        total_tasks: 5,
    },
    message: '取得成功',
};
const findTaskListMap = {
    status: 'success',
    data: {
        tasks: [
            {
                taskId: '645bec484ff0061f89e0b103',
                publishedAt: '2023-05-10T19:11:04.653Z',
                status: '媒合中',
                title: '任務標題',
                isUrgent: false,
                salary: 1000,
                address: '臺北市信義區',
                category: '家事',
                description: '任務描述',
                location: {
                    city: '臺北市',
                    dist: '信義區',
                    address: '松智路17號',
                    longitude: 121.53868,
                    latitude: 25.02697,
                    landmark: '',
                },
                viewerCount: 0,
                helperCount: 0,
                posterName: '王**',
                contactName: '王**',
            },
        ],
        total_tasks: 1,
        longitude: 121.5720055,
        latitude: 25.0409201,
    },
    message: '取得成功',
};
const findTaskListHighlight = {
    status: 'success',
    data: {
        tasks: [
            {
                taskId: '645bec484ff0061f89e0b103',
                title: '任務標題',
                imgUrls: '',
            },
        ],
    },
    message: '取得成功',
};
const ratingAndReviewReq = {
    star: 4,
    comment: '幫手表現超棒der',
};

const getCommentsHist = {
    status: 'success',
    data: [
        {
            yourStar: 5,
            category: '寵物陪伴',
            title: '陪我家狗玩',
            address: '臺北市松山區復興北路15號',
            salary: 300,
            name: '陳瑋宇',
            publishedAt: '2022-02-15T05:34:56.000Z',
            helperReview: {
                star: 5,
                status: '已評價',
                comment: '案主態度好，狗好很帶',
            },
            posterReview: {
                star: 4,
                status: '已評價',
                comment: '早上八點有點遲到，讓我等了十分鐘',
            },
            taskId: '646c280234ecc5e9e7aef1ce',
        },
    ],
    message: '取得成功',
};
const getStarCounts = {
    status: 'success',
    data: {
        1: 0,
        2: 0,
        3: 0,
        4: 1,
        5: 2,
        null: 0,
        avg: 4.67,
        totalCount: 3,
    },
    message: '取得成功',
};

const uploadImage = {
    status: 'success',
    data: {
        imgUrl: 'https://storage.googleapis.com',
    },
    message: '圖片上傳成功',
};

const paymentRequest = {
    status: 'success',
    data: {
        redirectURL:
            'https://sandbox-web-pay.line.me/web/payment/wait?transactionReserveId=b2VkZGFnZzk3MUo0a3dUY1VLeGs2QVFvalpvellOKzBnZWU1amRlSWlUUi8zSW40M21JelUwU29sQU5TOTRwQw',
        orderId: '6472c92c0234f38138f4c23e-1685244464',
    },
    message: '建立 linepay 訂單成功',
};

const getChatRoomList = {
    status: 'success',
    data: {
        taskId: '647a926ba395c8322f620164',
        title: '任務標題',
        selfRole: 'helper',
        partnerRole: 'poster',
        poster: {
            firstName: '文芳',
            lastName: '翁',
            nickname: '小文',
            avatarPath: 'https://storage.googleapis.com/images/231432424.jpg',
        },
        helper: {
            firstName: '冠伶',
            lastName: '都',
            nickname: '滴妹',
            avatarPath: 'https://storage.googleapis.com/images/231432425.jpg',
        },
        unreadCount: 0,
        lastMessage: '最後一則訊息',
        updatedAt: '2021-09-27T07:00:00.000Z',
    },
    message: '取得聊天室列表成功',
};
const getChatHistory = {
    status: 'success',
    data: {
        taskId: '647a926ba395c8322f620164',
        role: 'helper',
        message: '罐頭訊息，罐頭罐頭...',
        createdAt: '2021-09-27T07:00:00.000Z',
    },
    message: '取得聊天室歷史訊息成功',
};

const googleCallback = {
    status: 'success',
    data: {
        oauth_register: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAwOGYxMDc4ZmMxYWEyZDNlNjU3OSIsImlhdCI6MTY4NjExMzY5MSwiZXhwIjoxNjg2NzE4NDkxfQ.MzuEB6mU7VOVeTIx9In7EYKPKbIwimKZd1eN7bEC9UE',
        userId: '648008f1078fc1aa2d3e6579',
        nickname: '小明',
    },
    message: '第三方登入 - 取得google 資訊',
};

const googleSignUp = {
    status: 'success',
    data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAwOGYxMDc4ZmMxYWEyZDNlNjU3OSIsImlhdCI6MTY4NjExMzY5MSwiZXhwIjoxNjg2NzE4NDkxfQ.MzuEB6mU7VOVeTIx9In7EYKPKbIwimKZd1eN7bEC9UE',
        userId: '648008f1078fc1aa2d3e6579',
    },
    message: '第三方登入 google - 註冊',
};

const getPointsHistory =    {
    status: 'success',
    data: [{
        tag: "刊登任務",
        taskId: "64869b36f50efe405623a154",
        taskTitle: "需求短期家庭清潔工",
        money: {
        "salary": 350,
        "exposurePlan": 50,
        "platform": 0,
        "superCoin": -350,
        "helperCoin": -50
        },
        desc: [
        "預扣薪水",
        "黃金曝光"
        ],
        role: "案主",
        createdAt: "2023-06-12T04:12:38.764Z"
      }
    ],
    message: '取得成功',
}

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
    draftTaskDetail,
    publishTaskDetail,
    getDraftResponse,
    unpublishEditDetail,
    purchasePoints,
    cashbackPoints,
    getNotifyList,
    getPostedTasksHist,
    getAppliedTasksHist,
    getTaskDetails,
    uploadAcceptanceReq,
    refuseAcceptanceReq,
    findTaskDetails,
    findTaskListGeneral,
    findTaskListMap,
    findTaskListHighlight,
    ratingAndReviewReq,
    getCommentsHist,
    getStarCounts,
    uploadImage,
    paymentRequest,
    getChatRoomList,
    getChatHistory,
    googleCallback,
    googleSignUp,
    getPointsHistory,
};
