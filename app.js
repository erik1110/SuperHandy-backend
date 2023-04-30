var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const notFound = require('./middleware/notFound');
const resError = require('./middleware/resError');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./connections');
require("./routes")(app);

// 錯誤管理
require("./utils/process");
app.use(notFound);
app.use(resError);

module.exports = app;
