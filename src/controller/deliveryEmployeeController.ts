import type { Application, Request, Response } from "express";
import type { DeliveryEmployee } from "../model/deliveryEmployee";
import { createDeliveryEmployee, viewDeliveryEmployees } from "../service/deliveryEmployeeService";

export const deliveryEmployeeController = function(app: Application) {
    app.get('/add-deliveryEmployee-details',async (req:Request, res:Response) => {
        res.render('add-deliveryEmployee-details')
    })

    app.post('/add-deliveryEmployee-details', async (req: Request, res: Response) => {
        if(!req.session.deliveryEmployee) {
            req.session.deliveryEmployee = {}
        }

        req.session.deliveryEmployee["name"] = req.body.name
        req.session.deliveryEmployee["salary"] = req.body.salary
        req.session.deliveryEmployee["bankAccountNumber"] = req.body.bankAccountNumber
        req.session.deliveryEmployee["nationalInsuranceNumber"] = req.body.nationalInsuranceNumber

        res.redirect('/add-deliveryEmployee-confirmation')
    })

    app.get('/add-deliveryEmployee-confirmation', async (req:Request, res:Response) => {
        res.render('add-deliveryEmployee-confirmation', req.session.deliveryEmployee)
    })

    app.post('add-deliveryEmployee-confirmation', async(req:Request, res:Response) => {
        if(!req.session.deliveryEmployee) {
            throw new Error("This is undefined")
        }
        let data: DeliveryEmployee = req.session.deliveryEmployee
        let id: Number

        try {
            if(req.session.token) {
                id = await createDeliveryEmployee(data, req.session.token)

                res.redirect('/deliveryEmployee-confirmation')
            }
        } catch (e) {
            console.error(e);

            res.render('add-deliveryEmployee-details', req.body.deliveryEmployee)
        }

    })

    app.get('/deliveryemployees', async (req: Request, res: Response) => {
        let data: DeliveryEmployee[] = [];

        try {
            if(req.session.token) {
                data = await viewDeliveryEmployees(req.session.token)
            }
            
        } catch (e) {
            console.error(e);
        }

        res.render('view-deliveryEmployees', { deliveryemployees: data })
    })
    
    
}