const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const AutoRoutes = require('./autoRoutes')
require('./db')
const app = new Koa()
app.use(bodyParser())

AutoRoutes.auto(app)

app.listen(8888, () => {
  console.log(`The server is running at http://localhost:${8888}`)
})
