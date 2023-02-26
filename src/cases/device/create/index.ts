import { DeviceMongooseImplementation } from "../../../repository/Implementations/IDeviceMongooseImplementation";
import { service } from "./createDeviceService";
import { createDevice } from "./create";

const deviceRepository = DeviceMongooseImplementation();
const registerDevice = createDevice(deviceRepository);
export const createDeviceService = service(registerDevice);