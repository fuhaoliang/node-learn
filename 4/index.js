const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const multer = require('multer')
const app = express()

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

let cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'photos', maxCount: 8 }])
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