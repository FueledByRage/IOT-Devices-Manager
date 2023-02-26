export interface ISocket{
    on : (event : string, callback : Function) => void,
    send : (message : string) => void,
    readyState : () => number;
}