import { IDatabase } from "../IDatabases";
import Mongoose from 'mongoose'

export const ConnectMongooseDB = () : IDatabase =>{
    return{
        connect(url) {
            Mongoose.set('strictQuery', false);
            Mongoose.connect(url).then( ()=> console.log('Database connected')).catch(
                error => console.error(`Error ${error} occuried connection to database`)
            )
        },
        closeConnection() {
            Mongoose.connection.close();
        },
    }
}