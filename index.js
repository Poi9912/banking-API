const express = require('express')
const app = express()
const apiKey = process.env.API_KEY

//routers for the 2 different clients
const customer = require('./routers/customer')
const finance = require('./routers/finance')

app.use('/customer',customer)
app.use('/finance',finance)

app.listen(process.env.PORT)