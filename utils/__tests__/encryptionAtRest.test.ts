import { encryptionAtRest } from '../encryptionAtRest';

describe('EncryptionAtRest', () => {
  beforeAll(async () => {
    await encryptionAtRest.initialize();
  });

  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt text correctly', async () => {
      const plaintext = 'sensitive data';
      const encrypted = await encryptionAtRest.encrypt(plaintext);
      const decrypted = await encryptionAtRest.decrypt(encrypted);
      
      expect(decrypted).toBe(plaintext);
      expect(encrypted).not.toBe(plaintext);
    });

    it('should encrypt and decrypt objects correctly', async () => {
      const obj = { username: 'test', password: 'secret123' };
      const encrypted = await encryptionAtRest.encryptObject(obj);
      const decrypted = await encryptionAtRest.decryptObject(encrypted);
      
      expect(decrypted).toEqual(obj);
    });

    it('should produce different encrypted outputs for same input', async () => {
      const plaintext = 'test data';
      const encrypted1 = await encryptionAtRest.encrypt(plaintext);
      const encrypted2 = await encryptionAtRest.encrypt(plaintext);
      
      expect(encrypted1).not.toBe(encrypted2);
    });
  });

  describe('hashing', () => {
    it('should hash data consistently', async () => {
      const data = 'password123';
      const hash1 = await encryptionAtRest.hash(data);
      const hash2 = await encryptionAtRest.hash(data);
      
      expect(hash1).toBe(hash2);
    });

    it('should verify hash correctly', async () => {
      const data = 'password123';
      const salt = 'randomsalt123456';
      const hash = await encryptionAtRest.hashWithSalt(data, salt);
      const isValid = await encryptionAtRest.verifyHash(data, hash, salt);
      
      expect(isValid).toBe(true);
    });

    it('should fail verification with wrong data', async () => {
      const data = 'password123';
      const wrongData = 'wrongpassword';
      const salt = 'randomsalt123456';
      const hash = await encryptionAtRest.hashWithSalt(data, salt);
      const isValid = await encryptionAtRest.verifyHash(wrongData, hash, salt);
      
      expect(isValid).toBe(false);
    });
  });
});
