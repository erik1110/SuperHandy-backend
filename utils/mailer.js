const nodemailer = require('nodemailer');
const getHttpResponse = require('./successHandler');
const { appError } = require('./errorHandler');

const mailer = (res, next, user, randomNum) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_SECRET
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const options = {
    from: process.env.MAILER_USER,
    to: user.email,
    subject: 'SuperHandy - 用戶信箱確認',
    html: `
    <h2>用戶信箱確認</h2> 
    <p> ${user.nickName}，您好: <br />
       感謝您註冊 [網站/應用程式名稱]！為了確保您的帳戶安全，請使用以下驗證碼完成驗證流程：<br />
       驗證碼：[輸入驗證碼]<br />
       如果您沒有註冊此帳戶，請忽略此郵件。請注意，此驗證碼將在收到此電子郵件後 [一小時/一天] 後失效。<br />
       謝謝您的配合！<br />
    </p>
    <p style=color:gray>本郵件請勿直接回覆。</p>
    `
  };

  transporter.sendMail(options, function(error, info) {
    if(!error) {
      res.status(201).json(getHttpResponse({ 
        message: "請至 Email 查收信件"
      }));
    } else {
      return next(appError(401, 40101, '請稍後重試或聯絡管理員'));
    }
  });
}

module.exports = mailer