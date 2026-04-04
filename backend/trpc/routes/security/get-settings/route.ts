import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .query(() => {
    console.log('[Security] Fetching security settings');
    
    return {
      twoFactorEnabled: true,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90
      },
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      loginAttempts: {
        maxAttempts: 5,
        lockoutDuration: 30
      },
      encryption: {
        algorithm: 'AES-256-GCM',
        keyRotation: 90
      },
      auditLog: {
        enabled: true,
        retention: 365
      },
      compliance: {
        gdpr: true,
        hipaa: false,
        soc2: true
      }
    };
  });
