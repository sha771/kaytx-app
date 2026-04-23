import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';
import { Permission } from '../../../../lib/rbac';

export const bridgeStatusProcedure = permissionProcedure(Permission.BRIDGE_STATUS_READ)
  .input(
    z.object({
      bridgeId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const state = bridgeManager.getBridgeState(input.bridgeId);
    const metrics = bridgeManager.getMetrics(input.bridgeId);
    
    return {
      state,
      metrics,
    };
  });
