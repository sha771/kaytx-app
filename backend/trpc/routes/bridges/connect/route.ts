import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';
import { Permission } from '../../../../lib/rbac';

export const connectBridgeProcedure = permissionProcedure(Permission.BRIDGE_CONNECT)
  .input(
    z.object({
      bridgeId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const state = await bridgeManager.connectBridge(input.bridgeId);
    return state;
  });
