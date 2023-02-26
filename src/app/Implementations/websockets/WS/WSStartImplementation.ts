import { IWebSocket } from "../../../IWebSockets";
import WebSocket, { Server } from 'ws';
import { IServer } from "../../../../adapters/presentation/serverAdapter";
import { wsServerAdapter } from "../../../../adapters/implementations/wsServerAdapter";

export const WSStartImplementation = () : IWebSocket =>{
    let server : Server;
    return{
        startSocketServer( port : number ) : IServer{
            const websocketServer = new WebSocket.Server({ port });
            server = websocketServer;
            console.log('Server started')
            return wsServerAdapter(server);
        },
        closeConnection() {
            if(!server) return;
            server.close();
        },
        onConnect(onConnectCallback) {
            if(!server) return;
            server.on('connect', onConnectCallback );
        },
    }
}