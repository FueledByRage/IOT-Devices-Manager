import { Device } from "../../../entities/device";

export interface IReadDevices{
    execute : () => Promise<Device[]>
}

export const service = ( readDevices : IReadDevices ) =>{
    return{
        async execute() : Promise<Device[]> {
            return new Promise( async (resolve, reject) =>{
                const devices = await readDevices.execute();
                return resolve(devices);
            })
        }
    }
}