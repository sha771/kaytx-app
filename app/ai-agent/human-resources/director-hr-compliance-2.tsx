import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-compliance-2',
    name: 'Director of HR Compliance - Internal Controls',
    title: 'AI Director of HR Compliance - Internal Controls',
    description: 'The AI Director of HR Compliance for Internal Controls manages internal control frameworks, policy compliance, and governance standards.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Internal Controls','Policy Compliance','Governance Standards','Control Testing','SOX Compliance','Process Controls','Team Leadership"],
    icon: Shield,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-compliance',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 880,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['control-analysts', 'governance-specialists'],
    },
    specializedCapabilities: [
      'Internal Controls',
      'Policy Compliance',
      'Governance Standards',
      'Control Testing',
      'SOX Compliance',
      'Process Controls',
      'Control Frameworks',
      'Governance Reporting'
    ],
    integrationOptions: [
      'Control Platforms',
      'Governance Systems',
      'Policy Management',
      'SOX Tools',
      'Testing Systems',
      'Risk Management',
      'Reporting Tools',
      'Audit Platforms'
    ],
    automationFeatures: [
      'Control Testing',
      'Policy Monitoring',
      'Compliance Checking',
      'SOX Testing',
      'Control Reporting',
      'Governance Tracking',
      'Risk Monitoring',
      'Alert Systems'
    ],
    kpiMetrics: [
      'Control Effectiveness',
      'Policy Adherence',
      'SOX Compliance',
      'Test Coverage',
      'Control Deficiencies',
      'Governance Score',
      'Process Compliance',
      'Audit Readiness'
    ],
    customOptions: {
      controlFramework: 'coso',
      complianceLevel: 'strict',
      testingFrequency: 'continuous',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts control risks' },
      { id: 'controls', enabled: true, name: 'Controls Core', description: 'Manages internal controls' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhc_1', name: 'Internal Controls', category: 'Controls', description: 'Manage internal controls', level: 'expert' },
      { id: 'dhc_2', name: 'Policy Compliance', category: 'Compliance', description: 'Ensure policy compliance', level: 'expert' },
      { id: 'dhc_3', name: 'Governance Standards', category: 'Governance', description: 'Maintain governance', level: 'expert' },
      { id: 'dhc_4', name: 'Control Testing', category: 'Testing', description: 'Test controls', level: 'expert' },
      { id: 'dhc_5', name: 'SOX Compliance', category: 'Compliance', description: 'Ensure SOX compliance', level: 'expert' }
    ],
    personality: [
      { trait: 'Control-oriented', value: 10, description: 'Focuses on controls' },
      { trait: 'Detail-oriented', value: 9, description: 'Attention to detail' },
      { trait: 'Governance-focused', value: 9, description: 'Focuses on governance' },
      { trait: 'Compliance-driven', value: 9, description: 'Driven by compliance' },
      { trait: 'Analytical', value: 8, description: 'Analytical thinker' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
