import { Application ,Request, Response, request} from "express";
import { SalesEmployee } from "../model/salesEmployee";
const salesEmployeeService = require("../service/salesEmployeeService") 

export const salesEmployeeController = (app:Application) =>
{
    app.get('/add-salesEmployee', async(req: Request, res:Response) => {
        res.render('add-salesEmployee')
    })

    app.post('/add-salesEmployee', async (req: Request, res: Response) => {
        if(!req.session.salesEmployee) {
            req.session.salesEmployee = {}
        }   
        req.session.salesEmployee["name"] = req.body.name
        req.session.salesEmployee["salary"] = req.body.salary
        req.session.salesEmployee["bankAccountNumber"] = req.body.bankAccountNumbe
        req.session.salesEmployee["nationalInsuranceNumber"] = req.body.nationalInsuranceNumber
        req.session.salesEmployee["commisionRate"] = req.body.commisionRate
    })

    app.get('/add-salesEmployee-conf', async (req:Request, res:Response) => {
        res.render('add-salesEmployee-conf')
    })

    app.post('add-salesEmployee-conf', async(req:Request, res:Response) => {
        if(!req.session.salesEmployee) {
            throw new Error("This is undefined")
        }
        let data: SalesEmployee = req.session.salesEmployee
        let id: Number

        try {
            id = await salesEmployeeService.addSalesEmployee(data)
            res.redirect('/salesEmployee/'+ id);

        } catch (e) {
            console.error(e);
            res.locals.errormessage = (e as Error).message
            res.render('add-deliveryEmployee-details', req.body)

        }
    })
}