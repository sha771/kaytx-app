import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { RefreshCw } from 'lucide-react-native';

export default function ChangeManagementLeadPage() {
  const agent = {
    id: 'change-management-lead',
    name: 'AI Change Management Lead',
    title: 'AI Change Management Lead',
    description: 'The AI Change Management Lead leads organizational change initiatives, manages change programs, and ensures successful change adoption.',
    capabilities: ["Task Automation","Data Processing","Change Management","Program Leadership","Change Adoption","Stakeholder Management","Communication","Training Coordination"],
    icon: RefreshCw,
    color: '#448AFF',
    type: 'employee' as const,
    humanCost: '$135k/year',
    aiCost: '$3.4k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'change-management-lead',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10,900',
      tasksAutomatedDaily: 810,
      responseTime: '1.1s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Executive & Strategy',
      level: 'lead',
      reportsTo: 'vp-corporate-strategy',
      manages: ['change-specialist', 'training-coordinator', 'adoption-manager'],
    },
    specializedCapabilities: [
      'Change Management',
      'Program Leadership',
      'Change Adoption',
      'Stakeholder Management',
      'Communication',
      'Training Coordination',
      'Resistance Management',
      'Change Analytics'
    ],
    integrationOptions: [
      'Change Management',
      'Program Management',
      'Stakeholder Systems',
      'Communication Platforms',
      'Training Systems',
      'Analytics Platforms',
      'Adoption Tracking'
    ],
    automationFeatures: [
      'Change Management',
      'Program Leadership',
      'Change Adoption',
      'Stakeholder Management',
      'Communication',
      'Training Coordination',
      'Resistance Management',
      'Change Analytics'
    ],
    kpiMetrics: [
      'Change Success',
      'Adoption Rate',
      'Stakeholder Engagement',
      'Communication Effectiveness',
      'Training Completion',
      'Resistance Management',
      'Program Completion',
      'Change ROI'
    ],
    customOptions: {
      changeApproach: 'participative',
      adoptionStrategy: 'user-centric',
      stakeholderEngagement: 'proactive',
      communicationStyle: 'transparent',
      trainingMethod: 'blended'
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
      { id: 'predictive', enabled: true, name: 'Adoption Predictor', description: 'Predicts change adoption' },
      { id: 'resistance', enabled: true, name: 'Resistance Detector', description: 'Detects change resistance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cml_1', name: 'Change Management', category: 'Change', description: 'Manage change', level: 'expert' },
      { id: 'cml_2', name: 'Program Leadership', category: 'Leadership', description: 'Lead programs', level: 'expert' },
      { id: 'cml_3', name: 'Change Adoption', category: 'Adoption', description: 'Drive adoption', level: 'expert' },
      { id: 'cml_4', name: 'Stakeholder Management', category: 'Stakeholders', description: 'Manage stakeholders', level: 'expert' },
      { id: 'cml_5', name: 'Communication', category: 'Communication', description: 'Communicate change', level: 'expert' }
    ],
    personality: [
      { trait: 'Change Management', value: 10, description: 'Skilled change manager' },
      { trait: 'Leadership', value: 10, description: 'Strong leader' },
      { trait: 'Communication', value: 10, description: 'Excellent communicator' },
      { trait: 'Empathy', value: 9, description: 'Empathetic approach' },
      { trait: 'Resilience', value: 9, description: 'Resilient leader' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
