import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import validator from 'validator';
import { Platform } from 'react-native';

const SALT = 'rork_enterprise_salt_v1';

export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('Failed to store in localStorage:', e);
      }
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('Failed to get from localStorage:', e);
        return null;
      }
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('Failed to remove from localStorage:', e);
      }
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

export const encryption = {
  async hashPassword(password: string): Promise<string> {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password + SALT
    );
    return hash;
  },

  async encryptData(data: string): Promise<string> {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data + SALT
    );
    return hash;
  },
};

export const validation = {
  email(email: string): { valid: boolean; error?: string } {
    if (!email) {
      return { valid: false, error: 'Email is required' };
    }
    if (!validator.isEmail(email)) {
      return { valid: false, error: 'Invalid email format' };
    }
    return { valid: true };
  },

  password(password: string): { valid: boolean; error?: string } {
    if (!password) {
      return { valid: false, error: 'Password is required' };
    }
    if (password.length < 8) {
      return { valid: false, error: 'Password must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one special character' };
    }
    return { valid: true };
  },

  phoneNumber(phone: string): { valid: boolean; error?: string } {
    if (!phone) {
      return { valid: false, error: 'Phone number is required' };
    }
    const normalized = String(phone).trim();
    if (!/^\+[1-9]\d{9,14}$/.test(normalized)) {
      return { valid: false, error: 'Invalid phone number format' };
    }
    return { valid: true };
  },

  apiKey(key: string): { valid: boolean; error?: string } {
    if (!key) {
      return { valid: false, error: 'API key is required' };
    }
    if (key.length < 16) {
      return { valid: false, error: 'API key is too short' };
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
      return { valid: false, error: 'API key contains invalid characters' };
    }
    return { valid: true };
  },

  verificationCode(code: string): { valid: boolean; error?: string } {
    if (!code) {
      return { valid: false, error: 'Verification code is required' };
    }
    if (!/^\d{4,6}$/.test(code)) {
      return { valid: false, error: 'Verification code must be 4-6 digits' };
    }
    return { valid: true };
  },

  url(url: string): { valid: boolean; error?: string } {
    if (!url) {
      return { valid: false, error: 'URL is required' };
    }
    if (!validator.isURL(url, { require_protocol: true })) {
      return { valid: false, error: 'Invalid URL format' };
    }
    return { valid: true };
  },
};

export const sanitization = {
  text(text: string): string {
    if (!text) return '';
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  html(html: string): string {
    if (!html) return '';
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  },

  input(input: string): string {
    if (!input) return '';
    return validator.escape(input);
  },
};

export const rateLimiter = {
  createBackoff(baseDelay: number = 2500, maxRetries: number = 10) {
    let retryCount = 0;

    return {
      getDelay(): number {
        return Math.min(baseDelay * Math.pow(1.5, retryCount), 30000);
      },

      increment(): void {
        retryCount++;
      },

      reset(): void {
        retryCount = 0;
      },

      canRetry(): boolean {
        return retryCount < maxRetries;
      },

      getRetryCount(): number {
        return retryCount;
      },
    };
  },
};
