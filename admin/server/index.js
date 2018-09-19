const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
// 父级路由
const router = new Router()
app.use(bodyParser());

// 注册
const registerRouter = new Router()
registerRouter.post('/register');

//装载上面四个子路由
router.use('/api',registerRouter.routes(),registerRouter.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888);
});