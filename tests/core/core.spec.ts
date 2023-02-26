import WebSocket = require("ws");
import { MessageEvent } from "ws";
import main from "../../src/main";
import env from "../../src/env";
import { connect as mqttConnect } from "mqtt";

jest.setTimeout(1000 * 30);

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

const client = mqttConnect(env.MQTT_URL || '');


beforeAll(()=>{
    main();
    client.subscribe(env.MQTT_TOPIC || '', function (err) {
        if (err) {
            console.log('err');
        }
    });
});



describe(('Testing core and integration'), ()=>{
    it('Testing getting devices from core on connect', async ()=>{
        const client = new WebSocket(`ws://localhost:${env.WS_PORT}`);

        await waitForSocketState(client, client.OPEN);
        let responseMensage;
        client.onmessage = (event : MessageEvent) =>{
            responseMensage = event.data.toString();
            client.close();
        };
        await waitForSocketState(client, client.CLOSED);
        expect(responseMensage).toBeDefined();
    });

    it('Testing create device sending message to the core',  (done)=>{
        const clientWs = new WebSocket(`ws://localhost:${env.WS_PORT}`);
        const payload = {
            name : 'Refrigerator',
            deviceData : [
                {
                    name : 'Temperature',
                    unity: 'Cº',
                    data: 10
                },
                {
                    name : 'Humidity',
                    unity: '%',
                    data:  5
                },
            ]
        }
        const message = JSON.stringify({
            action: 'create',
            payload
        });
        clientWs.onmessage = (event : MessageEvent) => {
            const resultMessage = JSON.parse(event.data.toString());
            if( resultMessage.action == 'create' && resultMessage.payload.name == payload.name){ 
                done();
                clientWs.close();
            }
        }
        client.publish(env.MQTT_TOPIC || '', message);
        //await waitForSocketState(clientWs, clientWs.CLOSED);
    });
})