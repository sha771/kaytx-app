import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';
import { Permission } from '../../../../lib/rbac';

export const listBridgesProcedure = permissionProcedure(Permission.BRIDGE_READ)
  .input(z.object({}).optional())
  .query(async ({ input }) => {
  const bridges = bridgeManager.getAllBridges();
  
  return bridges.map(bridge => ({
    id: bridge.getId(),
    name: bridge.getName(),
    protocol: bridge.getProtocol(),
    state: bridge.getState(),
  }));
});
