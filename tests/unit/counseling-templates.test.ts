import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import {
  counselingTemplates,
  CounselingTemplate,
  createCounselingTemplate,
  getCounselingTemplate,
  getAllCounselingTemplates,
  getRecommendedCounselingTemplates,
} from '../../backend/services/counseling-templates';
import { randomUUID } from 'crypto';

describe('Counseling Templates Service', () => {
  const mockUserId = randomUUID();
  const mockOrgId = randomUUID();

  const validTemplateInput = {
    name: 'Test Performance Review Template',
    description: 'A template for performance reviews',
    category: 'performance' as const,
    counselingMode: 'main_to_sub' as const,
    programType: 'performance_improvement' as const,
    severity: 'medium' as const,
    duration: 'single_session' as const,
    agenda: {
      primaryObjectives: ['Assess performance', 'Set goals'],
      expectedOutcomes: ['Clear action plan'],
      successMetrics: ['Goal completion'],
      discussionPoints: ['Strengths', 'Areas for improvement'],
    },
    context: {
      requiredSkills: ['Communication', 'Leadership'],
      recommendedResources: ['Performance guide'],
      suggestedTools: ['Assessment form'],
      bestPractices: ['Be constructive'],
    },
    workflow: {
      steps: [
        {
          order: 1,
          title: 'Opening',
          description: 'Set the tone',
          duration: 10,
          type: 'assessment' as const,
          questions: ['How are you feeling?'],
          deliverables: ['Mood check'],
        },
      ],
    },
    createdBy: mockUserId,
    organizationId: mockOrgId,
  };

  beforeEach(() => {
    // Clear templates before each test
    (counselingTemplates as any).templates.clear();
    // Re-initialize system templates
    (counselingTemplates as any).initializeSystemTemplates();
  });

  describe('createTemplate', () => {
    it('should create a template with valid input', () => {
      const template = counselingTemplates.createTemplate(validTemplateInput);

      expect(template).toBeDefined();
      expect(template.id).toBeDefined();
      expect(template.name).toBe(validTemplateInput.name);
      expect(template.category).toBe(validTemplateInput.category);
      expect(template.metadata.createdBy).toBe(mockUserId);
      expect(template.metadata.organizationId).toBe(mockOrgId);
      expect(template.metadata.isSystemTemplate).toBe(false);
      expect(template.metadata.usageCount).toBe(0);
      expect(template.createdAt).toBeInstanceOf(Date);
      expect(template.updatedAt).toBeInstanceOf(Date);
    });

    it('should generate unique IDs for each template', () => {
      const template1 = counselingTemplates.createTemplate(validTemplateInput);
      const template2 = counselingTemplates.createTemplate({
        ...validTemplateInput,
        name: 'Second Template',
      });

      expect(template1.id).not.toBe(template2.id);
    });

    it('should set timestamps correctly', () => {
      const before = new Date();
      const template = counselingTemplates.createTemplate(validTemplateInput);
      const after = new Date();

      expect(template.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(template.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
      expect(template.updatedAt).toEqual(template.createdAt);
    });
  });

  describe('getTemplate', () => {
    it('should return template by ID', () => {
      const created = counselingTemplates.createTemplate(validTemplateInput);
      const retrieved = counselingTemplates.getTemplate(created.id);

      expect(retrieved).toEqual(created);
    });

    it('should return undefined for non-existent ID', () => {
      const retrieved = counselingTemplates.getTemplate(randomUUID());

      expect(retrieved).toBeUndefined();
    });
  });

  describe('getAllTemplates', () => {
    it('should return all templates including system templates', () => {
      const templates = counselingTemplates.getAllTemplates();

      // Should have system templates initially
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should Filter by category', () => {
      counselingTemplates.createTemplate(validTemplateInput);

      const performanceTemplates = counselingTemplates.getAllTemplates({ category: 'performance' });

      expect(performanceTemplates.every(t => t.category === 'performance')).toBe(true);
    });

    it('should Filter by counseling mode', () => {
      counselingTemplates.createTemplate(validTemplateInput);

      const mainToSubTemplates = counselingTemplates.getAllTemplates({ counselingMode: 'main_to_sub' });

      expect(mainToSubTemplates.every(t => t.counselingMode === 'main_to_sub')).toBe(true);
    });

    it('should Filter by organization ID', () => {
      counselingTemplates.createTemplate(validTemplateInput);

      const orgTemplates = counselingTemplates.getAllTemplates({ organizationId: mockOrgId });

      // Should include system templates and org-specific templates
      expect(orgTemplates.length).toBeGreaterThan(0);
    });

    it('should Filter by system templates only', () => {
      counselingTemplates.createTemplate(validTemplateInput);

      const systemTemplates = counselingTemplates.getAllTemplates({ isSystem: true });

      expect(systemTemplates.every(t => t.metadata.isSystemTemplate)).toBe(true);
    });

    it('should Filter by tags', () => {
      const templateWithTags = counselingTemplates.createTemplate({
        ...validTemplateInput,
        tags: ['test-tag', 'performance'],
      });

      const taggedTemplates = counselingTemplates.getAllTemplates({ tags: ['test-tag'] });

      expect(taggedTemplates.length).toBeGreaterThan(0);
      expect(taggedTemplates.some(t => t.id === templateWithTags.id)).toBe(true);
    });

    it('should sort by usage count (descending)', () => {
      const template1 = counselingTemplates.createTemplate(validTemplateInput);
      const template2 = counselingTemplates.createTemplate({
        ...validTemplateInput,
        name: 'Second Template',
      });

      // Record usage for one template
      counselingTemplates.recordTemplateUsage(template2.id);
      counselingTemplates.recordTemplateUsage(template2.id);

      const templates = counselingTemplates.getAllTemplates();
      const template2Index = templates.findIndex(t => t.id === template2.id);
      const template1Index = templates.findIndex(t => t.id === template1.id);

      expect(template2Index).toBeLessThan(template1Index);
    });
  });

  describe('updateTemplate', () => {
    it('should update template fields', () => {
      const created = counselingTemplates.createTemplate(validTemplateInput);

      const updated = counselingTemplates.updateTemplate(created.id, {
        name: 'Updated Name',
        description: 'Updated description',
      });

      expect(updated).not.toBeNull();
      expect(updated!.name).toBe('Updated Name');
      expect(updated!.description).toBe('Updated description');
      // updatedAt should be >= createdAt (may be equal if update happens very quickly)
      expect(updated!.updatedAt.getTime()).toBeGreaterThanOrEqual(created.updatedAt.getTime());
    });

    it('should return null for non-existent template', () => {
      const updated = counselingTemplates.updateTemplate(randomUUID(), { name: 'New Name' });

      expect(updated).toBeNull();
    });

    it('should throw error when modifying system templates', () => {
      const systemTemplates = counselingTemplates.getAllTemplates({ isSystem: true });
      const systemTemplate = systemTemplates[0];

      expect(() => {
        counselingTemplates.updateTemplate(systemTemplate.id, { name: 'Modified' });
      }).toThrow('Cannot modify system templates');
    });
  });

  describe('deleteTemplate', () => {
    it('should delete a template', () => {
      const created = counselingTemplates.createTemplate(validTemplateInput);

      const deleted = counselingTemplates.deleteTemplate(created.id);

      expect(deleted).toBe(true);
      expect(counselingTemplates.getTemplate(created.id)).toBeUndefined();
    });

    it('should return false for non-existent template', () => {
      const deleted = counselingTemplates.deleteTemplate(randomUUID());

      expect(deleted).toBe(false);
    });

    it('should throw error when deleting system templates', () => {
      const systemTemplates = counselingTemplates.getAllTemplates({ isSystem: true });
      const systemTemplate = systemTemplates[0];

      expect(() => {
        counselingTemplates.deleteTemplate(systemTemplate.id);
      }).toThrow('Cannot delete system templates');
    });
  });

  describe('recordTemplateUsage', () => {
    it('should increment usage count', () => {
      const created = counselingTemplates.createTemplate(validTemplateInput);

      counselingTemplates.recordTemplateUsage(created.id);
      counselingTemplates.recordTemplateUsage(created.id);

      const retrieved = counselingTemplates.getTemplate(created.id);
      expect(retrieved!.metadata.usageCount).toBe(2);
    });

    it('should not error for non-existent template', () => {
      // Should not throw
      expect(() => {
        counselingTemplates.recordTemplateUsage(randomUUID());
      }).not.toThrow();
    });
  });

  describe('rateTemplate', () => {
    it('should update average rating', () => {
      const created = counselingTemplates.createTemplate(validTemplateInput);

      // First rating (5 stars with 0 previous uses)
      // Formula: (current * count + rating) / (count + 1)
      // = (0 * 0 + 5) / (0 + 1) = 5
      counselingTemplates.rateTemplate(created.id, 5);
      let retrieved = counselingTemplates.getTemplate(created.id);
      expect(retrieved!.metadata.averageRating).toBe(5);

      // Second rating (3 stars)
      // Formula: (current * count + rating) / (count + 1)
      // = (5 * 1 + 3) / (1 + 1) = 4
      counselingTemplates.rateTemplate(created.id, 3);
      retrieved = counselingTemplates.getTemplate(created.id);
      expect(retrieved!.metadata.averageRating).toBe(4);
    });

    it('should not error for non-existent template', () => {
      // Should not throw
      expect(() => {
        counselingTemplates.rateTemplate(randomUUID(), 5);
      }).not.toThrow();
    });
  });

  describe('duplicateTemplate', () => {
    it('should duplicate existing template', () => {
      const created = counselingTemplates.createTemplate(validTemplateInput);

      const duplicated = counselingTemplates.duplicateTemplate(created.id, mockUserId, mockOrgId);

      expect(duplicated).not.toBeNull();
      expect(duplicated!.id).not.toBe(created.id);
      expect(duplicated!.name).toContain('Copy');
      expect(duplicated!.metadata.createdBy).toBe(mockUserId);
      expect(duplicated!.metadata.organizationId).toBe(mockOrgId);
      expect(duplicated!.metadata.isSystemTemplate).toBe(false);
      expect(duplicated!.metadata.tags).toContain('duplicate');
    });

    it('should return null for non-existent template', () => {
      const duplicated = counselingTemplates.duplicateTemplate(randomUUID(), mockUserId, mockOrgId);

      expect(duplicated).toBeNull();
    });
  });

  describe('getTemplatesByMode', () => {
    it('should return templates by counseling mode', () => {
      counselingTemplates.createTemplate(validTemplateInput);

      const templates = counselingTemplates.getTemplatesByMode('main_to_sub');

      expect(templates.every(t => t.counselingMode === 'main_to_sub')).toBe(true);
    });
  });

  describe('getRecommendedTemplates', () => {
    it('should return recommendations for main_agent', () => {
      const recommendations = counselingTemplates.getRecommendedTemplates(mockUserId, 'main_agent');

      expect(recommendations).toBeInstanceOf(Array);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });

    it('should return recommendations for subagent', () => {
      const recommendations = counselingTemplates.getRecommendedTemplates(mockUserId, 'subagent');

      expect(recommendations).toBeInstanceOf(Array);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });

    it('should consider context in recommendations', () => {
      const recommendations = counselingTemplates.getRecommendedTemplates(mockUserId, 'main_agent', {
        recentIssues: ['performance'],
        skillGaps: ['Communication'],
        performanceTrend: 'declining',
      });

      expect(recommendations).toBeInstanceOf(Array);
    });
  });

  describe('convenience functions', () => {
    it('should use createCounselingTemplate', () => {
      const template = createCounselingTemplate(validTemplateInput);

      expect(template).toBeDefined();
      expect(template.id).toBeDefined();
    });

    it('should use getCounselingTemplate', () => {
      const created = counselingTemplates.createTemplate(validTemplateInput);
      const retrieved = getCounselingTemplate(created.id);

      expect(retrieved).toEqual(created);
    });

    it('should use getAllCounselingTemplates', () => {
      counselingTemplates.createTemplate(validTemplateInput);
      const templates = getAllCounselingTemplates();

      expect(templates.length).toBeGreaterThan(0);
    });

    it('should use getRecommendedCounselingTemplates', () => {
      const recommendations = getRecommendedCounselingTemplates(mockUserId, 'main_agent');

      expect(recommendations).toBeInstanceOf(Array);
    });
  });
});
