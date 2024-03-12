const connection = require('./connection')

//get all customers
async function getAllCustomers(){
    try {
        let query = `
        SELECT *
        FROM CUSTOMERS
        `
        let test = await connection.db.any(query);
        return test
    } catch(err){
        console.error(err)
    }
}

//get customers by id
async function getCustomersById(id){
    try {
        let query = `
        SELECT *
        FROM CUSTOMERS
        WHERE ID = $1
        `
        let values = [id]
        let test = await connection.db.any(
            {
                text: query,
                values: values
            }
        );
        return test
    } catch(err){
        console.error(err)
    }
}

//get customers by code
async function getCustomersById(code){
    try {
        let query = `
        SELECT *
        FROM CUSTOMERS
        WHERE CODE = $1
        `
        let values = [code]
        let test = await connection.db.any(
            {
                text: query,
                values: values
            }
        );
        return test
    } catch(err){
        console.error(err)
    }
}

//new Customer
async function newCustomers(values){
    try {
        let query = `
        INSERT INTO CUSTOMERS
        (CODE, FULLNAME, CUSTOMER_PASSWORD, CITY, COUNTRY, AGE, SALARY, PHONE)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        let test = await connection.db.any(
            {
                text: query,
                values: values
            }
        );
        return test
    } catch(err){
        console.error(err)
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    newCustomers
}