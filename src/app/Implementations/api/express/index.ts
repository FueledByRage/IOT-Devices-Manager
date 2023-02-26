import { expressManageServerImplementation } from "./expressImplementation";
import { expressRoutesManagementImplementation } from "./expressRoutesImplementation";
import { Express } from "express";

export const server =  expressManageServerImplementation().startServer(8000) as Express;
export const manageRoutes = expressRoutesManagementImplementation(server);