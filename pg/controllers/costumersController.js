const connection = require('./connection')

//get all Customers
async function getAllCustomers(){
    try {
        let query = `
        SELECT ID, CODE, FULL_NAME, CITY, COUNTRY, AGE, SALARY, PHONE
        FROM CUSTOMERS
        `
        let test = await connection.db.any(query);
        return test
    } catch(err){
        console.error(err)
    }
}

//get Customers by code
async function getCustomerByCode(code){
    try {
        let query = `
        SELECT ID, CODE, FULL_NAME, CITY, COUNTRY, AGE, SALARY, PHONE
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

//get Customers by id
async function getCustomerById(id){
    try {
        let query = `
        SELECT ID, CODE, FULL_NAME, CITY, COUNTRY, AGE, SALARY, PHONE
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

//new Customer
async function newCustomers(values){
    try {
        let query = `
        INSERT INTO CUSTOMERS
        (CODE, FULL_NAME, CUSTOMER_PASSWORD, CITY, COUNTRY, AGE, SALARY, PHONE)
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

async function logginCustomer(phone){
    try {
        let query = `
        SELECT ID
        FROM CUSTOMERS
        WHERE PHONE = $1
        `
        let values = [phone]
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

//connect as customer session
async function verifyHassedPassword(id, secret){
    try {
        let query = `
        SELECT CUSTOMER_PASSWORD
        FROM CUSTOMERS
        WHERE ID = $1
        `
        let values = [id, secret]
        let test = await connection.db.any(
            {
                text: query,
                values: values
            }
        );

        console.log(test)
        
        if(test[0] == secret) {
            return {
                id:id,
                loggin: True
            }
        }

        else {
            return {
                id:id,
                loggin: False
            }
        }
    } catch(err){
        console.error(err)
    }
}


module.exports = {
    getAllCustomers,
    getCustomerByCode,
    getCustomerById,
    newCustomers,
    logginCustomer,
    verifyHassedPassword
}