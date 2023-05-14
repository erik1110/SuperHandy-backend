const User = require('../models/userModel');
const categories = require('../db/initCategories');
const validator = require('validator');

const categoryNames = categories.categories.map((cat) => cat.name);
const getexposurePlanPrices = require('../service/exposurePlan');

module.exports = class TaskValidator {
    static checkDraft({ title, category, description, salary, exposurePlan, imagesUrl, contactInfo, location }) {
        if (!title) {
            return {
                status: false,
                msg: '未填寫任務標題!',
            };
        }
        if (category && !categoryNames.includes(category)) {
            return {
                status: false,
                msg: '任務類別錯誤!',
            };
        }
        if (description && typeof description !== 'string') {
            return {
                status: false,
                msg: '任務描述格式錯誤!',
            };
        }
        if (salary && (typeof salary !== 'number' || salary <= 0)) {
            return {
                status: false,
                msg: '任務薪資錯誤!',
            };
        }
        if (exposurePlan && !['一般曝光', '限時曝光', '黃金曝光', '限時黃金曝光'].includes(exposurePlan)) {
            return {
                status: false,
                msg: '任務曝光計畫錯誤!',
            };
        }
        if (imagesUrl && !Array.isArray(imagesUrl)) {
            return {
                status: false,
                msg: '圖片路徑格式錯誤!',
            };
        }
        if (contactInfo) {
            if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
                return {
                    status: false,
                    msg: '聯絡人資訊未填寫完整!',
                };
            }
            if (typeof contactInfo.name !== 'string' || typeof contactInfo.phone !== 'string' || typeof contactInfo.email !== 'string') {
                return {
                    status: false,
                    msg: '聯絡人資訊格式錯誤!',
                };
            }
            if (!validator.isEmail(contactInfo.email)) {
                return {
                    status: false,
                    msg: 'Email 格式不正確!',
                };
            }
        }
        if (location) {
            if (!location.city || !location.dist || !location.address) {
                return {
                    status: false,
                    msg: '地址資訊未填寫完整!',
                };
            }
            if (typeof location.city !== 'string' || typeof location.dist !== 'string' || typeof location.address !== 'string') {
                return {
                    status: false,
                    msg: '地址資訊格式錯誤!',
                };
            }
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    static checkPublish({ title, category, description, taskTrans, salary, exposurePlan, imagesUrl, contactInfo, location }) {
        if (!title) {
            return {
                status: false,
                msg: '未填寫任務標題!',
            };
        }
        if (!category || !categoryNames.includes(category)) {
            return {
                status: false,
                msg: '任務類別錯誤!',
            };
        }
        if (!description || typeof description !== 'string') {
            return {
                status: false,
                msg: '任務描述格式錯誤!',
            };
        }
        if (!salary || typeof salary !== 'number') {
            return {
                status: false,
                msg: '任務薪資錯誤!',
            };
        }
        if (salary < 10) {
            return {
                status: false,
                msg: '任務薪資最低為10元',
            };
        }
        if (!exposurePlan || !['一般曝光', '限時曝光', '黃金曝光', '限時黃金曝光'].includes(exposurePlan)) {
            return {
                status: false,
                msg: '任務曝光計畫錯誤!',
            };
        }
        if (salary && exposurePlan) {
            const exposurePlanPrice = getexposurePlanPrices(exposurePlan);
            const totalPay = salary + exposurePlanPrice;
            const totalCoins = taskTrans.superCoin + taskTrans.helperCoin;
            if (totalPay !== totalCoins) {
                return {
                    status: false,
                    msg: '薪水+曝光計畫與超人幣+幫手幣總和不一致!',
                };
            }
        }
        if (contactInfo) {
            if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
                return {
                    status: false,
                    msg: '聯絡人資訊未填寫完整!',
                };
            }
            if (typeof contactInfo.name !== 'string' || typeof contactInfo.phone !== 'string' || typeof contactInfo.email !== 'string') {
                return {
                    status: false,
                    msg: '聯絡人資訊格式錯誤!',
                };
            }
            if (!validator.isEmail(contactInfo.email)) {
                return {
                    status: false,
                    msg: 'Email 格式不正確!',
                };
            }
        }
        if (location) {
            if (!location.city || !location.dist || !location.address) {
                return {
                    status: false,
                    msg: '地址資訊未填寫完整!',
                };
            }
            if (typeof location.city !== 'string' || typeof location.dist !== 'string' || typeof location.address !== 'string') {
                return {
                    status: false,
                    msg: '地址資訊格式錯誤!',
                };
            }
        }
        if (imagesUrl && !Array.isArray(imagesUrl)) {
            return {
                status: false,
                msg: '圖片路徑格式錯誤!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    static checkUnpublishEdit({ title, category, description, imagesUrl, contactInfo, location }) {
        if (!title) {
            return {
                status: false,
                msg: '未填寫任務標題!',
            };
        }
        if (!category || !categoryNames.includes(category)) {
            return {
                status: false,
                msg: '任務類別錯誤!',
            };
        }
        if (!description || typeof description !== 'string') {
            return {
                status: false,
                msg: '任務描述格式錯誤!',
            };
        }
        if (contactInfo) {
            if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
                return {
                    status: false,
                    msg: '聯絡人資訊未填寫完整!',
                };
            }
            if (typeof contactInfo.name !== 'string' || typeof contactInfo.phone !== 'string' || typeof contactInfo.email !== 'string') {
                return {
                    status: false,
                    msg: '聯絡人資訊格式錯誤!',
                };
            }
            if (!validator.isEmail(contactInfo.email)) {
                return {
                    status: false,
                    msg: 'Email 格式不正確!',
                };
            }
        }
        if (location) {
            if (!location.city || !location.dist || !location.address) {
                return {
                    status: false,
                    msg: '地址資訊未填寫完整!',
                };
            }
            if (typeof location.city !== 'string' || typeof location.dist !== 'string' || typeof location.address !== 'string') {
                return {
                    status: false,
                    msg: '地址資訊格式錯誤!',
                };
            }
        }
        if (imagesUrl && !Array.isArray(imagesUrl)) {
            return {
                status: false,
                msg: '圖片路徑格式錯誤!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
};
