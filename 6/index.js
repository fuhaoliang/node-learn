const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const multer = require('multer')
const mongoose = require('mongoose')
const app = express()
var Users = require('./models/User');//导入模型数据模块

var router = express.Router();
// 连接数据库
mongoose.connect('mongodb://localhost/first_mongodb')

let db = mongoose.connection
db.on('open', function(){
  console.log('MongoDB Connection Successed');
});
// 连接失败
db.on('error', function(){
  console.log('MongoDB Connection Error');
})
// 查询数据
app.get('/users', function(req, res, next) {
  Users.fetch(function(err, users) {
      if(err) {
          console.log(err);
      }        
      res.json({data: users});  //这里也可以json的格式直接返回数据res.json({data: users});
  })
})

// 测试！！！！！
const classSchema = new mongoose.Schema({
  name: String,
  studentId: Number
})

const classModel = mongoose.model('newClass', classSchema) 

app.get('/add' ,(req, res) => {
  let newStudent = [{
    name: '小明3333',
    studentId: '002'
  }]
  classModel.create(newStudent, (err) => {
    if(err) return console.log(err)
    console.info('添加成功')
    res.send("添加成功!")
  })
})

let storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
     destination: function (req, file, cb) {
         cb(null, __dirname + '/uploads')
    }, 
  //给上传文件重命名，获取添加后缀名
   filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
   }
})

let upload = multer({
  storage: storage
})
  //添加配置文件到m
app.use(bodyParser())
app.get('/about', (req, res) => {
  res.send('about')
})

app.get('/error', (req, res) => {
  res.status(500)
  res.send('error')
})

app.get('/cookies', (req, res) => {
  res.cookie('setCookies', '666')
  res.send('I test set Cookies')
})

app.get('/server', (req, res) => {
  res.status(200)
  res.sendFile(__dirname + '/static/server.html')
})

app.get('/client', (req, res) => {
  res.status(200)
  res.sendFile(__dirname + '/static/client.html')
})

let cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'photos', maxCount: 8 }, { name:'ajaxPhoto', maxCount: 8}])
app.post('/contest/:year/:month', cpUpload, (req, res, next) => {
  console.info('files', req.files)
  console.info('body', req.body);
  res.send('ok')
})
// 提供一個api

let tours= [{
  id:0, name: 'Hood River', price: 99.99
},{
  id:1, name: 'Orgen', price: 8.60
}]

app.get('/api/tours', (req, res) => {
  res.status(200)
  res.json(tours)
})

// put更新節點
app.put('/api/tour/:id', (req, res) => {
  let putIndex = -1
  let bl = tours.some((item, index, arr) => {
    putIndex = index
    return item.id == req.params.id
  })
  if (bl) {
    let item = tours[putIndex]
    let { name, price } = req.query
    name ? item.name = name : ''
    price ? item.price = price : ''
    res.json({success: true, item: item})
  } else {
    res.json({errpr: 'No such tour exists.'})
  }
})


//del刪除節點
app.del('/api/tour/:id', (req, res) => {
  let delIndex = -1
  let bl = tours.some((item, index, arr) => {
    delIndex = index
    return item.id == req.params.id
  })
  if (bl) {
    tours.splice(delIndex, 1)
    res.json({success: true, tours})
  } else {
    res.json({errpr: 'No such tour exists.'})
  }
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