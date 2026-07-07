import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-learning-development-3',
    name: 'Director of Learning & Development - Compliance & Professional',
    title: 'AI Director of Learning & Development - Compliance & Professional',
    description: 'The AI Director of Learning & Development for Compliance & Professional oversees compliance training, professional development, and mandatory certification programs.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Compliance Training Strategy","Professional Development","Mandatory Training","Compliance Tracking","Program Governance","Audit Readiness","Team Leadership"],
    icon: GraduationCap,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$160k/year',
    aiCost: '$3.5k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'director-learning',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 860,
      responseTime: '1.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-learning',
      manages: ['compliance-trainers', 'professional-development-team'],
    },
    specializedCapabilities: [
      'Compliance Training',
      'Professional Development',
      'Mandatory Programs',
      'Compliance Tracking',
      'Audit Management',
      'Program Governance',
      'Risk Assessment',
      'Compliance Analytics'
    ],
    integrationOptions: [
      'Compliance LMS',
      'Regulatory Systems',
      'Audit Platforms',
      'Learning Libraries',
      'Assessment Tools',
      'Compliance Systems',
      'Analytics Suite',
      'Document Management'
    ],
    automationFeatures: [
      'Compliance Assignment',
      'Deadline Tracking',
      'Completion Monitoring',
      'Audit Reporting',
      'Risk Assessment',
      'Reminder Automation',
      'Certificate Management',
      'Compliance Reporting'
    ],
    kpiMetrics: [
      'Compliance Rate',
      'Training Completion',
      'Audit Score',
      'Risk Mitigation',
      'Program Coverage',
      'Completion Timeliness',
      'Compliance Costs',
      'Incident Reduction'
    ],
    customOptions: {
      focus: 'compliance',
      programType: 'mandatory',
      complianceLevel: 'strict',
      auditReady: true,
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts compliance risks' },
      { id: 'compliance', enabled: true, name: 'Compliance Core', description: 'Ensures compliance training' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dld_1', name: 'Compliance Training', category: 'Training', description: 'Train compliance', level: 'expert' },
      { id: 'dld_2', name: 'Professional Development', category: 'Development', description: 'Develop professionals', level: 'expert' },
      { id: 'dld_3', name: 'Compliance Tracking', category: 'Compliance', description: 'Track compliance', level: 'expert' },
      { id: 'dld_4', name: 'Audit Management', category: 'Compliance', description: 'Manage audits', level: 'expert' },
      { id: 'dld_5', name: 'Risk Assessment', category: 'Risk', description: 'Assess compliance risk', level: 'expert' }
    ],
    personality: [
      { trait: 'Compliance-focused', value: 10, description: 'Focuses on compliance' },
      { trait: 'Detail-oriented', value: 9, description: 'Attention to detail' },
      { trait: 'Organized', value: 9, description: 'Organized programs' },
      { trait: 'Risk-aware', value: 9, description: 'Aware of risks' },
      { trait: 'Professional', value: 8, description: 'Professional approach' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
