import { DeviceData } from "../../entities/device";

export class UpdateDeviceDTO{
    constructor(
        public id: number | string,
        public name? : string,
        public deviceData? : Array<DeviceData>
    ){}
}
