import { WebSocket } from "ws";
import { ISocket } from "../presentation/socketAdapter";


export const wsSocketAdapter = ( socket : WebSocket ) : ISocket =>{
    return { 
        on(event, callback : any) {
            socket.on(event, callback)
        },
        send(message) {
            socket.send(message)
        },
        readyState() {
            return socket.readyState;    
        },
     }
} 