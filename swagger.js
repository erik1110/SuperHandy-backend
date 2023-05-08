const swaggerAutogen = require('swagger-autogen')();
const definitions = require('./swagger-defintion');

const doc = {
    info: {
        title: 'SuperHandy 超人幫手',
        description: 'This is the final project for a Node.js course.',
    },
    host: process.env.FRONTEND_URL,
    schemes: ['http', 'https'],
    tags: [
        { name: 'Home', description: '首頁' },
        { name: 'Find-tasks', description: '找任務' },
        { name: 'Posts', description: '刊登任務' },
        { name: 'Account', description: '我的帳號' },
        { name: 'Sign-in', description: '登入相關' },
        { name: 'Tasks', description: '任務管理' },
        { name: 'Notifications', description: '系統通知' },
        { name: 'Chat', description: '聊天室' },
        { name: 'Money', description: '金流相關' },
        { name: 'General', description: '通用' },
        { name: 'NotFound', description: '頁面路由相關' },
    ],
    definitions,
    securityDefinitions: {
        // Token
        Bearer: {
            type: 'apiKey',
            in: 'header', // can be "header", "query" or "cookie"
            name: 'Authorization', // name of the header, query parameter or cookie
            description: 'JWT Token',
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; // 進入點/注入點，分析 router 和自動生成

swaggerAutogen(outputFile, endpointsFiles, doc);
