import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'clo',
    name: 'clo',
    title: 'AI Chief Legal Officer',
    description: 'The AI Chief Legal Officer oversees all legal operations, manages compliance and risk, handles regulatory matters, and ensures legal excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Legal Strategy","Compliance Oversight","Risk Management","Regulatory Affairs","Contract Management","Legal Research","Team Leadership"],
    icon: Truck,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$158k/year',
    aiCost: '$3k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'clo',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 1173,
      responseTime: '1.4s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Legal',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-legal', 'vp-compliance', 'vp-governance', 'vp-contracts', 'vp-regulatory'],
    },
    specializedCapabilities: [
      'Contract Review',
      'Compliance Monitoring',
      'Risk Assessment',
      'Document Drafting',
      'Regulatory Tracking',
      'Policy Management',
      'Legal Research',
      'Dispute Resolution',
      'Audit Support',
      'Intellectual Property Management'
    ],
    integrationOptions: [
      'Contract Management',
      'Compliance Platforms',
      'Legal Research Tools',
      'Document Management',
      'E-signature',
      'Risk Management',
      'Audit Systems',
      'IP Management'
    ],
    automationFeatures: [
      'Contract Analysis',
      'Compliance Checks',
      'Policy Updates',
      'Document Generation',
      'Risk Alerts',
      'Audit Preparation',
      'Deadline Tracking',
      'Report Generation'
    ],
    kpiMetrics: [
      'Contract Cycle Time',
      'Compliance Rate',
      'Risk Incidents',
      'Audit Findings',
      'Legal Spend',
      'Resolution Time',
      'Policy Adherence',
      'Training Completion'
    ],
    customOptions: {
      riskAppetite: 'low',
      complianceStandard: 'strict',
      documentationLevel: 'comprehensive',
      regulatoryFocus: 'proactive',
      confidentiality: 'high'
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
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects legal anomalies and compliance risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'legal_1', name: 'Contract Review', category: 'Operations', description: 'Review contracts', level: 'expert' },
      { id: 'legal_2', name: 'Compliance', category: 'Operations', description: 'Ensure compliance', level: 'expert' },
      { id: 'legal_3', name: 'Risk Assessment', category: 'Analytics', description: 'Assess legal risks', level: 'expert' },
      { id: 'legal_4', name: 'Legal Research', category: 'Research', description: 'Conduct legal research', level: 'expert' },
      { id: 'legal_5', name: 'Regulatory Affairs', category: 'Operations', description: 'Manage regulatory matters', level: 'expert' }
    ],
    personality: [
      { trait: 'Professionalism', value: 10, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Analytical', value: 10, description: 'Breaks down problems logically' },
      { trait: 'Assertiveness', value: 9, description: 'Confidently guides conversations' },
      { trait: 'Efficiency', value: 9, description: 'Delivers quick, concise responses' },
      { trait: 'Proactivity', value: 8, description: 'Takes initiative in interactions' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
