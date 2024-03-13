let user = process.env.DB_USER
let password = process.env.DB_PASSWORD
let host = process.env.DB_HOST
let port = process.env.DB_PORT
let dbname = process.env.DB_NAME

let connectionString =`postgres://${user}:${password}@${host}:${port}/${dbname}`

module.exports = {
    connectionString
}