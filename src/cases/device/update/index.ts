import { DeviceMongooseImplementation } from "../../../repository/Implementations/IDeviceMongooseImplementation";
import { updateDevice } from "./updateDevice";
import { service } from "./updateDeviceService";

const deviceRepository = DeviceMongooseImplementation();
const update = updateDevice(deviceRepository);
export const updateDeviceService = service(update);