import { IMQTT } from "../IMQTT";
import { MqttClient } from "mqtt";

export const MQTTImplementation = ( client : MqttClient ) : IMQTT =>{
    return{
        connect (){
        },
        subscribe( topic : string ) {
            const errorCallback = (error : any ) =>{
                if(error) return console.error('error');
                console.log(`Subscribed to topic ${topic}`);
            }
            
            client.subscribe(topic, errorCallback);
        },
        onError( errorCallback : Function ){
            client.on('error', errorCallback);
        },
        onMessage( callback : Function ) {
            client.on('message', callback);
        },
    }
}