import { ISocket } from "./socketAdapter";

export interface IServer{
    on : (event : string, callback : any ) => void,
    clients : ISocket[]
}