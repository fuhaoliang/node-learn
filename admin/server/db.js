const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myDB')

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', () => {
  console.info('数据库连接失败')
})

db.once('open', () => {
  console.info('数据库连接成功')
})

//表
const userSchame = mongoose.Schema({
  userName: {
    type: String,
    min:6,
    max:12,
    require: true
  },
  password: {
    type: String,
    min:6,
    max:12,
    require: true
  },
  age: Number,
  token: {
    type: String
  },
  create_time: {
    type: Date,
    default: new Date((new Date()).getTime() + 8 * 60 * 60 * 1000)
  },
  userAvatar: {
    type: String
  }
})

const User = mongoose.model('User', userSchame)

module.exports = User


