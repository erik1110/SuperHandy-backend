const categories = require('../db/initCategories');
const categoryNames = categories.categories.map((cat) => cat.name);

module.exports = class reviewValidator {
    /**
     *
     * @param {Object} param0 { money } 要驗證的金額
     * @param {Next} next
     * @returns {status,msg}
     */
    static checkReview({ role, categories, reviewStatus, yourStar }) {
        if (!role) {
            return {
                status: false,
                msg: '缺少角色參數',
            };
        }
        categories = categories ? categories.split(',') : [];
        if (categories && categories.some((category) => !categoryNames.includes(category))) {
            return {
                status: false,
                msg: '不存在的服務類別',
            };
        }
        if (reviewStatus && !['待評價', '已評價'].includes(reviewStatus)) {
            return {
                status: false,
                msg: '評價狀態錯誤',
            };
        }
        if (yourStar && ![1, 2, 3, 4, 5].includes(Number(yourStar))) {
            return {
                status: false,
                msg: '不存在的星星數',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
};
