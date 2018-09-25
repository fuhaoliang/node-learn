/**
 * Created by wangyipeng on 2017/9/27.
 */
const router = require('koa-router')()
const User = require('../db')
const userTools = require('../tools/user')

// 注册
router.post('/register', async function (ctx, next) {
  await userTools.reg(ctx)
})

// 登陆
router.post('/login', async function (ctx, next) {
  await userTools.login(ctx)
})

//获取用户
router.get('/user', async function (ctx, next) {
  ctx.body = 'user ok!'
})

//删除用户
router.post('/delUser', async function (ctx, next) {
  ctx.body = 'delUser ok!'
})
module.exports = router
