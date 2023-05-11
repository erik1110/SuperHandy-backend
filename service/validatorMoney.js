module.exports = class ValidatorMoney {
    /**
     *
     * @param {Object} param0 { money } 要驗證的金額
     * @param {Next} next
     * @returns {status,msg}
     */
    static checkPurchasePlan({ money }) {
        if (!money) {
            return {
                status: false,
                msg: '欄位未填寫正確!',
            };
        }
        if (money <= 0) {
            return {
                status: false,
                msg: '金額異常',
            };
        }
        if (![100, 500, 1000].includes(money)) {
            return {
                status: false,
                msg: '購買金額不是目前有的方案'
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
};
