import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldAlert } from 'lucide-react-native';

export default function SafetyOfficerPage() {
  const agent = {
    id: 'safety-officer',
    name: 'AI Safety Officer',
    title: 'AI Safety Officer',
    description: 'The AI Safety Officer manages safety programs, oversees compliance, and ensures safe working conditions across all agricultural operations.',
    capabilities: ["Task Automation","Data Processing","Safety Management","Compliance Oversight","Risk Assessment","Safety Training","Incident Investigation","Safety Audits","Emergency Preparedness","Safety Reporting"],
    icon: ShieldAlert,
    color: '#F44336',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$2.5k/year',
    efficiency: '28x efficiency improvement',
    replacesRole: 'safety-officer',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,625',
      tasksAutomatedDaily: 475,
      responseTime: '2.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'officer',
      reportsTo: 'vp-farm-operations',
      manages: [],
    },
    specializedCapabilities: [
      'Safety Management',
      'Compliance Oversight',
      'Risk Assessment',
      'Safety Training',
      'Incident Investigation',
      'Safety Audits',
      'Emergency Preparedness',
      'Safety Reporting',
      'Hazard Identification',
      'Safety Culture'
    ],
    integrationOptions: [
      'Safety Management Systems',
      'Compliance Platforms',
      'Risk Assessment Tools',
      'Training Systems',
      'Incident Reporting',
      'Audit Software',
      'Emergency Systems',
      'Communication Platforms'
    ],
    automationFeatures: [
      'Risk Assessment',
      'Safety Training',
      'Compliance Monitoring',
      'Incident Investigation',
      'Safety Audits',
      'Emergency Preparedness',
      'Safety Reporting',
      'Hazard Tracking'
    ],
    kpiMetrics: [
      'Safety Record',
      'Compliance Rate',
      'Incident Rate',
      'Training Completion',
      'Audit Results',
      'Risk Mitigation',
      'Emergency Readiness',
      'Safety Culture'
    ],
    customOptions: {
      safetyPriority: 'maximum',
      complianceLevel: 'strict',
      riskTolerance: 'low',
      trainingLevel: 'comprehensive',
      emergencyReadiness: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
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
      { id: 'safety', enabled: true, name: 'Safety Monitor', description: 'Monitors safety conditions' },
      { id: 'risk', enabled: true, name: 'Risk Assessor', description: 'Assesses safety risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'so_1', name: 'Safety Management', category: 'Safety', description: 'Manage safety programs', level: 'expert' },
      { id: 'so_2', name: 'Compliance Oversight', category: 'Compliance', description: 'Ensure safety compliance', level: 'expert' },
      { id: 'so_3', name: 'Risk Assessment', category: 'Risk', description: 'Assess safety risks', level: 'expert' }
    ],
    personality: [
      { trait: 'Safety', value: 10, description: 'Safety-focused' },
      { trait: 'Compliance', value: 10, description: 'Compliance-oriented' },
      { trait: 'Protection', value: 9, description: 'Protection-minded' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
