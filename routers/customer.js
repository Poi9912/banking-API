const express = require('express')
const customer = express.Router()
const crypto = require('node:crypto')
const hash = crypto.createHash('sha256')

const customersController = require('../pg/controllers/costumersController')

const logger = (req, res, next) => {
    console.log('Customer Logger')
    let dt = new Date()
    let padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
    console.log(`TIME: ${
        dt.getFullYear()}/${
        padL(dt.getMonth()+1)}/${
        padL(dt.getDate())} ${
        padL(dt.getHours())}:${
        padL(dt.getMinutes())}:${
        padL(dt.getSeconds())} - Operation ${req.originalUrl}`
    )
    next()
}
customer.use(logger)
customer.use(express.json())

customer.get('/customers', async (req, res) => {
    let code = req.query.code
    try {
        if (typeof code !== 'undefined'){
            customersController.getCustomerByCode(code).then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No customers by code: '+ code))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } else {
            customersController.getAllCustomers().then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No customers'))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        }
    } catch(err) {
        
    }
})

customer.get('/customers/:id', async (req, res) => {
    let id = req.params.id
    try {
        customersController.getCustomerById(id).then((output) => {
            if (output.length === 0) {
                res.status(404).send(new Error('No customers by id :'+ id))
            } else {
                res.status(200).send({status:200,data:output})
            }
        })
    } catch(err) {
        res.status(500).send(new Error('Internal Service error'))
    }
})

customer.post('/customers', async (req, res) => {
    let password = hash.update(req.body.customer_password).digest('hex')
    let insertValues = [
        req.body.code,
        req.body.full_name,
        password,
        req.body.city,
        req.body.country,
        req.body.age,
        req.body.salary,
        req.body.phone,
    ]
    try {
        servicesController.newServices(insertValues).then((output) => {
            res.status(200).send({status:200,data:req.body})
        })
    } catch(err) {
        res.status(500).send(new Error('Internal Service error'))
    }
})

customer.post('/login', async (req, res) => {
    let userPhone = req.body.phone
    let userPass = hash.update(req.body.customer_password).digest('hex')
    let id
    
    customersController.logginCustomer(userPhone).then((output) => {
        if (output.length !== 0) {
            //gets customer id
            id=output.id
            //verify the db hash with the user provided hash
            customersController.verifyHassedPassword(id, userPass).then((output2) => {
                if(output2.loggin){
                    //send session jwt
                    let sessionJwt = 'CorrectLogin101'
                    res.status(200).send({status:200, loggin:output2.loggin, jwt: sessionJwt})
                } else {
                    res.status(401).send({status:401, message: 'Incorrect credentials'})
                }
            })
        } else {
            res.status(401).send({status:401, message: 'Incorrect credentials'})
        }
    })
})

module.exports = customer