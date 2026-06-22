import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cro',
    name: 'cro',
    title: 'AI Chief Risk Officer',
    description: 'The AI Chief Risk Officer leads risk strategy, oversees underwriting and claims management, manages risk assessment and compliance, and drives risk excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Risk Strategy","Underwriting Management","Claims Management","Risk Assessment","Compliance Oversight","Fraud Detection","Team Leadership"],
    icon: TrendingUp,
    color: '#009688',
    type: 'employee' as const,
    humanCost: '$199k/year',
    aiCost: '$3k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'cro',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 701,
      responseTime: '1.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Insurance',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-underwriting', 'vp-claims', 'vp-risk-assessment', 'underwriting-manager', 'claims-manager'],
    },
    specializedCapabilities: [
      'Risk Assessment',
      'Underwriting',
      'Claims Processing',
      'Fraud Detection',
      'Policy Administration',
      'Actuarial Analysis',
      'Catastrophe Modeling',
      'Reinsurance Management',
      'Customer Risk Analysis',
      'Compliance Monitoring'
    ],
    integrationOptions: [
      'Underwriting Systems',
      'Claims Platforms',
      'Risk Management',
      'Actuarial Tools',
      'Policy Administration',
      'Fraud Detection',
      'Catastrophe Modeling',
      'Regulatory Systems'
    ],
    automationFeatures: [
      'Underwriting Automation',
      'Claims Processing',
      'Fraud Detection',
      'Risk Scoring',
      'Policy Issuance',
      'Compliance Checks',
      'Report Generation',
      'Alert Management'
    ],
    kpiMetrics: [
      'Loss Ratio',
      'Combined Ratio',
      'Claims Ratio',
      'Underwriting Profit',
      'Fraud Detection Rate',
      'Compliance Rate',
      'Customer Satisfaction',
      'Risk Exposure'
    ],
    customOptions: {
      riskAppetite: 'moderate',
      underwritingStandard: 'strict',
      fraudDetectionLevel: 'high',
      complianceFocus: 'regulatory',
      customerCentricity: 'balanced'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts risk patterns and claims' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects fraudulent activities and anomalies' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ins_1', name: 'Risk Assessment', category: 'Analytics', description: 'Assess insurance risks', level: 'expert' },
      { id: 'ins_2', name: 'Underwriting', category: 'Operations', description: 'Perform underwriting', level: 'expert' },
      { id: 'ins_3', name: 'Claims Management', category: 'Operations', description: 'Manage claims', level: 'expert' },
      { id: 'ins_4', name: 'Fraud Detection', category: 'Analytics', description: 'Detect fraud', level: 'expert' },
      { id: 'ins_5', name: 'Actuarial Analysis', category: 'Analytics', description: 'Perform actuarial analysis', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Breaks down problems logically' },
      { trait: 'Professionalism', value: 10, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Assertiveness', value: 9, description: 'Confidently guides conversations' },
      { trait: 'Efficiency', value: 9, description: 'Delivers quick, concise responses' },
      { trait: 'Proactivity', value: 8, description: 'Takes initiative in interactions' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
