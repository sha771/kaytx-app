import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import {
  sessionExportService,
  exportCounselingSessions,
  generateCounselingReport,
  ExportOptions,
  ExportResult,
  CounselingReport,
  ExportFormat,
} from '../../backend/services/session-export-service';
import { ConsultationSession } from '../../backend/services/agent-consulting-service';

describe('SessionExportService', () => {
  const mockAgentId1 = 'agent-1';
  const mockAgentId2 = 'agent-2';

  const createMockSession = (
    id: string,
    status: ConsultationSession['status'],
    overrides: Partial<ConsultationSession> = {}
  ): ConsultationSession => ({
    id,
    status,
    correlationId: `corr-${id}`,
    initiator: {
      agentId: mockAgentId1,
      agentName: 'Agent One',
      role: 'main_agent',
      category: 'sales',
    },
    participants: [
      {
        agentId: mockAgentId2,
        agentName: 'Agent Two',
        role: 'subagent',
        status: 'accepted',
        category: 'support',
      },
    ],
    requests: [
      {
        id: `req-${id}`,
        topic: 'Sales Training',
        question: 'How to improve closing rates?',
        context: { urgency: 'medium' },
        priority: 'medium',
        type: 'performance_improvement',
        timestamp: new Date('2026-01-15'),
        tags: ['training', 'sales'],
        counselingContext: {
          relationship: 'main_to_sub',
          sessionType: 'performance_improvement',
          goals: ['improve closing'],
        },
      },
    ],
    responses: [
      {
        id: `res-${id}`,
        answer: 'Focus on understanding customer needs first.',
        confidence: 0.85,
        timestamp: new Date('2026-01-15'),
        recommendations: ['Listen actively', 'Ask open questions'],
        respondingAgentId: mockAgentId2,
        respondingAgentName: 'Agent Two',
      },
    ],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    escalationHistory: [],
    metadata: { source: 'test' },
    ...overrides,
  });

  let mockSessions: ConsultationSession[];

  beforeEach(() => {
    mockSessions = [
      createMockSession('session-1', 'pending'),
      createMockSession('session-2', 'completed', {
        status: 'completed',
        initiator: { agentId: mockAgentId2, agentName: 'Agent Two', role: 'subagent', category: 'support' },
        participants: [
          { agentId: mockAgentId1, agentName: 'Agent One', role: 'main_agent', status: 'accepted', category: 'sales' },
        ],
        requests: [
          {
            id: 'req-2',
            topic: 'Technical Support',
            question: 'How to handle difficult customers?',
            context: {},
            priority: 'high',
            type: 'crisis_intervention',
            timestamp: new Date('2026-01-16'),
            tags: ['support', 'difficult'],
            counselingContext: {
              relationship: 'sub_to_main',
              sessionType: 'crisis_intervention',
              goals: ['de-escalation'],
            },
          },
        ],
        responses: [
          {
            id: 'res-2',
            answer: 'Stay calm and empathize with the customer.',
            confidence: 0.92,
            timestamp: new Date('2026-01-16'),
            recommendations: ['Acknowledge frustration', 'Offer solutions'],
            respondingAgentId: mockAgentId1,
            respondingAgentName: 'Agent One',
          },
        ],
        createdAt: new Date('2026-01-16'),
        updatedAt: new Date('2026-01-17'),
      }),
      createMockSession('session-3', 'escalated', {
        status: 'escalated',
        initiator: { agentId: mockAgentId2, agentName: 'Agent Two', role: 'subagent', category: 'support' },
        participants: [],
        requests: [
          {
            id: 'req-3',
            topic: 'Career Development',
            question: 'What skills should I develop?',
            context: {},
            priority: 'low',
            type: 'career_guidance',
            timestamp: new Date('2026-01-17'),
            tags: ['career'],
            counselingContext: {
              relationship: 'peer_to_peer',
              sessionType: 'career_guidance',
              goals: ['skill development'],
            },
          },
        ],
        responses: [
          {
            id: 'res-3',
            answer: 'Focus on leadership and communication skills.',
            confidence: 0.78,
            timestamp: new Date('2026-01-17'),
            recommendations: ['Take leadership course', 'Practice public speaking'],
            respondingAgentId: mockAgentId2,
            respondingAgentName: 'Agent Two',
          },
        ],
        createdAt: new Date('2026-01-17'),
        updatedAt: new Date('2026-01-17'),
      }),
    ];

    // Clear the exports and reports before each test
    (sessionExportService as any).exports.clear();
    (sessionExportService as any).reports.clear();
  });

  describe('exportSessions', () => {
    it('should export sessions to JSON format', async () => {
      const options: ExportOptions = {
        format: 'json',
        includeRequests: true,
        includeResponses: true,
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);

      expect(result.id).toBeDefined();
      expect(result.format).toBe('json');
      expect(result.filename).toMatch(/counseling-sessions-.*\.json/);
      expect(result.content).toBeDefined();
      expect(result.size).toBeGreaterThan(0);
      expect(result.generatedAt).toBeInstanceOf(Date);
      expect(result.expiresAt).toBeInstanceOf(Date);
    });

    it('should export sessions to CSV format', async () => {
      const options: ExportOptions = {
        format: 'csv',
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);

      expect(result.format).toBe('csv');
      expect(result.filename).toMatch(/counseling-sessions-.*\.csv/);
      expect(typeof result.content).toBe('string');
      expect(result.content).toContain('Session ID');
      expect(result.content).toContain('Created At');
    });

    it('should export sessions to Markdown format', async () => {
      const options: ExportOptions = {
        format: 'markdown',
        includeRequests: true,
        includeResponses: true,
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);

      expect(result.format).toBe('markdown');
      expect(result.filename).toMatch(/counseling-sessions-.*\.markdown/);
      expect(typeof result.content).toBe('string');
      expect(result.content).toContain('# Counseling Sessions Report');
      expect(result.content).toContain('Total Sessions: 3');
    });

    it('should export sessions to PDF format (placeholder)', async () => {
      const options: ExportOptions = {
        format: 'pdf',
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);

      expect(result.format).toBe('pdf');
      expect(result.filename).toMatch(/counseling-sessions-.*\.pdf/);
      expect(result.content).toBeInstanceOf(Buffer);
    });

    it('should export sessions to Excel format (placeholder)', async () => {
      const options: ExportOptions = {
        format: 'xlsx',
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);

      expect(result.format).toBe('xlsx');
      expect(result.filename).toMatch(/counseling-sessions-.*\.xlsx/);
      expect(result.content).toBeInstanceOf(Buffer);
    });

    it('should throw error for unsupported format', async () => {
      const options = {
        format: 'unsupported' as ExportFormat,
      };

      await expect(sessionExportService.exportSessions(mockSessions, options))
        .rejects.toThrow('Unsupported export format');
    });

    it('should store the export result', async () => {
      const options: ExportOptions = {
        format: 'json',
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);
      const stored = sessionExportService.getExport(result.id);

      expect(stored).toBeDefined();
      expect(stored?.id).toBe(result.id);
    });

    it('should anonymize data when requested', async () => {
      const options: ExportOptions = {
        format: 'json',
        includeRequests: true,
        includeResponses: true,
        anonymize: true,
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);
      const data = JSON.parse(result.content as string);

      expect(data[0].initiator.agentName).toBeUndefined();
      expect(data[0].initiator.id).toBeDefined();
    });
  });

  describe('generateReport', () => {
    it('should generate a summary report', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'summary',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
      });

      expect(report.reportId).toBeDefined();
      expect(report.title).toBe('Test Report');
      expect(report.type).toBe('summary');
      expect(report.generatedBy).toBe('test-user');
      expect(report.generatedAt).toBeInstanceOf(Date);
      expect(report.sections).toBeInstanceOf(Array);
      expect(report.summary).toBeDefined();
      expect(report.metadata).toBeDefined();
    });

    it('should generate report with overview section', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'detailed',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
        sections: ['overview'],
      });

      const overviewSection = report.sections.find(s => s.type === 'overview');
      expect(overviewSection).toBeDefined();
      expect(overviewSection?.content.totalSessions).toBe(3);
    });

    it('should generate report with sessions section', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'detailed',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
        sections: ['sessions'],
      });

      const sessionsSection = report.sections.find(s => s.type === 'sessions');
      expect(sessionsSection).toBeDefined();
      expect(sessionsSection?.content).toHaveLength(3);
    });

    it('should generate report with agents section', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'detailed',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
        sections: ['agents'],
      });

      const agentsSection = report.sections.find(s => s.type === 'agents');
      expect(agentsSection).toBeDefined();
      expect(agentsSection?.content).toBeInstanceOf(Array);
    });

    it('should generate report with metrics section', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'analytics',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
        sections: ['metrics'],
      });

      const metricsSection = report.sections.find(s => s.type === 'metrics');
      expect(metricsSection).toBeDefined();
      expect(metricsSection?.content.totalSessions).toBe(3);
    });

    it('should generate report with trends section', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'analytics',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
        sections: ['trends'],
      });

      const trendsSection = report.sections.find(s => s.type === 'trends');
      expect(trendsSection).toBeDefined();
      expect(trendsSection?.content.monthlyTrend).toBeDefined();
    });

    it('should generate all sections by default', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'detailed',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
      });

      expect(report.sections.length).toBeGreaterThanOrEqual(5);
    });

    it('should include summary with correct totals', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'summary',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
      });

      expect(report.summary.totalSessions).toBe(3);
      expect(report.summary.completedSessions).toBe(1);
      expect(report.summary.activeAgents).toBe(2);
      expect(report.summary.keyFindings).toBeInstanceOf(Array);
      expect(report.summary.recommendations).toBeInstanceOf(Array);
    });

    it('should store the generated report', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test Report',
        type: 'summary',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
      });

      const stored = sessionExportService.getReport(report.reportId);
      expect(stored).toBeDefined();
      expect(stored?.reportId).toBe(report.reportId);
    });

    it('should set data quality based on session count', () => {
      const smallReport = sessionExportService.generateReport([mockSessions[0]], {
        title: 'Small Report',
        type: 'summary',
        period: { start: new Date('2026-01-01'), end: new Date('2026-01-31') },
        generatedBy: 'test-user',
      });
      expect(smallReport.metadata.dataQuality).toBe('low');
    });
  });

  describe('getExport and getReport', () => {
    it('should retrieve an export by ID', async () => {
      const options: ExportOptions = { format: 'json' };
      const result = await sessionExportService.exportSessions(mockSessions, options);

      const retrieved = sessionExportService.getExport(result.id);
      expect(retrieved).toEqual(result);
    });

    it('should return undefined for non-existent export', () => {
      const retrieved = sessionExportService.getExport('non-existent');
      expect(retrieved).toBeUndefined();
    });

    it('should retrieve a report by ID', () => {
      const report = sessionExportService.generateReport(mockSessions, {
        title: 'Test',
        type: 'summary',
        period: { start: new Date(), end: new Date() },
        generatedBy: 'test',
      });

      const retrieved = sessionExportService.getReport(report.reportId);
      expect(retrieved).toEqual(report);
    });

    it('should return undefined for non-existent report', () => {
      const retrieved = sessionExportService.getReport('non-existent');
      expect(retrieved).toBeUndefined();
    });
  });

  describe('deleteExport', () => {
    it('should delete an export', async () => {
      const options: ExportOptions = { format: 'json' };
      const result = await sessionExportService.exportSessions(mockSessions, options);

      expect(sessionExportService.getExport(result.id)).toBeDefined();

      const deleted = sessionExportService.deleteExport(result.id);
      expect(deleted).toBe(true);
      expect(sessionExportService.getExport(result.id)).toBeUndefined();
    });

    it('should return false when deleting non-existent export', () => {
      const result = sessionExportService.deleteExport('non-existent');
      expect(result).toBe(false);
    });
  });

  describe('cleanupExpiredExports', () => {
    it('should remove expired exports', async () => {
      // Create an export
      const options: ExportOptions = { format: 'json' };
      await sessionExportService.exportSessions(mockSessions, options);

      // Manually expire all exports
      const exports = (sessionExportService as any).exports;
      for (const exp of exports.values()) {
        exp.expiresAt = new Date(Date.now() - 1000); // Expired 1 second ago
      }

      const count = sessionExportService.cleanupExpiredExports();
      expect(count).toBeGreaterThan(0);
      expect(exports.size).toBe(0);
    });

    it('should not remove non-expired exports', async () => {
      const options: ExportOptions = { format: 'json' };
      await sessionExportService.exportSessions(mockSessions, options);

      const count = sessionExportService.cleanupExpiredExports();
      expect(count).toBe(0);
    });
  });

  describe('export content validation', () => {
    it('should include all sessions in JSON export', async () => {
      const options: ExportOptions = {
        format: 'json',
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);
      const data = JSON.parse(result.content as string);

      expect(data).toHaveLength(3);
      expect(data.map((s: any) => s.id)).toContain('session-1');
      expect(data.map((s: any) => s.id)).toContain('session-2');
      expect(data.map((s: any) => s.id)).toContain('session-3');
    });

    it('should include requests when includeRequests is true', async () => {
      const options: ExportOptions = {
        format: 'json',
        includeRequests: true,
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);
      const data = JSON.parse(result.content as string);

      expect(data[0].requests).toBeDefined();
      expect(data[0].requests).toHaveLength(1);
    });

    it('should not include requests when includeRequests is false', async () => {
      const options: ExportOptions = {
        format: 'json',
        includeRequests: false,
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);
      const data = JSON.parse(result.content as string);

      expect(data[0].requests).toBeUndefined();
    });

    it('should include responses when includeResponses is true', async () => {
      const options: ExportOptions = {
        format: 'json',
        includeResponses: true,
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);
      const data = JSON.parse(result.content as string);

      expect(data[0].responses).toBeDefined();
      expect(data[0].responses).toHaveLength(1);
    });

    it('should include metadata when includeMetadata is true', async () => {
      const options: ExportOptions = {
        format: 'json',
        includeMetadata: true,
      };

      const result = await sessionExportService.exportSessions(mockSessions, options);
      const data = JSON.parse(result.content as string);

      expect(data[0].metadata).toBeDefined();
      expect(data[0].metadata.correlationId).toBeDefined();
    });

    it('should properly escape CSV special characters', async () => {
      const sessionsWithSpecialChars = [
        createMockSession('session-special', 'pending', {
          requests: [
            {
              id: 'req-special',
              topic: 'Sales, Marketing, "Growth"',
              question: 'How to handle\nmultiline?',
              context: {},
              priority: 'medium',
              type: 'performance_improvement',
              timestamp: new Date(),
              tags: [],
            },
          ],
        }),
      ];

      const options: ExportOptions = {
        format: 'csv',
      };

      const result = await sessionExportService.exportSessions(sessionsWithSpecialChars, options);
      expect(result.content).toContain('"Sales, Marketing, ""Growth"""');
    });
  });

  describe('convenience functions', () => {
    it('should use exportCounselingSessions convenience function', async () => {
      const result = await exportCounselingSessions(mockSessions, { format: 'json' });
      expect(result.id).toBeDefined();
      expect(result.format).toBe('json');
    });

    it('should use generateCounselingReport convenience function', () => {
      const report = generateCounselingReport(mockSessions, {
        title: 'Convenience Test',
        type: 'summary',
        period: { start: new Date(), end: new Date() },
        generatedBy: 'test',
      });
      expect(report.title).toBe('Convenience Test');
    });
  });

  describe('empty data handling', () => {
    it('should handle empty sessions array in export', async () => {
      const options: ExportOptions = {
        format: 'json',
      };

      const result = await sessionExportService.exportSessions([], options);
      expect(result.content).toBe('[]');
    });

    it('should handle empty sessions array in report generation', () => {
      const report = sessionExportService.generateReport([], {
        title: 'Empty Report',
        type: 'summary',
        period: { start: new Date(), end: new Date() },
        generatedBy: 'test',
      });

      expect(report.summary.totalSessions).toBe(0);
      expect(report.summary.completedSessions).toBe(0);
      expect(report.summary.activeAgents).toBe(0);
    });

    it('should handle empty sessions in CSV export', async () => {
      const options: ExportOptions = {
        format: 'csv',
      };

      const result = await sessionExportService.exportSessions([], options);
      expect(result.content).toContain('Session ID');
    });
  });
});
