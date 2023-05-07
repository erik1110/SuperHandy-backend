const nodemailer = require('nodemailer');
const getHttpResponse = require('./successHandler');
const { appError } = require('./errorHandler');

const mailer = (res, next, user, token, method) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.ACCOUNT,
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            refreshToken: process.env.refreshToken,
            accessToken: process.env.accessToken,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const optionsVerify = {
        from: process.env.ACCOUNT,
        to: user.email,
        subject: 'SuperHandy - 驗證用戶信箱',
        html: `
    <h2>驗證用戶信箱</h2>
    <p> ${user.nickname}，您好: <br />
       感謝您註冊 SuperHandy！為了確保您的帳戶安全，請使用以下連結並完成驗證流程：<br />
       驗證成功後，即可登入您的帳戶 <br />
        <a href="${process.env.FRONTEND_URL}/auth/verify-email?nickname=${user.nickname}&token=${token}&email=${user.email}">驗證連結</a><br />
       驗證連結於一個小時後逾期<br />
       如果你並未要求註冊該網站，你可以略過這則訊息。<br />
       如果你有任何問題，請聯繫我們：<a href="mailto:${process.env.ACCOUNT}">${process.env.ACCOUNT}</a><br />
    </p>
    <p style=color:gray>本郵件請勿直接回覆。</p>
    `,
    };

    const optionsForgot = {
        from: process.env.ACCOUNT,
        to: user.email,
        subject: 'SuperHandy - 忘記密碼',
        html: `
    <h2>忘記密碼</h2>
    <p> ${user.nickname}，您好: <br />
       您在 SuperHandy 提出了重設密碼的請求，為了確保您的帳戶安全，請使用以下連結：<br />
       點擊連結後，即可重新設定密碼<br />
        <a href="${process.env.FRONTEND_URL}/auth/reset-password?nickname=${user.nickname}&token=${token}&email=${user.email}">重設密碼連結</a><br />
       驗證連結於一個小時後逾期<br />
       如果你並未提出該請求，請您略過這則訊息。<br />
       如果你有任何問題，請聯繫我們：<a href="mailto:${process.env.ACCOUNT}">${process.env.ACCOUNT}</a><br />
    </p>
    <p style=color:gray>本郵件請勿直接回覆。</p>
    `,
    };

    const options = method === 'verify' ? optionsVerify : optionsForgot;
    transporter.sendMail(options, function (error, info) {
        console.log(error);
        if (!error) {
            res.status(200).json(
                getHttpResponse({
                    message: '信件已寄出',
                }),
            );
        } else {
            return next(appError(401, 40101, '請稍後重試或聯絡管理員'));
        }
    });
};

module.exports = mailer;
