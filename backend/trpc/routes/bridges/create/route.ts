import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { bridgeManager } from '../../../../bridges/manager/bridge-manager';
import { ProtocolSchema } from '../../../../bridges/types';

export const createBridgeProcedure = protectedProcedure
  .input(
    z.object({
      protocol: ProtocolSchema,
      config: z.object({
        id: z.string(),
        name: z.string(),
        endpoint: z.string().optional(),
        credentials: z.record(z.string(), z.unknown()).optional(),
        options: z.record(z.string(), z.unknown()).optional(),
      }),
    })
  )
  .mutation(async ({ input }) => {
    const fullConfig = {
      ...input.config,
      protocol: input.protocol,
      tls: {
        enabled: true,
        minVersion: 'TLSv1.3' as const,
        cipherSuites: ['TLS_AES_256_GCM_SHA384'],
        verifyPeer: true,
      },
    };
    
    const bridge = bridgeManager.createBridge(input.protocol, fullConfig);
    
    const bridgeId = bridge.getId();
    const bridgeName = bridge.getName();
    const bridgeProtocol = bridge.getProtocol();
    const bridgeState = bridge.getState();
    
    return {
      id: bridgeId,
      name: bridgeName,
      protocol: bridgeProtocol,
      state: bridgeState,
    };
  });
