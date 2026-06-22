import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function SafetyManagerPage() {
  const agent = {
    id: 'safety-manager',
    name: 'AI Safety Manager',
    title: 'AI Safety Manager',
    description: 'The AI Safety Manager oversees safety programs, incident prevention, and safety training across energy operations.',
    capabilities: ["Task Automation","Data Processing","Safety Management","Incident Prevention","Safety Training","Inspection Coordination","Emergency Planning","Risk Assessment"],
    icon: Shield,
    color: '#D32F2F',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.4k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'safety-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,700',
      tasksAutomatedDaily: 600,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Energy & Utilities',
      level: 'manager',
      reportsTo: 'vp-regulatory-compliance',
      manages: ['safety-inspector', 'training-coordinator', 'emergency-planner'],
    },
    specializedCapabilities: [
      'Safety Management',
      'Incident Prevention',
      'Safety Training',
      'Inspection Coordination',
      'Emergency Planning',
      'Risk Assessment',
      'Safety Analytics',
      'Compliance Monitoring'
    ],
    integrationOptions: [
      'Safety Management Systems',
      'Training Platforms',
      'Inspection Tools',
      'Emergency Systems',
      'Risk Assessment',
      'Analytics Platforms',
      'Compliance Systems'
    ],
    automationFeatures: [
      'Safety Monitoring',
      'Incident Prevention',
      'Training Coordination',
      'Inspection Management',
      'Emergency Planning',
      'Risk Assessment',
      'Safety Analytics',
      'Compliance Monitoring'
    ],
    kpiMetrics: [
      'Safety Incidents',
      'Training Completion',
      'Inspection Compliance',
      'Emergency Readiness',
      'Risk Mitigation',
      'Safety Culture',
      'Compliance Rate',
      'Prevention Success'
    ],
    customOptions: {
      safetyPriority: 'critical',
      trainingMandatory: 'true',
      inspectionFrequency: 'regular',
      emergencyReadiness: 'always',
      riskTolerance: 'zero'
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
      { id: 'risk', enabled: true, name: 'Risk Assessor', description: 'Assesses safety risks' },
      { id: 'predictive', enabled: true, name: 'Incident Predictor', description: 'Predicts safety incidents' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'safe_1', name: 'Safety Management', category: 'Safety', description: 'Manage safety programs', level: 'expert' },
      { id: 'safe_2', name: 'Incident Prevention', category: 'Prevention', description: 'Prevent incidents', level: 'expert' },
      { id: 'safe_3', name: 'Safety Training', category: 'Training', description: 'Manage safety training', level: 'expert' },
      { id: 'safe_4', name: 'Emergency Planning', category: 'Emergency', description: 'Plan for emergencies', level: 'expert' },
      { id: 'safe_5', name: 'Risk Assessment', category: 'Risk', description: 'Assess safety risks', level: 'expert' }
    ],
    personality: [
      { trait: 'Safety Focus', value: 10, description: 'Uncompromising on safety' },
      { trait: 'Vigilance', value: 10, description: 'Constantly vigilant' },
      { trait: 'Leadership', value: 9, description: 'Strong safety leadership' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' },
      { trait: 'Integrity', value: 10, description: 'High ethical standards' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
