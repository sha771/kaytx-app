/**
 * Loop Engineering Templates
 * 
 * Pre-configured loop templates for common use cases across departments.
 * These templates provide starting points for creating automated workflows.
 */

import { LoopTemplate, LoopCondition, LoopAction } from './types';

/**
 * Marketing Department Templates
 */
export const marketingTemplates: LoopTemplate[] = [
  {
    id: 'marketing_seo_optimization_loop',
    name: 'SEO Optimization Loop',
    description: 'Continuous SEO improvement through analysis, optimization, and monitoring',
    category: 'optimization',
    config: {
      name: 'SEO Optimization Loop',
      description: 'Automated SEO improvement cycle',
      version: '1.0.0',
      goal: {
        primary: 'Improve search engine rankings and organic traffic',
        secondary: ['Enhance content quality', 'Increase backlink profile'],
        successCriteria: [
          {
            id: 'traffic_increase',
            name: 'Traffic Increase',
            description: 'Achieve 15% increase in organic traffic',
            operator: 'greater_than',
            targetPath: 'organic_traffic_increase_percentage',
            targetValue: 15,
            threshold: 1
          },
          {
            id: 'ranking_improvement',
            name: 'Keyword Ranking Improvement',
            description: 'Improve average keyword position by 5 spots',
            operator: 'greater_than',
            targetPath: 'avg_ranking_improvement',
            targetValue: 5,
            threshold: 1
          }
        ],
        maxIterations: 30,
        timeout: 86400 // 24 hours
      },
      nodes: [
        {
          id: 'start',
          type: 'start',
          name: 'Start',
          description: 'Begin SEO optimization cycle',
          nextNodes: ['analyze_current_state']
        },
        {
          id: 'analyze_current_state',
          type: 'agent',
          name: 'Analyze Current SEO State',
          description: 'Comprehensive SEO audit and analysis',
          agentId: 'ai-seo-analyst',
          agentType: 'main',
          nextNodes: ['identify_opportunities'],
          conditions: []
        },
        {
          id: 'identify_opportunities',
          type: 'agent',
          name: 'Identify Optimization Opportunities',
          description: 'Find areas for SEO improvement',
          agentId: 'ai-content-optimizer',
          agentType: 'main',
          nextNodes: ['implement_optimizations'],
          conditions: []
        },
        {
          id: 'implement_optimizations',
          type: 'agent',
          name: 'Implement SEO Optimizations',
          description: 'Apply identified improvements',
          agentId: 'ai-technical-seo-specialist',
          agentType: 'sub',
          nextNodes: ['monitor_results'],
          conditions: []
        },
        {
          id: 'monitor_results',
          type: 'agent',
          name: 'Monitor Results',
          description: 'Track impact of optimizations',
          agentId: 'ai-analytics-specialist',
          agentType: 'sub',
          nextNodes: ['evaluate_success'],
          conditions: []
        },
        {
          id: 'evaluate_success',
          type: 'condition',
          name: 'Evaluate Success Criteria',
          description: 'Check if optimization goals are met',
          conditions: [
            {
              id: 'check_traffic',
              name: 'Traffic Goal Met',
              description: 'Check if traffic increase goal is achieved',
              operator: 'greater_than',
              targetPath: 'organic_traffic_increase_percentage',
              targetValue: 15
            }
          ],
          nextNodes: ['end', 'analyze_current_state']
        },
        {
          id: 'end',
          type: 'end',
          name: 'End',
          description: 'SEO optimization cycle complete'
        }
      ],
      startNodeId: 'start',
      endNodeId: 'end',
      settings: {
        triggerType: 'scheduled',
        schedule: '0 9 * * *', // Daily at 9 AM
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 3600
        },
        concurrency: 1,
        priority: 'high'
      },
      integration: {
        departmentId: 'marketing-growth',
        relatedAgents: ['ai-seo-analyst', 'ai-content-optimizer', 'ai-technical-seo-specialist', 'ai-analytics-specialist']
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['seo', 'marketing', 'optimization'],
        category: 'marketing'
      }
    },
    defaultSettings: {
      triggerType: 'scheduled',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 3600
      },
      concurrency: 1,
      priority: 'high'
    },
    requiredAgents: ['ai-seo-analyst', 'ai-content-optimizer', 'ai-technical-seo-specialist', 'ai-analytics-specialist'],
    exampleUseCases: [
      'Continuous SEO improvement',
      'Search ranking optimization',
      'Organic traffic growth'
    ]
  },
  {
    id: 'marketing_campaign_optimization',
    name: 'Campaign Optimization Loop',
    description: 'Multi-channel campaign performance optimization',
    category: 'optimization',
    config: {
      name: 'Campaign Optimization Loop',
      description: 'Automated campaign performance improvement',
      version: '1.0.0',
      goal: {
        primary: 'Maximize campaign ROI and conversion rates',
        successCriteria: [
          {
            id: 'roi_target',
            name: 'ROI Target',
            description: 'Achieve 300% ROI',
            operator: 'greater_than',
            targetPath: 'campaign_roi_percentage',
            targetValue: 300
          },
          {
            id: 'conversion_rate',
            name: 'Conversion Rate Target',
            description: 'Achieve 5% conversion rate',
            operator: 'greater_than',
            targetPath: 'conversion_rate_percentage',
            targetValue: 5
          }
        ],
        maxIterations: 20
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 1800
        },
        concurrency: 2,
        priority: 'high'
      },
      integration: {
        departmentId: 'marketing-growth',
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['campaign', 'marketing', 'optimization'],
        category: 'marketing'
      }
    },
    defaultSettings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 1800
      },
      concurrency: 2,
      priority: 'high'
    },
    requiredAgents: ['ai-campaign-manager', 'ai-ad-optimizer', 'ai-analytics-specialist'],
    exampleUseCases: [
      'PPC campaign optimization',
      'Multi-channel performance improvement',
      'Budget allocation optimization'
    ]
  }
];

/**
 * Sales Department Templates
 */
export const salesTemplates: LoopTemplate[] = [
  {
    id: 'sales_lead_nurturing_loop',
    name: 'Lead Nurturing Loop',
    description: 'Automated lead nurturing with personalized engagement',
    category: 'automation',
    config: {
      name: 'Lead Nurturing Loop',
      description: 'Intelligent lead nurturing workflow',
      version: '1.0.0',
      goal: {
        primary: 'Convert leads through personalized nurturing',
        successCriteria: [
          {
            id: 'conversion_rate',
            name: 'Lead Conversion Rate',
            description: 'Achieve 25% lead-to-opportunity conversion',
            operator: 'greater_than',
            targetPath: 'lead_conversion_rate',
            targetValue: 25
          },
          {
            id: 'engagement_score',
            name: 'Engagement Score',
            description: 'Maintain average engagement score above 70',
            operator: 'greater_than',
            targetPath: 'avg_engagement_score',
            targetValue: 70
          }
        ],
        maxIterations: 50
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'event_based',
        retryPolicy: {
          maxRetries: 5,
          backoffStrategy: 'linear',
          initialDelay: 600
        },
        concurrency: 5,
        priority: 'high'
      },
      integration: {
        departmentId: 'sales-revenue',
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['lead', 'nurturing', 'sales'],
        category: 'sales'
      }
    },
    defaultSettings: {
      triggerType: 'event_based',
      retryPolicy: {
        maxRetries: 5,
        backoffStrategy: 'linear',
        initialDelay: 600
      },
      concurrency: 5,
      priority: 'high'
    },
    requiredAgents: ['ai-lead-development-rep', 'ai-email-specialist', 'ai-crm-manager'],
    exampleUseCases: [
      'Automated lead nurturing',
      'Personalized follow-up sequences',
      'Lead scoring and qualification'
    ]
  },
  {
    id: 'sales_pipeline_optimization',
    name: 'Sales Pipeline Optimization',
    description: 'Continuous pipeline analysis and optimization',
    category: 'optimization',
    config: {
      name: 'Sales Pipeline Optimization',
      description: 'Pipeline performance improvement cycle',
      version: '1.0.0',
      goal: {
        primary: 'Optimize sales pipeline velocity and conversion',
        successCriteria: [
          {
            id: 'pipeline_velocity',
            name: 'Pipeline Velocity',
            description: 'Reduce average sales cycle by 20%',
            operator: 'less_than',
            targetPath: 'avg_sales_cycle_days',
            targetValue: 80
          },
          {
            id: 'stage_conversion',
            name: 'Stage Conversion Rate',
            description: 'Improve stage-to-stage conversion by 15%',
            operator: 'greater_than',
            targetPath: 'stage_conversion_improvement',
            targetValue: 15
          }
        ],
        maxIterations: 25
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'scheduled',
        schedule: '0 8 * * 1', // Weekly on Monday at 8 AM
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 7200
        },
        concurrency: 1,
        priority: 'medium'
      },
      integration: {
        departmentId: 'sales-revenue',
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['pipeline', 'sales', 'optimization'],
        category: 'sales'
      }
    },
    defaultSettings: {
      triggerType: 'scheduled',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 7200
      },
      concurrency: 1,
      priority: 'medium'
    },
    requiredAgents: ['ai-sales-operations-manager', 'ai-sales-analyst', 'ai-crm-manager'],
    exampleUseCases: [
      'Pipeline bottleneck identification',
      'Sales process optimization',
      'Conversion rate improvement'
    ]
  }
];

/**
 * Customer Experience Templates
 */
export const customerExperienceTemplates: LoopTemplate[] = [
  {
    id: 'cx_feedback_analysis_loop',
    name: 'Customer Feedback Analysis Loop',
    description: 'Continuous customer feedback analysis and improvement',
    category: 'analysis',
    config: {
      name: 'Customer Feedback Analysis Loop',
      description: 'Automated feedback collection and analysis',
      version: '1.0.0',
      goal: {
        primary: 'Improve customer satisfaction through feedback analysis',
        successCriteria: [
          {
            id: 'csat_improvement',
            name: 'CSAT Improvement',
            description: 'Increase CSAT score by 10%',
            operator: 'greater_than',
            targetPath: 'csat_improvement_percentage',
            targetValue: 10
          },
          {
            id: 'response_time',
            name: 'Response Time',
            description: 'Maintain average response time under 2 hours',
            operator: 'less_than',
            targetPath: 'avg_response_time_hours',
            targetValue: 2
          }
        ],
        maxIterations: 40
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'scheduled',
        schedule: '0 */4 * * *', // Every 4 hours
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 900
        },
        concurrency: 2,
        priority: 'high'
      },
      integration: {
        departmentId: 'customer-experience',
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['feedback', 'customer', 'analysis'],
        category: 'customer-experience'
      }
    },
    defaultSettings: {
      triggerType: 'scheduled',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 900
      },
      concurrency: 2,
      priority: 'high'
    },
    requiredAgents: ['ai-customer-success-manager', 'ai-feedback-analyst', 'ai-support-specialist'],
    exampleUseCases: [
      'Real-time feedback monitoring',
      'Sentiment analysis',
      'Customer satisfaction improvement'
    ]
  }
];

/**
 * Operations Templates
 */
export const operationsTemplates: LoopTemplate[] = [
  {
    id: 'ops_process_optimization_loop',
    name: 'Process Optimization Loop',
    description: 'Continuous business process analysis and optimization',
    category: 'optimization',
    config: {
      name: 'Process Optimization Loop',
      description: 'Automated process improvement cycle',
      version: '1.0.0',
      goal: {
        primary: 'Optimize operational efficiency and reduce costs',
        successCriteria: [
          {
            id: 'efficiency_gain',
            name: 'Efficiency Gain',
            description: 'Achieve 20% process efficiency improvement',
            operator: 'greater_than',
            targetPath: 'efficiency_improvement_percentage',
            targetValue: 20
          },
          {
            id: 'cost_reduction',
            name: 'Cost Reduction',
            description: 'Reduce operational costs by 15%',
            operator: 'greater_than',
            targetPath: 'cost_reduction_percentage',
            targetValue: 15
          }
        ],
        maxIterations: 30
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'scheduled',
        schedule: '0 6 * * 1', // Weekly on Monday at 6 AM
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 1800
        },
        concurrency: 1,
        priority: 'medium'
      },
      integration: {
        departmentId: 'operations-management',
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['process', 'operations', 'optimization'],
        category: 'operations'
      }
    },
    defaultSettings: {
      triggerType: 'scheduled',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 1800
      },
      concurrency: 1,
      priority: 'medium'
    },
    requiredAgents: ['ai-operations-manager', 'ai-process-analyst', 'ai-efficiency-specialist'],
    exampleUseCases: [
      'Business process optimization',
      'Workflow automation',
      'Operational cost reduction'
    ]
  }
];

/**
 * Finance Templates
 */
export const financeTemplates: LoopTemplate[] = [
  {
    id: 'finance_anomaly_detection_loop',
    name: 'Financial Anomaly Detection Loop',
    description: 'Continuous financial monitoring and anomaly detection',
    category: 'monitoring',
    config: {
      name: 'Financial Anomaly Detection Loop',
      description: 'Automated financial anomaly detection',
      version: '1.0.0',
      goal: {
        primary: 'Detect and investigate financial anomalies in real-time',
        successCriteria: [
          {
            id: 'detection_accuracy',
            name: 'Detection Accuracy',
            description: 'Maintain 95% anomaly detection accuracy',
            operator: 'greater_than',
            targetPath: 'detection_accuracy_percentage',
            targetValue: 95
          },
          {
            id: 'false_positive_rate',
            name: 'False Positive Rate',
            description: 'Keep false positive rate under 5%',
            operator: 'less_than',
            targetPath: 'false_positive_rate_percentage',
            targetValue: 5
          }
        ],
        maxIterations: 100, // Continuous monitoring
        timeout: 604800 // 7 days
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'scheduled',
        schedule: '*/15 * * * *', // Every 15 minutes
        retryPolicy: {
          maxRetries: 2,
          backoffStrategy: 'linear',
          initialDelay: 300
        },
        concurrency: 3,
        priority: 'critical'
      },
      integration: {
        departmentId: 'finance-accounting',
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['finance', 'anomaly', 'monitoring'],
        category: 'finance'
      }
    },
    defaultSettings: {
      triggerType: 'scheduled',
      retryPolicy: {
        maxRetries: 2,
        backoffStrategy: 'linear',
        initialDelay: 300
      },
      concurrency: 3,
      priority: 'critical'
    },
    requiredAgents: ['ai-financial-analyst', 'ai-fraud-specialist', 'ai-compliance-officer'],
    exampleUseCases: [
      'Real-time fraud detection',
      'Financial anomaly monitoring',
      'Compliance checking'
    ]
  }
];

/**
 * Generic/Universal Templates
 */
export const universalTemplates: LoopTemplate[] = [
  {
    id: 'universal_coordination_loop',
    name: 'Multi-Agent Coordination Loop',
    description: 'Coordinate multiple agents for complex tasks',
    category: 'coordination',
    config: {
      name: 'Multi-Agent Coordination Loop',
      description: 'Generic agent coordination workflow',
      version: '1.0.0',
      goal: {
        primary: 'Coordinate multiple agents to achieve complex objectives',
        successCriteria: [
          {
            id: 'task_completion',
            name: 'Task Completion',
            description: 'Complete all assigned tasks',
            operator: 'equals',
            targetPath: 'tasks_completed_count',
            targetValue: 'total_tasks_count'
          }
        ],
        maxIterations: 10
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 1000
        },
        concurrency: 3,
        priority: 'medium'
      },
      integration: {
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['coordination', 'universal', 'multi-agent'],
        category: 'universal'
      }
    },
    defaultSettings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 1000
      },
      concurrency: 3,
      priority: 'medium'
    },
    requiredAgents: [],
    exampleUseCases: [
      'Cross-department coordination',
      'Complex task orchestration',
      'Multi-agent problem solving'
    ]
  },
  {
    id: 'universal_optimization_loop',
    name: 'Generic Optimization Loop',
    description: 'Iterative optimization for any measurable outcome',
    category: 'optimization',
    config: {
      name: 'Generic Optimization Loop',
      description: 'Universal optimization framework',
      version: '1.0.0',
      goal: {
        primary: 'Optimize specified metrics through iterative improvement',
        successCriteria: [
          {
            id: 'improvement_threshold',
            name: 'Improvement Threshold',
            description: 'Achieve specified improvement target',
            operator: 'greater_than',
            targetPath: 'improvement_percentage',
            targetValue: 10
          }
        ],
        maxIterations: 50
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 5,
          backoffStrategy: 'exponential',
          initialDelay: 2000
        },
        concurrency: 1,
        priority: 'high'
      },
      integration: {
        relatedAgents: []
      },
      metadata: {
        createdBy: 'system',
        createdAt: new Date(),
        tags: ['optimization', 'universal', 'iterative'],
        category: 'universal'
      }
    },
    defaultSettings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 5,
        backoffStrategy: 'exponential',
        initialDelay: 2000
      },
      concurrency: 1,
      priority: 'high'
    },
    requiredAgents: [],
    exampleUseCases: [
      'Performance optimization',
      'Quality improvement',
      'Cost reduction'
    ]
  }
];

/**
 * Get all templates
 */
export function getAllTemplates(): LoopTemplate[] {
  return [
    ...marketingTemplates,
    ...salesTemplates,
    ...customerExperienceTemplates,
    ...operationsTemplates,
    ...financeTemplates,
    ...universalTemplates
  ];
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): LoopTemplate[] {
  return getAllTemplates().filter(t => t.category === category);
}

/**
 * Get templates by department
 */
export function getTemplatesByDepartment(departmentId: string): LoopTemplate[] {
  return getAllTemplates().filter(t => 
    t.config.integration?.departmentId === departmentId
  );
}

/**
 * Get template by ID
 */
export function getTemplateById(templateId: string): LoopTemplate | undefined {
  return getAllTemplates().find(t => t.id === templateId);
}