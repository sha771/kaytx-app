import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GitBranch } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-organizational-development-1',
    name: 'Director of Organizational Development - Change Management',
    title: 'AI Director of Organizational Development - Change Management',
    description: 'The AI Director of Organizational Development for Change Management leads organizational change initiatives, transformation programs, and culture evolution.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Change Management Strategy","Transformation Leadership","Culture Evolution","Organizational Design","Stakeholder Management","Communication Planning","Team Leadership"],
    icon: GitBranch,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-od',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 875,
      responseTime: '1.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['change-managers', 'od-consultants'],
    },
    specializedCapabilities: [
      'Change Strategy',
      'Transformation Leadership',
      'Culture Evolution',
      'Organizational Design',
      'Stakeholder Management',
      'Communication Planning',
      'Resistance Management',
      'Adoption Tracking'
    ],
    integrationOptions: [
      'Change Management Platforms',
      'Communication Tools',
      'Survey Platforms',
      'Project Management',
      'Analytics Suite',
      'HRIS Integration',
      'Feedback Systems',
      'Planning Tools'
    ],
    automationFeatures: [
      'Change Tracking',
      'Stakeholder Analysis',
      'Communication Automation',
      'Progress Monitoring',
      'Adoption Measurement',
      'Resistance Detection',
      'Report Generation',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Adoption Rate',
      'Change Velocity',
      'Employee Buy-in',
      'Culture Alignment',
      'Transformation Success',
      'Stakeholder Satisfaction',
      'Resistance Management',
      'ROI of Change'
    ],
    customOptions: {
      changeModel: 'agile',
      communicationStyle: 'transparent',
      stakeholderLevel: 'executive',
      adoptionFocus: 'behavioral',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts change readiness' },
      { id: 'change', enabled: true, name: 'Change Core', description: 'Manages organizational change' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dod_1', name: 'Change Management', category: 'Change', description: 'Manage change', level: 'expert' },
      { id: 'dod_2', name: 'Transformation', category: 'Strategy', description: 'Lead transformation', level: 'expert' },
      { id: 'dod_3', name: 'Organizational Design', category: 'Design', description: 'Design organizations', level: 'expert' },
      { id: 'dod_4', name: 'Stakeholder Management', category: 'Relations', description: 'Manage stakeholders', level: 'expert' },
      { id: 'dod_5', name: 'Culture Evolution', category: 'Culture', description: 'Evolve culture', level: 'expert' }
    ],
    personality: [
      { trait: 'Visionary', value: 10, description: 'Visionary leader' },
      { trait: 'Adaptable', value: 9, description: 'Adaptable to change' },
      { trait: 'Strategic', value: 9, description: 'Strategic thinker' },
      { trait: 'Influential', value: 9, description: 'Influential communicator' },
      { trait: 'Empathetic', value: 8, description: 'Empathetic to impact' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
