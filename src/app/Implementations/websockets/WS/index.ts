import { ClientManagerImplementation } from "./WSImplementation";
import { WSMessageManagerImplementation } from "./WSMessageManager";
import { WSStartImplementation } from "./WSStartImplementation";
import env from "../../../../env";

export const WSImplementation = WSStartImplementation();
export const wsServer = WSImplementation.startSocketServer(Number(env.WS_PORT) || 0);
export const wsClientsManager = ClientManagerImplementation();
export const wsMessageManager = WSMessageManagerImplementation(wsServer, wsClientsManager);