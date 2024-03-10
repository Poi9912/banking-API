var express = require('express')
var app = express()

//routers for the 2 different clients
const customer = require('./routers/customer')
const finance = require('./routers/finance')

app.use('/customer',customer)
app.use('/finance',finance)

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000)