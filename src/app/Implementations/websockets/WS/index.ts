import { ClientManagerImplementation } from "./WSImplementation";
import { WSMessageManagerImplementation } from "./WSMessageManager";
import { WSStartImplementation } from "./WSStartImplementation";

export const WSImplementation = WSStartImplementation();
export const wsServer = WSImplementation.startSocketServer(3333);
export const wsClientsManager = ClientManagerImplementation();
export const wsMessageManager = WSMessageManagerImplementation(wsServer, wsClientsManager);