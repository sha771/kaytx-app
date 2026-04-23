import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { z } from 'zod';

export const getTrainingFlowsProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .query(async () => {
    // Mock for now as requested to align with frontend needs
    return [
      {
        id: 'flow-1',
        name: 'Inbound Inquiry',
        description: 'Handles general questions about services',
        status: 'active',
        lastTrained: new Date().toISOString(),
        confidence: 94,
      },
      {
        id: 'flow-2',
        name: 'Appointment Booking',
        description: 'Flow for scheduling consultations',
        status: 'active',
        lastTrained: new Date().toISOString(),
        confidence: 91,
      }
    ];
  });

export const getTrainingStatsProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .query(async () => {
    return {
      trainedFlows: 12,
      avgConfidence: 92,
      autoLearned: 45,
      knowledgeItems: 128,
      evaluations: {
        intentMatch: 94,
        policyAdherence: 98,
        fallbacks: 2.4,
        escalations: 5.1,
      }
    };
  });
