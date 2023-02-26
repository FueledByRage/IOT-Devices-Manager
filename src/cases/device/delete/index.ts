import { DeviceMongooseImplementation } from "../../../repository/Implementations/IDeviceMongooseImplementation";
import { deleteDevice } from "./deleteDevice";
import { service } from "./deleteDeviceService";

const repository = DeviceMongooseImplementation();
const executeDelete = deleteDevice(repository);
export const deleteDeviceService = service(executeDelete);