import { protectedProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';

export const bridgeHealthProcedure = protectedProcedure.query(async () => {
  const health = await bridgeManager.getHealthStatus();
  return health;
});
