import { IClientManager } from "../../../IWebSockets";
import WebSocket from "ws";
import { ISocket } from "../../../../adapters/presentation/socketAdapter";

export const ClientManagerImplementation = () : IClientManager =>{
    const clients = new Set<ISocket>();
    return{
        addClient(socket : ISocket) {
            clients.add(socket);
        },
        removeClient(socket : ISocket ) {
            clients.delete(socket)
        },
        getAllClients() : Array<ISocket> {
            return Array.from(clients);
        },
    }
}