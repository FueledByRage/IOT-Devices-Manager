import { IServer } from "../adapters/presentation/serverAdapter";
import { ISocket } from "../adapters/presentation/socketAdapter";



export interface IWebSocket{
    startSocketServer( port : number ) :IServer,
    closeConnection() : void,
    onConnect(onConnectCallback : (aSocket : ISocket ) => Promise<void> ) : void;
}

export interface IClientManager {
    addClient(socket: ISocket): void;
    removeClient(socket: ISocket): void;
    getAllClients() : Array<ISocket>
}

export interface IMessageManager{
    sendMessage ( socket : ISocket, message : string) : void
    broadCastMessage( message : String ) : void
}
export interface IWebSocketImplementation{
    start (serverManager : IWebSocket, clientManager : IClientManager, messageManager : IMessageManager) : void,
    close() : void,
    get messageManager() : IMessageManager,
    get clientManager() : IClientManager
}