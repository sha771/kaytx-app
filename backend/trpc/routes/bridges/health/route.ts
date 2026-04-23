import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';
import { Permission } from '../../../../lib/rbac';

export const bridgeHealthProcedure = permissionProcedure(Permission.BRIDGE_HEALTH_READ)
  .input(z.object({}).optional())
  .query(async ({ input }) => {
  const health = await bridgeManager.getHealthStatus();
  return health;
});
