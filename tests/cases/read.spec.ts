import { ConnectMongooseDB } from "../../src/database/implementations/mongoose";
import { readDevicesService } from "../../src/cases/device/read";
import { Device } from "../../src/entities/device";
import env from "../../src/env";
const { connect, closeConnection } = ConnectMongooseDB();

beforeAll(()=>{
    connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`);
});
afterAll(()=>{
    closeConnection();
});
describe('Testing the read device case',()=>{
    it('Read devices', async ()=>{
        const response = await readDevicesService.execute();

        expect(response).toBeInstanceOf(Array<Device>);
    });
});