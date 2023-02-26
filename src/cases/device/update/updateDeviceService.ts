import { UpdateDeviceDTO } from "../../../DTOs/UpdateDTOs/UpdateDeviceDTO";
import { Device } from "../../../entities/device";
import { Either, left } from "../../../utils/either/either";
import { ErrorData } from "../../../utils/error/IError";

export interface IUpdateDevice{
    execute( data : UpdateDeviceDTO ) : Promise<Either<ErrorData, Device >>
}

export const service = ( update : IUpdateDevice )  =>{
    return{
        execute( payload : any ) : Promise<Either<ErrorData, Device >> {
            return new Promise( async resolve  =>{
                const { id, name, deviceData } = payload;
                if(!id ) return resolve(left({ error : 'Information error on payload' }));
                const data = new UpdateDeviceDTO(id, name, deviceData);
                const updatedDeviceOrError = await update.execute(data);
                resolve(updatedDeviceOrError);
            });
        }
    }
} 