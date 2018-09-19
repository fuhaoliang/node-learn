const express = require('express');
const http = require('http')

const app = express()


app.get('/', (req, res) => {
  res.send('Hello world')
})
// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.get('/home', (req, res) => {
  res.send('home!!!')
})

let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.info(`server--->${host}:${port}`);
})