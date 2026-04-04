import { protectedProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';

export const listBridgesProcedure = protectedProcedure.query(async () => {
  const bridges = bridgeManager.getAllBridges();
  
  return bridges.map(bridge => ({
    id: bridge.getId(),
    name: bridge.getName(),
    protocol: bridge.getProtocol(),
    state: bridge.getState(),
  }));
});
