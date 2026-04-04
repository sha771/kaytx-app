import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';

export const bridgeStatusProcedure = protectedProcedure
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
