// 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myDB', {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log('Connection Error:' + err)
  } else {
    console.log('Connection success!')
  }
})
const db = mongoose.connection

// 失败配置
// db.on('error', (err) => {
//   console.info('err--->连接', err)
// })

// db.on('open', () => {
//   console.info('success BD!!!')
// })

// 建表
let Schema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  time: {
    type: Date,
    default: new Date((new Date()).getTime() + 8 * 60 * 60 * 1000)
  }
})
// 索引
// Schame.index({time: 1})

// 连接库
const User = mongoose.model('userInfo', Schema)

module.exports = {
  User
}
