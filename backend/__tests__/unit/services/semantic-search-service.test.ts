/**
 * Semantic Search Service Tests
 * Tests for the semantic-search-service
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('SemanticSearchService', () => {
  let service: any;

  beforeEach(() => {
    // Import service directly
    const module = require('../../../services/semantic-search-service');
    service = module.SemanticSearchService || module.default;
  });

  describe('Service Existence', () => {
    it('should be importable', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Service Methods', () => {
    beforeEach(() => {
      if (service) {
        service = new service();
      }
    });

    it('should have searchMemories method', () => {
      expect(service?.searchMemories).toBeInstanceOf(Function);
    });

    it('should have searchByTopic method', () => {
      expect(service?.searchByTopic).toBeInstanceOf(Function);
    });

    it('should have searchWithTimeDecay method', () => {
      expect(service?.searchWithTimeDecay).toBeInstanceOf(Function);
    });
  });
});

describe('VectorEmbeddingService', () => {
  let service: any;

  beforeEach(() => {
    // Import service directly without dynamic import
    const module = require('../../../services/vector-embedding-service');
    service = module.VectorEmbeddingService || module.default;
  });

  describe('Service Existence', () => {
    it('should be importable', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Service Methods', () => {
    beforeEach(() => {
      if (service) {
        service = new service();
      }
    });

    it('should have generateEmbedding method', () => {
      expect(service?.generateEmbedding).toBeInstanceOf(Function);
    });

    it('should have generateBatchEmbeddings method', () => {
      expect(service?.generateBatchEmbeddings).toBeInstanceOf(Function);
    });
  });
});
