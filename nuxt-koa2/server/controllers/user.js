/**
 * Created by wangyipeng on 2017/9/27.
 */

import {User} from '../db'
console.info('User', User)
const router = require('koa-router')()
router.post('/login', (ctx, next) => {
  ctx.body = 'ok'
  let msg = ctx.request.body
  let user = new User({
    ...msg
  })
  user.save((err, doc) => {
    if (err) return console.info('err', err)
    console.info('数据插入成功')
  })
  console.info('ctx', msg)
})

module.exports = router
