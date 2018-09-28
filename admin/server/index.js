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

app.listen(8888, () => {
  console.log(`The server is running at http://localhost:${8888}`)
})
