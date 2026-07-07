import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-project-1',
    name: 'Director of HR Projects - Transformation',
    title: 'AI Director of HR Projects - Transformation',
    description: 'The AI Director of HR Projects for Transformation manages large-scale HR transformation initiatives, system implementations, and organizational change projects.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Project Management","Transformation Leadership","System Implementation','Change Management','Stakeholder Coordination','Portfolio Management','Team Leadership"],
    icon: Briefcase,
    color: '#673AB7',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-hr-projects',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 900,
      responseTime: '1.4s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['project-managers', 'transformation-specialists'],
    },
    specializedCapabilities: [
      'Project Management',
      'Transformation Leadership',
      'System Implementation',
      'Change Management',
      'Stakeholder Coordination',
      'Portfolio Management',
      'Risk Management',
      'Program Governance'
    ],
    integrationOptions: [
      'Project Management Platforms',
      'Implementation Tools',
      'Change Management Systems',
      'Stakeholder Platforms',
      'Risk Management Tools',
      'Analytics Suite',
      'Communication Tools',
      'Reporting Systems'
    ],
    automationFeatures: [
      'Project Tracking',
      'Milestone Monitoring',
      'Risk Assessment',
      'Stakeholder Updates',
      'Resource Allocation',
      'Progress Reporting',
      'Issue Management',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Project Success Rate',
      'On-time Delivery',
      'Budget Variance',
      'Transformation Adoption',
      'Stakeholder Satisfaction',
      'Risk Mitigation',
      'Resource Utilization',
      'Program ROI'
    ],
    customOptions: {
      projectMethodology: 'agile-hybrid',
      transformationScale: 'enterprise',
      stakeholderLevel: 'executive',
      riskTolerance: 'managed',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts project risks' },
      { id: 'project', enabled: true, name: 'Project Core', description: 'Manages HR projects' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhp_1', name: 'Project Management', category: 'Management', description: 'Manage projects', level: 'expert' },
      { id: 'dhp_2', name: 'Transformation Leadership', category: 'Leadership', description: 'Lead transformation', level: 'expert' },
      { id: 'dhp_3', name: 'System Implementation', category: 'Technology', description: 'Implement systems', level: 'expert' },
      { id: 'dhp_4', name: 'Change Management', category: 'Change', description: 'Manage change', level: 'expert' },
      { id: 'dhp_5', name: 'Stakeholder Coordination', category: 'Relations', description: 'Coordinate stakeholders', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic', value: 10, description: 'Strategic project leader' },
      { trait: 'Results-driven', value: 9, description: 'Driven by results' },
      { trait: 'Organized', value: 9, description: 'Highly organized' },
      { trait: 'Influential', value: 9, description: 'Influential communicator' },
      { trait: 'Adaptable', value: 8, description: 'Adaptable to changes' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
