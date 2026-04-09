import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { 
  validateAndProcessFile,
  generateSecureFilename,
  scanFileForMalware,
  fileUploadSchema,
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES
} from '../../../backend/middleware/file-upload';

describe('File Upload Security', () => {
  describe('generateSecureFilename', () => {
    it('should generate a secure filename with timestamp and random string', () => {
      const filename = generateSecureFilename('test.jpg');
      expect(filename).toMatch(/^\d+_[a-f0-9]{16}\.jpg$/);
    });

    it('should handle different extensions', () => {
      const pdfFilename = generateSecureFilename('document.pdf');
      const txtFilename = generateSecureFilename('notes.txt');
      
      expect(pdfFilename).toMatch(/^\d+_[a-f0-9]{16}\.pdf$/);
      expect(txtFilename).toMatch(/^\d+_[a-f0-9]{16}\.txt$/);
    });

    it('should handle uppercase extensions', () => {
      const filename = generateSecureFilename('IMAGE.JPG');
      expect(filename).toMatch(/^\d+_[a-f0-9]{16}\.jpg$/);
    });
  });

  describe('scanFileForMalware', () => {
    it('should detect executable files', async () => {
      // Create a mock file with PE executable signature
      const peSignature = new Uint8Array([0x4D, 0x5A, 0x90, 0x00]);
      const mockFile = new File([peSignature], 'malware.exe', { type: 'application/octet-stream' });
      
      // Mock the slice method to return our signature
      const originalSlice = mockFile.slice;
      mockFile.slice = jest.fn(() => ({
        arrayBuffer: jest.fn().mockResolvedValue(peSignature.buffer)
      }));
      
      const result = await scanFileForMalware(mockFile);
      expect(result.safe).toBe(false);
      expect(result.threats).toContain('Executable file detected');
      
      // Restore original method
      mockFile.slice = originalSlice;
    });

    it('should allow clean image files', async () => {
      const mockFile = new File(['fake image data'], 'image.jpg', { type: 'image/jpeg' });
      
      // Mock the slice method to return clean data
      const originalSlice = mockFile.slice;
      mockFile.slice = jest.fn(() => ({
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(20))
      }));
      
      const result = await scanFileForMalware(mockFile);
      expect(result.safe).toBe(true);
      expect(result.threats).toBeUndefined();
      
      // Restore original method
      mockFile.slice = originalSlice;
    });

    it('should detect script content in non-script files', async () => {
      const scriptContent = '<script>alert("xss")</script>';
      const mockFile = new File([scriptContent], 'image.jpg', { type: 'image/jpeg' });
      
      // Mock the slice method to return script content
      const originalSlice = mockFile.slice;
      mockFile.slice = jest.fn(() => ({
        arrayBuffer: jest.fn().mockResolvedValue(new TextEncoder().encode(scriptContent).buffer),
        text: jest.fn().mockResolvedValue(scriptContent)
      }));
      
      const result = await scanFileForMalware(mockFile);
      expect(result.safe).toBe(false);
      expect(result.threats).toContain('Script content detected in non-script file');
      
      // Restore original method
      mockFile.slice = originalSlice;
    });
  });

  describe('validateAndProcessFile', () => {
    it('should reject oversized files', async () => {
      const oversizedContent = new Array(MAX_FILE_SIZE + 1).fill('a').join('');
      const mockFile = new File([oversizedContent], 'large.txt', { type: 'text/plain' });
      
      const result = await validateAndProcessFile(mockFile);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    });

    it('should reject disallowed file types', async () => {
      const mockFile = new File(['content'], 'script.js', { type: 'application/javascript' });
      
      const result = await validateAndProcessFile(mockFile);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('File type not allowed');
    });

    it('should reject disallowed extensions', async () => {
      const mockFile = new File(['content'], 'script.exe', { type: 'application/octet-stream' });
      
      const result = await validateAndProcessFile(mockFile);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('File extension not allowed');
    });

    it('should accept valid files', async () => {
      const mockFile = new File(['valid content'], 'document.pdf', { type: 'application/pdf' });
      
      const result = await validateAndProcessFile(mockFile);
      expect(result.valid).toBe(true);
      expect(result.filename).toMatch(/^\d+_[a-f0-9]{16}\.pdf$/);
      expect(result.buffer).toBeInstanceOf(ArrayBuffer);
    });

    it('should reject files with malware', async () => {
      const peSignature = new Uint8Array([0x4D, 0x5A, 0x90, 0x00]);
      const mockFile = new File([peSignature], 'malware.pdf', { type: 'application/pdf' });
      
      const result = await validateAndProcessFile(mockFile);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Executable file detected');
    });
  });

  describe('fileUploadSchema', () => {
    it('should validate file size', () => {
      const oversizedContent = new Array(MAX_FILE_SIZE + 1).fill('a').join('');
      const mockFile = new File([oversizedContent], 'large.txt', { type: 'text/plain' });
      
      const result = fileUploadSchema.safeParse({ file: mockFile });
      expect(result.success).toBe(false);
    });

    it('should validate file type', () => {
      const mockFile = new File(['content'], 'script.js', { type: 'application/javascript' });
      
      const result = fileUploadSchema.safeParse({ file: mockFile });
      expect(result.success).toBe(false);
    });

    it('should validate file extension', () => {
      const mockFile = new File(['content'], 'script.exe', { type: 'application/octet-stream' });
      
      const result = fileUploadSchema.safeParse({ file: mockFile });
      expect(result.success).toBe(false);
    });

    it('should accept valid files', () => {
      const mockFile = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      
      const result = fileUploadSchema.safeParse({ file: mockFile });
      expect(result.success).toBe(true);
    });
  });
});
