const express = require('express')
const app = express()
const apiKey = process.env.API_KEY
//const http = require('http')
const https = require('https')
const fs = require('fs')
const port = process.env.PORT || 3000

const credentials = {
    key: fs.readFileSync(__dirname + '/ssl/localhost.key'),
    cert: fs.readFileSync(__dirname + '/ssl/localhost.crt')
}

//routers for the 2 different clients
const customer = require('./routers/customer')
const finance = require('./routers/finance')

app.use('/customer',customer)
app.use('/finance',finance)

app.get('/', (req, res) => {
    console.log('API')
    res.send('API')
})

const server = https.createServer(credentials, app)

server.listen(port, () => {
    console.log('Express listening over HTTPS on port: ' + port)
})
