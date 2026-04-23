import { Context, Next } from 'hono';

export interface SecurityHeadersConfig {
  contentSecurityPolicy?: {
    defaultSrc?: string[];
    scriptSrc?: string[];
    styleSrc?: string[];
    imgSrc?: string[];
    connectSrc?: string[];
    fontSrc?: string[];
    objectSrc?: string[];
    mediaSrc?: string[];
    frameSrc?: string[];
    childSrc?: string[];
    workerSrc?: string[];
    manifestSrc?: string[];
    upgradeInsecureRequests?: boolean;
  };
  crossOriginEmbedderPolicy?: boolean;
  crossOriginOpenerPolicy?: boolean;
  crossOriginResourcePolicy?: boolean;
  dnsPrefetchControl?: boolean;
  forcePreload?: boolean;
  originAgentCluster?: boolean;
  permittedCrossDomainPolicies?: boolean;
  referrerPolicy?: string;
  xContentTypeOptions?: boolean;
  xDnsPrefetchControl?: boolean;
  xDownloadOptions?: boolean;
  xFrameOptions?: 'DENY' | 'SAMEORIGIN' | 'ALLOW-FROM';
  xPermittedCrossDomainPolicies?: boolean;
  xXssProtection?: boolean;
  strictTransportSecurity?: {
    maxAge?: number;
    includeSubDomains?: boolean;
    preload?: boolean;
  };
  permissionsPolicy?: {
    [key: string]: string[];
  };
}

const defaultConfig: SecurityHeadersConfig = {
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:", "blob:"],
    connectSrc: ["'self'", "https:"],
    fontSrc: ["'self'", "data:"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
    childSrc: ["'none'"],
    workerSrc: ["'self'", "blob:"],
    manifestSrc: ["'self'"],
    upgradeInsecureRequests: true,
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,
  dnsPrefetchControl: false,
  forcePreload: false,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: 'strict-origin-when-cross-origin',
  xContentTypeOptions: true,
  xDnsPrefetchControl: false,
  xDownloadOptions: false,
  xFrameOptions: 'DENY',
  xPermittedCrossDomainPolicies: false,
  xXssProtection: true,
  strictTransportSecurity: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  permissionsPolicy: {
    accelerometer: [],
    ambientLightSensor: [],
    autoplay: [],
    battery: [],
    camera: [],
    displayCapture: [],
    documentDomain: [],
    encryptedMedia: [],
    executionWhileOutOfViewport: [],
    fullscreen: [],
    geolocation: [],
    gyroscope: [],
    magnetometer: [],
    microphone: [],
    midi: [],
    navigationOverride: [],
    payment: [],
    pictureInPicture: [],
    publickeyCredentialsGet: [],
    screenWakeLock: [],
    syncXhr: [],
    usb: [],
    webShare: [],
    xrSpatialTracking: [],
  },
};

export function securityHeaders(config: SecurityHeadersConfig = defaultConfig) {
  return async (c: Context, next: Next) => {
    // Apply security headers
    const headers: Record<string, string> = {};

    // Content Security Policy
    if (config.contentSecurityPolicy) {
      const csp = buildCSP(config.contentSecurityPolicy);
      headers['Content-Security-Policy'] = csp;
    }

    // Cross Origin Embedder Policy
    if (config.crossOriginEmbedderPolicy) {
      headers['Cross-Origin-Embedder-Policy'] = 'require-corp';
    }

    // Cross Origin Opener Policy
    if (config.crossOriginOpenerPolicy) {
      headers['Cross-Origin-Opener-Policy'] = 'same-origin';
    }

    // Cross Origin Resource Policy
    if (config.crossOriginResourcePolicy) {
      headers['Cross-Origin-Resource-Policy'] = 'same-origin';
    }

    // DNS Prefetch Control
    if (config.dnsPrefetchControl !== undefined) {
      headers['X-DNS-Prefetch-Control'] = config.dnsPrefetchControl ? 'on' : 'off';
    }

    // Origin Agent Cluster
    if (config.originAgentCluster) {
      headers['Origin-Agent-Cluster'] = '?1';
    }

    // Referrer Policy
    if (config.referrerPolicy) {
      headers['Referrer-Policy'] = config.referrerPolicy;
    }

    // X-Content-Type-Options
    if (config.xContentTypeOptions) {
      headers['X-Content-Type-Options'] = 'nosniff';
    }

    // X-Frame-Options
    if (config.xFrameOptions) {
      headers['X-Frame-Options'] = config.xFrameOptions;
    }

    // X-XSS-Protection
    if (config.xXssProtection) {
      headers['X-XSS-Protection'] = '1; mode=block';
    }

    // Strict Transport Security (HTTPS only)
    if (config.strictTransportSecurity && c.req.url.startsWith('https://')) {
      const sts = [];
      sts.push(`max-age=${config.strictTransportSecurity.maxAge || 31536000}`);
      
      if (config.strictTransportSecurity.includeSubDomains) {
        sts.push('includeSubDomains');
      }
      
      if (config.strictTransportSecurity.preload) {
        sts.push('preload');
      }
      
      headers['Strict-Transport-Security'] = sts.join('; ');
    }

    // Permissions Policy
    if (config.permissionsPolicy) {
      const permissions = Object.entries(config.permissionsPolicy)
        .filter(([_, values]) => values.length > 0)
        .map(([feature, values]) => {
          if (values.length === 0) {
            return feature;
          }
          return `${feature}=(${values.join(', ')})`;
        })
        .join(', ');
      
      if (permissions) {
        headers['Permissions-Policy'] = permissions;
      }
    }

    // Remove insecure headers
    headers['Server'] = '';
    headers['X-Powered-By'] = '';

    // Apply all headers
    Object.entries(headers).forEach(([key, value]) => {
      if (value) {
        c.header(key, value);
      }
    });

    await next();
  };
}

function buildCSP(cspConfig: SecurityHeadersConfig['contentSecurityPolicy']): string {
  if (!cspConfig) return '';

  const directives: string[] = [];

  const directiveMap: Record<keyof NonNullable<typeof cspConfig>, string> = {
    defaultSrc: 'default-src',
    scriptSrc: 'script-src',
    styleSrc: 'style-src',
    imgSrc: 'img-src',
    connectSrc: 'connect-src',
    fontSrc: 'font-src',
    objectSrc: 'object-src',
    mediaSrc: 'media-src',
    frameSrc: 'frame-src',
    childSrc: 'child-src',
    workerSrc: 'worker-src',
    manifestSrc: 'manifest-src',
  };

  Object.entries(directiveMap).forEach(([key, directive]) => {
    const values = cspConfig[key as keyof typeof directiveMap];
    if (values && values.length > 0) {
      directives.push(`${directive} ${values.join(' ')}`);
    }
  });

  if (cspConfig.upgradeInsecureRequests) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
}

// Production-ready strict configuration
export const strictSecurityHeaders = securityHeaders({
  ...defaultConfig,
  contentSecurityPolicy: {
    ...defaultConfig.contentSecurityPolicy,
    scriptSrc: ["'self'"], // No unsafe-inline or unsafe-eval in production
    styleSrc: ["'self'"], // No unsafe-inline in production
  },
});

// Development configuration with relaxed CSP
export const devSecurityHeaders = securityHeaders(defaultConfig);
