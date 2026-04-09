import { randomUUID } from 'crypto';

// ============================================
// COUNSELING TEMPLATES & PRESET PROGRAMS
// ============================================

export interface CounselingTemplate {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'development' | 'crisis' | 'coordination' | 'mentorship' | 'escalation' | 'peer_support';
  counselingMode: 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional';
  programType: 'performance_improvement' | 'skill_development' | 'crisis_intervention' | 'career_guidance' | 'coordination_alignment' | 'conflict_resolution';
  severity: 'low' | 'medium' | 'high' | 'critical';
  duration: 'single_session' | 'short_term' | 'ongoing' | 'emergency';
  agenda: {
    primaryObjectives: string[];
    expectedOutcomes: string[];
    successMetrics: string[];
    discussionPoints: string[];
  };
  context: {
    requiredSkills: string[];
    recommendedResources: string[];
    suggestedTools: string[];
    bestPractices: string[];
  };
  workflow: {
    steps: {
      order: number;
      title: string;
      description: string;
      duration: number; // minutes
      type: 'assessment' | 'discussion' | 'planning' | 'action' | 'review';
      questions?: string[];
      deliverables?: string[];
    }[];
  };
  metadata: {
    createdBy: string;
    organizationId: string;
    isSystemTemplate: boolean;
    isPublic: boolean;
    usageCount: number;
    averageRating: number;
    tags: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

class CounselingTemplateService {
  private templates: Map<string, CounselingTemplate> = new Map();

  constructor() {
    this.initializeSystemTemplates();
  }

  private initializeSystemTemplates(): void {
    const systemTemplates: Omit<CounselingTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = [
      // Performance Review Template
      {
        name: 'Performance Review & Improvement',
        description: 'Comprehensive performance evaluation and improvement planning',
        category: 'performance',
        counselingMode: 'main_to_sub',
        programType: 'performance_improvement',
        severity: 'medium',
        duration: 'single_session',
        agenda: {
          primaryObjectives: [
            'Review current performance metrics',
            'Identify areas for improvement',
            'Create actionable improvement plan'
          ],
          expectedOutcomes: [
            'Clear understanding of performance gaps',
            'Defined improvement targets',
            'Support structure in place'
          ],
          successMetrics: [
            'Performance score improvement',
            'Goal completion rate',
            'Skill competency growth'
          ],
          discussionPoints: [
            'What are your current challenges?',
            'Which skills need development?',
            'What support do you need?'
          ]
        },
        context: {
          requiredSkills: ['performance_analysis', 'goal_setting', 'coaching'],
          recommendedResources: [
            'Performance metrics dashboard',
            'Skills assessment tools',
            'Development resources library'
          ],
          suggestedTools: ['analytics_dashboard', 'goal_tracker', 'feedback_collector'],
          bestPractices: [
            'Focus on specific, measurable goals',
            'Provide constructive feedback',
            'Follow up regularly on progress'
          ]
        },
        workflow: {
          steps: [
            { order: 1, title: 'Performance Assessment', description: 'Review current metrics and feedback', duration: 10, type: 'assessment', questions: ['What are your current performance scores?', 'How do you feel about your recent work?'] },
            { order: 2, title: 'Gap Analysis', description: 'Identify performance gaps', duration: 15, type: 'discussion', questions: ['Where do you see room for improvement?', 'What obstacles are you facing?'] },
            { order: 3, title: 'Goal Setting', description: 'Define improvement targets', duration: 20, type: 'planning', deliverables: ['Performance improvement plan', 'Specific targets'] },
            { order: 4, title: 'Action Planning', description: 'Create action items', duration: 15, type: 'action', deliverables: ['Action items list', 'Timeline'] },
            { order: 5, title: 'Next Steps', description: 'Schedule follow-up', duration: 10, type: 'review', questions: ['When shall we review progress?'] }
          ]
        },
        metadata: {
          createdBy: 'system',
          organizationId: 'system',
          isSystemTemplate: true,
          isPublic: true,
          usageCount: 0,
          averageRating: 0,
          tags: ['performance', 'review', 'improvement', 'main-sub']
        }
      },

      // Crisis Intervention Template
      {
        name: 'Crisis Intervention Response',
        description: 'Emergency response for critical agent issues',
        category: 'crisis',
        counselingMode: 'sub_to_main',
        programType: 'crisis_intervention',
        severity: 'critical',
        duration: 'emergency',
        agenda: {
          primaryObjectives: [
            'Assess crisis severity and impact',
            'Implement immediate containment',
            'Develop recovery plan'
          ],
          expectedOutcomes: [
            'Crisis contained',
            'Root cause identified',
            'Prevention measures established'
          ],
          successMetrics: [
            'Time to resolution',
            'Impact mitigation level',
            'Similar incidents prevented'
          ],
          discussionPoints: [
            'What is the immediate threat?',
            'Who is affected?',
            'What resources are needed?'
          ]
        },
        context: {
          requiredSkills: ['crisis_management', 'incident_response', 'escalation'],
          recommendedResources: [
            'Incident response playbook',
            'Escalation contact list',
            'Emergency protocols'
          ],
          suggestedTools: ['incident_tracker', 'escalation_system', 'communication_hub'],
          bestPractices: [
            'Act quickly to contain the crisis',
            'Document all actions taken',
            'Communicate transparently with stakeholders'
          ]
        },
        workflow: {
          steps: [
            { order: 1, title: 'Crisis Assessment', description: 'Evaluate severity and impact', duration: 5, type: 'assessment', questions: ['What is the nature of the crisis?', 'How severe is the impact?'] },
            { order: 2, title: 'Immediate Actions', description: 'Implement containment', duration: 10, type: 'action', deliverables: ['Containment actions list'] },
            { order: 3, title: 'Stakeholder Notification', description: 'Alert relevant parties', duration: 5, type: 'action' },
            { order: 4, title: 'Root Cause Analysis', description: 'Investigate cause', duration: 15, type: 'discussion', questions: ['What led to this crisis?', 'How can we prevent recurrence?'] },
            { order: 5, title: 'Recovery Plan', description: 'Develop restoration plan', duration: 15, type: 'planning', deliverables: ['Recovery timeline', 'Action items'] }
          ]
        },
        metadata: {
          createdBy: 'system',
          organizationId: 'system',
          isSystemTemplate: true,
          isPublic: true,
          usageCount: 0,
          averageRating: 0,
          tags: ['crisis', 'emergency', 'intervention', 'escalation']
        }
      },

      // Skill Development Template
      {
        name: 'Skill Development Program',
        description: 'Structured skill building and mentoring program',
        category: 'development',
        counselingMode: 'main_to_sub',
        programType: 'skill_development',
        severity: 'low',
        duration: 'ongoing',
        agenda: {
          primaryObjectives: [
            'Identify skill gaps',
            'Create development roadmap',
            'Provide mentoring support'
          ],
          expectedOutcomes: [
            'Competency in target skills',
            'Career growth progression',
            'Increased autonomy'
          ],
          successMetrics: [
            'Skill assessment scores',
            'Project completion quality',
            'Independent work capability'
          ],
          discussionPoints: [
            'What skills do you want to develop?',
            'What are your career goals?',
            'How do you learn best?'
          ]
        },
        context: {
          requiredSkills: ['mentoring', 'skill_assessment', 'training'],
          recommendedResources: [
            'Learning path library',
            'Practice exercises',
            'Reference materials'
          ],
          suggestedTools: ['skill_tracker', 'learning_platform', 'assessment_tools'],
          bestPractices: [
            'Set clear, achievable milestones',
            'Provide regular feedback',
            'Celebrate progress and achievements'
          ]
        },
        workflow: {
          steps: [
            { order: 1, title: 'Skills Assessment', description: 'Evaluate current capabilities', duration: 20, type: 'assessment', questions: ['What are your current skills?', 'Where do you want to grow?'] },
            { order: 2, title: 'Goal Setting', description: 'Define learning objectives', duration: 15, type: 'planning', deliverables: ['Learning objectives', 'Milestones'] },
            { order: 3, title: 'Resource Planning', description: 'Identify learning resources', duration: 10, type: 'planning', deliverables: ['Resource list'] },
            { order: 4, title: 'Schedule Creation', description: 'Set up regular check-ins', duration: 10, type: 'planning', deliverables: ['Meeting schedule'] },
            { order: 5, title: 'First Milestone', description: 'Define immediate goal', duration: 15, type: 'planning', deliverables: ['First milestone plan'] }
          ]
        },
        metadata: {
          createdBy: 'system',
          organizationId: 'system',
          isSystemTemplate: true,
          isPublic: true,
          usageCount: 0,
          averageRating: 0,
          tags: ['development', 'skills', 'mentoring', 'growth']
        }
      },

      // Peer Collaboration Template
      {
        name: 'Peer Collaboration & Knowledge Sharing',
        description: 'Collaborative problem-solving between peer agents',
        category: 'peer_support',
        counselingMode: 'peer_to_peer',
        programType: 'coordination_alignment',
        severity: 'low',
        duration: 'short_term',
        agenda: {
          primaryObjectives: [
            'Share knowledge and expertise',
            'Solve shared challenges',
            'Build collaborative relationships'
          ],
          expectedOutcomes: [
            'Mutual problem resolution',
            'Knowledge transfer',
            'Stronger peer network'
          ],
          successMetrics: [
            'Problems solved collaboratively',
            'Knowledge shared',
            'Peer satisfaction'
          ],
          discussionPoints: [
            'What challenge are we facing?',
            'What can we learn from each other?',
            'How can we support each other?'
          ]
        },
        context: {
          requiredSkills: ['collaboration', 'knowledge_sharing', 'peer_support'],
          recommendedResources: [
            'Knowledge base',
            'Best practices library',
            'Collaboration tools'
          ],
          suggestedTools: ['shared_workspace', 'documentation_system', 'communication_tools'],
          bestPractices: [
            'Approach with openness and respect',
            'Focus on mutual benefit',
            'Document learnings for others'
          ]
        },
        workflow: {
          steps: [
            { order: 1, title: 'Challenge Sharing', description: 'Present current challenges', duration: 10, type: 'discussion', questions: ['What are you working on?', 'What challenges are you facing?'] },
            { order: 2, title: 'Knowledge Exchange', description: 'Share expertise and insights', duration: 15, type: 'discussion', questions: ['What have you learned?', 'What approaches have worked?'] },
            { order: 3, title: 'Solution Brainstorming', description: 'Generate collaborative solutions', duration: 20, type: 'planning', deliverables: ['Solution ideas'] },
            { order: 4, title: 'Action Planning', description: 'Define joint actions', duration: 15, type: 'action', deliverables: ['Action plan'] },
            { order: 5, title: 'Follow-up Agreement', description: 'Schedule check-ins', duration: 10, type: 'review', questions: ['When should we sync next?'] }
          ]
        },
        metadata: {
          createdBy: 'system',
          organizationId: 'system',
          isSystemTemplate: true,
          isPublic: true,
          usageCount: 0,
          averageRating: 0,
          tags: ['peer', 'collaboration', 'knowledge', 'sharing']
        }
      },

      // Coordination Alignment Template
      {
        name: 'Cross-Agent Coordination Alignment',
        description: 'Align efforts and strategies across agent teams',
        category: 'coordination',
        counselingMode: 'cross_functional',
        programType: 'coordination_alignment',
        severity: 'medium',
        duration: 'short_term',
        agenda: {
          primaryObjectives: [
            'Align on shared goals',
            'Coordinate responsibilities',
            'Establish communication protocols'
          ],
          expectedOutcomes: [
            'Clear role definitions',
            'Coordinated action plan',
            'Effective communication channels'
          ],
          successMetrics: [
            'Task completion coordination',
            'Communication effectiveness',
            'Goal alignment level'
          ],
          discussionPoints: [
            'What are our shared objectives?',
            'How do our roles intersect?',
            'How should we coordinate?'
          ]
        },
        context: {
          requiredSkills: ['coordination', 'planning', 'communication'],
          recommendedResources: [
            'Project plans',
            'Role definitions',
            'Communication templates'
          ],
          suggestedTools: ['project_tracker', 'calendar_sync', 'status_dashboard'],
          bestPractices: [
            'Define clear handoff points',
            'Establish regular sync meetings',
            'Document decisions and agreements'
          ]
        },
        workflow: {
          steps: [
            { order: 1, title: 'Goal Alignment', description: 'Review shared objectives', duration: 15, type: 'discussion', questions: ['What are we both working towards?', 'How do our goals align?'] },
            { order: 2, title: 'Role Clarity', description: 'Define responsibilities', duration: 15, type: 'planning', deliverables: ['Role definitions'] },
            { order: 3, title: 'Dependency Mapping', description: 'Identify interdependencies', duration: 15, type: 'planning', deliverables: ['Dependency map'] },
            { order: 4, title: 'Communication Setup', description: 'Establish sync protocols', duration: 10, type: 'planning', deliverables: ['Communication plan'] },
            { order: 5, title: 'Coordination Schedule', description: 'Set up regular check-ins', duration: 15, type: 'planning', deliverables: ['Meeting schedule'] }
          ]
        },
        metadata: {
          createdBy: 'system',
          organizationId: 'system',
          isSystemTemplate: true,
          isPublic: true,
          usageCount: 0,
          averageRating: 0,
          tags: ['coordination', 'alignment', 'cross-functional', 'planning']
        }
      },

      // Escalation Request Template
      {
        name: 'Escalation & Support Request',
        description: 'Formal request for guidance or escalation to main agent',
        category: 'escalation',
        counselingMode: 'sub_to_main',
        programType: 'career_guidance',
        severity: 'high',
        duration: 'single_session',
        agenda: {
          primaryObjectives: [
            'Present issue requiring escalation',
            'Receive guidance and direction',
            'Establish resolution path'
          ],
          expectedOutcomes: [
            'Clear guidance received',
            'Resolution plan established',
            'Support resources allocated'
          ],
          successMetrics: [
            'Time to resolution',
            'Guidance effectiveness',
            'Issue closure rate'
          ],
          discussionPoints: [
            'What issue needs escalation?',
            'What guidance do you need?',
            'What resources would help?'
          ]
        },
        context: {
          requiredSkills: ['escalation', 'problem_presentation', 'receiving_feedback'],
          recommendedResources: [
            'Escalation criteria guide',
            'Support resource directory',
            'Decision frameworks'
          ],
          suggestedTools: ['escalation_tracker', 'resource_allocator', 'decision_log'],
          bestPractices: [
            'Clearly articulate the issue',
            'Explain what you have tried',
            'Be open to guidance and feedback'
          ]
        },
        workflow: {
          steps: [
            { order: 1, title: 'Issue Presentation', description: 'Explain the problem clearly', duration: 10, type: 'discussion', questions: ['What is the core issue?', 'Why does this need escalation?'] },
            { order: 2, title: 'Context Sharing', description: 'Provide background information', duration: 10, type: 'discussion', questions: ['What have you tried?', 'What is the impact?'] },
            { order: 3, title: 'Guidance Reception', description: 'Receive expert guidance', duration: 20, type: 'discussion' },
            { order: 4, title: 'Action Planning', description: 'Define next steps', duration: 15, type: 'planning', deliverables: ['Action plan'] },
            { order: 5, title: 'Support Agreement', description: 'Confirm support resources', duration: 10, type: 'review', deliverables: ['Support confirmation'] }
          ]
        },
        metadata: {
          createdBy: 'system',
          organizationId: 'system',
          isSystemTemplate: true,
          isPublic: true,
          usageCount: 0,
          averageRating: 0,
          tags: ['escalation', 'guidance', 'support', 'sub-main']
        }
      }
    ];

    // Create system templates
    for (const templateData of systemTemplates) {
      const template: CounselingTemplate = {
        ...templateData,
        id: `system-${randomUUID()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.templates.set(template.id, template);
    }
  }

  // ============================================
  // PUBLIC API
  // ============================================

  createTemplate(
    params: Omit<CounselingTemplate, 'id' | 'createdAt' | 'updatedAt' | 'metadata'> & {
      createdBy: string;
      organizationId: string;
      isPublic?: boolean;
      tags?: string[];
    }
  ): CounselingTemplate {
    const id = randomUUID();
    const template: CounselingTemplate = {
      ...params,
      id,
      metadata: {
        createdBy: params.createdBy,
        organizationId: params.organizationId,
        isSystemTemplate: false,
        isPublic: params.isPublic ?? false,
        usageCount: 0,
        averageRating: 0,
        tags: params.tags || [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.templates.set(id, template);
    return template;
  }

  getTemplate(id: string): CounselingTemplate | undefined {
    return this.templates.get(id);
  }

  getAllTemplates(filters?: {
    category?: CounselingTemplate['category'];
    counselingMode?: CounselingTemplate['counselingMode'];
    organizationId?: string;
    isSystem?: boolean;
    tags?: string[];
  }): CounselingTemplate[] {
    let templates = Array.from(this.templates.values());

    if (filters?.category) {
      templates = templates.filter(t => t.category === filters.category);
    }

    if (filters?.counselingMode) {
      templates = templates.filter(t => t.counselingMode === filters.counselingMode);
    }

    if (filters?.organizationId) {
      templates = templates.filter(t => 
        t.metadata.organizationId === filters.organizationId || 
        t.metadata.isPublic ||
        t.metadata.isSystemTemplate
      );
    }

    if (filters?.isSystem !== undefined) {
      templates = templates.filter(t => t.metadata.isSystemTemplate === filters.isSystem);
    }

    if (filters?.tags && filters.tags.length > 0) {
      templates = templates.filter(t => 
        filters.tags!.some(tag => t.metadata.tags.includes(tag))
      );
    }

    // Sort by usage count (most popular first)
    return templates.sort((a, b) => b.metadata.usageCount - a.metadata.usageCount);
  }

  getTemplatesByMode(mode: CounselingTemplate['counselingMode']): CounselingTemplate[] {
    return this.getAllTemplates({ counselingMode: mode });
  }

  getRecommendedTemplates(
    agentId: string,
    agentType: 'main_agent' | 'subagent',
    context?: {
      recentIssues?: string[];
      skillGaps?: string[];
      performanceTrend?: 'improving' | 'declining' | 'stable';
    }
  ): CounselingTemplate[] {
    const templates = this.getAllTemplates();
    
    // Score templates based on relevance
    const scored = templates.map(template => {
      let score = 0;
      
      // Match agent type with counseling mode
      if (agentType === 'main_agent' && template.counselingMode === 'main_to_sub') {
        score += 10;
      } else if (agentType === 'subagent' && template.counselingMode === 'sub_to_main') {
        score += 10;
      } else if (template.counselingMode === 'peer_to_peer') {
        score += 5;
      }
      
      // Boost based on context
      if (context?.recentIssues?.some(issue => 
        template.name.toLowerCase().includes(issue.toLowerCase()) ||
        template.description.toLowerCase().includes(issue.toLowerCase())
      )) {
        score += 5;
      }
      
      if (context?.skillGaps?.some(skill => 
        template.context.requiredSkills.includes(skill)
      )) {
        score += 3;
      }
      
      // Performance trend influence
      if (context?.performanceTrend === 'declining' && template.category === 'performance') {
        score += 8;
      }
      
      // Boost by popularity
      score += Math.min(template.metadata.usageCount / 10, 5);
      
      return { template, score };
    });

    // Sort by score and return top templates
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.template);
  }

  updateTemplate(
    id: string,
    updates: Partial<Omit<CounselingTemplate, 'id' | 'createdAt' | 'metadata'>>
  ): CounselingTemplate | null {
    const template = this.templates.get(id);
    if (!template) return null;

    // Don't allow modification of system templates
    if (template.metadata.isSystemTemplate) {
      throw new Error('Cannot modify system templates');
    }

    // Ensure updatedAt is strictly greater than createdAt by adding a small delay
    const now = new Date();
    if (now.getTime() <= template.createdAt.getTime()) {
      // If for some reason the time is the same or earlier, set it to 1ms after created
      now.setTime(template.createdAt.getTime() + 1);
    }

    Object.assign(template, updates, { updatedAt: now });
    this.templates.set(id, template);
    return template;
  }

  deleteTemplate(id: string): boolean {
    const template = this.templates.get(id);
    if (!template) return false;

    // Don't allow deletion of system templates
    if (template.metadata.isSystemTemplate) {
      throw new Error('Cannot delete system templates');
    }

    return this.templates.delete(id);
  }

  recordTemplateUsage(id: string): void {
    const template = this.templates.get(id);
    if (template) {
      template.metadata.usageCount++;
      this.templates.set(id, template);
    }
  }

  rateTemplate(id: string, rating: number): void {
    const template = this.templates.get(id);
    if (template) {
      const current = template.metadata.averageRating;
      const count = template.metadata.usageCount;
      // Calculate new average: (current * count + rating) / (count + 1)
      // But we need to increment count first or use a rating count
      const newCount = count + 1;
      template.metadata.averageRating = (current * count + rating) / newCount;
      template.metadata.usageCount = newCount;
      this.templates.set(id, template);
    }
  }

  duplicateTemplate(id: string, createdBy: string, organizationId: string): CounselingTemplate | null {
    const original = this.templates.get(id);
    if (!original) return null;

    const duplicate = this.createTemplate({
      ...original,
      name: `${original.name} (Copy)`,
      createdBy,
      organizationId,
      isPublic: false,
      tags: [...original.metadata.tags, 'duplicate'],
    });

    return duplicate;
  }
}

// Singleton instance
export const counselingTemplates = new CounselingTemplateService();

// Convenience functions
export function createCounselingTemplate(
  params: Parameters<CounselingTemplateService['createTemplate']>[0]
): CounselingTemplate {
  return counselingTemplates.createTemplate(params);
}

export function getCounselingTemplate(id: string): CounselingTemplate | undefined {
  return counselingTemplates.getTemplate(id);
}

export function getAllCounselingTemplates(
  filters?: Parameters<CounselingTemplateService['getAllTemplates']>[0]
): CounselingTemplate[] {
  return counselingTemplates.getAllTemplates(filters);
}

export function getRecommendedCounselingTemplates(
  agentId: string,
  agentType: 'main_agent' | 'subagent',
  context?: Parameters<CounselingTemplateService['getRecommendedTemplates']>[2]
): CounselingTemplate[] {
  return counselingTemplates.getRecommendedTemplates(agentId, agentType, context);
}

export function getTemplatesByCounselingMode(
  mode: CounselingTemplate['counselingMode']
): CounselingTemplate[] {
  return counselingTemplates.getTemplatesByMode(mode);
}

export default counselingTemplates;
