import { createDeviceService } from "../../src/cases/device/create";
import env from "../../src/env";
import { ConnectMongooseDB } from "../../src/database/implementations/mongoose";

const { connect, closeConnection } = ConnectMongooseDB();

beforeAll(()=>{
    connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`);
});
afterAll(()=>{
    closeConnection();
});


describe('Gonna test the create test service', ()=>{
    it('Must create a new device', async ()=>{
        const payload = { name : 'Device Test', deviceData : [] };
        const response = await createDeviceService.execute(payload);
        expect(response.isRight()).toBeTruthy();
    });
    it('Testing create new device error handler', async ()=>{
        const payload = { foo : 'bar' };
        const response = await createDeviceService.execute(payload);
        expect(response.isLeft()).toBeTruthy();
    });
})