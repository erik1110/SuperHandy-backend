const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const { appError, errorHandlerMainProcess } = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./connections');
require('./routes')(app);

// 錯誤管理
app.use(errorHandlerMainProcess);
app.use((req, res, next) => {
    next(appError(404, '40401', '無此路由資訊'));
});
require('./utils/process');

module.exports = app;
