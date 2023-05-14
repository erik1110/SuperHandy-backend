const Category = require('../models/categoryModel');

const categories = [
    {
        name: '到府驅蟲',
        template: '請填寫以下資訊：\n1. 蟲種：\n2. 家居面積：\n3. 服務時間：',
    },
    {
        name: '寵物陪伴',
        template: '請填寫以下資訊：\n1. 寵物種類：\n2. 活動時間：\n3. 要求：',
    },
    {
        name: '排隊代購',
        template: '請填寫以下資訊：\n1. 代購物品清單：\n2. 取貨地點：\n3. 付款方式：',
    },
    {
        name: '市場調查',
        template: '請填寫以下資訊：\n1. 調查題目：\n2. 調查內容：\n3. 付款方式：',
    },
    {
        name: '人力派遣',
        template: '請填寫以下資訊：\n1. 工作類型：\n2. 工作時間：\n3. 工作地點：',
    },
    {
        name: '餐飲烹飪',
        template: '請填寫以下資訊：\n1. 餐點類型：\n2. 餐點數量：\n3. 付款方式：',
    },
    {
        name: '活動支援',
        template: '請填寫以下資訊：\n1. 活動類型：\n2. 活動時間：\n3. 負責內容：',
    },
    {
        name: '銷售產品',
        template: '請填寫以下資訊：\n1. 產品類型：\n2. 數量：\n3. 付款方式：',
    },
    {
        name: '家教陪讀',
        template: '請填寫以下資訊：\n1. 科目：\n2. 教學內容：\n3. 教學時間：',
    },
    {
        name: '寵物照顧',
        template: '請填寫以下資訊：\n1. 寵物種類：\n2. 照顧時間：\n3. 要求：',
    },
    {
        name: '寫評分享',
        template: '請填寫以下資訊：\n1. 文章主題：\n2. 內容簡述：\n3. 預計發布平台：...',
    },
    {
        name: '視覺設計',
        template: '請填寫以下資訊：\n1. 設計風格：\n2. 目標客群：\n3. 用途說明：...',
    },
    {
        name: '電腦教學',
        template: '請填寫以下資訊：\n1. 教學主題：\n2. 教學內容：\n3. 目標學生：...',
    },
    {
        name: '網頁設計',
        template: '請填寫以下資訊：\n1. 設計風格：\n2. 網站用途：\n3. 頁面需求：...',
    },
    {
        name: '文書處理',
        template: '請填寫以下資訊：\n1. 處理文件類型：\n2. 文書內容：\n3. 格式需求：...',
    },
    {
        name: '清潔外包',
        template: '請填寫以下資訊：\n1. 清潔地點：\n2. 清潔項目：\n3. 計價方式：...',
    },
    {
        name: '運動陪練',
        template: '請填寫以下資訊：\n1. 運動類型：\n2. 運動目的：\n3. 時間地點：...',
    },
    {
        name: '居家服務',
        template: '請填寫以下資訊：\n1. 服務項目：\n2. 服務時間：\n3. 服務地點：...',
    },
    {
        name: '其他內容',
        template: '請填寫以下資訊：\n1. 內容描述：\n2. 目標：\n3. 預期效果：...',
    },
];

const initCategories = async () => {
    try {
        // 刪除現有的所有類別
        await Category.deleteMany();

        // 插入新的類別
        await Category.insertMany(categories);

        console.log('服務類別資料初始化成功');
    } catch (err) {
        console.error('務類別資料初始化失敗', err);
    }
};

module.exports = {
    categories,
    initCategories,
};
