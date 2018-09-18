/**
 * Created by wangyipeng on 2017/9/26.
 */
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

export default {
  auto(app) {
    console.info('autoRoutes--------->')
    let files = fs.readdirSync(path.join(__dirname, 'controllers'))

    let jsFiles = files.filter((f) => {
      return f.endsWith('.js')
    }, files)

    // 控制器文件
    for (let f of jsFiles) {
      console.log(`import controller from file ${f}...`)
      let name = f.substring(0, f.length - 3)
      exports[name] = require('./controllers/' + f)
      console.info('name', name)
      router.use('/' + name, exports[name].routes(), exports[name].allowedMethods())
      app.use(exports[name].routes(), exports[name].allowedMethods())
    }
  }
}