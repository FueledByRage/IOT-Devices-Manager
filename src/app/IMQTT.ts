export interface IMQTT{
    connect: () => void,
    subscribe: ( topic : string ) => void;
    onError: ( errorCallback : Function ) => void,
    onMessage:( callback : Function ) => void
}