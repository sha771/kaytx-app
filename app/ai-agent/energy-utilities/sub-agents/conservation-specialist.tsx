import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Leaf } from 'lucide-react-native';

export default function ConservationSpecialistPage() {
  const agent = {
    id: 'conservation-specialist',
    name: 'AI Conservation Specialist',
    title: 'AI Conservation Specialist',
    description: 'The AI Conservation Specialist develops conservation programs, promotes energy saving behaviors, and tracks conservation metrics.',
    capabilities: ["Task Automation","Data Processing","Conservation Programs","Behavior Change","Education","Tracking","Outreach","Analytics"],
    icon: Leaf,
    color: '#33691E',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'conservation-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 540,
      responseTime: '1.6s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Energy & Utilities',
      level: 'specialist',
      reportsTo: 'vp-energy-efficiency',
      manages: [],
    },
    specializedCapabilities: [
      'Conservation Programs',
      'Behavior Change',
      'Education',
      'Tracking',
      'Outreach',
      'Analytics',
      'Program Design',
      'Impact Assessment'
    ],
    integrationOptions: [
      'Program Management',
      'Education Platforms',
      'Analytics Tools',
      'Communication Systems',
      'Tracking Systems',
      'Outreach Tools',
      'Assessment Platforms'
    ],
    automationFeatures: [
      'Program Management',
      'Education Delivery',
      'Behavior Tracking',
      'Outreach Coordination',
      'Analytics Processing',
      'Impact Assessment',
      'Program Design',
      'Conservation Tracking'
    ],
    kpiMetrics: [
      'Program Participation',
      'Energy Savings',
      'Behavior Change',
      'Education Reach',
      'Conservation Impact',
      'Program ROI',
      'Customer Engagement',
      'Sustainability Metrics'
    ],
    customOptions: {
      programFocus: 'behavioral',
      educationMethod: 'engaging',
      outreachStrategy: 'comprehensive',
      trackingDetail: 'detailed',
      impactMeasurement: 'quantitative'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'behavior', enabled: true, name: 'Behavior Analyzer', description: 'Analyzes conservation behavior' },
      { id: 'predictive', enabled: true, name: 'Impact Predictor', description: 'Predicts conservation impact' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cons_1', name: 'Conservation Programs', category: 'Programs', description: 'Design conservation programs', level: 'expert' },
      { id: 'cons_2', name: 'Behavior Change', category: 'Behavior', description: 'Drive behavior change', level: 'expert' },
      { id: 'cons_3', name: 'Education', category: 'Education', description: 'Provide education', level: 'expert' },
      { id: 'cons_4', name: 'Outreach', category: 'Outreach', description: 'Conduct outreach', level: 'expert' },
      { id: 'cons_5', name: 'Impact Assessment', category: 'Assessment', description: 'Assess impact', level: 'advanced' }
    ],
    personality: [
      { trait: 'Sustainability Focus', value: 10, description: 'Committed to conservation' },
      { trait: 'Education', value: 9, description: 'Passionate educator' },
      { trait: 'Communication', value: 10, description: 'Excellent communicator' },
      { trait: 'Creativity', value: 9, description: 'Creative program designer' },
      { trait: 'Empathy', value: 9, description: 'Empathetic to customers' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
