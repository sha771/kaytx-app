import type { Context } from 'hono';
import crypto from 'crypto';

export type ApiErrorDetail = { field?: string; message: string };

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    errorId: string;
    timestamp: string;
    path: string;
    details?: ApiErrorDetail[];
  };
};

export function generateErrorId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return crypto.randomBytes(16).toString('hex');
  }
}

export function makeApiError(
  c: Context,
  code: string,
  message: string,
  details?: ApiErrorDetail[],
  errorId: string = generateErrorId(),
  timestamp: string = new Date().toISOString()
): ApiErrorBody {
  return {
    error: {
      code,
      message,
      errorId,
      timestamp,
      path: c.req.path,
      ...(details ? { details } : {}),
    },
  };
}

export function jsonApiError(
  c: Context,
  status: number,
  code: string,
  message: string,
  details?: ApiErrorDetail[]
) {
  return c.json(makeApiError(c, code, message, details), status as any);
}
