import { Schema, model } from "mongoose";
import { Device, DeviceData } from "../../device";


const DeviceSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    deviceData:{
        type: Array<DeviceData>
    }
});

export const DeviceModel = model<Device>('Device', DeviceSchema);