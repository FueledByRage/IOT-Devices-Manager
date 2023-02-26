import { connect as mqttConnect } from "mqtt";
import { MQTTImplementation } from "../../../src/app/Implementations/MQTTImplementation";

jest.setTimeout(1000 * 20);

describe('Testing MQTT implementation with MQTT.js', ()=>{
    it('Testing send and receive message', (done)=>{
        const connectionMQTT = mqttConnect('mqtt://test.mosquitto.org');
        const { onMessage } = MQTTImplementation( connectionMQTT );
        connectionMQTT.subscribe('test', (err) =>{
            if(err) done(err);
            const message2Publish = 'Hello world!'
            connectionMQTT.publish('test', message2Publish);
            const onMessageCallback = ( topic : string, message : string ) => {
                if(message == message2Publish) done();
            } 
            onMessage(onMessageCallback)
        })
    });
});