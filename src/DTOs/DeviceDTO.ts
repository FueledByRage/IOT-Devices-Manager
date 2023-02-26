import { DeviceData } from "../entities/device";


export class DeviceDTO{
    constructor(
        public name : string,
        public deviceData : Array<DeviceData>
    ){}
}