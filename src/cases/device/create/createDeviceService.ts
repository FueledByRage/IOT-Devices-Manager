import { DeviceDTO } from "../../../DTOs/DeviceDTO";
import { Device } from "../../../entities/device";
import { Either, left } from "../../../utils/either/either";
import { ErrorData } from "../../../utils/error/IError";

export interface ICreateDevice{
    create : ( data : DeviceDTO ) => Promise<Either<ErrorData, Device >>
}

export const service = ( { create  } : ICreateDevice ) =>{
    return{
        async execute(payload : any) : Promise<Either< ErrorData, Device >> {
            return new Promise( async resolve =>{
                const { name, deviceData } = payload;
                if(!name || !deviceData) return resolve(left({ error : 'Information error on payload' }));
                const data = new DeviceDTO( name, deviceData );
                const deviceOrError = await create(data);
                resolve(deviceOrError);
            });
        }
    }

}