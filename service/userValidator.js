const validator = require('validator');

module.exports = class Validator {
    /**
     *
     * @param {Object} param0 { email, password, confirmPassword } 要驗證資料項目
     * @param {Next} next
     * @returns {status,msg}
     */
    static signUpCheck({ email, password, confirmPassword }) {
        if (!email || !password || !confirmPassword) {
            return {
                status: false,
                msg: '欄位未填寫正確!',
            };
        }
        if (password !== confirmPassword) {
            return {
                status: false,
                msg: '密碼不一致!',
            };
        }
        if (!validator.isEmail(email)) {
            return {
                status: false,
                msg: 'Email 格式不正確!',
            };
        }

        if (!validator.isLength(password, { min: 8 })) {
            return {
                status: false,
                msg: '密碼少於8位數!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    /**
     *
     * @param {Object} param0 { email } 要驗證資料項目
     * @param {Next} next
     * @returns {status,msg}
     */
    static emailCheck({ email }) {
        if (!email) {
            return {
                status: false,
                msg: '欄位未填寫正確!',
            };
        }
        if (!validator.isEmail(email)) {
            return {
                status: false,
                msg: 'Email 格式不正確!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    /**
     *
     * @param {Object} param0
     * @param {Next} next
     * @returns {status,msg}
     */
    static signUp({ firstName, lastName, email, phone, password, confirmPassword }) {
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            return {
                status: false,
                msg: '欄位未填寫正確!',
            };
        }
        if (password !== confirmPassword) {
            return {
                status: false,
                msg: '密碼不一致!',
            };
        }
        if (!validator.isEmail(email)) {
            return {
                status: false,
                msg: 'Email 格式不正確!',
            };
        }

        if (!validator.isLength(password, { min: 8 })) {
            return {
                status: false,
                msg: '密碼少於8位數!',
            };
        }
        if (!validator.isMobilePhone(phone, 'zh-TW')) {
            return {
                status: false,
                msg: '電話號碼不正確!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    static signIn({ account, password }) {
        if (!account || !password) {
            return {
                status: false,
                msg: '帳號密碼不可為空!',
            };
        }
        let isEmail = validator.isEmail(account);
        let isPhone = validator.isMobilePhone(account, 'zh-TW');
        if (!isEmail && !isPhone) {
            return {
                status: false,
                msg: '帳號或密碼不正確',
            };
        }
        if (!validator.isLength(password, { min: 8 })) {
            return {
                status: false,
                msg: '帳號或密碼不正確!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    static forgotPw({ password, confirmPassword }) {
        if (!password || !confirmPassword) {
            return {
                status: false,
                msg: '請填寫新密碼、確認密碼!',
            };
        }
        if (password !== confirmPassword) {
            return {
                status: false,
                msg: '新密碼和確認密碼不一致!',
            };
        }
        if (!validator.isLength(password, { min: 8 })) {
            return {
                status: false,
                msg: '密碼少於8位數!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
    static updatePw({ password, confirmPassword, oldPassword }) {
        if (!password || !confirmPassword || !oldPassword) {
            return {
                status: false,
                msg: '請填寫舊密碼、新密碼和確認密碼!',
            };
        }
        if (password === oldPassword) {
            return {
                status: false,
                msg: '新密碼與舊密碼相同!',
            };
        }
        if (password !== confirmPassword) {
            return {
                status: false,
                msg: '新密碼和確認密碼不一致!',
            };
        }
        if (!validator.isLength(password, { min: 8 })) {
            return {
                status: false,
                msg: '密碼少於8位數!',
            };
        }
        return {
            status: true,
            msg: 'success',
        };
    }
};
