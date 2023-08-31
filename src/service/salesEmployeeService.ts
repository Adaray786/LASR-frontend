import type {SalesEmployee } from "../model/salesEmployee";
import  {validateEmployee} from "../validator/employeeValidator";
import axios from "axios";

export const addSalesEmployee =  async function (salesEmployee: SalesEmployee) : Promise<Number> {
    const error:string = validateEmployee(salesEmployee)
    
    if(error.length > 1)
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
