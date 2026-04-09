import fc from 'fast-check';
import { decrypt, encrypt, generateEncryptionKey, hashData } from '../encryption';

describe('encryption property tests', () => {
  it('encrypt/decrypt round-trip', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 512 }), (text) => {
        const key = generateEncryptionKey();
        const out = encrypt(text, key);
        const plain = decrypt(out.encrypted, key, out.iv, out.authTag);
        expect(plain).toBe(text);
      })
    );
  });

  it('hashData is deterministic', () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        expect(hashData(text)).toBe(hashData(text));
      })
    );
  });
});
