import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-project-2',
    name: 'Director of HR Projects - Program Management',
    title: 'AI Director of HR Projects - Program Management',
    description: 'The AI Director of HR Projects for Program Management oversees HR program portfolios, cross-functional initiatives, and strategic program delivery.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Program Management","Portfolio Oversight','Cross-functional Coordination','Strategic Alignment','Resource Optimization','Program Governance','Team Leadership"],
    icon: Briefcase,
    color: '#673AB7',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-hr-projects',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 885,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['program-managers', 'coordinators'],
    },
    specializedCapabilities: [
      'Program Management',
      'Portfolio Oversight',
      'Cross-functional Coordination',
      'Strategic Alignment',
      'Resource Optimization',
      'Program Governance',
      'Dependency Management',
      'Value Realization'
    ],
    integrationOptions: [
      'Program Management Tools',
      'Portfolio Platforms',
      'Resource Systems',
      'Analytics Suite',
      'Communication Tools',
      'Governance Platforms',
      'Reporting Systems',
      'Strategic Planning'
    ],
    automationFeatures: [
      'Program Tracking',
      'Portfolio Monitoring',
      'Resource Allocation',
      'Dependency Mapping',
      'Value Tracking',
      'Governance Automation',
      'Report Generation',
      'Strategic Insights'
    ],
    kpiMetrics: [
      'Program Success',
      'Portfolio Health',
      'Resource Efficiency',
      'Strategic Alignment',
      'Value Realization',
      'Dependency Management',
      'Stakeholder Satisfaction',
      'Program ROI'
    ],
    customOptions: {
      programMethodology: 'agile',
      portfolioScope: 'enterprise',
      alignmentFocus: 'strategic',
      governanceLevel: 'mature',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts program outcomes' },
      { id: 'program', enabled: true, name: 'Program Core', description: 'Manages HR programs' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhp_1', name: 'Program Management', category: 'Management', description: 'Manage programs', level: 'expert' },
      { id: 'dhp_2', name: 'Portfolio Oversight', category: 'Management', description: 'Oversee portfolio', level: 'expert' },
      { id: 'dhp_3', name: 'Cross-functional Coordination', category: 'Coordination', description: 'Coordinate cross-functional', level: 'expert' },
      { id: 'dhp_4', name: 'Strategic Alignment', category: 'Strategy', description: 'Align with strategy', level: 'expert' },
      { id: 'dhp_5', name: 'Resource Optimization', category: 'Optimization', description: 'Optimize resources', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic', value: 10, description: 'Strategic thinker' },
      { trait: 'Organized', value: 9, description: 'Highly organized' },
      { trait: 'Collaborative', value: 9, description: 'Collaborates across functions' },
      { trait: 'Results-driven', value: 9, description: 'Driven by results' },
      { trait: 'Governance-focused', value: 8, description: 'Focuses on governance' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
