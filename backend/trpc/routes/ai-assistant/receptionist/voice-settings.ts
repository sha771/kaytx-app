import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';

export const getVoiceSettingsProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .query(async () => {
    return {
      profiles: [
        { id: 'profile1', name: 'Professional Female', language: 'English', accent: 'US', gender: 'Female', pitch: 1.0, speed: 1.0, isActive: true },
        { id: 'profile2', name: 'Friendly Male', language: 'English', accent: 'UK', gender: 'Male', pitch: 0.9, speed: 1.1, isActive: false },
        { id: 'profile3', name: 'Executive Voice', language: 'English', accent: 'US', gender: 'Male', pitch: 0.8, speed: 0.95, isActive: false },
      ],
      customization: {
        pitch: 1.0,
        speed: 1.0,
        volume: 0.8,
        useBackgroundMusic: false,
        useFillerWords: true,
        emotionalTone: 'friendly',
      }
    };
  });

export const updateVoiceSettingsProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .input(z.object({
    pitch: z.number().optional(),
    speed: z.number().optional(),
    volume: z.number().optional(),
    useBackgroundMusic: z.boolean().optional(),
    useFillerWords: z.boolean().optional(),
    emotionalTone: z.string().optional(),
    activeProfileId: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    return { success: true, updated: input };
  });
