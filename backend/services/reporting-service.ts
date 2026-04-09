import { db as pgDb } from '../db/connection';
import { eq, and, desc, lte } from 'drizzle-orm';
import crypto from 'crypto';
import { EventEmitter } from 'events';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface Report {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  type: 'dashboard' | 'analytics' | 'compliance' | 'financial' | 'custom';
  category: 'marketing' | 'sales' | 'support' | 'operations' | 'hr' | 'finance' | 'security';
  status: 'draft' | 'active' | 'archived';
  config: ReportConfig;
  schedule?: ReportSchedule;
  permissions: ReportPermissions;
  metadata: Record<string, unknown>;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportConfig {
  dataSource: string[];
  filters: ReportFilter[];
  metrics: ReportMetric[];
  dimensions: ReportDimension[];
  visualizations: ReportVisualization[];
  timeRange: {
    start: Date;
    end: Date;
    relative?: string;
  };
  refreshInterval?: number;
}

export interface ReportFilter {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'between';
  value: unknown;
  label?: string;
}

export interface ReportMetric {
  id: string;
  name: string;
  type: 'count' | 'sum' | 'average' | 'min' | 'max' | 'percentage' | 'ratio';
  field?: string;
  formula?: string;
  format?: string;
  label?: string;
}

export interface ReportDimension {
  id: string;
  name: string;
  field: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  label?: string;
}

export interface ReportVisualization {
  id: string;
  type: 'table' | 'line_chart' | 'bar_chart' | 'pie_chart' | 'area_chart' | 'scatter_plot' | 'gauge' | 'kpi';
  title: string;
  position: { x: number; y: number; width: number; height: number };
  config: {
    metrics: string[];
    dimensions?: string[];
    filters?: string[];
    chartOptions?: Record<string, unknown>;
  };
}

export interface ReportSchedule {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  timezone: string;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'json';
  nextRun?: Date;
}

export interface ReportPermissions {
  view: string[];
  edit: string[];
  share: string[];
  isPublic: boolean;
}

export interface ReportExecution {
  id: string;
  reportId: string;
  organizationId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  parameters: Record<string, unknown>;
  results?: ReportResult;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
  generatedBy?: string;
  fileUrl?: string;
  fileSize?: number;
}

export interface ReportResult {
  data: unknown[];
  summary: {
    totalRows: number;
    executionTime: number;
    generatedAt: Date;
  };
  visualizations: {
    id: string;
    type: string;
    data: unknown;
    config: unknown;
  }[];
}

export class ReportingService extends EventEmitter {
  private reports: Map<string, Report> = new Map();
  private executions: Map<string, ReportExecution> = new Map();
  private scheduledJobs: Map<string, NodeJS.Timeout> = new Map();
  private checkInterval?: NodeJS.Timeout;

  constructor() {
    super();
    this.startScheduledReports();
  }

  private startScheduledReports(): void {
    this.checkInterval = setInterval(() => {
      this.checkScheduledReports();
    }, 60000); // Check every minute
  }

  async createReport(
    organizationId: string,
    report: Omit<Report, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>
  ): Promise<Report> {
    const id = crypto.randomUUID();
    const now = new Date();

    const newReport: Report = {
      ...report,
      id,
      organizationId,
      createdAt: now,
      updatedAt: now
    };

    // Store report
    this.reports.set(id, newReport);

    // Schedule if needed
    if (report.schedule?.enabled) {
      await this.scheduleReport(newReport);
    }

    logger.info(`Created report: ${id} (${report.name})`);

    this.emit('report:created', newReport);
    return newReport;
  }

  async executeReport(
    reportId: string,
    parameters: Record<string, unknown> = {},
    userId?: string
  ): Promise<ReportExecution> {
    const report = this.reports.get(reportId);
    if (!report) {
      throw new Error(`Report not found: ${reportId}`);
    }

    // Check permissions
    if (!this.hasPermission(report, userId, 'view')) {
      throw new Error('Access denied: insufficient permissions');
    }

    const executionId = crypto.randomUUID();
    const execution: ReportExecution = {
      id: executionId,
      reportId,
      organizationId: report.organizationId,
      status: 'pending',
      parameters,
      startedAt: new Date(),
      generatedBy: userId
    };

    this.executions.set(executionId, execution);

    // Start execution
    setImmediate(() => this.processReportExecution(executionId));

    logger.info(`Started report execution: ${executionId}`);

    this.emit('report:execution_started', execution);
    return execution;
  }

  private async processReportExecution(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (!execution) return;

    const report = this.reports.get(execution.reportId);
    if (!report) {
      execution.status = 'failed';
      execution.error = 'Report not found';
      return;
    }

    try {
      execution.status = 'running';

      // Execute the report
      const result = await this.generateReportData(report, execution.parameters);

      execution.results = result;
      execution.status = 'completed';
      execution.completedAt = new Date();

      // Generate file if needed
      if (report.schedule?.format) {
        const fileUrl = await this.generateReportFile(execution, report.schedule.format);
        execution.fileUrl = fileUrl;
      }

      this.emit('report:execution_completed', { execution, result });

    } catch (error) {
      execution.status = 'failed';
      execution.error = error instanceof Error ? error.message : 'Unknown error';
      execution.completedAt = new Date();

      this.emit('report:execution_failed', { execution, error });
    }
  }

  private async generateReportData(report: Report, parameters: Record<string, any>): Promise<ReportResult> {
    const startTime = Date.now();

    // Apply parameters to report config
    const config = this.applyParameters(report.config, parameters);

    // Fetch data from data sources
    const data = await this.fetchData(config.dataSource, config.filters);

    // Apply metrics and dimensions
    const processedData = this.processData(data, config.metrics, config.dimensions);

    // Generate visualizations
    const visualizations = await this.generateVisualizations(processedData, config.visualizations);

    const executionTime = Date.now() - startTime;

    return {
      data: processedData,
      summary: {
        totalRows: processedData.length,
        executionTime,
        generatedAt: new Date()
      },
      visualizations
    };
  }

  private applyParameters(config: ReportConfig, parameters: Record<string, any>): ReportConfig {
    const appliedConfig = JSON.parse(JSON.stringify(config));

    // Apply parameter overrides to filters
    for (const [key, value] of Object.entries(parameters)) {
      const filter = appliedConfig.filters.find((f: ReportFilter) => f.field === key);
      if (filter) {
        filter.value = value;
      }
    }

    // Apply time range overrides
    if (parameters.startDate) {
      appliedConfig.timeRange.start = new Date(parameters.startDate);
    }
    if (parameters.endDate) {
      appliedConfig.timeRange.end = new Date(parameters.endDate);
    }

    return appliedConfig;
  }

  private async fetchData(dataSources: string[], filters: ReportFilter[]): Promise<any[]> {
    // In real implementation, would query from actual data sources
    logger.info(`Fetching data from sources: ${dataSources.join(', ')}`);

    // Simulate data fetching
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate sample data
    const sampleData = this.generateSampleData(dataSources, filters);

    return sampleData;
  }

  private generateSampleData(dataSources: string[], filters: ReportFilter[]): any[] {
    const data: any[] = [];
    const rowCount = 100;

    for (let i = 0; i < rowCount; i++) {
      const row: any = {
        id: i + 1,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 10000) + 1000,
        customers: Math.floor(Math.random() * 100) + 10,
        orders: Math.floor(Math.random() * 50) + 5,
        conversion_rate: Math.random() * 0.1 + 0.02,
        category: ['electronics', 'clothing', 'books', 'home', 'sports'][Math.floor(Math.random() * 5)],
        region: ['north', 'south', 'east', 'west'][Math.floor(Math.random() * 4)]
      };

      // Apply filters
      let matchesFilters = true;
      for (const filter of filters) {
        if (!this.matchesFilter(row, filter)) {
          matchesFilters = false;
          break;
        }
      }

      if (matchesFilters) {
        data.push(row);
      }
    }

    return data;
  }

  private matchesFilter(row: any, filter: ReportFilter): boolean {
    const value = row[filter.field];

    switch (filter.operator) {
      case 'equals':
        return value === filter.value;
      case 'not_equals':
        return value !== filter.value;
      case 'contains':
        return String(value).includes(String(filter.value));
      case 'not_contains':
        return !String(value).includes(String(filter.value));
      case 'greater_than':
        return Number(value) > Number(filter.value);
      case 'less_than':
        return Number(value) < Number(filter.value);
      case 'in':
        return Array.isArray(filter.value) && filter.value.includes(value);
      case 'not_in':
        return Array.isArray(filter.value) && !filter.value.includes(value);
      case 'between':
        return Array.isArray(filter.value) && 
               Number(value) >= Number(filter.value[0]) && 
               Number(value) <= Number(filter.value[1]);
      default:
        return true;
    }
  }

  private processData(data: any[], metrics: ReportMetric[], dimensions: ReportDimension[]): any[] {
    // Apply metrics and dimensions to data
    const processedData = data.map(row => {
      const processedRow: any = { ...row };

      // Calculate metrics
      for (const metric of metrics) {
        switch (metric.type) {
          case 'count':
            processedRow[metric.id] = 1;
            break;
          case 'sum':
            processedRow[metric.id] = Number(row[metric.field || 0]);
            break;
          case 'average':
            processedRow[metric.id] = Number(row[metric.field || 0]);
            break;
          case 'min':
            processedRow[metric.id] = Number(row[metric.field || 0]);
            break;
          case 'max':
            processedRow[metric.id] = Number(row[metric.field || 0]);
            break;
          case 'percentage':
            processedRow[metric.id] = (Number(row[metric.field || 0]) / 100) * 100;
            break;
          case 'ratio':
            if (metric.formula) {
              processedRow[metric.id] = this.evaluateFormula(metric.formula, row);
            }
            break;
        }
      }

      return processedRow;
    });

    // Group by dimensions if specified
    if (dimensions.length > 0) {
      return this.groupByDimensions(processedData, dimensions);
    }

    return processedData;
  }

  private groupByDimensions(data: any[], dimensions: ReportDimension[]): any[] {
    const groups: Record<string, any[]> = {};

    for (const row of data) {
      const key = dimensions.map(dim => `${row[dim.field]}`).join('|');
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(row);
    }

    return Object.values(groups).map(group => {
      const aggregated: any = {};
      
      // Set dimension values
      for (const dim of dimensions) {
        aggregated[dim.field] = group[0][dim.field];
      }

      // Aggregate metrics
      const metrics = Object.keys(group[0]).filter(key => 
        !dimensions.some(dim => dim.field === key) && 
        !['id', 'date'].includes(key)
      );

      for (const metric of metrics) {
        const values = group.map(row => Number(row[metric] || 0));
        aggregated[metric] = values.reduce((sum, val) => sum + val, 0);
      }

      aggregated._count = group.length;
      return aggregated;
    });
  }

  private evaluateFormula(formula: string, row: any): number {
    // Safe formula evaluation - replaces variable names with values and evaluates mathematically
    try {
      // Replace variable names with their values from the row
      let evalFormula = formula;
      for (const [key, value] of Object.entries(row)) {
        // Use word boundary to match whole variable names only
        evalFormula = evalFormula.replace(new RegExp(`\\b${key}\\b`, 'g'), String(value));
      }
      
      // Validate formula contains only allowed characters (numbers, operators, parentheses, decimals)
      // Allowed: 0-9, +, -, *, /, %, (, ), ., spaces
      if (!/^[\d\+\-\*\/\%\(\)\.\s]+$/.test(evalFormula)) {
        logger.warn(`[ReportingService] Formula contains invalid characters: ${evalFormula}`);
        return 0;
      }
      
      // Parse and evaluate the mathematical expression safely
      return this.safeMathEval(evalFormula);
    } catch (error) {
      logger.error('[ReportingService] Formula evaluation failed:', error);
      return 0;
    }
  }

  /**
   * Safely evaluate a mathematical expression without using eval()
   * Supports: +, -, *, /, %, parentheses, decimal numbers
   */
  private safeMathEval(expression: string): number {
    // Remove all whitespace
    const cleanExpr = expression.replace(/\s+/g, '');
    
    if (!cleanExpr) return 0;
    
    // Tokenize the expression
    const tokens: (number | string)[] = [];
    let current = '';
    
    for (let i = 0; i < cleanExpr.length; i++) {
      const char = cleanExpr[i];
      
      if (/[\d\.]/.test(char)) {
        current += char;
      } else if (/[\+\-\*\/\%\(\)]/.test(char)) {
        if (current) {
          tokens.push(parseFloat(current));
          current = '';
        }
        tokens.push(char);
      }
    }
    
    if (current) {
      tokens.push(parseFloat(current));
    }
    
    // Evaluate using recursive descent parsing
    return this.evaluateTokens(tokens, 0)[0];
  }

  private evaluateTokens(tokens: (number | string)[], index: number): [number, number] {
    let [value, nextIndex] = this.parseExpression(tokens, index);
    return [value, nextIndex];
  }

  private parseExpression(tokens: (number | string)[], index: number): [number, number] {
    let [value, nextIndex] = this.parseTerm(tokens, index);
    
    while (nextIndex < tokens.length) {
      const operator = tokens[nextIndex];
      if (operator === '+' || operator === '-') {
        const [termValue, termNextIndex] = this.parseTerm(tokens, nextIndex + 1);
        if (operator === '+') {
          value += termValue;
        } else {
          value -= termValue;
        }
        nextIndex = termNextIndex;
      } else {
        break;
      }
    }
    
    return [value, nextIndex];
  }

  private parseTerm(tokens: (number | string)[], index: number): [number, number] {
    let [value, nextIndex] = this.parseFactor(tokens, index);
    
    while (nextIndex < tokens.length) {
      const operator = tokens[nextIndex];
      if (operator === '*' || operator === '/' || operator === '%') {
        const [factorValue, factorNextIndex] = this.parseFactor(tokens, nextIndex + 1);
        if (operator === '*') {
          value *= factorValue;
        } else if (operator === '/') {
          if (factorValue === 0) {
            logger.warn('[ReportingService] Division by zero in formula');
            return [0, factorNextIndex];
          }
          value /= factorValue;
        } else {
          value %= factorValue;
        }
        nextIndex = factorNextIndex;
      } else {
        break;
      }
    }
    
    return [value, nextIndex];
  }

  private parseFactor(tokens: (number | string)[], index: number): [number, number] {
    const token = tokens[index];
    
    if (typeof token === 'number') {
      return [token, index + 1];
    }
    
    if (token === '(') {
      const [value, nextIndex] = this.parseExpression(tokens, index + 1);
      if (tokens[nextIndex] === ')') {
        return [value, nextIndex + 1];
      }
    }
    
    // Handle unary minus
    if (token === '-') {
      const [factorValue, factorNextIndex] = this.parseFactor(tokens, index + 1);
      return [-factorValue, factorNextIndex];
    }
    
    // Handle unary plus
    if (token === '+') {
      return this.parseFactor(tokens, index + 1);
    }
    
    return [0, index + 1];
  }

  private async generateVisualizations(data: any[], visualizations: ReportVisualization[]): Promise<any[]> {
    const results: any[] = [];

    for (const viz of visualizations) {
      const vizData = await this.generateVisualization(data, viz);
      results.push(vizData);
    }

    return results;
  }

  private async generateVisualization(data: any[], visualization: ReportVisualization): Promise<any> {
    const { type, config } = visualization;

    switch (type) {
      case 'table':
        return this.generateTableVisualization(data, config);
      case 'line_chart':
        return this.generateLineChartVisualization(data, config);
      case 'bar_chart':
        return this.generateBarChartVisualization(data, config);
      case 'pie_chart':
        return this.generatePieChartVisualization(data, config);
      case 'area_chart':
        return this.generateAreaChartVisualization(data, config);
      case 'kpi':
        return this.generateKPIVisualization(data, config);
      default:
        return { type, data: [], config };
    }
  }

  private generateTableVisualization(data: any[], config: any): any {
    return {
      type: 'table',
      data: data.slice(0, 100), // Limit to 100 rows for table
      config: {
        columns: Object.keys(data[0] || {}),
        pagination: true
      }
    };
  }

  private generateLineChartVisualization(data: any[], config: any): any {
    // Aggregate data for line chart
    const aggregated = this.aggregateByTime(data, config.dimensions?.[0] || 'date');
    
    return {
      type: 'line_chart',
      data: {
        labels: aggregated.map(item => item[config.dimensions?.[0] || 'date']),
        datasets: config.metrics.map((metric: string) => ({
          label: metric,
          data: aggregated.map(item => item[metric])
        }))
      },
      config: config.chartOptions || {}
    };
  }

  private generateBarChartVisualization(data: any[], config: any): any {
    const aggregated = this.aggregateByDimension(data, config.dimensions?.[0] || 'category');
    
    return {
      type: 'bar_chart',
      data: {
        labels: aggregated.map(item => item[config.dimensions?.[0] || 'category']),
        datasets: config.metrics.map((metric: string) => ({
          label: metric,
          data: aggregated.map(item => item[metric])
        }))
      },
      config: config.chartOptions || {}
    };
  }

  private generatePieChartVisualization(data: any[], config: any): any {
    const aggregated = this.aggregateByDimension(data, config.dimensions?.[0] || 'category');
    const metric = config.metrics?.[0] || 'revenue';
    
    return {
      type: 'pie_chart',
      data: {
        labels: aggregated.map(item => item[config.dimensions?.[0] || 'category']),
        datasets: [{
          data: aggregated.map(item => item[metric])
        }]
      },
      config: config.chartOptions || {}
    };
  }

  private generateAreaChartVisualization(data: any[], config: any): any {
    const aggregated = this.aggregateByTime(data, config.dimensions?.[0] || 'date');
    
    return {
      type: 'area_chart',
      data: {
        labels: aggregated.map(item => item[config.dimensions?.[0] || 'date']),
        datasets: config.metrics.map((metric: string) => ({
          label: metric,
          data: aggregated.map(item => item[metric]),
          fill: true
        }))
      },
      config: config.chartOptions || {}
    };
  }

  private generateKPIVisualization(data: any[], config: any): any {
    const metric = config.metrics?.[0] || 'revenue';
    const value = data.reduce((sum, row) => sum + Number(row[metric] || 0), 0);
    
    return {
      type: 'kpi',
      data: {
        value,
        label: metric,
        format: config.format || 'number'
      },
      config: config.chartOptions || {}
    };
  }

  private aggregateByTime(data: any[], timeField: string): any[] {
    const grouped: Record<string, any[]> = {};
    
    for (const row of data) {
      const date = row[timeField]?.split('T')[0] || 'unknown';
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(row);
    }

    return Object.entries(grouped).map(([date, rows]) => {
      const aggregated: any = { [timeField]: date };
      const metrics = Object.keys(rows[0]).filter(key => key !== timeField && !isNaN(Number(rows[0][key])));
      
      for (const metric of metrics) {
        aggregated[metric] = rows.reduce((sum, row) => sum + Number(row[metric] || 0), 0);
      }
      
      return aggregated;
    });
  }

  private aggregateByDimension(data: any[], dimension: string): any[] {
    const grouped: Record<string, any[]> = {};
    
    for (const row of data) {
      const value = row[dimension] || 'unknown';
      if (!grouped[value]) {
        grouped[value] = [];
      }
      grouped[value].push(row);
    }

    return Object.entries(grouped).map(([value, rows]) => {
      const aggregated: any = { [dimension]: value };
      const metrics = Object.keys(rows[0]).filter(key => key !== dimension && !isNaN(Number(rows[0][key])));
      
      for (const metric of metrics) {
        aggregated[metric] = rows.reduce((sum, row) => sum + Number(row[metric] || 0), 0);
      }
      
      return aggregated;
    });
  }

  private async generateReportFile(execution: ReportExecution, format: string): Promise<string> {
    if (!execution.results) {
      throw new Error('No results available for file generation');
    }

    const filename = `report_${execution.id}_${Date.now()}.${format}`;
    const fileUrl = `/api/reports/files/${filename}`;

    // In real implementation, would generate actual files
    logger.info(`Generating ${format} file: ${filename}`);

    // Simulate file generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    return fileUrl;
  }

  private async scheduleReport(report: Report): Promise<void> {
    if (!report.schedule?.enabled) return;

    const { frequency, timezone } = report.schedule;
    
    // Calculate next run time (simplified)
    let nextRun = new Date();
    switch (frequency) {
      case 'hourly':
        nextRun.setHours(nextRun.getHours() + 1);
        break;
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1);
        nextRun.setHours(9, 0, 0, 0);
        break;
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        nextRun.setHours(9, 0, 0, 0);
        break;
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1);
        nextRun.setDate(1);
        nextRun.setHours(9, 0, 0, 0);
        break;
    }

    report.schedule.nextRun = nextRun;

    // Schedule the job
    const delay = nextRun.getTime() - Date.now();
    const timeout = setTimeout(async () => {
      await this.executeScheduledReport(report.id);
      await this.scheduleReport(report); // Reschedule
    }, delay);

    this.scheduledJobs.set(`${report.id}_scheduled`, timeout);
  }

  private async executeScheduledReport(reportId: string): Promise<void> {
    try {
      const execution = await this.executeReport(reportId);
      
      // Send to recipients
      const report = this.reports.get(reportId);
      if (report?.schedule?.recipients) {
        await this.sendReportToRecipients(execution, report.schedule.recipients);
      }

      logger.info(`Scheduled report executed: ${reportId}`);
    } catch (error) {
      logger.error(`Scheduled report execution failed: ${reportId}`, error);
    }
  }

  private async sendReportToRecipients(execution: ReportExecution, recipients: string[]): Promise<void> {
    // In real implementation, would send emails/notifications
    logger.info(`Sending report ${execution.id} to ${recipients.join(', ')}`);
  }

  private async checkScheduledReports(): Promise<void> {
    const now = new Date();
    
    for (const report of this.reports.values()) {
      if (report.schedule?.enabled && report.schedule.nextRun && report.schedule.nextRun <= now) {
        await this.executeScheduledReport(report.id);
      }
    }
  }

  private hasPermission(report: Report, userId?: string, action: 'view' | 'edit' | 'share'): boolean {
    if (!userId) return report.permissions.isPublic && action === 'view';
    
    return report.permissions[action].includes(userId) || report.permissions[action].includes('*');
  }

  async getReport(organizationId: string, reportId: string, userId?: string): Promise<Report | null> {
    const report = this.reports.get(reportId);
    return report && report.organizationId === organizationId && this.hasPermission(report, userId, 'view') ? report : null;
  }

  async getReports(organizationId: string, userId?: string, filters: {
    type?: Report['type'];
    category?: Report['category'];
    status?: Report['status'];
    limit?: number;
    offset?: number;
  } = {}): Promise<{ reports: Report[]; total: number }> {
    const reports = Array.from(this.reports.values())
      .filter(r => r.organizationId === organizationId)
      .filter(r => this.hasPermission(r, userId, 'view'))
      .filter(r => !filters.type || r.type === filters.type)
      .filter(r => !filters.category || r.category === filters.category)
      .filter(r => !filters.status || r.status === filters.status);

    return {
      reports: reports.slice(filters.offset || 0, (filters.offset || 0) + (filters.limit || 50)),
      total: reports.length
    };
  }

  async getExecution(executionId: string): Promise<ReportExecution | null> {
    return this.executions.get(executionId) || null;
  }

  async getExecutions(organizationId: string, reportId?: string, filters: {
    status?: ReportExecution['status'];
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ executions: ReportExecution[]; total: number }> {
    const executions = Array.from(this.executions.values())
      .filter(e => e.organizationId === organizationId)
      .filter(e => !reportId || e.reportId === reportId)
      .filter(e => !filters.status || e.status === filters.status);

    return {
      executions: executions.slice(filters.offset || 0, (filters.offset || 0) + (filters.limit || 50)),
      total: executions.length
    };
  }

  async updateReport(
    organizationId: string,
    reportId: string,
    updates: Partial<Report>,
    userId?: string
  ): Promise<Report | null> {
    const report = this.reports.get(reportId);
    if (!report || report.organizationId !== organizationId || !this.hasPermission(report, userId, 'edit')) {
      return null;
    }

    const updatedReport: Report = {
      ...report,
      ...updates,
      updatedAt: new Date()
    };

    this.reports.set(reportId, updatedReport);

    // Reschedule if schedule changed
    if (updates.schedule) {
      await this.scheduleReport(updatedReport);
    }

    this.emit('report:updated', updatedReport);
    return updatedReport;
  }

  async deleteReport(organizationId: string, reportId: string, userId?: string): Promise<boolean> {
    const report = this.reports.get(reportId);
    if (!report || report.organizationId !== organizationId || !this.hasPermission(report, userId, 'edit')) {
      return false;
    }

    // Cancel scheduled jobs
    const jobKey = `${reportId}_scheduled`;
    const timeout = this.scheduledJobs.get(jobKey);
    if (timeout) {
      clearTimeout(timeout);
      this.scheduledJobs.delete(jobKey);
    }

    this.reports.delete(reportId);

    this.emit('report:deleted', { reportId, userId });
    return true;
  }

  async getReportStats(organizationId: string): Promise<{
    totalReports: number;
    activeReports: number;
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageExecutionTime: number;
  }> {
    const reports = Array.from(this.reports.values()).filter(r => r.organizationId === organizationId);
    const executions = Array.from(this.executions.values()).filter(e => e.organizationId === organizationId);

    const successfulExecutions = executions.filter(e => e.status === 'completed').length;
    const failedExecutions = executions.filter(e => e.status === 'failed').length;
    
    const completedExecutions = executions.filter(e => e.completedAt);
    const averageExecutionTime = completedExecutions.length > 0
      ? completedExecutions.reduce((sum, e) => sum + (e.completedAt!.getTime() - e.startedAt.getTime()), 0) / completedExecutions.length
      : 0;

    return {
      totalReports: reports.length,
      activeReports: reports.filter(r => r.status === 'active').length,
      totalExecutions: executions.length,
      successfulExecutions,
      failedExecutions,
      averageExecutionTime
    };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    // Clear all scheduled job timeouts
    for (const timeout of this.scheduledJobs.values()) {
      clearTimeout(timeout);
    }
    this.scheduledJobs.clear();
    this.removeAllListeners();
    logger.info('ReportingService cleaned up');
  }
}

export const reportingService = new ReportingService();
