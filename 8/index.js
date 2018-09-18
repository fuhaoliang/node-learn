const express = require('express')
const http = require('http')
const cookieParser = require('cookie-parser')
const app = express()
const credentials = require('./credentials.js');
const morgan = require('morgan')
const env = app.get('env')
const mongoose = require('mongoose')

//start 数据库操作
mongoose.connect('mongodb://localhost:27017/myDB')
const db = mongoose.connection
// 数据库连接失败
db.on('error', (err) => {
  console.info('error:', err);
})
// 数据连接配置
db.once('open', () => {
  console.info('Success');
  // 建表
  let Schema = mongoose.Schema({
    name: {
      type: String
    },
    age: {
      type: Number,
      default: 0
    },
    time: {
      type:Date,
      default: new Date((new Date()).getTime() + 8 * 60 * 60 * 1000)
    },
    email: {
      type: String,
      default: ''
    }
  })



  // ---> 定义索引
  Schema.index({age: -1})
  
  //Schema - 实例方法(主要用于操作单个实例对象)
  Schema.method('say', function () {
    console.info('普通方法');
  })

  Schema.methods.eat = function () {
    console.info('name:', this.name)
  }


  //Schema - 静态方法 (可以在Model层使用)--------------------------<<>>
  // 主要用于增删改查的公共方法
  Schema.static('findToAge', function(age, callback){
    return this.find({age: {$lt: age}}, callback)
  })


  // 建库
  let Model = mongoose.model('userInfo', Schema)

  // 模拟数据
  let doc = new Model({
    name: 'fhl',
    age: 34,
  })

  // 插入
  doc.save((err, doc) => {
    if(err) return console.info('err', err)
    doc.eat()
    Model.find({}, (err, data) => {
      console.info('model', data)
    })
    Model.findToAge(30, function (err, data) {
      console.info('age<30', data)
    })
  })
  // 更新 Model.update(condition,doc,[options],[callback]);
  // options :multi 是否是全部 true / false
  Model.update({age:34}, {$set:{age:16}}, {multi: true},(err, data)=> {
    console.info('updata', data);
  })
})


//end 数据库操作

app.get('/about', (req, res) => {
  res.send('about')
})

app.get('/error', (req, res) => {
  res.status(500)
  res.send('error')
})

app.use((err, req, res, next) => {
  console.error('error:', err.stack)
  res.status(500).send('500!')
})

app.use((req, res) => {
  console.info('404');
  res.status(404).send('404!:')
})

let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.info('server:'+ host + ':'+ port );
})