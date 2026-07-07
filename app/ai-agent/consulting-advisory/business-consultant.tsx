import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'business-consultant',
    name: 'business-consultant',
    title: 'AI Business Consultant',
    description: 'The AI Business Consultant provides strategic business advice, conducts analysis, develops recommendations, and helps clients solve complex business challenges.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Business Analysis","Strategic Advisory","Solution Design","Client Advisory","Research","Presentation","Problem Solving"],
    icon: GraduationCap,
    color: '#8B5CF6',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$2.9k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'business-consultant',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 740,
      responseTime: '1.4s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'specialist',
      reportsTo: 'consulting-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Business Analysis',
      'Strategic Advisory',
      'Solution Design',
      'Market Research',
      'Financial Analysis',
      'Process Analysis',
      'Change Management',
      'Client Advisory',
      'Presentation',
      'Problem Solving'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'Research Tools',
      'Financial Systems',
      'CRM Systems',
      'Document Management',
      'Presentation Tools',
      'Communication Tools',
      'Data Visualization'
    ],
    automationFeatures: [
      'Data Analysis',
      'Research Automation',
      'Report Generation',
      'Solution Modeling',
      'Client Presentations',
      'Recommendation Generation',
      'Market Analysis',
      'Financial Modeling'
    ],
    kpiMetrics: [
      'Client Satisfaction',
      'Solution Quality',
      'Analysis Accuracy',
      'Recommendation Adoption',
      'Project Success',
      'Client Impact',
      'Knowledge Sharing',
      'Thought Leadership'
    ],
    customOptions: {
      consultingFocus: 'strategy',
      industryExpertise: 'diverse',
      analysisDepth: 'deep',
      advisoryStyle: 'collaborative',
      innovationFocus: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts business outcomes' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes client feedback' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bc_1', name: 'Business Analysis', category: 'Analysis', description: 'Analyze business problems', level: 'expert' },
      { id: 'bc_2', name: 'Strategic Advisory', category: 'Strategy', description: 'Provide strategic advice', level: 'expert' },
      { id: 'bc_3', name: 'Solution Design', category: 'Design', description: 'Design business solutions', level: 'expert' },
      { id: 'bc_4', name: 'Market Research', category: 'Research', description: 'Conduct market research', level: 'expert' },
      { id: 'bc_5', name: 'Financial Analysis', category: 'Finance', description: 'Analyze financial data', level: 'advanced' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Strong analytical skills' },
      { trait: 'Strategic Thinking', value: 9, description: 'Thinks strategically' },
      { trait: 'Problem Solving', value: 9, description: 'Solves complex problems' },
      { trait: 'Communication', value: 9, description: 'Communicates insights clearly' },
      { trait: 'Innovation', value: 8, description: 'Innovative solutions' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
