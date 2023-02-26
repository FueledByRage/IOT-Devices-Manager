import { ConnectMongooseDB } from "../../src/database/implementations/mongoose";
import { deleteDeviceService } from "../../src/cases/device/delete";
import env from "../../src/env";
const { connect, closeConnection } = ConnectMongooseDB();

beforeAll(()=>{
    connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`);
});
afterAll(()=>{
    closeConnection();
});

describe('Testing the update device case', ()=>{
    it('Delete device', async ()=>{
        const id = '';
        const payload = { id };
        const response = await deleteDeviceService.execute(payload);
        expect(response.isRight()).toBeTruthy();
    });
    it('Delete device error handling', async ()=>{
        const payload = { foo: 'bar' }
        const response = await deleteDeviceService.execute(payload);

        expect(response.isLeft()).toBeTruthy();
    });
});