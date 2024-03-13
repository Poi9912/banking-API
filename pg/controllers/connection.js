const pgp = require('pg-promise')({
    connect: () => {
        console.log('Connected to database')
    },
    disconnect: () => {
        console.log('Disconnecting from database')
    }
})
const config = require('./config')
console.log('creating pg client')
console.log('creating pg client connection')

const db = pgp(config.connectionString)

module.exports = {
    db
}