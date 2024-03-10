import sql from '../connection'

async function getCustomerByCode(code) {
    let customers = await sql`
        SELECT ID, CODE, FULL_NAME, AGE, SALARY
        FROM CUSTOMERS
        WHERE CODE = ${ code }
    `

    return customers
}

async function newCustomer(code, full_name, age, salary){
    let customers = await sql`
        INSERT INTO CUSTOMERS
            (CODE, FULL_NAME, AGE, SALARY)
        VALUES
            (${ code }, ${ full_name }, ${ age }, ${ salary })
        returning CODE, FULL_NAME, AGE, SALARY
    `
    return customers
}

async function deleteCustomer(code, full_name, age, salary){
    let customers = await sql`
        INSERT INTO CUSTOMERS
            (CODE, FULL_NAME, AGE, SALARY)
        VALUES
            (${ code }, ${ full_name }, ${ age }, ${ salary })
        returning CODE, FULL_NAME, AGE, SALARY
    `
    return 0
}

module.exports = {
    getCustomerByCode,
    newCustomer
}