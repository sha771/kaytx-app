import { z } from 'zod';
import crypto from 'crypto';

/**
 * Secure File Upload Validation
 */

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'text/plain',
  'text/csv',
  'application/json',
];

export const ALLOWED_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp',
  '.pdf', '.txt', '.csv', '.json'
];

/**
 * File upload validation schema
 */
export const fileUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= MAX_FILE_SIZE,
    { message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB` }
  ).refine(
    (file) => ALLOWED_MIME_TYPES.includes(file.type),
    { message: 'File type not allowed' }
  ).refine(
    (file) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      return ALLOWED_EXTENSIONS.includes(ext);
    },
    { message: 'File extension not allowed' }
  ),
});

/**
 * Generate secure filename
 */
export function generateSecureFilename(originalName: string): string {
  const ext = '.' + originalName.split('.').pop()?.toLowerCase();
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  return `${timestamp}_${random}${ext}`;
}

/**
 * Scan file for malicious content (basic implementation)
 */
export async function scanFileForMalware(file: File): Promise<{ safe: boolean; threats?: string[] }> {
  const threats: string[] = [];
  
  // Check for executable file signatures
  let buffer: ArrayBuffer;
  if (typeof file.arrayBuffer === 'function') {
    buffer = await file.slice(0, 20).arrayBuffer();
  } else {
    // Fallback for environments where File.slice().arrayBuffer() is not available (e.g. some Node.js test environments)
    const chunk = file.slice(0, 20);
    const text = await chunk.text();
    buffer = new TextEncoder().encode(text).buffer;
  }
  const bytes = new Uint8Array(buffer);
  
  // Common executable signatures
  const executableSignatures = [
    [0x4D, 0x5A], // PE/Windows executable
    [0x7F, 0x45, 0x4C, 0x46], // ELF/Linux executable
    [0xCA, 0xFE, 0xBA, 0xBE], // Java class
    [0xFE, 0xED, 0xFA, 0xCE], // Mach-O binary
  ];
  
  for (const signature of executableSignatures) {
    if (bytes.slice(0, signature.length).every((byte, i) => byte === signature[i])) {
      threats.push('Executable file detected');
      break;
    }
  }
  
  // Check for script content in non-script files
  if (file.type.startsWith('image/') || file.type === 'application/pdf') {
    const text = await file.slice(0, 1024).text();
    if (/<script|javascript:|vbscript:/i.test(text)) {
      threats.push('Script content detected in non-script file');
    }
  }
  
  return {
    safe: threats.length === 0,
    threats: threats.length > 0 ? threats : undefined
  };
}

/**
 * Validate and process uploaded file
 */
export async function validateAndProcessFile(file: File): Promise<{
  valid: boolean;
  errors?: string[];
  filename?: string;
  buffer?: ArrayBuffer;
}> {
  const errors: string[] = [];
  
  // Schema validation
  const schemaResult = fileUploadSchema.safeParse({ file });
  if (!schemaResult.success) {
    errors.push(...schemaResult.error.issues.map(e => e.message));
    return { valid: false, errors };
  }
  
  // Malware scan
  const scanResult = await scanFileForMalware(file);
  if (!scanResult.safe) {
    errors.push(...(scanResult.threats || ['Malware detected']));
    return { valid: false, errors };
  }
  
  // Generate secure filename
  const secureFilename = generateSecureFilename(file.name);
  const buffer = await file.arrayBuffer();
  
  return {
    valid: true,
    filename: secureFilename,
    buffer
  };
}

/**
 * Multiple file upload validation
 */
export const multipleFileUploadSchema = z.object({
  files: z.array(z.instanceof(File)).max(5, { message: 'Maximum 5 files allowed' })
});

export async function validateMultipleFiles(files: File[]): Promise<{
  valid: boolean;
  errors?: string[];
  processedFiles?: { filename: string; buffer: ArrayBuffer; originalName: string }[];
}> {
  const errors: string[] = [];
  const processedFiles: { filename: string; buffer: ArrayBuffer; originalName: string }[] = [];
  
  if (files.length > 5) {
    errors.push('Maximum 5 files allowed');
    return { valid: false, errors };
  }
  
  for (const file of files) {
    const result = await validateAndProcessFile(file);
    if (!result.valid) {
      errors.push(`${file.name}: ${result.errors?.join(', ')}`);
    } else if (result.filename && result.buffer) {
      processedFiles.push({
        filename: result.filename,
        buffer: result.buffer,
        originalName: file.name
      });
    }
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    processedFiles: errors.length === 0 ? processedFiles : undefined
  };
}
