import { Device } from "../../../entities/device"
import { IDeviceRepository } from "../../../repository/IDevicesRepository";
import { IReadDevices } from "./readDevicesService"

export const readDevices = ( deviceRepository : IDeviceRepository ) :IReadDevices =>{
    return{
        async execute() {
            return new Promise(async (resolve) =>{
                const devices = deviceRepository.read();
                return resolve(devices);
            });          
        },
    }
}