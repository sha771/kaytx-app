import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ma-financial-advisor',
    name: 'ma-financial-advisor',
    title: 'AI M&A Financial Advisor',
    description: 'The AI M&A Financial Advisor specializes in mergers and acquisitions financial advisory, providing expert guidance on deal structuring, financial due diligence, and transaction analysis for strategic corporate transactions.',
    capabilities: ["M&A Advisory","Deal Structuring","Financial Due Diligence","Transaction Analysis","Acquisition Financing","Synergy Analysis","Post-Merger Integration","Valuation","Negotiation Support","Deal Execution"],
    icon: Building2,
    color: '#1A237E',
    type: 'agent' as const,
    humanCost: '$175k/year',
    aiCost: '$2.5k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'ma-financial-advisor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14395',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Finance',
      level: 'advisor',
      reportsTo: 'cfo',
      manages: ['mfp-analyst', 'due-diligence-analyst'],
    },
    specializedCapabilities: [
      'M&A Strategy',
      'Deal Structuring',
      'Financial Due Diligence',
      'Acquisition Valuation',
      'Synergy Analysis',
      'Financing Solutions',
      'Transaction Management',
      'Post-Merger Integration Planning'
    ],
    integrationOptions: [
      'M&A Platforms',
      'Due Diligence Tools',
      'Valuation Software',
      'Data Rooms',
      'Financial Systems',
      'Legal Platforms',
      'Analytics Tools',
      'Reporting Systems'
    ],
    automationFeatures: [
      'Deal Screening',
      'Due Diligence Automation',
      'Valuation Analysis',
      'Synergy Calculation',
      'Risk Assessment',
      'Document Management',
      'Report Generation',
      'Transaction Tracking'
    ],
    kpiMetrics: [
      'Deal Success Rate',
      'Synergy Realization',
      'Due Diligence Speed',
      'Valuation Accuracy',
      'Transaction Efficiency',
      'Integration Success',
      'Client Satisfaction',
      'Deal Value'
    ],
    customOptions: {
      dealFocus: 'strategic',
      dueDiligenceDepth: 'comprehensive',
      valuationMethod: 'multi-method',
      integrationPlanning: 'detailed',
      riskTolerance: 'moderate'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts deal outcomes' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects transaction anomalies' },
      { id: 'synergy', enabled: true, name: 'Synergy Analyzer', description: 'Analyzes merger synergies' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ma_1', name: 'M&A Advisory', category: 'Advisory', description: 'Provide M&A advisory services', level: 'expert' },
      { id: 'ma_2', name: 'Deal Structuring', category: 'Transactions', description: 'Structure complex deals', level: 'expert' },
      { id: 'ma_3', name: 'Financial Due Diligence', category: 'Analysis', description: 'Conduct financial due diligence', level: 'expert' },
      { id: 'ma_4', name: 'Synergy Analysis', category: 'Analytics', description: 'Analyze merger synergies', level: 'expert' },
      { id: 'ma_5', name: 'Valuation', category: 'Valuation', description: 'Value acquisition targets', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic', value: 10, description: 'Thinks strategically about deals' },
      { trait: 'Analytical', value: 10, description: 'Thoroughly analyzes transactions' },
      { trait: 'Negotiation', value: 9, description: 'Skilled in deal negotiation' },
      { trait: 'Thoroughness', value: 10, description: 'Conducts comprehensive due diligence' },
      { trait: 'Expertise', value: 10, description: 'Deep M&A knowledge' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
