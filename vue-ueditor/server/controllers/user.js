/**
 * Created by wangyipeng on 2017/9/27.
 */
const router = require('koa-router')()
const User = require('../db')
const userTools = require('../tools/user')
const checkToken = require('../token/checkToken')

// 注册
router.post('/register', async function (ctx, next) {
  ctx = await userTools.reg(ctx)
})

// 登陆
router.post('/login', async function (ctx, next) {
  await userTools.login(ctx)
})

//获取用户
router.get('/users', async function (ctx, next) {
  let data = await userTools.findAllUsers()
  ctx.status = 200;
  ctx.body = {
    success: true,
    code: -1,
    data: data
  };
})

//删除用户
router.post('/delUser', async function (ctx, next) {
  let ctxData = await checkToken(ctx, next)
  console.info('ctxData', ctxData)
  if (ctxData.status !== 200) return ctx = ctxData
  let id = ctx.request.body.id
  let doc = await userTools.delUser(id)
  console.info(doc)
  ctx.status = 200;
  ctx.body = {
    success: true,
    code: -1,
    msg:'删除'+ doc.userName
  };
})
module.exports = router
