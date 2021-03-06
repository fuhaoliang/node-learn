const express = require('express')
const http = require('http')
const cookieParser = require('cookie-parser')
const app = express()
const credentials = require('./credentials.js');
const morgan = require('morgan')
const env = app.get('env')
console.info('env--->', env)
app.use(require('cookie-parser')(credentials.cookieSecret))
app.use(morgan('dev'))

app.get('/about', (req, res) => {
  res.send('about')
})

app.get('/error', (req, res) => {
  res.status(500)
  res.send('error')
})

app.get('/cookies', (req, res) => {

  res.cookie('monster', 'nom nom', { maxAge: 24*60*60*1000});
  // secure: true 
  res.cookie('signed_monster', 'nom nom', { signed: true,  httpOnly: true, maxAge: 24*60*60*1000 });
  res.send('I test set Cookies')

  var monster = req.cookies.monster;
  var signedMonster = req.signedCookies.signed_monster;
  console.info('monster', monster)
  console.info('signedMonster', signedMonster)
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