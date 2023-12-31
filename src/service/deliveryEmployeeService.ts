import axios from "axios";
import type { DeliveryEmployee } from "../model/deliveryEmployee";
import { validateDeliveryEmployee } from "../validator/deliveryEmployeeValidator";

export const createDeliveryEmployee = async function(deliveryEmployee: DeliveryEmployee, token: string): Promise<number> {
    const error: string = validateDeliveryEmployee(deliveryEmployee)

    if (error != "") {
        throw new Error(error)
    }

    try {
        const response = await axios.post('http://localhost:8080/api/deliveryemployees', deliveryEmployee, { params: { token: token } })

        return response.data
    } catch (e) {
        throw new Error('Could not create delivery employee')
    }
}

export const viewDeliveryEmployees =async function(token: string): Promise<DeliveryEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/deliveryemployees', {params: {token: token}})

        return response.data
    } catch (e) {
        throw new Error('Could not get products')
    }
}
