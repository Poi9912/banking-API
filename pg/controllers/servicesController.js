const connection = require('./connection')

//get all services
async function getAllServices(){
    try {
        let query = `
        SELECT *
        FROM SERVICES
        `
        let test = await connection.db.any(query);
        return test
    } catch(err){
        console.error(err)
    }
}

//get services by id
async function getServicesById(id){
    try {
        let query = `
        SELECT *
        FROM SERVICES
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

//get services by req_age
async function getServicesByAge(age){
    try {
        let query = `
        SELECT *
        FROM SERVICES
        WHERE REQ_AGE <= $1
        `
        let values = [age]
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

//get services by req_country
async function getServicesByCountry(country){
    try {
        let query = `
        SELECT *
        FROM SERVICES
        WHERE REQ_COUNTRY = $1
        `
        let values = [country]
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

//get services by req_salary
async function getServicesBySalary(salary){
    try {
        let query = `
        SELECT *
        FROM SERVICES
        WHERE REQ_SALARY <= $1
        `
        let values = [salary]
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

//get services by req_age & req_salary
async function getServicesByAgeSalary(age, salary){
    try {
        let query = `
        SELECT *
        FROM SERVICES
        WHERE REQ_AGE <= $1
        AND REQ_SALARY <= $2
        `
        let values = [age, salary]
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

//get services by req_age & req_country
async function getServicesByAgeCountry(age, country){
    try {
        let query = `
        SELECT *
        FROM SERVICES
        WHERE REQ_AGE <= $1
        AND REQ_COUNTRY = $2
        `
        let values = [age, country]
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

//get services by req_age & req_salary & req_country
async function getServicesByAgeSalaryCountry(age, salary, country){
    try {
        let query = `
        SELECT *
        FROM SERVICES
        WHERE REQ_AGE <= $1
        AND REQ_SALARY <= $2
        AND REQ_COUNTRY = $3
        `
        let values = [age, salary, country]
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

//new Service
async function newServices(values){
    try {
        let query = `
        INSERT INTO SERVICES
        (CODE, SERVICE_DESCRIPTION, REQ_AGE, REQ_SALARY, REQ_CITY, REQ_COUNTRY)
        VALUES
        ($1, $2, $3, $4, $5, $6)
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
    getAllServices,
    getServicesById,
    getServicesByAge,
    getServicesByCountry,
    getServicesBySalary,
    getServicesByAgeSalary,
    getServicesByAgeCountry,
    getServicesByAgeSalaryCountry,
    newServices
}