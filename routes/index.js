const userRouter = require('./users')
const accountRouter = require('./account')
const postTaskRouter = require('./postTask')
const { isAuth } = require('../middleware/auth')
const getHttpResponse = require('../utils/successHandler')
/** 生成 Swagger 套件 */
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

module.exports = (app) => {
  app.use('/', userRouter)
  app.use('/account', accountRouter)
  app.use('/post-task', postTaskRouter)
  app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))
}
