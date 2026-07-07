import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-compensation-1',
    name: 'Director of Compensation - Executive',
    title: 'AI Director of Compensation - Executive',
    description: 'The AI Director of Compensation for Executive oversees executive compensation design, equity programs, and executive pay strategies for senior leadership.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Executive Compensation Design","Equity Program Management","Executive Pay Strategy","Compensation Analytics","Market Benchmarking","Governance Oversight","Team Leadership"],
    icon: DollarSign,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$4k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'director-compensation',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 880,
      responseTime: '1.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-compensation',
      manages: ['compensation-analysts-exec'],
    },
    specializedCapabilities: [
      'Executive Pay Design',
      'Equity Strategy',
      'Executive Benchmarking',
      'Compensation Governance',
      'Pay for Performance',
      'Executive Benefits',
      'Regulatory Compliance',
      'Compensation Analytics'
    ],
    integrationOptions: [
      'Compensation Platforms',
      'Equity Management',
      'Benchmarking Data',
      'Financial Systems',
      'Governance Platforms',
      'Regulatory Systems',
      'Analytics Suite',
      'Board Reporting'
    ],
    automationFeatures: [
      'Compensation Modeling',
      'Equity Grant Processing',
      'Benchmarking Analysis',
      'Compliance Monitoring',
      'Reporting Automation',
      'Governance Tracking',
      'Market Analysis',
      'Pay Analytics'
    ],
    kpiMetrics: [
      'Pay Equity',
      'Retention Impact',
      'Competitiveness',
      'Compliance Score',
      'Governance Metrics',
      'Cost Efficiency',
      'Performance Link',
      'Satisfaction Score'
    ],
    customOptions: {
      focus: 'executive',
      payModel: 'performance-based',
      equityFocus: 'long-term',
      governanceLevel: 'board',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts compensation trends' },
      { id: 'equity', enabled: true, name: 'Equity Core', description: 'Manages equity programs' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dc_1', name: 'Executive Compensation', category: 'Compensation', description: 'Design executive pay', level: 'expert' },
      { id: 'dc_2', name: 'Equity Strategy', category: 'Compensation', description: 'Manage equity programs', level: 'expert' },
      { id: 'dc_3', name: 'Benchmarking', category: 'Analytics', description: 'Benchmark executive pay', level: 'expert' },
      { id: 'dc_4', name: 'Governance', category: 'Compliance', description: 'Ensure governance', level: 'expert' },
      { id: 'dc_5', name: 'Compensation Analytics', category: 'Analytics', description: 'Analyze compensation data', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic', value: 10, description: 'Strategic in compensation' },
      { trait: 'Analytical', value: 9, description: 'Analytical in analysis' },
      { trait: 'Confidential', value: 9, description: 'Maintains confidentiality' },
      { trait: 'Compliance-focused', value: 9, description: 'Focuses on compliance' },
      { trait: 'Fairness-focused', value: 8, description: 'Focuses on fairness' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
