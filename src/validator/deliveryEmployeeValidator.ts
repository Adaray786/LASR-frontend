import { DeliveryEmployee } from "../model/deliveryEmployee";

module.exports.validateDeliveryEmployee = function (deliveryEmployee: DeliveryEmployee):string | null {
    if(deliveryEmployee.name?.length == 0) {
        return "You did not enter a name";
    }

    if(deliveryEmployee.bankAccountNumber?.length != 8) {
        return "Your bank account number is not the right length";
    }

    if(deliveryEmployee.nationalInsuranceNumber?.length != 9) {
        return "Your national insurance number is not the right length";
    }

    return ""
}