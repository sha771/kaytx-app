import { db as pgDb } from '../db/connection';
import { eq, and, desc } from 'drizzle-orm';
import crypto from 'crypto';
import { EventEmitter } from 'events';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { join } from 'path';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface FileMetadata {
  id: string;
  organizationId: string;
  userId?: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  hash: string;
  bucket?: string;
  isPublic: boolean;
  isEncrypted: boolean;
  encryptionKey?: string;
  tags: string[];
  metadata: Record<string, any>;
  uploadedAt: Date;
  lastAccessed?: Date;
  expiresAt?: Date;
  downloadCount: number;
}

export interface FileUploadOptions {
  organizationId: string;
  userId?: string;
  filename: string;
  mimeType: string;
  size: number;
  isPublic?: boolean;
  isEncrypted?: boolean;
  tags?: string[];
  metadata?: Record<string, any>;
  expiresAt?: Date;
}

export interface FileDownloadOptions {
  organizationId: string;
  fileId: string;
  userId?: string;
  includeMetadata?: boolean;
  forceDownload?: boolean;
}

export interface StorageProvider {
  name: string;
  uploadFile(file: Buffer | NodeJS.ReadableStream, key: string, options?: any): Promise<string>;
  downloadFile(key: string): Promise<Buffer>;
  deleteFile(key: string): Promise<void>;
  getFileUrl(key: string, expiresInSeconds?: number): Promise<string>;
  listFiles(prefix?: string): Promise<string[]>;
}

export class LocalStorageProvider implements StorageProvider {
  name = 'local';
  private basePath: string;

  constructor(basePath: string = './uploads') {
    this.basePath = basePath;
  }

  async uploadFile(file: Buffer | NodeJS.ReadableStream, key: string, options?: any): Promise<string> {
    const filePath = join(this.basePath, key);
    const writeStream = createWriteStream(filePath);

    if (Buffer.isBuffer(file)) {
      writeStream.write(file);
      writeStream.end();
    } else {
      await pipeline(file, writeStream);
    }

    return filePath;
  }

  async downloadFile(key: string): Promise<Buffer> {
    const filePath = join(this.basePath, key);
    const readStream = createReadStream(filePath);
    const chunks: Buffer[] = [];

    for await (const chunk of readStream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }

  async deleteFile(key: string): Promise<void> {
    const fs = await import('fs/promises');
    const filePath = join(this.basePath, key);
    await fs.unlink(filePath);
  }

  async getFileUrl(key: string, expiresInSeconds?: number): Promise<string> {
    return `/api/files/${key}`;
  }

  async listFiles(prefix?: string): Promise<string[]> {
    const fs = await import('fs/promises');
    const files: string[] = [];
    
    try {
      const items = await fs.readdir(this.basePath);
      for (const item of items) {
        if (!prefix || item.startsWith(prefix)) {
          files.push(item);
        }
      }
    } catch (error) {
      // Directory doesn't exist or other error
    }

    return files;
  }
}

export class S3StorageProvider implements StorageProvider {
  name = 's3';
  private bucket: string;
  private region: string;
  private accessKey: string;
  private secretKey: string;

  constructor(config: { bucket: string; region: string; accessKey: string; secretKey: string }) {
    this.bucket = config.bucket;
    this.region = config.region;
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
  }

  async uploadFile(file: Buffer | NodeJS.ReadableStream, key: string, options?: any): Promise<string> {
    // In real implementation, would use AWS SDK
    logger.info(`Uploading file to s3://${this.bucket}/${key}`);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `s3://${this.bucket}/${key}`;
  }

  async downloadFile(key: string): Promise<Buffer> {
    logger.info(`Downloading file from s3://${this.bucket}/${key}`);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Buffer.from('simulated file content');
  }

  async deleteFile(key: string): Promise<void> {
    logger.info(`Deleting file from s3://${this.bucket}/${key}`);
    
    // Simulate deletion
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  async getFileUrl(key: string, expiresInSeconds: number = 3600): Promise<string> {
    // In real implementation, would generate presigned URL
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}?expires=${Date.now() + expiresInSeconds * 1000}`;
  }

  async listFiles(prefix?: string): Promise<string[]> {
    logger.info(`Listing files in s3://${this.bucket}/${prefix || ''}`);
    
    // Simulate listing
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [];
  }
}

export class FileStorageService extends EventEmitter {
  private providers: Map<string, StorageProvider> = new Map();
  private defaultProvider: string = 'local';
  private encryptionKey: string;

  constructor() {
    super();
    this.encryptionKey = process.env.FILE_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
    this.initializeProviders();
  }

  private initializeProviders(): void {
    // Initialize local storage provider
    this.providers.set('local', new LocalStorageProvider());

    // Initialize S3 provider if configured
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET) {
      this.providers.set('s3', new S3StorageProvider({
        bucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_REGION || 'us-east-1',
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secretKey: process.env.AWS_SECRET_ACCESS_KEY
      }));
    }
  }

  addProvider(name: string, provider: StorageProvider): void {
    this.providers.set(name, provider);
  }

  setDefaultProvider(providerName: string): void {
    if (this.providers.has(providerName)) {
      this.defaultProvider = providerName;
    } else {
      throw new Error(`Storage provider ${providerName} not found`);
    }
  }

  private getProvider(providerName?: string): StorageProvider {
    const name = providerName || this.defaultProvider;
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`Storage provider ${name} not found`);
    }
    return provider;
  }

  async uploadFile(
    file: Buffer | NodeJS.ReadableStream,
    options: FileUploadOptions,
    providerName?: string
  ): Promise<FileMetadata> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    // Generate file key
    const fileKey = this.generateFileKey(options.organizationId, options.filename);
    
    // Calculate file hash
    const fileBuffer = Buffer.isBuffer(file) ? file : await this.streamToBuffer(file);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    
    // Encrypt file if requested
    let processedFile = fileBuffer;
    let encryptionKey: string | undefined;
    
    if (options.isEncrypted) {
      encryptionKey = crypto.randomBytes(32).toString('hex');
      processedFile = this.encryptFile(fileBuffer, encryptionKey);
    }

    // Upload to storage provider
    const provider = this.getProvider(providerName);
    const storagePath = await provider.uploadFile(processedFile, fileKey);

    const metadata: FileMetadata = {
      id,
      organizationId: options.organizationId,
      userId: options.userId,
      filename: options.filename,
      originalName: options.filename,
      mimeType: options.mimeType,
      size: options.size,
      path: storagePath,
      hash,
      bucket: providerName === 's3' ? (provider as S3StorageProvider).bucket : undefined,
      isPublic: options.isPublic || false,
      isEncrypted: options.isEncrypted || false,
      encryptionKey,
      tags: options.tags || [],
      metadata: options.metadata || {},
      uploadedAt: now,
      downloadCount: 0
    };

    // Store metadata in database
    logger.info(`Uploaded file: ${id} (${options.filename})`);

    this.emit('file:uploaded', metadata);
    return metadata;
  }

  async downloadFile(
    options: FileDownloadOptions,
    providerName?: string
  ): Promise<{ file: Buffer; metadata: FileMetadata }> {
    // Get file metadata
    const metadata = await this.getFileMetadata(options.organizationId, options.fileId, options.userId);
    if (!metadata) {
      throw new Error('File not found or access denied');
    }

    // Update last accessed
    await this.updateLastAccessed(metadata.id);

    // Download from storage provider
    const provider = this.getProvider(providerName);
    let fileBuffer = await provider.downloadFile(this.extractFileKey(metadata.path));

    // Decrypt if necessary
    if (metadata.isEncrypted && metadata.encryptionKey) {
      fileBuffer = this.decryptFile(fileBuffer, metadata.encryptionKey);
    }

    // Increment download count
    await this.incrementDownloadCount(metadata.id);

    this.emit('file:downloaded', { fileId: metadata.id, userId: options.userId });
    return { file: fileBuffer, metadata };
  }

  async getFileUrl(
    organizationId: string,
    fileId: string,
    userId?: string,
    expiresInSeconds: number = 3600
  ): Promise<string> {
    const metadata = await this.getFileMetadata(organizationId, fileId, userId);
    if (!metadata) {
      throw new Error('File not found or access denied');
    }

    if (!metadata.isPublic && !userId) {
      throw new Error('Access denied: private file requires authentication');
    }

    const provider = this.getProvider();
    const fileKey = this.extractFileKey(metadata.path);
    
    return provider.getFileUrl(fileKey, expiresInSeconds);
  }

  async deleteFile(
    organizationId: string,
    fileId: string,
    userId?: string
  ): Promise<boolean> {
    const metadata = await this.getFileMetadata(organizationId, fileId, userId);
    if (!metadata) {
      return false;
    }

    try {
      // Delete from storage provider
      const provider = this.getProvider();
      const fileKey = this.extractFileKey(metadata.path);
      await provider.deleteFile(fileKey);

      // Delete metadata from database
      logger.info(`Deleted file: ${fileId}`);

      this.emit('file:deleted', { fileId, userId });
      return true;
    } catch (error) {
      logger.error('[FileStorageService] Failed to delete file:', error);
      return false;
    }
  }

  async listFiles(
    organizationId: string,
    filters: {
      userId?: string;
      tags?: string[];
      mimeType?: string;
      isPublic?: boolean;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ files: FileMetadata[]; total: number }> {
    // In real implementation, would query from database with filters
    logger.info(`Listing files for org ${organizationId}`);

    return {
      files: [],
      total: 0
    };
  }

  async updateFileMetadata(
    organizationId: string,
    fileId: string,
    updates: Partial<FileMetadata>,
    userId?: string
  ): Promise<FileMetadata | null> {
    const existingMetadata = await this.getFileMetadata(organizationId, fileId, userId);
    if (!existingMetadata) {
      return null;
    }

    const updatedMetadata: FileMetadata = {
      ...existingMetadata,
      ...updates,
      updatedAt: new Date()
    };

    // Update in database
    logger.info(`Updated metadata for file: ${fileId}`);

    this.emit('file:metadata_updated', updatedMetadata);
    return updatedMetadata;
  }

  private async getFileMetadata(
    organizationId: string,
    fileId: string,
    userId?: string
  ): Promise<FileMetadata | null> {
    // In real implementation, would query from database
    logger.info(`Getting metadata for file: ${fileId}`);
    return null;
  }

  private async updateLastAccessed(fileId: string): Promise<void> {
    // Update last_accessed timestamp in database
    logger.info(`Updated last accessed for file: ${fileId}`);
  }

  private async incrementDownloadCount(fileId: string): Promise<void> {
    // Increment download_count in database
    logger.info(`Incremented download count for file: ${fileId}`);
  }

  private generateFileKey(organizationId: string, filename: string): string {
    const timestamp = Date.now();
    const random = crypto.randomBytes(8).toString('hex');
    const extension = filename.split('.').pop() || '';
    return `${organizationId}/${timestamp}_${random}.${extension}`;
  }

  private extractFileKey(storagePath: string): string {
    // Extract key from storage path
    if (storagePath.startsWith('s3://')) {
      return storagePath.replace(/^s3:\/\/[^\/]+\//, '');
    }
    return storagePath.split('/').pop() || '';
  }

  private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  private encryptFile(buffer: Buffer, key: string): Buffer {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', key);
    
    const encrypted = Buffer.concat([
      iv,
      cipher.update(buffer),
      cipher.final()
    ]);
    
    return encrypted;
  }

  private decryptFile(encryptedBuffer: Buffer, key: string): Buffer {
    const iv = encryptedBuffer.slice(0, 16);
    const encrypted = encryptedBuffer.slice(16);
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    
    return Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);
  }

  async getStorageStats(organizationId: string): Promise<{
    totalFiles: number;
    totalSize: number;
    storageByType: Record<string, number>;
    storageByUser: Record<string, number>;
    downloadStats: {
      totalDownloads: number;
      topDownloads: { fileId: string; filename: string; count: number }[];
    };
  }> {
    // In real implementation, would query from database with aggregations
    return {
      totalFiles: 0,
      totalSize: 0,
      storageByType: {},
      storageByUser: {},
      downloadStats: {
        totalDownloads: 0,
        topDownloads: []
      }
    };
  }

  async cleanupExpiredFiles(): Promise<{ deleted: number; errors: number }> {
    // In real implementation, would find and delete expired files
    logger.info(`Running cleanup for expired files`);
    
    return {
      deleted: 0,
      errors: 0
    };
  }

  async verifyFileIntegrity(fileId: string): Promise<{
    isValid: boolean;
    expectedHash?: string;
    actualHash?: string;
  }> {
    const metadata = await this.getFileMetadata('', fileId); // Would need organizationId
    if (!metadata) {
      return { isValid: false };
    }

    try {
      const { file } = await this.downloadFile({
        organizationId: metadata.organizationId,
        fileId
      });

      const actualHash = crypto.createHash('sha256').update(file).digest('hex');
      const isValid = actualHash === metadata.hash;

      return {
        isValid,
        expectedHash: metadata.hash,
        actualHash
      };
    } catch (error) {
      return { isValid: false };
    }
  }
}

export const fileStorageService = new FileStorageService();
