import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scale } from 'lucide-react-native';

export default function EntertainmentLegalDirectorPage() {
  const agent = {
    id: 'entertainment-legal-director',
    name: 'AI Entertainment Legal Director',
    title: 'AI Entertainment Legal Director',
    description: 'The AI Entertainment Legal Director manages legal affairs for media and entertainment, handles content rights, oversees contracts and compliance, and protects intellectual property across all entertainment verticals.',
    capabilities: ["Entertainment Law","Content Rights","Contract Management","IP Protection","Compliance Management","Legal Strategy","Risk Management","Regulatory Affairs","Litigation Support","Copyright Management"],
    icon: Scale,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$5k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'entertainment-legal-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14,500',
      tasksAutomatedDaily: 380,
      responseTime: '1.3s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Media & Entertainment',
      level: 'director',
      reportsTo: 'cmeo',
      manages: ['ip-lawyer', 'contract-manager', 'compliance-officer'],
    },
    specializedCapabilities: [
      'Entertainment Law',
      'Content Rights',
      'Contract Management',
      'IP Protection',
      'Compliance Management',
      'Legal Strategy',
      'Risk Management',
      'Regulatory Affairs'
    ],
    integrationOptions: [
      'Legal Management',
      'Contract Systems',
      'IP Management',
      'Compliance Tools',
      'Risk Assessment',
      'Regulatory Platforms',
      'Litigation Support',
      'Copyright Systems'
    ],
    automationFeatures: [
      'Legal Management',
      'Contract Review',
      'IP Protection',
      'Compliance Monitoring',
      'Risk Assessment',
      'Regulatory Compliance',
      'Copyright Management',
      'Legal Strategy'
    ],
    kpiMetrics: [
      'Legal Risk Reduction',
      'Contract Efficiency',
      'IP Protection Success',
      'Compliance Rate',
      'Legal Cost Savings',
      'Risk Mitigation',
      'Regulatory Compliance',
      'Litigation Avoidance'
    ],
    customOptions: {
      legalStrategy: 'proactive',
      riskTolerance: 'low',
      complianceLevel: 'strict',
      ipProtection: 'comprehensive',
      contractEfficiency: 'optimized'
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
      { id: 'legal', enabled: true, name: 'Legal Analyzer', description: 'Analyzes legal risks' },
      { id: 'contract', enabled: true, name: 'Contract Reviewer', description: 'Reviews and optimizes contracts' },
      { id: 'ip', enabled: true, name: 'IP Protector', description: 'Protects intellectual property' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'legal_1', name: 'Entertainment Law', category: 'Legal', description: 'Expert in entertainment law', level: 'expert' },
      { id: 'legal_2', name: 'Content Rights', category: 'Rights', description: 'Manage content rights', level: 'expert' },
      { id: 'legal_3', name: 'Contract Management', category: 'Contracts', description: 'Manage contracts', level: 'expert' },
      { id: 'legal_4', name: 'IP Protection', category: 'IP', description: 'Protect intellectual property', level: 'expert' },
      { id: 'legal_5', name: 'Compliance', category: 'Compliance', description: 'Ensure compliance', level: 'expert' }
    ],
    personality: [
      { trait: 'Legal Expertise', value: 10, description: 'Expert legal knowledge' },
      { trait: 'Risk Awareness', value: 10, description: 'Highly risk-aware' },
      { trait: 'Detail Orientation', value: 10, description: 'Extremely detail-oriented' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic legal approach' },
      { trait: 'Compliance Focus', value: 10, description: 'Compliance-focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}