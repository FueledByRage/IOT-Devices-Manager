import { UpdateDeviceDTO } from "../../DTOs/UpdateDTOs/UpdateDeviceDTO";
import { DeviceModel } from "../../entities/models/mongoose/DeviceModel";
import { left, right } from "../../utils/either/either";
import { IDeviceRepository } from "../IDevicesRepository";

export const DeviceMongooseImplementation = () : IDeviceRepository =>{
    return{
        create(data) {
            return new Promise(async resolve =>{
                console.log(data);
                const deviceCreated = await (await DeviceModel.create(data)).save();
                if(deviceCreated) return resolve(right(deviceCreated));
                resolve(left({ error : 'Error creating device register' }));
            })    
        },
        read() {
            return new Promise(async( resolve )=>{
                const devices = await DeviceModel.find();
                return resolve(devices);
            })    
        },
        update( data : UpdateDeviceDTO ) {
            return new Promise(async resolve =>{
                const updatedDevice = await DeviceModel.findByIdAndUpdate( data.id, { $set: { deviceData: data.deviceData } } );
                if(updatedDevice) return resolve(right(updatedDevice));
                return resolve(left({ error : 'Error updating device' }));
            })    
        },
        delete(id) {
            return new Promise(async resolve=>{
                const deleted = await DeviceModel.findByIdAndDelete(id);
                if(deleted) return resolve(right(deleted));
                return resolve(left({ error : 'Error deleting device' }));
            })    
        },
    }
}