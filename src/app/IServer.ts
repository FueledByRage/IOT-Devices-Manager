export interface IManageServer{
    startServer(port : number) : unknown;
}

export interface IManageRoutes{
    addRoute( route : string, callback : Function ) : void
}