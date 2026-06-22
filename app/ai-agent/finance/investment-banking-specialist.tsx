import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LineChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investment-banking-specialist',
    name: 'investment-banking-specialist',
    title: 'AI Investment Banking Specialist',
    description: 'The AI Investment Banking Specialist specializes in capital raising, IPO advisory, debt and equity financing, and complex financial transactions. This agent provides investment banking expertise for corporate finance activities.',
    capabilities: ["Capital Raising","IPO Advisory","Debt Financing","Equity Financing","Private Placements","Bond Issuance","Securities Underwriting","Financial Restructuring","Capital Markets Advisory","Transaction Execution"],
    icon: LineChart,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$185k/year',
    aiCost: '$2.8k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'investment-banking-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15195',
      tasksAutomatedDaily: 447,
      responseTime: '2.0s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Finance',
      level: 'specialist',
      reportsTo: 'cfo',
      manages: [],
    },
    specializedCapabilities: [
      'Capital Markets',
      'IPO Preparation',
      'Debt Capital Markets',
      'Equity Capital Markets',
      'Private Placement',
      'Bond Issuance',
      'Securities Underwriting',
      'Financial Restructuring'
    ],
    integrationOptions: [
      'Capital Markets Platforms',
      'Trading Systems',
      'Investor Networks',
      'Compliance Systems',
      'Financial Data Providers',
      'Legal Platforms',
      'Research Tools',
      'Reporting Systems'
    ],
    automationFeatures: [
      'Deal Origination',
      'Investor Matching',
      'Documentation Automation',
      'Compliance Checking',
      'Market Analysis',
      'Pricing Models',
      'Transaction Tracking',
      'Report Generation'
    ],
    kpiMetrics: [
      'Capital Raised',
      'Deal Success Rate',
      'Time to Market',
      'Pricing Accuracy',
      'Investor Coverage',
      'Compliance Rate',
      'Transaction Cost',
      'Client Satisfaction'
    ],
    customOptions: {
      capitalFocus: 'equity',
      marketScope: 'global',
      dealSize: 'mid-to-large',
      investorType: 'institutional',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts market conditions' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects market anomalies' },
      { id: 'market', enabled: true, name: 'Market Analyzer', description: 'Analyzes capital markets' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ib_1', name: 'Capital Raising', category: 'Capital Markets', description: 'Raise capital effectively', level: 'expert' },
      { id: 'ib_2', name: 'IPO Advisory', category: 'Advisory', description: 'Advise on IPOs', level: 'expert' },
      { id: 'ib_3', name: 'Debt Financing', category: 'Financing', description: 'Structure debt financing', level: 'expert' },
      { id: 'ib_4', name: 'Equity Financing', category: 'Financing', description: 'Structure equity financing', level: 'expert' },
      { id: 'ib_5', name: 'Market Analysis', category: 'Analytics', description: 'Analyze capital markets', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic', value: 10, description: 'Thinks strategically about capital' },
      { trait: 'Market Savvy', value: 10, description: 'Understands capital markets deeply' },
      { trait: 'Analytical', value: 9, description: 'Analyzes market conditions' },
      { trait: 'Negotiation', value: 9, description: 'Skilled in deal negotiation' },
      { trait: 'Expertise', value: 10, description: 'Deep investment banking knowledge' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
