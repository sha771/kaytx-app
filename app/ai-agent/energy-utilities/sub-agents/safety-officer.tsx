import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function SafetyOfficerPage() {
  const agent = {
    id: 'safety-officer',
    name: 'AI Safety Officer',
    title: 'AI Safety Officer',
    description: 'The AI Safety Officer ensures all safety protocols are followed, conducts safety inspections, and manages safety training programs.',
    capabilities: ["Task Automation","Data Processing","Safety Management","Inspection Coordination","Training Programs","Incident Investigation","Compliance Monitoring","Risk Assessment"],
    icon: Shield,
    color: '#D32F2F',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.2k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'safety-officer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 580,
      responseTime: '1.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Energy & Utilities',
      level: 'officer',
      reportsTo: 'vp-power-generation',
      manages: ['safety-inspector', 'training-coordinator'],
    },
    specializedCapabilities: [
      'Safety Management',
      'Inspection Coordination',
      'Training Programs',
      'Incident Investigation',
      'Compliance Monitoring',
      'Risk Assessment',
      'Safety Analytics',
      'Emergency Planning'
    ],
    integrationOptions: [
      'Safety Management Systems',
      'Inspection Tools',
      'Training Platforms',
      'Incident Reporting',
      'Compliance Systems',
      'Risk Assessment Tools',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Safety Inspections',
      'Training Scheduling',
      'Incident Tracking',
      'Compliance Monitoring',
      'Risk Assessment',
      'Safety Reporting',
      'Emergency Drills',
      'Safety Analytics'
    ],
    kpiMetrics: [
      'Safety Incidents',
      'Inspection Compliance',
      'Training Completion',
      'Incident Response',
      'Risk Mitigation',
      'Compliance Rate',
      'Safety Culture',
      'Emergency Readiness'
    ],
    customOptions: {
      safetyPriority: 'critical',
      inspectionFrequency: 'regular',
      trainingMandatory: 'true',
      riskTolerance: 'zero',
      complianceLevel: 'strict'
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
      { id: 'safety_1', name: 'Safety Management', category: 'Safety', description: 'Manage safety programs', level: 'expert' },
      { id: 'safety_2', name: 'Inspection', category: 'Inspection', description: 'Conduct safety inspections', level: 'expert' },
      { id: 'safety_3', name: 'Training', category: 'Training', description: 'Manage safety training', level: 'expert' },
      { id: 'safety_4', name: 'Incident Investigation', category: 'Investigation', description: 'Investigate incidents', level: 'expert' },
      { id: 'safety_5', name: 'Risk Assessment', category: 'Risk', description: 'Assess safety risks', level: 'expert' }
    ],
    personality: [
      { trait: 'Safety Focus', value: 10, description: 'Uncompromising on safety' },
      { trait: 'Vigilance', value: 10, description: 'Constantly vigilant' },
      { trait: 'Integrity', value: 10, description: 'High ethical standards' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' },
      { trait: 'Leadership', value: 9, description: 'Safety leadership' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
