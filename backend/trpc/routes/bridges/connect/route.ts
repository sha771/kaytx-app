import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';

export const connectBridgeProcedure = protectedProcedure
  .input(
    z.object({
      bridgeId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const state = await bridgeManager.connectBridge(input.bridgeId);
    return state;
  });
