var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const notFound = require('./middleware/notFound');
const resError = require('./middleware/resError');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();

require('./connections');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

// 錯誤管理
require("./service/process");
app.use(notFound);
app.use(resError);

module.exports = app;
