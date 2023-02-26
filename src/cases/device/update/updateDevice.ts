import { Device } from "../../../entities/device";
import { IDeviceRepository } from "../../../repository/IDevicesRepository";
import { Either } from "../../../utils/either/either";
import { ErrorData } from "../../../utils/error/IError";
import { IUpdateDevice } from "./updateDeviceService";

export const updateDevice = ( repository : IDeviceRepository ) : IUpdateDevice =>{
    return{
        execute(data) : Promise<Either<ErrorData, Device >> {
            return new Promise( async (resolve, reject) =>{
                const updatedDevice = await repository.update(data);
                return resolve(updatedDevice); 
            });
        },
    }
}