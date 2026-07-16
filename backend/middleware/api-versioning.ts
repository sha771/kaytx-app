/**
 * API Versioning Middleware
 * Adds version prefixes to API routes and negotiates versions.
 *
 * Supported URL patterns:
 *   /api/v1/users
 *   /api/v2/users
 *
 * Falls back to the latest version if no prefix is specified.
 */

import type { Context, Next } from 'hono';

export const API_VERSIONS = ['v1', 'v2'] as const;
export type ApiVersion = (typeof API_VERSIONS)[number];
export const LATEST_VERSION: ApiVersion = 'v2';
export const DEFAULT_VERSION: ApiVersion = 'v1';

// Track deprecation dates
const DEPRECATION_SCHEDULE: Partial<Record<ApiVersion, string>> = {
  v1: '2026-12-31', // v1 sunset date
};

/**
 * Middleware that parses the API version from the URL path
 * and attaches it to the request context.
 *
 * Usage:
 *   app.use('/api/:version/*', versionMiddleware())
 *   app.get('/api/:version/users', (c) => {
 *     const version = c.get('apiVersion');
 *     ...
 *   })
 */
export function versionMiddleware() {
  return async (c: Context, next: Next) => {
    const versionParam = c.req.param('version') as ApiVersion | undefined;

    if (!versionParam) {
      // No version specified — default
      c.set('apiVersion', DEFAULT_VERSION);
      c.set('apiVersionDeprecated', false);
      await next();
      return;
    }

    if (!API_VERSIONS.includes(versionParam)) {
      return c.json(
        {
          error: 'Unsupported API version',
          requestedVersion: versionParam,
          supportedVersions: API_VERSIONS,
        },
        400
      );
    }

    c.set('apiVersion', versionParam);
    c.set('apiVersionDeprecated', versionParam !== LATEST_VERSION);

    // Add deprecation warning header
    const deprecationDate = DEPRECATION_SCHEDULE[versionParam];
    if (deprecationDate) {
      c.header('Deprecation', 'true');
      c.header('Sunset', deprecationDate);
      c.header('Link', '</api/' + LATEST_VERSION + '>; rel="successor-version"');
    }

    await next();
  };
}

/**
 * Route handler that requires a minimum API version.
 * Returns 404 if the request version is older than required.
 */
export function requireVersion(minVersion: ApiVersion) {
  const minIdx = API_VERSIONS.indexOf(minVersion);

  return async (c: Context, next: Next) => {
    const current = c.get('apiVersion') as ApiVersion;
    const currentIdx = API_VERSIONS.indexOf(current);

    if (currentIdx < minIdx) {
      return c.json(
        {
          error: 'This endpoint requires API version ' + minVersion + ' or later',
          currentVersion: current,
          minimumRequired: minVersion,
        },
        404
      );
    }

    await next();
  };
}

/**
 * Helper to build versioned route paths
 */
export function versionedPath(path: string, version: ApiVersion = DEFAULT_VERSION): string {
  return `/api/${version}${path.startsWith('/') ? path : '/' + path}`;
}

/**
 * Get the version of an incoming request (Hono Express-style)
 */
export function getRequestVersion(c: Context): ApiVersion {
  return (c.get('apiVersion') as ApiVersion) || DEFAULT_VERSION;
}
