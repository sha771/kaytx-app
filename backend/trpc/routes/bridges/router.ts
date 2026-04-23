import { createTRPCRouter } from '../../create-context';
import { listBridgesProcedure } from './list/route';
import { createBridgeProcedure } from './create/route';
import { connectBridgeProcedure } from './connect/route';
import { disconnectBridgeProcedure } from './disconnect/route';
import { bridgeStatusProcedure } from './status/route';
import { bridgeHealthProcedure } from './health/route';

export const bridgesRouter = createTRPCRouter({
  list: listBridgesProcedure,
  create: createBridgeProcedure,
  connect: connectBridgeProcedure,
  disconnect: disconnectBridgeProcedure,
  status: bridgeStatusProcedure,
  health: bridgeHealthProcedure,
});

export {
  listBridgesProcedure,
  createBridgeProcedure,
  connectBridgeProcedure,
  disconnectBridgeProcedure,
  bridgeStatusProcedure,
  bridgeHealthProcedure,
};
