/**
 * Natural Language Configurator
 * Text-to-loop conversion, intent-based workflow generation, and smart template suggestions
 */

import { LoopConfig, LoopNode } from './types';
import { getDepartmentAgents } from './agent-integration';

export interface NLIntent {
  type: 'optimization' | 'automation' | 'analysis' | 'coordination' | 'monitoring';
  confidence: number;
  keywords: string[];
  suggestedAgents: string[];
  suggestedTemplate?: string;
}

export interface NLParseResult {
  intent: NLIntent;
  extractedEntities: {
    agents: string[];
    departments: string[];
    goals: string[];
    conditions: string[];
    triggers: string[];
  };
  suggestedConfig: Partial<LoopConfig>;
  confidence: number;
}

export interface TemplateSuggestion {
  templateId: string;
  templateName: string;
  matchScore: number;
  reasons: string[];
  requiredModifications: string[];
}

export class NaturalLanguageConfigurator {
  private intentPatterns: Map<string, RegExp[]> = new Map();
  private entityExtractors: Map<string, RegExp> = new Map();
  private templateDatabase: Map<string, any> = new Map();

  constructor() {
    this.initializePatterns();
    this.initializeEntityExtractors();
  }

  /**
   * Initialize intent recognition patterns
   */
  private initializePatterns(): void {
    // Optimization patterns
    this.intentPatterns.set('optimization', [
      /optimize|improve|enhance|boost|increase|reduce|decrease|tune|adjust/i,
      /performance|efficiency|speed|quality|cost|resource/i,
      /seo|conversion|traffic|engagement|retention|churn/i,
    ]);

    // Automation patterns
    this.intentPatterns.set('automation', [
      /automate|auto|schedule|trigger|repeat|routine|batch/i,
      /daily|weekly|monthly|hourly|periodic|cron/i,
      /send|notify|alert|report|generate|create/i,
    ]);

    // Analysis patterns
    this.intentPatterns.set('analysis', [
      /analyze|analysis|analyze|investigate|examine|study|review/i,
      /data|metrics|insights|trends|patterns|statistics/i,
      /report|dashboard|summary|overview|breakdown/i,
    ]);

    // Coordination patterns
    this.intentPatterns.set('coordination', [
      /coordinate|collaborate|team|multi|cross|department/i,
      /workflow|process|pipeline|sequence|chain/i,
      /handoff|transfer|escalate|delegate|assign/i,
    ]);

    // Monitoring patterns
    this.intentPatterns.set('monitoring', [
      /monitor|watch|track|observe|check|alert|notify/i,
      /anomaly|error|failure|issue|problem|exception/i,
      /threshold|limit|breach|exceed|violation/i,
    ]);
  }

  /**
   * Initialize entity extractors
   */
  private initializeEntityExtractors(): void {
    // Agent names
    this.entityExtractors.set('agents', /(?:AI |ai )?(?:Chief|VP|Manager|Director|Specialist|Analyst|Engineer|Officer)\s+\w+/g);
    
    // Department names
    this.entityExtractors.set('departments', /(?:marketing|sales|customer|operations|finance|technology|hr|legal|data|product|security|research|administrative|trading|real estate|insurance|healthcare|manufacturing|transportation|government|supply chain|ai management|gaming|education|professional services|e-commerce)/gi);
    
    // Goals
    this.entityExtractors.set('goals', /(?:achieve|reach|target|goal|objective|aim)[:\s]+([^.]+)/gi);
    
    // Conditions
    this.entityExtractors.set('conditions', /(?:if|when|unless|provided that|as long as)[:\s]+([^.]+)/gi);
    
    // Triggers
    this.entityExtractors.set('triggers', /(?:trigger|when|on|after|before|at)[:\s]+([^.]+)/gi);
  }

  /**
   * Parse natural language input into loop configuration
   */
  async parseNaturalLanguage(input: string): Promise<NLParseResult> {
    // Detect intent
    const intent = this.detectIntent(input);

    // Extract entities
    const extractedEntities = this.extractEntities(input);

    // Generate suggested configuration
    const suggestedConfig = await this.generateSuggestedConfig(intent, extractedEntities);

    // Calculate overall confidence
    const confidence = this.calculateConfidence(intent, extractedEntities);

    return {
      intent,
      extractedEntities,
      suggestedConfig,
      confidence,
    };
  }

  /**
   * Detect intent from natural language input
   */
  private detectIntent(input: string): NLIntent {
    let bestMatch: NLIntent = {
      type: 'automation',
      confidence: 0,
      keywords: [],
      suggestedAgents: [],
    };

    for (const [intentType, patterns] of this.intentPatterns) {
      let matchCount = 0;
      const matchedKeywords: string[] = [];

      for (const pattern of patterns) {
        const matches = input.match(pattern);
        if (matches) {
          matchCount += matches.length;
          matchedKeywords.push(...matches);
        }
      }

      const confidence = Math.min(matchCount / patterns.length, 1);

      if (confidence > bestMatch.confidence) {
        bestMatch = {
          type: intentType as NLIntent['type'],
          confidence,
          keywords: matchedKeywords,
          suggestedAgents: this.suggestAgentsForIntent(intentType as NLIntent['type']),
        };
      }
    }

    return bestMatch;
  }

  /**
   * Extract entities from natural language input
   */
  private extractEntities(input: string): NLParseResult['extractedEntities'] {
    const entities: NLParseResult['extractedEntities'] = {
      agents: [],
      departments: [],
      goals: [],
      conditions: [],
      triggers: [],
    };

    for (const [entityType, pattern] of this.entityExtractors) {
      const matches = input.match(pattern);
      if (matches) {
        entities[entityType as keyof typeof entities] = matches.map(m => m.trim());
      }
    }

    return entities;
  }

  /**
   * Generate suggested loop configuration from intent and entities
   */
  private async generateSuggestedConfig(intent: NLIntent, entities: NLParseResult['extractedEntities']): Promise<Partial<LoopConfig>> {
    const config: Partial<LoopConfig> = {
      name: this.generateLoopName(intent, entities),
      description: this.generateLoopDescription(intent, entities),
      goal: this.generateLoopGoal(intent, entities),
      nodes: await this.generateLoopNodes(intent, entities),
      settings: this.generateLoopSettings(intent, entities),
    };

    return config;
  }

  /**
   * Generate loop name from intent and entities
   */
  private generateLoopName(intent: NLIntent, entities: NLParseResult['extractedEntities']): string {
    const dept = entities.departments[0] || 'Cross-Department';
    const action = this.intentToAction(intent.type);
    return `${dept} ${action} Loop`;
  }

  /**
   * Generate loop description
   */
  private generateLoopDescription(intent: NLIntent, entities: NLParseResult['extractedEntities']): string {
    const action = this.intentToAction(intent.type);
    const dept = entities.departments[0] || 'multiple departments';
    const agents = entities.agents.slice(0, 3).join(', ');
    
    return `Automated ${action} workflow for ${dept}${agents ? ` using ${agents}` : ''}`;
  }

  /**
   * Generate loop goal
   */
  private generateLoopGoal(intent: NLIntent, entities: NLParseResult['extractedEntities']): any {
    const primaryGoal = entities.goals[0] || this.defaultGoalForIntent(intent.type);
    
    return {
      primary: primaryGoal,
      successCriteria: [
        {
          id: 'completion',
          name: 'Task Completion',
          description: 'All tasks completed successfully',
          operator: 'equals',
          targetPath: 'status',
          targetValue: 'completed',
        },
      ],
      maxIterations: this.defaultIterationsForIntent(intent.type),
    };
  }

  /**
   * Generate loop nodes from intent and entities
   */
  private async generateLoopNodes(intent: NLIntent, entities: NLParseResult['extractedEntities']): Promise<LoopNode[]> {
    const nodes: LoopNode[] = [];

    // Start node
    nodes.push({
      id: 'start',
      type: 'start',
      name: 'Start',
      description: 'Begin the workflow',
      nextNodes: ['agent-1'],
    });

    // Agent nodes
    const agentsToUse = entities.agents.length > 0 
      ? entities.agents 
      : intent.suggestedAgents.slice(0, 3);

    for (let i = 0; i < agentsToUse.length; i++) {
      const agentId = this.normalizeAgentId(agentsToUse[i]);
      nodes.push({
        id: `agent-${i + 1}`,
        type: 'agent',
        name: agentsToUse[i],
        description: `Execute ${agentsToUse[i]}`,
        agentId,
        agentType: 'main',
        nextNodes: i < agentsToUse.length - 1 ? [`agent-${i + 2}`] : ['end'],
      });
    }

    // End node
    nodes.push({
      id: 'end',
      type: 'end',
      name: 'End',
      description: 'Complete the workflow',
    });

    return nodes;
  }

  /**
   * Generate loop settings
   */
  private generateLoopSettings(intent: NLIntent, entities: NLParseResult['extractedEntities']): any {
    const triggerType = entities.triggers.length > 0 ? 'event_based' : 'manual';
    
    return {
      triggerType,
      retryPolicy: {
        maxRetries: this.defaultRetriesForIntent(intent.type),
        backoffStrategy: 'exponential',
        initialDelay: 1000,
      },
      concurrency: this.defaultConcurrencyForIntent(intent.type),
      priority: 'medium',
    };
  }

  /**
   * Suggest agents for a given intent
   */
  private suggestAgentsForIntent(intentType: NLIntent['type']): string[] {
    const agentSuggestions: Record<NLIntent['type'], string[]> = {
      optimization: ['AI Marketing Manager', 'AI SEO Specialist', 'AI Performance Analyst'],
      automation: ['AI Workflow Automation Agent', 'AI Task Coordinator', 'AI Process Optimization Agent'],
      analysis: ['AI Data Analyst', 'AI Analytics Specialist', 'AI BI Developer'],
      coordination: ['AI Operations Manager', 'AI Project Manager', 'AI Resource Planner'],
      monitoring: ['AI Security Analyst', 'AI Quality Assurance Agent', 'AI Incident Responder'],
    };

    return agentSuggestions[intentType] || [];
  }

  /**
   * Convert intent type to action verb
   */
  private intentToAction(intentType: NLIntent['type']): string {
    const actions: Record<NLIntent['type'], string> = {
      optimization: 'Optimization',
      automation: 'Automation',
      analysis: 'Analysis',
      coordination: 'Coordination',
      monitoring: 'Monitoring',
    };

    return actions[intentType];
  }

  /**
   * Get default goal for intent type
   */
  private defaultGoalForIntent(intentType: NLIntent['type']): string {
    const goals: Record<NLIntent['type'], string> = {
      optimization: 'Optimize performance metrics',
      automation: 'Automate routine tasks',
      analysis: 'Generate insights from data',
      coordination: 'Coordinate multi-agent workflow',
      monitoring: 'Monitor system performance',
    };

    return goals[intentType];
  }

  /**
   * Get default iterations for intent type
   */
  private defaultIterationsForIntent(intentType: NLIntent['type']): number {
    const iterations: Record<NLIntent['type'], number> = {
      optimization: 10,
      automation: 5,
      analysis: 3,
      coordination: 5,
      monitoring: 100, // Continuous
    };

    return iterations[intentType];
  }

  /**
   * Get default retries for intent type
   */
  private defaultRetriesForIntent(intentType: NLIntent['type']): number {
    const retries: Record<NLIntent['type'], number> = {
      optimization: 3,
      automation: 2,
      analysis: 1,
      coordination: 3,
      monitoring: 5,
    };

    return retries[intentType];
  }

  /**
   * Get default concurrency for intent type
   */
  private defaultConcurrencyForIntent(intentType: NLIntent['type']): number {
    const concurrency: Record<NLIntent['type'], number> = {
      optimization: 3,
      automation: 2,
      analysis: 1,
      coordination: 5,
      monitoring: 1,
    };

    return concurrency[intentType];
  }

  /**
   * Normalize agent ID
   */
  private normalizeAgentId(agentName: string): string {
    return agentName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  /**
   * Calculate overall confidence score
   */
  private calculateConfidence(intent: NLIntent, entities: NLParseResult['extractedEntities']): number {
    const intentConfidence = intent.confidence;
    const entityCount = Object.values(entities).flat().length;
    const entityConfidence = Math.min(entityCount / 5, 1);

    return (intentConfidence * 0.6) + (entityConfidence * 0.4);
  }

  /**
   * Suggest templates based on natural language input
   */
  async suggestTemplates(input: string): Promise<TemplateSuggestion[]> {
    const parseResult = await this.parseNaturalLanguage(input);
    const suggestions: TemplateSuggestion[] = [];

    // Get templates matching the intent
    const intentTemplates = this.getTemplatesByIntent(parseResult.intent.type);

    for (const template of intentTemplates) {
      const matchScore = this.calculateTemplateMatch(template, parseResult);
      
      if (matchScore > 0.5) {
        suggestions.push({
          templateId: template.id,
          templateName: template.name,
          matchScore,
          reasons: this.generateMatchReasons(template, parseResult),
          requiredModifications: this.generateRequiredModifications(template, parseResult),
        });
      }
    }

    return suggestions.sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Get templates by intent type
   */
  private getTemplatesByIntent(intentType: NLIntent['type']): any[] {
    // This would interface with the templates system
    // For now, return placeholder data
    const templates: Record<NLIntent['type'], any[]> = {
      optimization: [
        { id: 'seo_optimization', name: 'SEO Optimization Loop' },
        { id: 'performance_tuning', name: 'Performance Tuning Loop' },
      ],
      automation: [
        { id: 'lead_nurturing', name: 'Lead Nurturing Loop' },
        { id: 'content_generation', name: 'Content Generation Loop' },
      ],
      analysis: [
        { id: 'market_analysis', name: 'Market Analysis Loop' },
        { id: 'customer_feedback', name: 'Customer Feedback Analysis Loop' },
      ],
      coordination: [
        { id: 'cross_department', name: 'Cross-Department Coordination Loop' },
        { id: 'multi_channel', name: 'Multi-Channel Campaign Loop' },
      ],
      monitoring: [
        { id: 'anomaly_detection', name: 'Anomaly Detection Loop' },
        { id: 'performance_monitoring', name: 'Performance Monitoring Loop' },
      ],
    };

    return templates[intentType] || [];
  }

  /**
   * Calculate template match score
   */
  private calculateTemplateMatch(template: any, parseResult: NLParseResult): number {
    let score = 0;

    // Intent match
    score += 0.4;

    // Entity matches
    if (parseResult.extractedEntities.departments.length > 0) score += 0.2;
    if (parseResult.extractedEntities.agents.length > 0) score += 0.2;
    if (parseResult.extractedEntities.goals.length > 0) score += 0.1;
    if (parseResult.extractedEntities.conditions.length > 0) score += 0.1;

    return Math.min(score, 1);
  }

  /**
   * Generate reasons for template match
   */
  private generateMatchReasons(template: any, parseResult: NLParseResult): string[] {
    const reasons: string[] = [];

    reasons.push(`Matches ${parseResult.intent.type} intent`);
    
    if (parseResult.extractedEntities.departments.length > 0) {
      reasons.push(`Compatible with ${parseResult.extractedEntities.departments[0]} department`);
    }
    
    if (parseResult.extractedEntities.agents.length > 0) {
      reasons.push(`Supports specified agents`);
    }

    return reasons;
  }

  /**
   * Generate required modifications for template
   */
  private generateRequiredModifications(template: any, parseResult: NLParseResult): string[] {
    const modifications: string[] = [];

    if (parseResult.extractedEntities.agents.length > 0) {
      modifications.push('Replace default agents with specified agents');
    }

    if (parseResult.extractedEntities.goals.length > 0) {
      modifications.push('Update success criteria with specified goals');
    }

    if (parseResult.extractedEntities.conditions.length > 0) {
      modifications.push('Add custom conditions to workflow');
    }

    if (parseResult.extractedEntities.triggers.length > 0) {
      modifications.push('Configure event-based triggers');
    }

    return modifications;
  }

  /**
   * Convert natural language to complete loop configuration
   */
  async naturalLanguageToLoop(input: string): Promise<LoopConfig> {
    const parseResult = await this.parseNaturalLanguage(input);
    
    const baseConfig: LoopConfig = {
      id: `loop-${Date.now()}`,
      version: '1.0.0',
      status: 'idle',
      ...parseResult.suggestedConfig,
      startNodeId: 'start',
      endNodeId: 'end',
      integration: {
        relatedAgents: parseResult.extractedEntities.agents,
      },
      metadata: {
        createdBy: 'natural-language',
        createdAt: new Date(),
        tags: ['nl-generated', parseResult.intent.type],
        category: parseResult.intent.type,
      },
    } as LoopConfig;

    return baseConfig;
  }

  /**
   * Get intent suggestions for partial input
   */
  getIntentSuggestions(partialInput: string): string[] {
    const suggestions: string[] = [];

    for (const [intentType, patterns] of this.intentPatterns) {
      for (const pattern of patterns) {
        if (pattern.test(partialInput)) {
          suggestions.push(intentType);
          break;
        }
      }
    }

    return [...new Set(suggestions)];
  }

  /**
   * Validate natural language input
   */
  validateInput(input: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (input.length < 10) {
      errors.push('Input is too short');
    }

    if (input.length > 1000) {
      errors.push('Input is too long');
    }

    const intent = this.detectIntent(input);
    if (intent.confidence < 0.3) {
      errors.push('Could not clearly determine intent');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Singleton instance
export const naturalLanguageConfigurator = new NaturalLanguageConfigurator();
