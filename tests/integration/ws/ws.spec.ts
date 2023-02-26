import WebSocket = require("ws");
import { MessageEvent } from "ws";
import { ISocket } from "../../../src/adapters/presentation/socketAdapter";
import { wsSocketAdapter } from "../../../src/adapters/implementations/wsSocketAdapter";
import { readDevicesService } from "../../../src/cases/device/read";
import { WSStartImplementation } from "../../../src/app/Implementations/websockets/WS/WSStartImplementation";
import { ClientManagerImplementation } from "../../../src/app/Implementations/websockets/WS/WSImplementation";
import { WSMessageManagerImplementation } from "../../../src/app/Implementations/websockets/WS/WSMessageManager";
import env from "../../../src/env";
import { ConnectMongooseDB } from "../../../src/database/implementations/mongoose";
import { connect as mqttConnect } from "mqtt";


const { connect, closeConnection } = ConnectMongooseDB();

export function waitForSocketState(socket : any, state : any) : Promise<void> {
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

  const WSImplementation = WSStartImplementation();
  const wsServer = WSImplementation.startSocketServer(3333);
  const wsServer2 = WSImplementation.startSocketServer(3000);
  const wsClientsManager = ClientManagerImplementation();
  const wsClientsManager2 = ClientManagerImplementation();
  const wsMessageManager2 = WSMessageManagerImplementation(wsServer2, wsClientsManager2);
beforeAll(()=>{
  connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`);
  const connectionMQTT = mqttConnect(env.MQTT_URL || '');
  wsServer.on('connection', async (socket : WebSocket ) => {
    const adaptedSocket : ISocket = wsSocketAdapter(socket);
    wsClientsManager.addClient(adaptedSocket);
    const devices = await readDevicesService.execute();
    const response = JSON.stringify({
        action : 'read',
        payload:{
            devices
        }
    });
    adaptedSocket.send(response);

    adaptedSocket.on('close', () => wsClientsManager.removeClient(adaptedSocket)); 
  });
  wsServer2.on('connection', async (socket : WebSocket ) => {
    const adaptedSocket : ISocket = wsSocketAdapter(socket);
    wsClientsManager2.addClient(adaptedSocket);
    adaptedSocket.on('close', () => wsClientsManager2.removeClient(adaptedSocket)); 
  });
});
afterAll(()=>{
  WSImplementation.closeConnection();
  closeConnection();

});

describe('Testing integration using WS', ()=>{
    it('Must get all devices from the database', async()=>{
        const client = new WebSocket(`ws://localhost:3333`);
        await waitForSocketState(client, client.OPEN);
        let responseMensage;
        client.onmessage = (event : MessageEvent) =>{
            responseMensage = event.data;
            client.close();
        };
        await waitForSocketState(client, client.CLOSED);
        expect(responseMensage).toBeDefined();
    });

    it('Must get a message from socket', async()=>{
      const client = new WebSocket(`ws://localhost:3000`);
      await waitForSocketState(client, client.OPEN);
      let responseMensage;
      client.onmessage = (event : MessageEvent) =>{
        responseMensage = event.data.toString();
        client.close();
      };
      wsMessageManager2.broadCastMessage('Hi');
      await waitForSocketState(client, client.CLOSED);
      expect(responseMensage).toBe('Hi');
  });
});