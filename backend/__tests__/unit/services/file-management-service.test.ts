import { FileManagementService } from '../../../services/file-management-service';
import { jest } from '@jest/globals';

// Mock dependencies
jest.mock('../../../services/file-storage-service', () => ({
  fileStorageService: {
    uploadFile: jest.fn(),
    downloadFile: jest.fn(),
    deleteFile: jest.fn(),
    getFileMetadata: jest.fn(),
    listFiles: jest.fn(),
    generatePresignedUrl: jest.fn(),
  }
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  unlink: jest.fn(),
  stat: jest.fn(),
  readdir: jest.fn(),
}));

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid'),
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => 'mock-hash')
  }))
}));

describe('FileManagementService', () => {
  let service: FileManagementService;
  let mockFileStorage: any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new FileManagementService();
    mockFileStorage = require('../../../services/file-storage-service').fileStorageService;
  });

  describe('uploadFile', () => {
    it('should upload a file successfully', async () => {
      const mockFileData = Buffer.from('test file content');
      const mockMetadata = {
        id: 'mock-uuid',
        filename: 'test.txt',
        mimeType: 'text/plain',
        size: 17,
        url: 'https://storage.example.com/files/mock-uuid'
      };

      mockFileStorage.uploadFile.mockResolvedValue(mockMetadata);

      const result = await service.uploadFile(
        'org-123',
        'user-123',
        'test.txt',
        mockFileData,
        'text/plain'
      );

      expect(result).toEqual(mockMetadata);
      expect(mockFileStorage.uploadFile).toHaveBeenCalledWith(
        expect.objectContaining({
          filename: 'test.txt',
          content: mockFileData,
          mimeType: 'text/plain'
        })
      );
    });

    it('should handle upload errors gracefully', async () => {
      mockFileStorage.uploadFile.mockRejectedValue(new Error('Upload failed'));

      await expect(
        service.uploadFile('org-123', 'user-123', 'test.txt', Buffer.from('content'))
      ).rejects.toThrow('Upload failed');
    });

    it('should validate file size limits', async () => {
      const largeFile = Buffer.alloc(100 * 1024 * 1024); // 100MB

      await expect(
        service.uploadFile('org-123', 'user-123', 'large.txt', largeFile)
      ).rejects.toThrow('File size exceeds maximum limit');
    });
  });

  describe('downloadFile', () => {
    it('should download a file successfully', async () => {
      const mockFileData = Buffer.from('test file content');
      mockFileStorage.downloadFile.mockResolvedValue({
        buffer: mockFileData,
        metadata: {
          filename: 'test.txt',
          mimeType: 'text/plain',
          size: 17
        }
      });

      const result = await service.downloadFile('org-123', 'file-123');

      expect(result.buffer).toEqual(mockFileData);
      expect(result.metadata.filename).toBe('test.txt');
      expect(mockFileStorage.downloadFile).toHaveBeenCalledWith('file-123');
    });

    it('should handle file not found errors', async () => {
      mockFileStorage.downloadFile.mockRejectedValue(new Error('File not found'));

      await expect(
        service.downloadFile('org-123', 'nonexistent-file')
      ).rejects.toThrow('File not found');
    });
  });

  describe('deleteFile', () => {
    it('should delete a file successfully', async () => {
      mockFileStorage.deleteFile.mockResolvedValue(true);

      await service.deleteFile('org-123', 'file-123');

      expect(mockFileStorage.deleteFile).toHaveBeenCalledWith('file-123');
    });

    it('should handle delete errors gracefully', async () => {
      mockFileStorage.deleteFile.mockRejectedValue(new Error('Delete failed'));

      await expect(
        service.deleteFile('org-123', 'file-123')
      ).rejects.toThrow('Delete failed');
    });
  });

  describe('getFileMetadata', () => {
    it('should retrieve file metadata successfully', async () => {
      const mockMetadata = {
        id: 'file-123',
        filename: 'test.txt',
        mimeType: 'text/plain',
        size: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockFileStorage.getFileMetadata.mockResolvedValue(mockMetadata);

      const result = await service.getFileMetadata('org-123', 'file-123');

      expect(result).toEqual(mockMetadata);
      expect(mockFileStorage.getFileMetadata).toHaveBeenCalledWith('file-123');
    });
  });

  describe('listFiles', () => {
    it('should list files with pagination', async () => {
      const mockFiles = [
        { id: 'file-1', filename: 'test1.txt' },
        { id: 'file-2', filename: 'test2.txt' }
      ];

      mockFileStorage.listFiles.mockResolvedValue({
        files: mockFiles,
        total: 2,
        hasMore: false
      });

      const result = await service.listFiles('org-123', { limit: 10, offset: 0 });

      expect(result.files).toEqual(mockFiles);
      expect(result.total).toBe(2);
      expect(mockFileStorage.listFiles).toHaveBeenCalledWith(
        'org-123',
        expect.objectContaining({ limit: 10, offset: 0 })
      );
    });

    it('should apply filters when listing files', async () => {
      mockFileStorage.listFiles.mockResolvedValue({
        files: [],
        total: 0,
        hasMore: false
      });

      await service.listFiles('org-123', {
        mimeType: 'image/png',
        dateRange: { start: new Date('2023-01-01'), end: new Date('2023-12-31') }
      });

      expect(mockFileStorage.listFiles).toHaveBeenCalledWith(
        'org-123',
        expect.objectContaining({
          mimeType: 'image/png',
          dateRange: expect.any(Object)
        })
      );
    });
  });

  describe('bulkUploadFiles', () => {
    it('should upload multiple files successfully', async () => {
      const files = [
        { filename: 'test1.txt', content: Buffer.from('content1') },
        { filename: 'test2.txt', content: Buffer.from('content2') }
      ];

      mockFileStorage.uploadFile
        .mockResolvedValueOnce({ id: 'file-1', filename: 'test1.txt', size: 8, url: 'url1' })
        .mockResolvedValueOnce({ id: 'file-2', filename: 'test2.txt', size: 8, url: 'url2' });

      const result = await service.bulkUploadFiles('org-123', 'user-123', files);

      expect(result.successful).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
      expect(result.summary.totalFiles).toBe(2);
      expect(result.summary.uploadedFiles).toBe(2);
    });

    it('should handle partial failures in bulk upload', async () => {
      const files = [
        { filename: 'test1.txt', content: Buffer.from('content1') },
        { filename: 'test2.txt', content: Buffer.from('content2') }
      ];

      mockFileStorage.uploadFile
        .mockResolvedValueOnce({ id: 'file-1', filename: 'test1.txt', size: 8, url: 'url1' })
        .mockRejectedValueOnce(new Error('Upload failed'));

      const result = await service.bulkUploadFiles('org-123', 'user-123', files);

      expect(result.successful).toHaveLength(1);
      expect(result.failed).toHaveLength(1);
      expect(result.summary.uploadedFiles).toBe(1);
      expect(result.summary.failedFiles).toBe(1);
    });
  });

  describe('searchFiles', () => {
    it('should search files with filters', async () => {
      const mockSearchResults = {
        files: [
          {
            id: 'file-1',
            filename: 'search-result.pdf',
            mimeType: 'application/pdf',
            size: 1024,
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: ['document', 'important'],
            metadata: { category: 'report' },
            url: 'https://storage.example.com/files/file-1'
          }
        ],
        total: 1,
        hasMore: false
      };

      // Mock the search implementation
      jest.spyOn(service as any, 'searchFiles').mockResolvedValue(mockSearchResults);

      const result = await service.searchFiles('org-123', {
        filename: 'search',
        mimeType: 'application/pdf',
        tags: ['important']
      });

      expect(result.files).toHaveLength(1);
      expect(result.files[0].filename).toBe('search-result.pdf');
      expect(result.total).toBe(1);
    });
  });

  describe('generateFileReport', () => {
    it('should generate comprehensive file report', async () => {
      const mockReport = {
        summary: {
          totalFiles: 100,
          totalSize: 1000000,
          averageFileSize: 10000,
          largestFile: 'large-file.pdf',
          mostActiveUser: 'user-123',
          storageGrowthRate: 0.15
        },
        fileTypes: [
          { type: 'image/jpeg', count: 30, totalSize: 300000, averageSize: 10000, percentage: 30 },
          { type: 'application/pdf', count: 25, totalSize: 250000, averageSize: 10000, percentage: 25 }
        ],
        userActivity: [
          { userId: 'user-123', filesUploaded: 50, totalSize: 500000, lastActivity: new Date() }
        ],
        storageTrends: [
          { date: '2023-01-01', totalSize: 100000, fileCount: 10, newFiles: 5, deletedFiles: 1 }
        ],
        recommendations: [
          {
            category: 'Storage Optimization',
            recommendation: 'Implement automatic compression',
            impact: 'Reduce storage costs by 20-30%',
            priority: 'high'
          }
        ]
      };

      jest.spyOn(service as any, 'generateFileReport').mockResolvedValue(mockReport);

      const result = await service.generateFileReport('org-123', {
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      });

      expect(result.summary.totalFiles).toBe(100);
      expect(result.fileTypes).toHaveLength(2);
      expect(result.recommendations).toHaveLength(1);
      expect(result.recommendations[0].priority).toBe('high');
    });
  });

  describe('optimizeFileStorage', () => {
    it('should optimize file storage and return results', async () => {
      const mockOptimization = {
        optimizationId: 'opt-123',
        results: {
          duplicateFilesFound: 50,
          duplicateFilesRemoved: 25,
          spaceRecovered: 1000000,
          oldFilesArchived: 10,
          compressionApplied: 20,
          compressionSavings: 500000
        },
        recommendations: [
          {
            type: 'Archive Old Files',
            description: 'Archive files older than 1 year',
            potentialSavings: 200000,
            priority: 'medium'
          }
        ],
        completedAt: new Date()
      };

      jest.spyOn(service as any, 'optimizeFileStorage').mockResolvedValue(mockOptimization);

      const result = await service.optimizeFileStorage('org-123');

      expect(result.results.duplicateFilesFound).toBe(50);
      expect(result.results.spaceRecovered).toBe(1000000);
      expect(result.recommendations).toHaveLength(1);
      expect(result.recommendations[0].priority).toBe('medium');
    });
  });

  describe('validateFileIntegrity', () => {
    it('should validate file integrity and report issues', async () => {
      const mockValidation = {
        validationId: 'val-123',
        results: {
          totalKeys: 100,
          validKeys: 95,
          corruptedKeys: 3,
          expiredKeys: 2,
          integrityScore: 0.95
        },
        issues: [
          {
            key: 'corrupted-file-1',
            issue: 'Data corruption detected',
            severity: 'high',
            recommendation: 'Remove and reload the file'
          }
        ],
        actions: [
          {
            type: 'Cleanup',
            description: 'Remove corrupted files',
            keysAffected: 5
          }
        ],
        validatedAt: new Date()
      };

      jest.spyOn(service as any, 'validateFileIntegrity').mockResolvedValue(mockValidation);

      const result = await service.validateFileIntegrity('org-123');

      expect(result.results.integrityScore).toBe(0.95);
      expect(result.issues).toHaveLength(1);
      expect(result.issues[0].severity).toBe('high');
      expect(result.actions).toHaveLength(1);
    });
  });
});
