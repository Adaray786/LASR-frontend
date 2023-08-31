import axios from "axios";

import type { DeliveryEmployee } from "../model/deliveryEmployee";
import { validateDeliveryEmployee } from "../validator/deliveryEmployeeValidator";

export const createDeliveryEmployee = (deliveryEmployee: DeliveryEmployee): Promise<number> => {
    const error: string = validateDeliveryEmployee(deliveryEmployee)

    if (error) {
        throw new Error(error)
    }

    try {
        const response = await axios.post('http://localhost:8080/api/deliveryemployees', deliveryEmployee)

        return response.data
    } catch (e) {
        throw new Error('Could not create delivery employee')
    }
}
