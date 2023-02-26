/*import { Server } from "ws";
import { wsClientsManager, wsMessageManager } from "../../app/Implementations/websockets/WS";
import { IManageServer } from "../../app/IServer";
import { IClientManager, IMessageManager, IWebSocket, IWebSocketImplementation } from "../../app/IWebSockets";

export class WSMonostate implements IWebSocketImplementation {

    private static instance :WSMonostate | null = null;
    
    private constructor(
        private _serverManager: IWebSocket,
        private _server: Server,
        private _clientManager: IClientManager,
        private _messageManager: IMessageManager,
    ){}
    
    public static getInstance( serverManager : IWebSocket, clientManager : IClientManager, messageManager : IMessageManager, port : number) : WSMonostate{
        const wsServer : Server = serverManager.startSocketServer(port) as Server;
        if(!WSMonostate.instance) WSMonostate.instance = new WSMonostate(serverManager, wsServer, clientManager, messageManager);
        
        return WSMonostate.instance;
    }

    public start(){}

    public close() {
        this._serverManager.closeConnection(this.server);
    }

    public get server(): Server {
        return this._server;
    }
    public get clientManager(): IClientManager {
        return this._clientManager;
    }
    public get messageManager(): IMessageManager {
        return this._messageManager;
    }
    public set messageManager(value: IMessageManager) {
        this._messageManager = value;
    }
    public set clientManager(value: IClientManager) {
        this._clientManager = value;
    }
    public set server( value : Server ){
        this._server = value;
    }

}
*/