import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';
import { Permission } from '../../../../lib/rbac';

export const disconnectBridgeProcedure = permissionProcedure(Permission.BRIDGE_DISCONNECT)
  .input(
    z.object({
      bridgeId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const state = await bridgeManager.disconnectBridge(input.bridgeId);
    return state;
  });
