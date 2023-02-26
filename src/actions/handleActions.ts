import { WSImplementation, wsMessageManager, wsServer } from "../app/Implementations/websockets/WS";
import { Device } from "../entities/device";
import { createDeviceService } from "../cases/device/create";
import { updateDeviceService } from "../cases/device/update";
import { Either } from "../utils/either/either";
import { ErrorData } from "../utils/error/IError";
import { deleteDeviceService } from "../cases/device/delete";


interface IDeviceCases {
    [ key : string ] : (payload : any) => Promise<Either<ErrorData, Device >>
}

const cases : IDeviceCases = {
    'create': createDeviceService.execute,
    'update' : updateDeviceService.execute,
    'delete' : deleteDeviceService.execute
}

export const handleActions = async (topic : string, message : string ) =>{
    const { action, payload } = JSON.parse(message.toString());
    const response = await cases[action](payload);
    if(response.isLeft()) return console.error(response.value);
    const { value } = response;
    const responseMessage = JSON.stringify({ action, payload: value });
    
    wsMessageManager.broadCastMessage(responseMessage);
}