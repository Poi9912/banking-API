import sql from '../connection'

async function getAllServices(){
    let services = await sql`
        SELECT CODE, SERVICE_DESCRIPTION, REQ_AGE, REQ_SALARY
        FROM SERVICES
    `

    return services
}

async function getServicesByAgeSalary(age, salary){
    let services = await sql`
        SELECT CODE, SERVICE_DESCRIPTION, REQ_AGE, REQ_SALARY
        FROM SERVICES
        WHERE REQ_AGE <= ${ age } 
        AND REQ_SALARY <= ${ salary }
    `

    return services
}

modules.export = {
    getAllServices,
    getServicesByAgeSalary
}