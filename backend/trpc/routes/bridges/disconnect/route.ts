import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';

export const disconnectBridgeProcedure = protectedProcedure
  .input(
    z.object({
      bridgeId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const state = await bridgeManager.disconnectBridge(input.bridgeId);
    return state;
  });
