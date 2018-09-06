const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const app = express()

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


app.post('/contest/:year/:month', (req, res) => {
  let body = req.body
  console.info('body-->', body);
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    // fields 所有除了上传内容的对象集合
    // files 上传内容集合
    console.info('fields:--->', fields)
    console.info('files:--->', files)
  })
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