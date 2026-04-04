import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';

const schema = z.object({
  email: z.string().email().optional(),
});

export default protectedProcedure
  .input(schema)
  .query(({ ctx, input }) => {
    console.log('[Privacy] Checking for data breaches for user:', ctx.user.id);
    
    const mockBreaches = [
      {
        id: '1',
        service: 'Example Service',
        breachDate: '2023-06-15',
        affectedData: ['email', 'password'],
        severity: 'high' as const,
        description: 'Password database compromised',
        recommendations: [
          'Change your password immediately',
          'Enable two-factor authentication',
          'Review recent account activity',
        ],
      },
      {
        id: '2',
        service: 'Another Platform',
        breachDate: '2022-11-20',
        affectedData: ['email', 'phone'],
        severity: 'medium' as const,
        description: 'Contact information leaked',
        recommendations: [
          'Be cautious of phishing attempts',
          'Monitor your accounts for suspicious activity',
        ],
      },
    ];
    
    return {
      success: true,
      breachesFound: mockBreaches.length,
      breaches: mockBreaches,
      lastChecked: Date.now(),
      recommendation: mockBreaches.length > 0 
        ? 'Your information has been found in data breaches. Please take action.'
        : 'No breaches found. Your data appears secure.',
    };
  });
