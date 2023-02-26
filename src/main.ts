import { connect as mqttConnect } from "mqtt";
import { MQTTImplementation } from "./app/Implementations/MQTTImplementation";
import { ConnectMongooseDB } from "./database/implementations/mongoose";
import { handleActions } from "./actions/handleActions";
import { wsClientsManager, wsServer } from "./app/Implementations/websockets/WS";
import { readDevicesService } from "./cases/device/read";
import env from './env';
import WebSocket from 'ws';
import { ISocket } from "./adapters/presentation/socketAdapter";
import { wsSocketAdapter } from "./adapters/implementations/wsSocketAdapter";

const main = () =>{

    //Connect to database
    const { connect } = ConnectMongooseDB();
    connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`);
    
    //Connect to MQTT Broker using mqtt.js implementation
    const connectionMQTT = mqttConnect(env.MQTT_URL || '');
    
    const { subscribe, onError, onMessage } = MQTTImplementation( connectionMQTT );
    
    const errorCallback = ( error : any) => console.error(`Error ${error} occurried.`)
    onError(errorCallback);
    onMessage(handleActions);
    subscribe(env.MQTT_TOPIC || '');
    
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
}

export default main;