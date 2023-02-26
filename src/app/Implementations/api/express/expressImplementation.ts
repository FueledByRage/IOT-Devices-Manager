import express from "express";
import { IManageServer } from "../../../IServer";

export const expressManageServerImplementation = () : IManageServer =>{
    return{
        startServer(port) {
            const app = express();
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.listen( port, ()=> console.log(`API running on port ${port}`));
            
            return app;
        },
    }
} 