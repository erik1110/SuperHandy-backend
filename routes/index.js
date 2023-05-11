const userRouter = require('./users');
const accountRouter = require('./account');
const homeRouter = require('./home');
const generalRouter = require('./general');
const postTaskRouter = require('./postTask');
const { isAuth } = require('../middleware/auth');
/** 生成 Swagger 套件 */
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

module.exports = (app) => {
    app.use('/', userRouter);
    app.use('/account', accountRouter);
    app.use('/home', homeRouter);
    app.use('/general', generalRouter);
    app.use('/post-task', isAuth, postTaskRouter);
    app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));
};
