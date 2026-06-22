import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileCheck } from 'lucide-react-native';

export default function ComplianceOfficerPage() {
  const agent = {
    id: 'compliance-officer',
    name: 'AI Compliance Officer',
    title: 'AI Compliance Officer',
    description: 'The AI Compliance Officer ensures banking operations comply with all regulatory requirements, monitors compliance, conducts audits, and implements compliance programs.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Regulatory Compliance","Audit Management","Policy Enforcement","Risk Assessment","Training","Reporting","Documentation"],
    icon: FileCheck,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '42x efficiency improvement',
    replacesRole: 'compliance-officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 460,
      responseTime: '1.9s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'team_lead',
      reportsTo: 'vp-risk-management',
      manages: ['kyc-specialist', 'aml-analyst', 'regulatory-reporter'],
    },
    specializedCapabilities: [
      'Regulatory Compliance',
      'Audit Management',
      'Policy Development',
      'Risk Assessment',
      'Training Programs',
      'Monitoring',
      'Reporting',
      'Documentation'
    ],
    integrationOptions: [
      'Compliance Management Systems',
      'Regulatory Platforms',
      'Audit Tools',
      'Training Platforms',
      'Document Management',
      'Reporting Systems',
      'Monitoring Tools',
      'Risk Management Systems'
    ],
    automationFeatures: [
      'Compliance Monitoring',
      'Audit Scheduling',
      'Policy Enforcement',
      'Training Management',
      'Report Generation',
      'Alert Management',
      'Documentation',
      'Risk Assessment'
    ],
    kpiMetrics: [
      'Compliance Rate',
      'Audit Findings',
      'Regulatory Penalties',
      'Training Completion',
      'Policy Adherence',
      'Risk Coverage',
      'Report Timeliness',
      'Process Efficiency'
    ],
    customOptions: {
      complianceLevel: 'strict',
      monitoringFrequency: 'continuous',
      reportingLevel: 'detailed',
      trainingFocus: 'comprehensive',
      riskTolerance: 'conservative'
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
      { id: 'compliance', enabled: true, name: 'Compliance Monitor', description: 'Continuous compliance monitoring' },
      { id: 'risk', enabled: true, name: 'Risk Analyzer', description: 'Identifies compliance risks' },
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Predicts compliance issues' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'comp_1', name: 'Regulatory Compliance', category: 'Compliance', description: 'Ensure regulatory compliance', level: 'expert' },
      { id: 'comp_2', name: 'Audit Management', category: 'Audit', description: 'Manage compliance audits', level: 'expert' },
      { id: 'comp_3', name: 'Policy Development', category: 'Policy', description: 'Develop compliance policies', level: 'expert' },
      { id: 'comp_4', name: 'Risk Assessment', category: 'Risk', description: 'Assess compliance risks', level: 'advanced' },
      { id: 'comp_5', name: 'Training Programs', category: 'Training', description: 'Develop compliance training', level: 'advanced' }
    ],
    personality: [
      { trait: 'Compliance Focus', value: 10, description: 'Extremely compliance-oriented' },
      { trait: 'Attention to Detail', value: 10, description: 'Meticulous attention to detail' },
      { trait: 'Risk Awareness', value: 10, description: 'Highly risk-conscious' },
      { trait: 'Integrity', value: 10, description: 'Unwavering integrity' },
      { trait: 'Analytical Thinking', value: 9, description: 'Strong analytical capabilities' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
