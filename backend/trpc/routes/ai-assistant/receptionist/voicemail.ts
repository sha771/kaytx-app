import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';

// Mock voicemail data for now as there's no dedicated table yet
const mockVoicemails = [
  {
    id: 'vm-1',
    callerName: 'John Smith',
    callerNumber: '+1 (555) 123-4567',
    duration: '01:23',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isNew: true,
    isFlagged: true,
    transcription: 'Hi, this is John Smith calling about the proposal...',
  },
  {
    id: 'vm-2',
    callerName: 'Sarah Johnson',
    callerNumber: '+1 (555) 987-6543',
    duration: '00:45',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    isNew: true,
    isFlagged: false,
    transcription: 'Hello, I am calling to schedule a follow-up...',
  }
];

export const getVoicemailsProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .query(async () => {
    return mockVoicemails;
  });

export const markVoicemailReadProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    return { success: true, id: input.id };
  });

export const toggleVoicemailFlagProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    return { success: true, id: input.id };
  });

export const deleteVoicemailProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    return { success: true, id: input.id };
  });
