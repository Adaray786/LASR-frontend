import type { Application ,Request, Response, request} from "express";
import type { SalesEmployee } from "../model/salesEmployee";
import { addSalesEmployee, getSalesEmployee } from "../service/salesEmployeeService";

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
        req.session.salesEmployee["bankAccountNumber"] = req.body.bankAccountNumber
        req.session.salesEmployee["nationalInsuranceNumber"] = req.body.nationalInsuranceNumber
        req.session.salesEmployee["commisionRate"] = req.body.commisionRate
        res.redirect("/add-salesEmployee-conf");
    })

    app.get('/add-salesEmployee-conf', async (req:Request, res:Response) => {
        res.render('add-salesEmployee-conf', req.session.salesEmployee)
    })

    app.post('add-salesEmployee-conf', async(req:Request, res:Response) => {
        if(!req.session.salesEmployee) {
            throw new Error("This is undefined")
        }
        let data: SalesEmployee = req.session.salesEmployee
        let id: Number

        try {
            id = await addSalesEmployee(data)
            res.redirect('/salesEmployee/'+ id);

        } catch (e) {
            console.error(e);
            res.locals.errormessage = (e as Error).message
            res.render('add-deliveryEmployee-details', req.body)

        }
    })
    app.get('/view-salesEmployee/:id', async (req:Request, res:Response) => {
        console.log(req.session)
        let data: SalesEmployee;
        try{
            let id = Number.parseInt(req.params.id, 10)
            console.log(id)
            if(id == 0 || Number.isNaN(id))
            {
                throw new Error("Failed to parse id")
            }
            console.log(req.session.token);
            console.log(req.session)
            if(req.session.token){
                data = await getSalesEmployee(id, req.session.token);
                res.render('view-salesEmployee', {salesEmployee:data})
            }
        }
        catch(e){
            console.error(e);
        }
    })
}