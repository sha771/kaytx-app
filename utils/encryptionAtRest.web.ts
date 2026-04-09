// Web-safe version of encryption-at-rest for frontend use
// This stub provides web-compatible encryption using Web Crypto API

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
      // Use localStorage for web instead of SecureStore
      let key = localStorage.getItem('encryption_master_key');
      
      if (!key) {
        key = await this.generateMasterKey();
        localStorage.setItem('encryption_master_key', key);
      }
      
      this.masterKey = key;
      console.log('[Encryption] Master key initialized for web');
    } catch (error) {
      console.error('[Encryption] Failed to initialize:', error);
      throw new Error('Failed to initialize encryption service');
    }
  }

  private async generateMasterKey(): Promise<string> {
    // Use Web Crypto API for key generation
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async encrypt(data: string): Promise<string> {
    if (!this.masterKey) {
      await this.initialize();
    }
    
    try {
      // Simple XOR encryption for web (not for production, use proper encryption)
      const keyBytes = this.hexToBytes(this.masterKey!);
      const dataBytes = new TextEncoder().encode(data);
      const encrypted = dataBytes.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
      return btoa(String.fromCharCode(...encrypted));
    } catch (error) {
      console.error('[Encryption] Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }

  async decrypt(encryptedData: string): Promise<string> {
    if (!this.masterKey) {
      await this.initialize();
    }
    
    try {
      const keyBytes = this.hexToBytes(this.masterKey!);
      const dataBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
      const decrypted = dataBytes.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('[Encryption] Decryption failed:', error);
      throw new Error('Decryption failed');
    }
  }

  private hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
  }

  async secureStore(key: string, value: string): Promise<void> {
    const encrypted = await this.encrypt(value);
    localStorage.setItem(key, encrypted);
  }

  async secureRetrieve(key: string): Promise<string | null> {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    return await this.decrypt(encrypted);
  }

  async deleteItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

export const encryptionAtRest = EncryptionAtRestService.getInstance();
export default encryptionAtRest;
