import { TLSConfig } from '../types';

export interface TLSCertificate {
  cert: string;
  key: string;
  ca?: string;
  passphrase?: string;
}

export interface TLSValidationResult {
  valid: boolean;
  version?: string;
  cipher?: string;
  protocol?: string;
  error?: string;
}

export class TLSManager {
  private certificates: Map<string, TLSCertificate> = new Map();
  private configs: Map<string, TLSConfig> = new Map();

  constructor() {
    console.log('[TLSManager] Initialized');
  }

  registerCertificate(id: string, certificate: TLSCertificate): void {
    this.certificates.set(id, certificate);
    console.log(`[TLSManager] Certificate registered: ${id}`);
  }

  getCertificate(id: string): TLSCertificate | undefined {
    return this.certificates.get(id);
  }

  registerConfig(id: string, config: TLSConfig): void {
    this.configs.set(id, config);
    console.log(`[TLSManager] TLS config registered: ${id}`);
  }

  getConfig(id: string): TLSConfig | undefined {
    return this.configs.get(id);
  }

  createSecureContext(config: TLSConfig, certificate?: TLSCertificate): any {
    console.log('[TLSManager] Creating secure context');

    const context = {
      minVersion: config.minVersion,
      maxVersion: 'TLSv1.3',
      ciphers: config.cipherSuites.join(':'),
      honorCipherOrder: true,
      rejectUnauthorized: config.verifyPeer,
      servername: config.sni,
    };

    if (certificate) {
      Object.assign(context, {
        cert: certificate.cert,
        key: certificate.key,
        ca: certificate.ca,
        passphrase: certificate.passphrase,
      });
    }

    return context;
  }

  validateTLSConnection(config: TLSConfig): TLSValidationResult {
    console.log('[TLSManager] Validating TLS connection');

    if (!config.enabled) {
      return {
        valid: false,
        error: 'TLS is disabled',
      };
    }

    if (config.minVersion !== 'TLSv1.2' && config.minVersion !== 'TLSv1.3') {
      return {
        valid: false,
        error: 'Invalid TLS version',
      };
    }

    if (!config.cipherSuites || config.cipherSuites.length === 0) {
      return {
        valid: false,
        error: 'No cipher suites specified',
      };
    }

    return {
      valid: true,
      version: config.minVersion,
      cipher: config.cipherSuites[0],
      protocol: 'TLS',
    };
  }

  getRecommendedCipherSuites(): string[] {
    return [
      'TLS_AES_256_GCM_SHA384',
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_GCM_SHA256',
      'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384',
      'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
    ];
  }

  getDefaultConfig(): TLSConfig {
    return {
      enabled: true,
      minVersion: 'TLSv1.3',
      cipherSuites: this.getRecommendedCipherSuites(),
      verifyPeer: true,
    };
  }

  async generateSelfSignedCertificate(options: {
    commonName: string;
    organization?: string;
    validityDays?: number;
  }): Promise<TLSCertificate> {
    console.log('[TLSManager] Generating self-signed certificate');

    const cert = `-----BEGIN CERTIFICATE-----
Mock Certificate for ${options.commonName}
Valid for ${options.validityDays || 365} days
-----END CERTIFICATE-----`;

    const key = `-----BEGIN PRIVATE KEY-----
Mock Private Key for ${options.commonName}
-----END PRIVATE KEY-----`;

    return { cert, key };
  }

  async verifyCertificate(certificate: TLSCertificate): Promise<{
    valid: boolean;
    expiresAt?: Date;
    issuer?: string;
    subject?: string;
    error?: string;
  }> {
    console.log('[TLSManager] Verifying certificate');

    if (!certificate.cert || !certificate.key) {
      return {
        valid: false,
        error: 'Missing certificate or key',
      };
    }

    return {
      valid: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      issuer: 'Mock CA',
      subject: 'Mock Subject',
    };
  }

  async rotateCertificate(id: string, newCertificate: TLSCertificate): Promise<void> {
    console.log(`[TLSManager] Rotating certificate: ${id}`);
    
    const verification = await this.verifyCertificate(newCertificate);
    
    if (!verification.valid) {
      throw new Error(`Certificate verification failed: ${verification.error}`);
    }

    this.certificates.set(id, newCertificate);
    console.log(`[TLSManager] Certificate rotated successfully: ${id}`);
  }

  listCertificates(): { id: string; hasKey: boolean; hasCa: boolean }[] {
    return Array.from(this.certificates.entries()).map(([id, cert]) => ({
      id,
      hasKey: !!cert.key,
      hasCa: !!cert.ca,
    }));
  }

  removeCertificate(id: string): boolean {
    const deleted = this.certificates.delete(id);
    if (deleted) {
      console.log(`[TLSManager] Certificate removed: ${id}`);
    }
    return deleted;
  }
}

export const tlsManager = new TLSManager();
