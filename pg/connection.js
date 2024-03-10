import postgres from 'postgres'

config = require('./config.json')

const sql = postgres('postgres://username:password@host:port/database',config)

module.exports = sql