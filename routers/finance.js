const express = require('express')
const finance = express.Router()
const servicesController = require('../pg/controllers/servicesController')

const logger = (req, res, next) => {
    console.log('Finance Logger')
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

finance.use(logger)
finance.use(express.json())

//query
finance.get('/services', async (req, res) => {
    let age = req.query.age
    let salary = req.query.salary
    let country = req.query.country

    //only age
    if(typeof age !== 'undefined' && typeof salary == 'undefined' && typeof country == 'undefined'){
        try {
            servicesController.getServicesByAge(age).then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No services by age :'+ age))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } catch(err) {
            res.status(500).send(new Error('Internal Service error'))
        }
    }

    //only salary
    if(typeof age == 'undefined' && typeof salary !== 'undefined' && typeof country == 'undefined'){
        try {
            servicesController.getServicesBySalary(salary).then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No services by salary :'+ salary))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } catch(err) {
            res.status(500).send(new Error('Internal Service error'))
        }
    }

    //only country
    if(typeof age == 'undefined' && typeof salary == 'undefined' && typeof country !== 'undefined'){
        try {
            servicesController.getServicesByCountry(country).then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No services by country :'+ country))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } catch(err) {
            res.status(500).send(new Error('Internal Service error'))
        }
    }

    //age & salary
    if(typeof age !== 'undefined' && typeof salary !== 'undefined' && typeof country == 'undefined'){
        try {
            servicesController.getServicesByAgeSalary(age,salary).then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No services by age :'+ age + ' and salary: ' + salary))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } catch(err) {
            res.status(500).send(new Error('Internal Service error'))
        }
    }

    //age & country
    if(typeof age !== 'undefined' && typeof salary == 'undefined' && typeof country !== 'undefined'){
        try {
            servicesController.getServicesByAgeCountry(age,country).then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No services by age :'+ age + ' and country: ' + country))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } catch(err) {
            res.status(500).send(new Error('Internal Service error'))
        }
    }

    //age & salary
    if(typeof age !== 'undefined' && typeof salary !== 'undefined' && typeof country !== 'undefined'){
        try {
            servicesController.getServicesByAgeSalaryCountry(age,salary,country).then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No services by age :'+ age + ' , salary: ' + salary + ' and country: ' + country))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } catch(err) {
            res.status(500).send(new Error('Internal Service error'))
        }
    }

    //age & salary
    if(typeof age == 'undefined' && typeof salary == 'undefined' && typeof country == 'undefined'){
        try {
            servicesController.getAllServices().then((output) => {
                if (output.length === 0) {
                    res.status(404).send(new Error('No services'))
                } else {
                    res.status(200).send({status:200,data:output})
                }
            })
        } catch(err) {
            res.status(500).send(new Error('Internal Service error'))
        }
    }
})

finance.get('/services/:id', async (req, res) => {
    let id = req.params.id
    try {
        servicesController.getServicesById(id).then((output) => {
            if (output.length === 0) {
                res.status(404).send(new Error('No services by id :'+ id))
            } else {
                res.status(200).send({status:200,data:output})
            }
        })
    } catch(err) {
        res.status(500).send(new Error('Internal Service error'))
    }
})

finance.post('/services', async (req, res) => {
    let insertValues = [
        req.body.code,
        req.body.service_description,
        req.body.req_age,
        req.body.req_salary,
        req.body.req_city,
        req.body.req_country,
    ]
    try {
        servicesController.newServices(insertValues).then((output) => {
            res.status(200).send({status:200,data:req.body})
        })
    } catch(err) {
        res.status(500).send(new Error('Internal Service error'))
    }
})

module.exports = finance