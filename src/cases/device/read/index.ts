import { DeviceMongooseImplementation } from "../../../repository/Implementations/IDeviceMongooseImplementation";
import { readDevices } from "./read";
import { service } from "./readDevicesService";

const repository = DeviceMongooseImplementation();
const read = readDevices(repository);
export const readDevicesService = service(read);