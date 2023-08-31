import axios from "axios";
import e from "express";
import { DeliveryEmployee } from "../model/deliveryEmployee";
const deliveryEmployeeValidator = require('../validator/deliveryEmployeeValidator');

module.exports.createDeliveryEmployee = async function(deliveryEmployee: DeliveryEmployee, token: string): Promise<number> {
    const error: string = deliveryEmployeeValidator.validateDeliveryEmployee(deliveryEmployee)

    if (error) {
        throw new Error(error)
    }

    try {
        const response = await axios.post('http://localhost:8080/api/deliveryemployees', deliveryEmployee, { params: { token: token } })

        return response.data
    } catch (e) {
        throw new Error('Could not create delivery employee')
    }
}
