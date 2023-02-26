import { connect as mqttConnect } from "mqtt";
import { devices } from "./devices";
import env from "../src/env";


const client = mqttConnect(env.MQTT_URL || '');

client.subscribe('DevicesManagement', function (err) {
    if (err) {
        console.log('err');
    }
});


client.on('message', (topic, message)=>{
    console.log(`Message: ${message} from ${topic}`);
});


const main = () =>{
    const getRandomNumber = ( max : number, min : number ) =>{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const ids : Array<string> = [
        '63f8fde4a9acb5e0ef8b6d0c', 
        '63f8ff783c6eb458f551d73e', 
        '63f8ffeefcb95a61663ffa96',
        '63fb737ec7c0794cfdf29425',
        '63fbddd13bb739426122a2a6'    
    ];
    const idsToExclude : Array<string> = [
        '63fbe394b45053c4acd86c87',
        '63fbe3650e27357a2d5283b8',
        '63fbe32c6a14171ee25eb1fa',
        '63fbe2e6512a65b1b7e2259b'
    ];
    
    const removeIdFromArray = (arr: string[], str: string): void => {
        const index = arr.indexOf(str);
        if (index !== -1) {
          arr.splice(index, 1);
        }
    }

    const createDevice = () =>{
        const message = {
            action : 'create',
            payload: devices[getRandomNumber((devices.length - 1), 0)]
        }
        client.publish('DevicesManagement', JSON.stringify(message));
        setTimeout( createDevice, 1000 * getRandomNumber(10, 20));
    }
    const updateDevice = () =>{

        if(ids.length < 1) {
            setTimeout( updateDevice, 1000 * getRandomNumber(10, 30));
            return
        }
        const id = ids[getRandomNumber((ids.length - 1), 0)];
        const message = {
            action : 'update',
            payload:{
                id,
                deviceData: [
                    {
                        name : 'Temperature',
                        unity: 'Cº',
                        data: getRandomNumber(45, 19)
                    },
                    {
                        name : 'Humidity',
                        unity: '%',
                        data: getRandomNumber(30, 12)
                    },
                ]
            }
        }
        client.publish('DevicesManagement', JSON.stringify(message));
        setTimeout( updateDevice, 1000 * getRandomNumber(5, 10));
    }

    const excludeDevice = () =>{
        if(idsToExclude.length == 0) return;
        const id = idsToExclude[getRandomNumber((idsToExclude.length -1), 0)];
        const message = JSON.stringify({
            action : 'delete',
            payload:{
                id
            }
        });
        client.publish('DevicesManagement', message);
        removeIdFromArray(idsToExclude, id);
        setTimeout( excludeDevice, 1000 * getRandomNumber(10, 20));
    }
    updateDevice();
    //createDevice();
    //excludeDevice();
}

main();