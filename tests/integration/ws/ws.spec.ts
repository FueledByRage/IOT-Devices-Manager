import WebSocket = require("ws")
import { MessageEvent } from "ws";
import { adaptSocket } from "../../../src/adapters/implementations/wsSocketAdapter";
import { IServer } from "../../../src/adapters/presentation/serverAdapter";
import { wsClientsManager, WSImplementation, wsMessageManager } from "../../../src/app/Implementations/websockets/WS";
import { readDevicesService } from "../../../src/cases/device/read";

jest.setTimeout(1000 * 60);

function waitForSocketState(socket : any, state : any) : Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (socket.readyState === state) {
          resolve();
        } else {
          waitForSocketState(socket, state).then(resolve);
        }
      }, 5);
    });
  }

beforeAll(()=>{
    const server : IServer = WSImplementation.startSocketServer(3333) as WebSocket.Server;
    server.on('connection', async (socket : WebSocket ) => {
    //const adaptedSocket = await adaptSocket()(socket);
    //wsClientsManager.addClient(adaptedSocket);
    const devices = await readDevicesService.execute();
    console.log(devices);
    const onConnectResponse = JSON.stringify({ devices });
    socket.send(onConnectResponse);
    //wsMessageManager.sendMessage(adaptedSocket, onConnectResponse );

    //socket.on('close', () => wsClientsManager.removeClient(adaptedSocket)); 
});
});
afterAll(()=>{
    WSImplementation.closeConnection();
});

describe('Testing integration using WS', ()=>{
    it( 'Must get all devices from the database', async()=>{
        const client = new WebSocket(`ws://localhost:3333`);
        await waitForSocketState(client, client.OPEN);
        let responseMensage;
        client.onopen = () => {
            console.log('WebSocket connection established');
        };
        client.onmessage = (event : MessageEvent) =>{
            console.log(event.data);
            responseMensage = event;
            client.close();
        };
        await waitForSocketState(client, client.CLOSED);
        expect(true).toBeFalsy();
    } )
})