const nodemailer = require('nodemailer');
const getHttpResponse = require('./successHandler');
const { appError } = require('./errorHandler');

const mailer = (res, next, user, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.ACCOUNT,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
      accessToken: process.env.accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const options = {
    from: process.env.ACCOUNT,
    to: user.email,
    subject: 'SuperHandy - 驗證用戶信箱',
    html: `
    <h2>驗證用戶信箱</h2>
    <p> ${user.nickName}，您好: <br />
       感謝您註冊 SuperHandy！為了確保您的帳戶安全，請使用以下連結並完成驗證流程：<br />
       驗證成功後，即可登入您的帳戶 <br />
        <a href="http://127.0.0.1:3000/verify-email?token=${token}">驗證連結</a><br />
       驗證連結於一個小時後逾期<br />
       如果你並未要求註冊該網站，你可以略過這則訊息。<br />
    </p>
    <p style=color:gray>本郵件請勿直接回覆。</p>
    `
  };

  transporter.sendMail(options, function(error, info) {
    if(!error) {
      res.status(200).json(getHttpResponse({ 
        message: "請至 Email 查收信件"
      }));
    } else {
      return next(appError(401, 40101, '請稍後重試或聯絡管理員'));
    }
  });
}

module.exports = mailer