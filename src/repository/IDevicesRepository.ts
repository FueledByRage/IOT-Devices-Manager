import { DeviceDTO } from "../DTOs/DeviceDTO";
import { UpdateDeviceDTO } from "../DTOs/UpdateDTOs/UpdateDeviceDTO";
import { Device } from "../entities/device";
import { Either } from "../utils/either/either";
import { ErrorData } from "../utils/error/IError";

export interface IDeviceRepository{
    create( data : DeviceDTO ): Promise<Either< ErrorData, Device >>,
    read() : Promise<Device[]>,
    update( data : UpdateDeviceDTO) : Promise<Either< ErrorData, Device >>,
    delete( id : string ) : Promise<Either< ErrorData, Device >>
}