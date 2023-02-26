import { Server, WebSocket } from "ws";
import { IServer } from "../../../../adapters/presentation/serverAdapter";
import { ISocket } from "../../../../adapters/presentation/socketAdapter";
import { IClientManager, IMessageManager, IWebSocket } from "../../../IWebSockets";

export const WSMessageManagerImplementation = ( server : IServer, clientManager : IClientManager ) : IMessageManager =>{
    return{
        sendMessage(socket : ISocket, message : string ) {
            socket.send(message);
        },
        broadCastMessage( message : string ) {
            clientManager.getAllClients().forEach( (client : ISocket ) => {
                if(client.readyState() == 1) client.send(message)
            });
        },
    }
}