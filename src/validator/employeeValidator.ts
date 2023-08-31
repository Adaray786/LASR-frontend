import { SalesEmployee } from "../model/salesEmployee";

module.exports.validateEmployee = function (salesEmployee: SalesEmployee): string | null{
    if(salesEmployee.bankAccountNumber && salesEmployee.bankAccountNumber?.length > 20)
    {
        return "Bank account number is too large";
    }
    if(salesEmployee.name && (salesEmployee.name?.length < 5 || salesEmployee.name?.length > 50))
    {
        return "Name length does not meet requirement"
    }
    if(salesEmployee.nationalInsuranceNumber && salesEmployee.nationalInsuranceNumber?.length > 9)
    {
        return "Nation insurancce number is too long";
    }

    return null;
}