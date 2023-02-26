import { ConnectMongooseDB } from "../../src/database/implementations/mongoose";
import { updateDeviceService } from "../../src/cases/device/update";
import env from "../../src/env";
const { connect, closeConnection } = ConnectMongooseDB();

beforeAll(()=>{
    connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`);
});
afterAll(()=>{
    closeConnection();
});

describe('Testing the update device case', ()=>{
    it('Update devices', async ()=>{
        const payload = { id: '', name: 'UpdatedDevice' }
        const response = await updateDeviceService.execute(payload);
        expect(response.isRight()).toBeTruthy();
    });

    it('Update devices error handling', async ()=>{
        const payload = { foo: 'bar' }
        const response = await updateDeviceService.execute(payload);

        expect(response.isLeft()).toBeTruthy();
    });
});