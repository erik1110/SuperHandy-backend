const swaggerAutogen = require('swagger-autogen')();
const definitions = require("./swagger-defintion");

const doc = {
    info: {
        title: 'SuperHandy 超人幫手',
        description: 'This is the final project for a Node.js course.'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    tags: [
        { name: "Home", description: "首頁" },
        { name: "Find-tasks", description: "找任務" },
        { name: "Posts", description: "刊登任務" },
        { name: "Account", description: "我的帳號" },
        { name: "Sign-in", description: "登入相關" },
        { name: "Tasks", description: "任務管理" },
        { name: "Notifications", description: "系統通知" },
        { name: "Chat", description: "聊天室" },
        { name: "Money", description: "金流相關" },
        { name: "General", description: "通用" },
        { name: "NotFound", description: "頁面路由相關" }
      ],
    definitions,
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
}

const outputFile = './swagger-output.json'
const endpoiontsFiles = ['./app.js']

swaggerAutogen(outputFile, endpoiontsFiles, doc);
