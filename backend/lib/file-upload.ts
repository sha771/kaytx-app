import { z } from 'zod';
import { config } from './config';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const MAX_FILE_SIZE = config.fileUpload.maxSize;

export const fileUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => ALLOWED_MIME_TYPES.includes(file.type),
    { message: 'Invalid file type. Only images, PDFs, and spreadsheets are allowed.' }
  ).refine(
    (file) => file.size <= MAX_FILE_SIZE,
    { message: `File too large. Maximum size is ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB.` }
  ),
});

export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only images, PDFs, and spreadsheets are allowed.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File too large. Maximum size is ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB.` };
  }
  return { valid: true };
}

export function sanitizeFileName(fileName: string): string {
  // Remove path separators and special characters, keep extension
  const sanitized = fileName
    .replace(/^.*[\\\/]/, '') // Remove path
    .replace(/[^a-zA-Z0-9.-_]/g, '_') // Replace unsafe chars
    .substring(0, 255); // Limit length
  return sanitized;
}
