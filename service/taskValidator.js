const categories = require('../db/initCategories');
const validator = require('validator');

const categoryNames = categories.categories.map((cat) => cat.name);
const getExposurePlanPrices = require('../service/exposurePlan');

module.exports = class TaskValidator {
    static checkDraft({ title, category, description, salary, exposurePlan, imgUrls, contactInfo, location }) {
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
        if (imgUrls && !Array.isArray(imgUrls)) {
            return {
                status: false,
                msg: '圖片路徑格式錯誤!',
            };
        }
        if (contactInfo) {
            if (contactInfo.name && typeof contactInfo.name !== 'string') {
                return {
                    status: false,
                    msg: '聯絡人資訊名稱格式不正確!',
                };
            }
            if (contactInfo.phone && typeof contactInfo.phone !== 'string') {
                return {
                    status: false,
                    msg: '聯絡人資訊手機格式不正確!',
                };
            }
            if (contactInfo.email && !validator.isEmail(contactInfo.email)) {
                return {
                    status: false,
                    msg: '聯絡人資訊email格式不正確!',
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
    static checkPublish({ title, category, description, taskTrans, salary, exposurePlan, imgUrls, contactInfo, location }) {
        if (!category || !categoryNames.includes(category)) {
            return {
                status: false,
                msg: '任務類別錯誤!',
            };
        }
        const pattern = /^[a-zA-Z0-9\u4e00-\u9fa5，。、！？：；（）【】『』「」“”‘’"'\-—_—+=【】—「」【】《》【】]{1,}$/;

        if (!pattern.test(title)) {
            return {
                status: false,
                msg: '標題包含不正確的符號!',
            };
        }

        if (!pattern.test(description)) {
            return {
                status: false,
                msg: '描述包含不正確的符號!',
            };
        }

        if (!pattern.test(contactInfo.name) || !pattern.test(contactInfo.phone)) {
            return {
                status: false,
                msg: '聯絡資訊包含不正確的符號!',
            };
        }

        if (!pattern.test(location.city) || !pattern.test(location.dist) ||!pattern.test(location.address)) {
            return {
                status: false,
                msg: '地址名稱包含不正確的符號!',
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
            const exposurePlanPrice = getExposurePlanPrices(exposurePlan);
            const totalPay = salary + exposurePlanPrice;
            const totalCoins = taskTrans.superCoin + taskTrans.helperCoin;
            if (totalPay !== totalCoins) {
                return {
                    status: false,
                    msg: '薪水+曝光計畫與超人幣+幫手幣總和不一致!',
                };
            }
        }
        if (!contactInfo || !contactInfo.name || !contactInfo.phone || !contactInfo.email) {
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
        if (!location || !location.city || !location.dist || !location.address) {
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
        if (!imgUrls || !Array.isArray(imgUrls)) {
            return {
                status: false,
                msg: '圖片路徑格式錯誤!',
            };
        }
        if (imgUrls.length > 5) {
            return {
                status: false,
                msg: '超過五張圖片!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    static checkUnpublishEdit({ title, category, description, imgUrls, contactInfo, location }) {
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
        if (!contactInfo || !contactInfo.name || !contactInfo.phone || !contactInfo.email) {
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
        if (!location || !location.city || !location.dist || !location.address) {
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
        if (!imgUrls || !Array.isArray(imgUrls)) {
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
    static checkUploadAcceptance({ submittedInfo }) {
        if (!submittedInfo) {
            return {
                status: false,
                msg: '未提交資訊',
            };
        }
        const { imgUrls, comment } = submittedInfo;
        if (!imgUrls || !Array.isArray(imgUrls)) {
            return {
                status: false,
                msg: '圖片路徑格式錯誤',
            };
        }
        if (!comment) {
            return {
                status: false,
                msg: '未提交留言',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
};
