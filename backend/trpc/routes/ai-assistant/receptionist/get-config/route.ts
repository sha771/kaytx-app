import { protectedProcedure } from '../../../../create-context';

export const getReceptionistConfigProcedure = protectedProcedure.query(async () => {
  return {
    config: {
      enabled: true,
      autoAnswer: true,
      recordCalls: true,
      transcribeCalls: true,
      voiceType: 'professional',
      speakingSpeed: 1.0,
      emotionalTone: 'friendly',
      holdMusic: true,
      maxCallDuration: 15,
      transferToHuman: true,
      transferThreshold: 3,
      businessHoursOnly: true,
      sendSummaryEmail: true,
    },
    greetingScripts: [
      {
        id: '1',
        name: 'Standard Greeting',
        script: 'Thank you for calling [Company Name]. This is your AI receptionist. How may I help you today?',
        timeOfDay: 'anytime',
        language: 'English',
      },
    ],
    callRules: [
      {
        id: '1',
        name: 'VIP Customer',
        condition: 'Caller is in VIP list',
        action: 'Transfer immediately to manager',
        priority: 1,
        enabled: true,
      },
    ],
    bookingSlots: [
      {
        id: '1',
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '17:00',
        maxBookings: 10,
        enabled: true,
      },
    ],
  };
});
