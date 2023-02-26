import { Device } from "../../../entities/device";
import { IDeviceRepository } from "../../../repository/IDevicesRepository";
import { Either } from "../../../utils/either/either";
import { ErrorData } from "../../../utils/error/IError";
import { IDeleteDevice } from "./deleteDeviceService";

export const deleteDevice = ( deviceRepository : IDeviceRepository ) : IDeleteDevice =>{
    return{
        async execute(id) : Promise<Either<ErrorData, Device >> {
            return new Promise( async (resolve)  =>{
                const deleted = await deviceRepository.delete(id);
                return resolve(deleted);
            });
        },
    }
}