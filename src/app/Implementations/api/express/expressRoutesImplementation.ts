import { IManageRoutes } from "../../../IServer";
import { Express } from "express";

export const expressRoutesManagementImplementation = ( app : Express ) : IManageRoutes =>{
    return{
        addRoute( route : string, callback : Function ) {
            app.use(route, ()=> callback)
        },
    }
}