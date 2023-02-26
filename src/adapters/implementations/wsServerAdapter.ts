import { Server } from "ws";
import { IServer } from "../presentation/serverAdapter";
import { ISocket } from "../presentation/socketAdapter";
import { wsSocketAdapter } from "./wsSocketAdapter";

export const wsServerAdapter = ( server : Server) : IServer =>{
    const clients : Array<ISocket> = Array.from(server.clients).map(( client ) =>{
        return wsSocketAdapter(client);
    });

    return{
        on: (event : string, callback: any) => server.on(event, callback),
        clients
    }
}