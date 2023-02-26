import { connect as mqttConnect } from "mqtt";
import { deleteDevice } from "../src/cases/device/delete/deleteDevice";
import { devices } from "./devices";


const client = mqttConnect('mqtt://test.mosquitto.org');

client.subscribe('DevicesManagement', function (err) {
    if (err) {
        console.log('err');
    }
});


client.on('message', (topic, message)=>{
    console.log(`Message: ${message} from ${topic}`);
})


const main = () =>{
    const getRandomNumber = ( max : number, min : number ) =>{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const ids : Array<string> = ['63f8fde4a9acb5e0ef8b6d0c', '63f8ff783c6eb458f551d73e', '63f8ffeefcb95a61663ffa96'];
    const idsToExclude : Array<string> = ['63fb649c7d867df2f52dc25f', '63fb64ad7d867df2f52dc263', '63fb5d2474b81f6574151f62', '63fb659d8f679efec5cd1705', '63fb6da296d58d33c6764557', '63fb6d8b96d58d33c676454f', '63fb738ac7c0794cfdf29428'];
    
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