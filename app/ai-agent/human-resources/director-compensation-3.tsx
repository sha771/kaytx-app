import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-compensation-3',
    name: 'Director of Compensation - Broad-Based',
    title: 'AI Director of Compensation - Broad-Based',
    description: 'The AI Director of Compensation for Broad-Based oversees general compensation programs, salary structures, and merit increase programs for the entire organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Broad-based Compensation Design","Salary Structure Management","Merit Program Design","Pay Equity Analysis","Market Benchmarking","Compensation Communication","Team Leadership"],
    icon: DollarSign,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-compensation',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 875,
      responseTime: '1.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-compensation',
      manages: ['compensation-analysts-general'],
    },
    specializedCapabilities: [
      'Salary Structure Design',
      'Merit Program Management',
      'Pay Equity Analysis',
      'Market Benchmarking',
      'Compensation Communication',
      'Budget Management',
      'Compliance Monitoring',
      'Compensation Analytics'
    ],
    integrationOptions: [
      'Compensation Platforms',
      'HRIS Integration',
      'Benchmarking Data',
      'Budget Systems',
      'Communication Tools',
      'Analytics Suite',
      'Compliance Systems',
      'Survey Platforms'
    ],
    automationFeatures: [
      'Salary Range Management',
      'Merit Processing',
      'Equity Analysis',
      'Benchmarking Automation',
      'Budget Tracking',
      'Communication Automation',
      'Compliance Monitoring',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Pay Equity',
      'Market Position',
      'Budget Variance',
      'Merit Distribution',
      'Compliance Score',
      'Employee Satisfaction',
      'Retention Impact',
      'Cost Efficiency'
    ],
    customOptions: {
      focus: 'broad-based',
      payModel: 'market-based',
      equityFocus: 'pay-equity',
      communicationLevel: 'transparent',
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
      { id: 'equity', enabled: true, name: 'Equity Core', description: 'Ensures pay equity' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dc_1', name: 'Salary Structure', category: 'Compensation', description: 'Design salary structures', level: 'expert' },
      { id: 'dc_2', name: 'Merit Programs', category: 'Compensation', description: 'Manage merit programs', level: 'expert' },
      { id: 'dc_3', name: 'Pay Equity', category: 'Analytics', description: 'Analyze pay equity', level: 'expert' },
      { id: 'dc_4', name: 'Benchmarking', category: 'Analytics', description: 'Benchmark compensation', level: 'expert' },
      { id: 'dc_5', name: 'Compensation Communication', category: 'Communication', description: 'Communicate compensation', level: 'expert' }
    ],
    personality: [
      { trait: 'Fairness-focused', value: 10, description: 'Focuses on fairness' },
      { trait: 'Analytical', value: 9, description: 'Analytical in analysis' },
      { trait: 'Communicative', value: 9, description: 'Communicates well' },
      { trait: 'Strategic', value: 9, description: 'Strategic in design' },
      { trait: 'Collaborative', value: 8, description: 'Works with HRBPs' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
