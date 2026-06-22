import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function VPInvestmentBankingPage() {
  const agent = {
    id: 'vp-investment-banking',
    name: 'AI VP Investment Banking',
    title: 'AI VP Investment Banking',
    description: 'The AI VP Investment Banking manages investment banking operations including M&A advisory, capital raising, securities underwriting, and corporate finance services.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Investment Banking","M&A Advisory","Capital Markets","Securities Underwriting","Financial Modeling","Deal Execution","Team Leadership"],
    icon: TrendingUp,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$220k/year',
    aiCost: '$5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'vp-investment-banking',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17,900',
      tasksAutomatedDaily: 1100,
      responseTime: '1.3s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'vp_director',
      reportsTo: 'chief-banking-officer',
      manages: ['portfolio-manager', 'investment-advisor', 'capital-markets-analyst', 'structured-finance-agent'],
    },
    specializedCapabilities: [
      'Investment Banking Strategy',
      'M&A Advisory',
      'Capital Raising',
      'Securities Underwriting',
      'Corporate Finance',
      'Financial Modeling',
      'Deal Execution',
      'Market Analysis'
    ],
    integrationOptions: [
      'Investment Banking Platforms',
      'Financial Modeling Tools',
      'Market Data Systems',
      'CRM Platforms',
      'Compliance Systems',
      'Analytics Platforms',
      'Document Management',
      'Communication Systems'
    ],
    automationFeatures: [
      'Deal Screening',
      'Financial Analysis',
      'Due Diligence',
      'Document Preparation',
      'Market Research',
      'Valuation Analysis',
      'Reporting',
      'Compliance Checks'
    ],
    kpiMetrics: [
      'Deal Flow',
      'Transaction Value',
      'Revenue Generation',
      'Market Share',
      'Client Satisfaction',
      'Deal Success Rate',
      'Time to Close',
      'Profitability'
    ],
    customOptions: {
      riskTolerance: 'moderate',
      dealFocus: 'high-value',
      growthTarget: 'aggressive',
      serviceLevel: 'premium',
      innovationLevel: 'high'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts market trends and deal opportunities' },
      { id: 'market', enabled: true, name: 'Market Analyzer', description: 'Analyzes market conditions and opportunities' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'inv_1', name: 'Investment Banking Strategy', category: 'Strategy', description: 'Develop investment banking strategies', level: 'expert' },
      { id: 'inv_2', name: 'M&A Advisory', category: 'M&A', description: 'Provide M&A advisory services', level: 'expert' },
      { id: 'inv_3', name: 'Capital Markets', category: 'Capital', description: 'Manage capital markets activities', level: 'expert' },
      { id: 'inv_4', name: 'Financial Modeling', category: 'Finance', description: 'Build complex financial models', level: 'expert' },
      { id: 'inv_5', name: 'Deal Execution', category: 'Execution', description: 'Execute investment banking deals', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical capabilities' },
      { trait: 'Deal Focus', value: 10, description: 'Highly focused on deal execution' },
      { trait: 'Market Insight', value: 9, description: 'Deep market understanding' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic approach to deals' },
      { trait: 'Leadership', value: 9, description: 'Strong leadership in deal teams' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
