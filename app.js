var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express()

require('./connections')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', usersRouter)
app.use('/account', accountRouter)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

// 錯誤管理
require('./utils/process')
app.use(notFound)
app.use(resError)

module.exports = app
