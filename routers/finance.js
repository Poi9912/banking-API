var express = require('express')
const finance = express.Router()

const logger = (req, res, next) => {
    console.log('Customer Logger')
    console.log('Time: %d', Date.now())
    next()
}

finance.use(logger)

finance.get('/', (req, res) => {
    res.send('Finance')
})

module.exports = finance