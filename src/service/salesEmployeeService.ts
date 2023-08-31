import { SalesEmployee } from "../model/salesEmployee";
const employeeValidator = require("../validator/employeeValidator")
const axios = require('axios');

module.exports.addSalesEmployee = async function (salesEmployee: SalesEmployee) : Promise<SalesEmployee> {
    const error:string = employeeValidator.validateEmployee(salesEmployee)

    if(error)
    {
        throw new Error(error)
    }

    try{
        const response = await axios.post('http://localhost:8080/api/SalesEmployee/', salesEmployee)
        return response.data
    }
    catch(e){
        console.error(e)
        throw new Error("Could not create sales employee");
    }
}
