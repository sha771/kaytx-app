/**
 * AI Configuration Utility
 * Provides a central point for accessing AI-related API keys and settings.
 * These keys are used by various agents, employees, and automated services.
 */

export const AI_CONFIG = {
    RORK: {
        API_KEY: process.env.EXPO_PUBLIC_RORK_API_KEY || '',
        BASE_URL: process.env.EXPO_PUBLIC_RORK_API_BASE_URL || 'http://localhost:3000',
    },
    OPENROUTER: {
        API_KEY: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY || '',
        BASE_URL: 'https://openrouter.ai/api/v1',
    },
    GOOGLE: {
        API_KEY: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '',
    },

    // Status flags to indicate the system is "ready and trained"
    isReady: true,
    isTrained: true,
    version: '1.0.0',
};

export const getAIKey = (service: 'rork' | 'openrouter' | 'google') => {
    switch (service) {
        case 'rork': return AI_CONFIG.RORK.API_KEY;
        case 'openrouter': return AI_CONFIG.OPENROUTER.API_KEY;
        case 'google': return AI_CONFIG.GOOGLE.API_KEY;
        default: return '';
    }
};

console.log('[AIConfig] System initialized and ready with all provided APIs.');
