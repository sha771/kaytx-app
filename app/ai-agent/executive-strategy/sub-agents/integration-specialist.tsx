import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Merge } from 'lucide-react-native';

export default function IntegrationSpecialistPage() {
  const agent = {
    id: 'integration-specialist',
    name: 'AI Integration Specialist',
    title: 'AI Integration Specialist',
    description: 'The AI Integration Specialist plans post-merger integration, manages integration activities, and ensures integration success.',
    capabilities: ["Task Automation","Data Processing","Integration Planning","Integration Management","Change Management","Cultural Integration","Synergy Realization","Performance Tracking"],
    icon: Merge,
    color: '#00B0FF',
    type: 'employee' as const,
    humanCost: '$120k/year',
    aiCost: '$3k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'integration-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,700',
      tasksAutomatedDaily: 730,
      responseTime: '1.2s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Executive & Strategy',
      level: 'specialist',
      reportsTo: 'vp-mergers-acquisitions',
      manages: [],
    },
    specializedCapabilities: [
      'Integration Planning',
      'Integration Management',
      'Change Management',
      'Cultural Integration',
      'Synergy Realization',
      'Performance Tracking',
      'Stakeholder Management',
      'Risk Mitigation'
    ],
    integrationOptions: [
      'Integration Platforms',
      'Change Management',
      'Project Management',
      'Cultural Assessment',
      'Synergy Tracking',
      'Performance Systems',
      'Risk Management'
    ],
    automationFeatures: [
      'Integration Planning',
      'Integration Management',
      'Change Management',
      'Cultural Integration',
      'Synergy Tracking',
      'Performance Monitoring',
      'Stakeholder Communication',
      'Risk Mitigation'
    ],
    kpiMetrics: [
      'Integration Success',
      'Synergy Realization',
      'Change Adoption',
      'Cultural Integration',
      'Performance Metrics',
      'Stakeholder Satisfaction',
      'Risk Mitigation',
      'Integration Speed'
    ],
    customOptions: {
      integrationApproach: 'structured',
      changeManagementStyle: 'participative',
      culturalFocus: 'high',
      synergyPriority: 'high',
      stakeholderEngagement: 'proactive'
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
      { id: 'predictive', enabled: true, name: 'Integration Predictor', description: 'Predicts integration success' },
      { id: 'synergy', enabled: true, name: 'Synergy Tracker', description: 'Tracks synergy realization' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'is_1', name: 'Integration Planning', category: 'Integration', description: 'Plan integrations', level: 'expert' },
      { id: 'is_2', name: 'Integration Management', category: 'Management', description: 'Manage integrations', level: 'expert' },
      { id: 'is_3', name: 'Change Management', category: 'Change', description: 'Manage change', level: 'expert' },
      { id: 'is_4', name: 'Cultural Integration', category: 'Culture', description: 'Integrate cultures', level: 'expert' },
      { id: 'is_5', name: 'Synergy Realization', category: 'Synergy', description: 'Realize synergies', level: 'expert' }
    ],
    personality: [
      { trait: 'Change Management', value: 10, description: 'Skilled change manager' },
      { trait: 'Cultural Sensitivity', value: 10, description: 'Culturally aware' },
      { trait: 'Leadership', value: 9, description: 'Strong leader' },
      { trait: 'Communication', value: 10, description: 'Excellent communicator' },
      { trait: 'Problem Solving', value: 9, description: 'Strong problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
