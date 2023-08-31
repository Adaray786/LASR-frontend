import type { Login } from "../model/auth";
import axios from "axios";

export const login = async function (login: Login): Promise<string> 
{
    try{
        const response = await axios.post("http://localhost:8080/api/login", login)
        return response.data
    }
    catch(e){
        throw new Error("could not login")
    }
}
