import { randomUUID } from 'crypto';
import { ConsultationSession, ConsultationRequest, ConsultationResponse } from './agent-consulting-service';

// ============================================
// SESSION EXPORT & REPORTING SERVICE
// ============================================

export type ExportFormat = 'json' | 'csv' | 'pdf' | 'markdown' | 'xlsx';

export interface ExportOptions {
  format: ExportFormat;
  includeRequests?: boolean;
  includeResponses?: boolean;
  includeMetadata?: boolean;
  includeMetrics?: boolean;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  fields?: string[]; // Specific fields to include
  anonymize?: boolean;
}

export interface ExportResult {
  id: string;
  filename: string;
  format: ExportFormat;
  size: number;
  content: string | Buffer;
  generatedAt: Date;
  expiresAt: Date;
  downloadUrl?: string;
}

export interface CounselingReport {
  reportId: string;
  title: string;
  type: 'summary' | 'detailed' | 'analytics' | 'compliance' | 'custom';
  period: {
    start: Date;
    end: Date;
  };
  generatedBy: string;
  generatedAt: Date;
  sections: ReportSection[];
  summary: ReportSummary;
  metadata: ReportMetadata;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'overview' | 'sessions' | 'agents' | 'metrics' | 'trends' | 'charts' | 'recommendations';
  content: any;
  order: number;
}

export interface ReportSummary {
  totalSessions: number;
  completedSessions: number;
  activeAgents: number;
  averageResponseTime: number;
  satisfactionScore: number;
  keyFindings: string[];
  recommendations: string[];
}

export interface ReportMetadata {
  filters?: Record<string, any>;
  parameters?: Record<string, any>;
  dataQuality?: 'high' | 'medium' | 'low';
  confidentiality?: 'public' | 'internal' | 'restricted' | 'confidential';
}

class SessionExportService {
  private exports: Map<string, ExportResult> = new Map();
  private reports: Map<string, CounselingReport> = new Map();

  // ============================================
  // EXPORT FUNCTIONS
  // ============================================

  async exportSessions(
    sessions: ConsultationSession[],
    options: ExportOptions
  ): Promise<ExportResult> {
    const id = randomUUID();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `counseling-sessions-${timestamp}.${options.format}`;

    let content: string | Buffer;

    switch (options.format) {
      case 'json':
        content = this.exportToJSON(sessions, options);
        break;
      case 'csv':
        content = this.exportToCSV(sessions, options);
        break;
      case 'markdown':
        content = this.exportToMarkdown(sessions, options);
        break;
      case 'pdf':
        content = await this.exportToPDF(sessions, options);
        break;
      case 'xlsx':
        content = await this.exportToExcel(sessions, options);
        break;
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }

    const result: ExportResult = {
      id,
      filename,
      format: options.format,
      size: Buffer.byteLength(content),
      content,
      generatedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };

    this.exports.set(id, result);
    return result;
  }

  private exportToJSON(sessions: ConsultationSession[], options: ExportOptions): string {
    const data = sessions.map(session => this.transformSession(session, options));
    return JSON.stringify(data, null, 2);
  }

  private exportToCSV(sessions: ConsultationSession[], options: ExportOptions): string {
    const headers = [
      'Session ID',
      'Created At',
      'Status',
      'Initiator',
      'Initiator Category',
      'Participants',
      'Topic',
      'Priority',
      'Type',
      'Responses Count',
      'Last Updated',
    ];

    const rows = sessions.map(session => {
      const latestRequest = session.requests[session.requests.length - 1];
      return [
        session.id,
        session.createdAt,
        session.status,
        session.initiator.agentName,
        session.initiator.category,
        session.participants.map(p => p.agentName).join('; '),
        latestRequest?.topic || '',
        latestRequest?.priority || '',
        latestRequest?.type || '',
        session.responses.length,
        session.updatedAt,
      ];
    });

    return [headers.join(','), ...rows.map(r => r.map(this.escapeCSV).join(','))].join('\n');
  }

  private escapeCSV(value: any): string {
    const str = String(value ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  private exportToMarkdown(sessions: ConsultationSession[], options: ExportOptions): string {
    let markdown = '# Counseling Sessions Report\n\n';
    markdown += `Generated: ${new Date().toLocaleString()}\n\n`;
    markdown += `Total Sessions: ${sessions.length}\n\n`;
    markdown += '---\n\n';

    for (const session of sessions) {
      const latestRequest = session.requests[session.requests.length - 1];
      
      markdown += `## Session: ${latestRequest?.topic || 'Untitled'}\n\n`;
      markdown += `- **ID**: ${session.id}\n`;
      markdown += `- **Status**: ${session.status}\n`;
      markdown += `- **Created**: ${new Date(session.createdAt).toLocaleString()}\n`;
      markdown += `- **Initiator**: ${session.initiator.agentName} (${session.initiator.category})\n`;
      markdown += `- **Participants**: ${session.participants.map(p => p.agentName).join(', ')}\n`;
      markdown += `- **Priority**: ${latestRequest?.priority || 'N/A'}\n`;
      markdown += `- **Type**: ${latestRequest?.type || 'N/A'}\n\n`;

      if (options.includeRequests && session.requests.length > 0) {
        markdown += '### Requests\n\n';
        for (const request of session.requests) {
          markdown += `**${request.topic}**\n\n`;
          markdown += `${request.question}\n\n`;
        }
      }

      if (options.includeResponses && session.responses.length > 0) {
        markdown += '### Responses\n\n';
        for (const response of session.responses) {
          markdown += `**Response from ${response.respondingAgentName}**\n\n`;
          markdown += `${response.answer}\n\n`;
          if (response.recommendations.length > 0) {
            markdown += '**Recommendations:**\n';
            for (const rec of response.recommendations) {
              markdown += `- ${rec}\n`;
            }
            markdown += '\n';
          }
        }
      }

      markdown += '---\n\n';
    }

    return markdown;
  }

  private async exportToPDF(sessions: ConsultationSession[], options: ExportOptions): Promise<Buffer> {
    // Placeholder: In production, use a library like puppeteer or pdfkit
    // For now, return markdown content as placeholder
    const markdown = this.exportToMarkdown(sessions, options);
    return Buffer.from(markdown);
  }

  private async exportToExcel(sessions: ConsultationSession[], options: ExportOptions): Promise<Buffer> {
    // Placeholder: In production, use a library like xlsx
    // For now, return CSV content as placeholder
    const csv = this.exportToCSV(sessions, options);
    return Buffer.from(csv);
  }

  private transformSession(session: ConsultationSession, options: ExportOptions): any {
    const transformed: any = {
      id: session.id,
      status: session.status,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      initiator: options.anonymize 
        ? { id: session.initiator.agentId, category: session.initiator.category }
        : session.initiator,
      participants: options.anonymize
        ? session.participants.map(p => ({ id: p.agentId, role: p.role }))
        : session.participants,
    };

    if (options.includeRequests) {
      transformed.requests = session.requests.map(r => ({
        topic: r.topic,
        priority: r.priority,
        type: r.type,
        question: r.question,
        timestamp: r.timestamp,
        counselingContext: r.counselingContext,
      }));
    }

    if (options.includeResponses) {
      transformed.responses = session.responses.map(r => ({
        respondingAgentId: options.anonymize ? r.respondingAgentId : r.respondingAgentName,
        answer: r.answer,
        confidence: r.confidence,
        recommendations: r.recommendations,
        timestamp: r.timestamp,
      }));
    }

    if (options.includeMetadata) {
      transformed.metadata = {
        correlationId: session.correlationId,
        tags: session.requests.flatMap(r => r.tags || []),
      };
    }

    return transformed;
  }

  // ============================================
  // REPORT GENERATION
  // ============================================

  generateReport(
    sessions: ConsultationSession[],
    params: {
      title: string;
      type: CounselingReport['type'];
      period: { start: Date; end: Date };
      generatedBy: string;
      sections?: string[];
    }
  ): CounselingReport {
    const reportId = randomUUID();
    
    const sections: ReportSection[] = [];
    let order = 0;

    // Overview section
    if (!params.sections || params.sections.includes('overview')) {
      sections.push({
        id: randomUUID(),
        title: 'Executive Overview',
        type: 'overview',
        content: this.generateOverview(sessions, params.period),
        order: order++,
      });
    }

    // Sessions section
    if (!params.sections || params.sections.includes('sessions')) {
      sections.push({
        id: randomUUID(),
        title: 'Session Details',
        type: 'sessions',
        content: this.generateSessionsDetail(sessions),
        order: order++,
      });
    }

    // Agents section
    if (!params.sections || params.sections.includes('agents')) {
      sections.push({
        id: randomUUID(),
        title: 'Agent Participation',
        type: 'agents',
        content: this.generateAgentsAnalysis(sessions),
        order: order++,
      });
    }

    // Metrics section
    if (!params.sections || params.sections.includes('metrics')) {
      sections.push({
        id: randomUUID(),
        title: 'Performance Metrics',
        type: 'metrics',
        content: this.generateMetrics(sessions),
        order: order++,
      });
    }

    // Trends section
    if (!params.sections || params.sections.includes('trends')) {
      sections.push({
        id: randomUUID(),
        title: 'Trends & Patterns',
        type: 'trends',
        content: this.generateTrends(sessions, params.period),
        order: order++,
      });
    }

    const summary = this.generateSummary(sessions);

    const report: CounselingReport = {
      reportId,
      title: params.title,
      type: params.type,
      period: params.period,
      generatedBy: params.generatedBy,
      generatedAt: new Date(),
      sections,
      summary,
      metadata: {
        confidentiality: 'internal',
        dataQuality: sessions.length > 100 ? 'high' : sessions.length > 20 ? 'medium' : 'low',
      },
    };

    this.reports.set(reportId, report);
    return report;
  }

  private generateOverview(sessions: ConsultationSession[], period: { start: Date; end: Date }): any {
    const byStatus = this.groupBy(sessions, s => s.status);
    const byMode = this.groupBy(sessions, s => {
      const latest = s.requests[s.requests.length - 1];
      return latest?.counselingContext?.relationship || 'unknown';
    });

    return {
      period,
      totalSessions: sessions.length,
      statusBreakdown: byStatus,
      modeBreakdown: byMode,
      averageDuration: this.calculateAverageDuration(sessions),
      completionRate: sessions.length > 0 
        ? (sessions.filter(s => s.status === 'completed').length / sessions.length * 100).toFixed(1)
        : '0',
    };
  }

  private generateSessionsDetail(sessions: ConsultationSession[]): any {
    return sessions.map(s => ({
      id: s.id,
      topic: s.requests[0]?.topic || 'Untitled',
      status: s.status,
      initiator: s.initiator.agentName,
      participants: s.participants.map(p => p.agentName),
      createdAt: s.createdAt,
      responseCount: s.responses.length,
      priority: s.requests[s.requests.length - 1]?.priority,
    }));
  }

  private generateAgentsAnalysis(sessions: ConsultationSession[]): any {
    const agentStats: Record<string, { 
      name: string; 
      initiated: number; 
      participated: number; 
      responded: number;
      category: string;
    }> = {};

    for (const session of sessions) {
      // Initiator
      if (!agentStats[session.initiator.agentId]) {
        agentStats[session.initiator.agentId] = {
          name: session.initiator.agentName,
          category: session.initiator.category,
          initiated: 0,
          participated: 0,
          responded: 0,
        };
      }
      agentStats[session.initiator.agentId].initiated++;

      // Participants
      for (const p of session.participants) {
        if (!agentStats[p.agentId]) {
          agentStats[p.agentId] = {
            name: p.agentName,
            category: p.category,
            initiated: 0,
            participated: 0,
            responded: 0,
          };
        }
        agentStats[p.agentId].participated++;
      }

      // Responders
      for (const r of session.responses) {
        if (agentStats[r.respondingAgentId]) {
          agentStats[r.respondingAgentId].responded++;
        }
      }
    }

    return Object.values(agentStats).sort((a, b) => 
      (b.initiated + b.participated) - (a.initiated + a.participated)
    );
  }

  private generateMetrics(sessions: ConsultationSession[]): any {
    let totalResponseTime = 0;
    let responseCount = 0;
    let totalConfidence = 0;
    let confidenceCount = 0;

    for (const session of sessions) {
      for (let i = 0; i < session.responses.length; i++) {
        const request = session.requests[i];
        const response = session.responses[i];
        
        if (request && response) {
          const hours = (new Date(response.timestamp).getTime() - new Date(request.timestamp).getTime()) / (1000 * 60 * 60);
          totalResponseTime += hours;
          responseCount++;
        }

        totalConfidence += response.confidence;
        confidenceCount++;
      }
    }

    const avgResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;
    const avgConfidence = confidenceCount > 0 ? totalConfidence / confidenceCount : 0;

    return {
      averageResponseTime: avgResponseTime.toFixed(2) + ' hours',
      averageConfidence: (avgConfidence * 100).toFixed(1) + '%',
      totalSessions: sessions.length,
      completedSessions: sessions.filter(s => s.status === 'completed').length,
      escalatedSessions: sessions.filter(s => s.status === 'escalated').length,
      sessionsWithRecommendations: sessions.filter(s => 
        s.responses.some(r => r.recommendations.length > 0)
      ).length,
    };
  }

  private generateTrends(sessions: ConsultationSession[], period: { start: Date; end: Date }): any {
    // Group by month
    const monthlyData: Record<string, { count: number; completed: number }> = {};
    
    for (const session of sessions) {
      const month = new Date(session.createdAt).toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { count: 0, completed: 0 };
      }
      monthlyData[month].count++;
      if (session.status === 'completed') {
        monthlyData[month].completed++;
      }
    }

    return {
      monthlyTrend: Object.entries(monthlyData)
        .map(([month, data]) => ({ month, ...data }))
        .sort((a, b) => a.month.localeCompare(b.month)),
      period,
    };
  }

  private generateSummary(sessions: ConsultationSession[]): ReportSummary {
    const completed = sessions.filter(s => s.status === 'completed').length;
    
    const activeAgentIds = new Set<string>();
    for (const s of sessions) {
      activeAgentIds.add(s.initiator.agentId);
      for (const p of s.participants) {
        activeAgentIds.add(p.agentId);
      }
    }

    return {
      totalSessions: sessions.length,
      completedSessions: completed,
      activeAgents: activeAgentIds.size,
      averageResponseTime: 2.5, // Placeholder
      satisfactionScore: 4.2, // Placeholder
      keyFindings: [
        `${completed} out of ${sessions.length} sessions completed successfully`,
        `${activeAgentIds.size} agents actively participating in counseling`,
        `${sessions.filter(s => s.status === 'escalated').length} sessions required escalation`,
      ],
      recommendations: [
        'Continue regular performance reviews',
        'Address escalated sessions promptly',
        'Encourage peer-to-peer counseling for knowledge sharing',
      ],
    };
  }

  private groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, number> {
    const result: Record<string, number> = {};
    for (const item of array) {
      const key = keyFn(item);
      result[key] = (result[key] || 0) + 1;
    }
    return result;
  }

  private calculateAverageDuration(sessions: ConsultationSession[]): string {
    if (sessions.length === 0) return 'N/A';
    
    let totalDuration = 0;
    let count = 0;

    for (const session of sessions) {
      if (session.status === 'completed') {
        const duration = new Date(session.updatedAt).getTime() - new Date(session.createdAt).getTime();
        totalDuration += duration;
        count++;
      }
    }

    if (count === 0) return 'N/A';

    const avgMs = totalDuration / count;
    const hours = Math.floor(avgMs / (1000 * 60 * 60));
    const minutes = Math.floor((avgMs % (1000 * 60 * 60)) / (1000 * 60));

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  // ============================================
  // EXPORT MANAGEMENT
  // ============================================

  getExport(exportId: string): ExportResult | undefined {
    return this.exports.get(exportId);
  }

  getReport(reportId: string): CounselingReport | undefined {
    return this.reports.get(reportId);
  }

  deleteExport(exportId: string): boolean {
    return this.exports.delete(exportId);
  }

  cleanupExpiredExports(): number {
    const now = new Date();
    let count = 0;

    for (const [id, exp] of this.exports.entries()) {
      if (exp.expiresAt < now) {
        this.exports.delete(id);
        count++;
      }
    }

    return count;
  }
}

// Singleton instance
export const sessionExportService = new SessionExportService();

// Convenience functions
export function exportCounselingSessions(
  sessions: ConsultationSession[],
  options: ExportOptions
): Promise<ExportResult> {
  return sessionExportService.exportSessions(sessions, options);
}

export function generateCounselingReport(
  sessions: ConsultationSession[],
  params: Parameters<SessionExportService['generateReport']>[1]
): CounselingReport {
  return sessionExportService.generateReport(sessions, params);
}

export default sessionExportService;
