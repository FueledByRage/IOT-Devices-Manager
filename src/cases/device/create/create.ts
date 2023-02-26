import { DeviceDTO } from "../../../DTOs/DeviceDTO";
import { IDeviceRepository } from "../../../repository/IDevicesRepository";
import { ICreateDevice } from "./createDeviceService";

export const createDevice = ( deviceRepository : IDeviceRepository ) : ICreateDevice =>{
    return{
        async create(data : DeviceDTO)  {
            return new Promise( async ( resolve, reject ) =>{
                const response = await deviceRepository.create(data);

                resolve(response);
            });
        },
    }
}