const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const AutoRoutes = require('./autoRoutes')
const static = require('koa-static');
require('./db')
const app = new Koa()

//设置静态资源
app.use(static(__dirname + '/uploads'));
app.use(bodyParser())

AutoRoutes.auto(app)

const server = app.listen(8888, 'localhost', function () {
  const host = server.address().address
  const port = server.address().port
  global.server = {
    host: host,
    port: port
  }
  console.info('server.address()', server.address())
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

