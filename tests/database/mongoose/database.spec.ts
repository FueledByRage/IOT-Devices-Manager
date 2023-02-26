import { WSImplementation } from "../../../src/app/Implementations/websockets/WS";
import env from "../../../src/env";
import { ConnectMongooseDB } from "../../../src/database/implementations/mongoose";
import { DeviceMongooseImplementation } from "../../../src/repository/Implementations/IDeviceMongooseImplementation";
import { DeviceDTO } from "../../../src/DTOs/DeviceDTO";
import { Device } from "../../../src/entities/device";
import { UpdateDeviceDTO } from "../../../src/DTOs/UpdateDTOs/UpdateDeviceDTO";

const { connect, closeConnection } = ConnectMongooseDB();

beforeAll(()=>{
    connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`);
    WSImplementation.server.on('connection', socket =>{
        WSImplementation.clientManager.addClient(socket);
        socket.on('close', () => WSImplementation.clientManager.removeClient(socket))
    });
});

afterAll(()=>{
    closeConnection();
    WSImplementation.close();
});

describe('Testing database mongoose implementation', ()=>{
    const mongooseImplementation = DeviceMongooseImplementation();
    it('Testing the create device on mongoose implementation', async ()=>{
        const data = new DeviceDTO('Device Test', [])
        const createdOrError =  await mongooseImplementation.create(data);

        expect(createdOrError.isRight()).toBeTruthy();
    });

    it('Testing the read devices on mongoose implementation', async ()=>{
        const devicesOrError = await mongooseImplementation.read();
        expect(devicesOrError).toBeInstanceOf(Array<Device>);
    });

    it('Testing updating device on mongoose implementation', async () => {
        const data =  new UpdateDeviceDTO('', '', []);
        const updatedDeviceOrError = await mongooseImplementation.update(data);

        expect(updatedDeviceOrError.isRight()).toBeTruthy();
    });

    it('Testing delete device on mongoose implementation', async () => {
        const deleteDeviceOrError = await mongooseImplementation.delete('');

        expect(deleteDeviceOrError.isRight()).toBeTruthy();
    });
});