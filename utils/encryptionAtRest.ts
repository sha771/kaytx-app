import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ENCRYPTION_KEY = 'encryption_master_key';
const IV_LENGTH = 16;

export class EncryptionAtRestService {
  private static instance: EncryptionAtRestService;
  private masterKey: string | null = null;

  private constructor() {}

  static getInstance(): EncryptionAtRestService {
    if (!EncryptionAtRestService.instance) {
      EncryptionAtRestService.instance = new EncryptionAtRestService();
    }
    return EncryptionAtRestService.instance;
  }

  async initialize(): Promise<void> {
    try {
      let key = await SecureStore.getItemAsync(ENCRYPTION_KEY);
      
      if (!key) {
        key = await this.generateMasterKey();
        await SecureStore.setItemAsync(ENCRYPTION_KEY, key);
      }
      
      this.masterKey = key;
      console.log('[Encryption] Master key initialized');
    } catch (error) {
      console.error('[Encryption] Failed to initialize:', error);
      throw new Error('Failed to initialize encryption service');
    }
  }

  private async generateMasterKey(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    return Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async encrypt(data: string): Promise<string> {
    if (!this.masterKey) {
      await this.initialize();
    }

    try {
      const iv = await Crypto.getRandomBytesAsync(IV_LENGTH);
      const ivHex = Array.from(iv)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const dataToEncrypt = `${ivHex}:${data}`;
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        dataToEncrypt + this.masterKey
      );

      return `${ivHex}:${hash}:${this.base64Encode(data)}`;
    } catch (error) {
      console.error('[Encryption] Failed to encrypt:', error);
      throw new Error('Encryption failed');
    }
  }

  async decrypt(encryptedData: string): Promise<string> {
    if (!this.masterKey) {
      await this.initialize();
    }

    try {
      const parts = encryptedData.split(':');
      if (parts.length !== 3) {
        throw new Error('Invalid encrypted data format');
      }

      const [iv, hash, encodedData] = parts;
      const data = this.base64Decode(encodedData);

      const expectedHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${iv}:${data}${this.masterKey}`
      );

      if (hash !== expectedHash) {
        throw new Error('Data integrity check failed');
      }

      return data;
    } catch (error) {
      console.error('[Encryption] Failed to decrypt:', error);
      throw new Error('Decryption failed');
    }
  }

  async encryptObject<T>(obj: T): Promise<string> {
    const jsonString = JSON.stringify(obj);
    return this.encrypt(jsonString);
  }

  async decryptObject<T>(encryptedData: string): Promise<T> {
    const decrypted = await this.decrypt(encryptedData);
    return JSON.parse(decrypted) as T;
  }

  async secureStore(key: string, value: string): Promise<void> {
    const encrypted = await this.encrypt(value);
    await SecureStore.setItemAsync(key, encrypted);
  }

  async secureRetrieve(key: string): Promise<string | null> {
    try {
      const encrypted = await SecureStore.getItemAsync(key);
      if (!encrypted) return null;
      return await this.decrypt(encrypted);
    } catch (error) {
      console.error('[Encryption] Failed to retrieve:', error);
      return null;
    }
  }

  async secureDelete(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  private base64Encode(str: string): string {
    if (Platform.OS === 'web') {
      return btoa(encodeURIComponent(str));
    }
    return Buffer.from(str, 'utf-8').toString('base64');
  }

  private base64Decode(str: string): string {
    if (Platform.OS === 'web') {
      return decodeURIComponent(atob(str));
    }
    return Buffer.from(str, 'base64').toString('utf-8');
  }

  async hash(data: string): Promise<string> {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data
    );
  }

  async hashWithSalt(data: string, salt?: string): Promise<string> {
    const actualSalt = salt || (await this.generateMasterKey()).substring(0, 16);
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data + actualSalt
    );
  }

  async verifyHash(data: string, hash: string, salt?: string): Promise<boolean> {
    const computed = await this.hashWithSalt(data, salt);
    return computed === hash;
  }
}

export const encryptionAtRest = EncryptionAtRestService.getInstance();
