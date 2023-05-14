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
                msg: '購買金額不是目前有的方案',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    /**
     *
     * @param {Object} param0 { point } 要驗證點數
     * @param {Next} next
     * @returns {status,msg}
     */
    static checkCashback({ point, bank, bankNo, bankAcct }) {
        if (!point || !bank || !bankNo || !bankAcct) {
            return {
                status: false,
                msg: '欄位未填寫正確!',
            };
        }
        if (bankNo.length != 3) {
            return {
                status: false,
                msg: '銀行代碼長度非3碼',
            };
        }
        if (bankAcct.length != 14) {
            return {
                status: false,
                msg: '銀行帳號長度非14碼',
            };
        }
        if (point < 300) {
            return {
                status: false,
                msg: '兌換最少需要 300 超人幣',
            };
        }
        if (point % 100 !== 0) {
            return {
                status: false,
                msg: '兌換點數必須以 100 為單位',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
};
