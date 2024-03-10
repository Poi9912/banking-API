var express = require('express')
const customer = express.Router()

const logger = (req, res, next) => {
    console.log('Customer Logger')
    console.log('Time: %d', Date.now())
    next()
}

customer.use(logger)

customer.get('/', (req, res) => {
    res.send('Customers')
})

module.exports = customer