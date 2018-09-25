/**
 * Created by wangyipeng on 2017/9/26.
 */
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')


module.exports = {
  auto (app) {
    console.info('autoRoutes--------->')
    const files = fs.readdirSync(path.join(__dirname, 'controllers'))

    const jsFiles = files.filter(f => f.endsWith('.js'), files)

    // 控制器文件
    for (const f of jsFiles) {
      console.log(`import controller from file ${f}...`)
      const name = f.substring(0, f.length - 3)
      exports[name] = require(`./controllers/${f}`)
      router.use(`/api`, exports[name].routes(), exports[name].allowedMethods())
      app.use(exports[name].routes(), exports[name].allowedMethods())
    }
  }
}
