export interface IDatabase{
    connect( url : string ) : void,
    closeConnection() : void
}