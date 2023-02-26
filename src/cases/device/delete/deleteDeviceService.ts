import { wsMessageManager } from "../../../app/Implementations/websockets/WS";
import { Device } from "../../../entities/device";
import { Either, left } from "../../../utils/either/either";
import { ErrorData } from "../../../utils/error/IError";

export interface IDeleteDevice{
    execute : (id : string) => Promise<Either<ErrorData, Device >>
} 

export const service = ( deleteService : IDeleteDevice ) =>{
    return{
        async execute( payload : any ) : Promise<Either<ErrorData, Device >> {
            return new Promise( async (resolve) =>{
                const { id } = payload;
                if(!id) return resolve(left({ error : 'Information error on payload' }));
                const deletedDeviceOrError = await deleteService.execute(id);
                console.log(deletedDeviceOrError.value);
                resolve(deletedDeviceOrError);
            });
        }
    }
}