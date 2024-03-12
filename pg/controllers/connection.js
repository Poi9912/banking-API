const pgp = require('pg-promise')({
    connect: () => {
        console.log('Connected to database')
    },
    disconnect: () => {
        console.log('Disconnecting from database')
    }
})
const config = require('./config.json')
console.log('creating pg client')
console.log('creating pg client connection')
const cn='postgres://postgres:Manager1@localhost:5432/postgres'
const db = pgp(cn)

module.exports = {
    db
}