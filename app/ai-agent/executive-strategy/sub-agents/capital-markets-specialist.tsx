import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function CapitalMarketsSpecialistPage() {
  const agent = {
    id: 'capital-markets-specialist',
    name: 'AI Capital Markets Specialist',
    title: 'AI Capital Markets Specialist',
    description: 'The AI Capital Markets Specialist monitors capital markets, analyzes market conditions, and supports capital raising activities.',
    capabilities: ["Task Automation","Data Processing","Market Monitoring","Market Analysis","Capital Raising","Investment Strategy","Market Intelligence","Reporting"],
    icon: TrendingUp,
    color: '#00B0FF',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$2.9k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'capital-markets-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,300',
      tasksAutomatedDaily: 710,
      responseTime: '1.2s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Executive & Strategy',
      level: 'specialist',
      reportsTo: 'vp-investor-relations',
      manages: [],
    },
    specializedCapabilities: [
      'Market Monitoring',
      'Market Analysis',
      'Capital Raising',
      'Investment Strategy',
      'Market Intelligence',
      'Reporting',
      'Investor Relations',
      'Market Forecasting'
    ],
    integrationOptions: [
      'Market Data Platforms',
      'Analytics Systems',
      'Capital Raising Tools',
      'Investment Platforms',
      'Intelligence Systems',
      'Reporting Platforms',
      'Forecasting Tools'
    ],
    automationFeatures: [
      'Market Monitoring',
      'Market Analysis',
      'Capital Raising',
      'Investment Strategy',
      'Market Intelligence',
      'Report Generation',
      'Investor Relations',
      'Market Forecasting'
    ],
    kpiMetrics: [
      'Market Insight',
      'Analysis Accuracy',
      'Capital Access',
      'Strategy Success',
      'Intelligence Quality',
      'Report Timeliness',
      'Investor Engagement',
      'Forecast Accuracy'
    ],
    customOptions: {
      monitoringScope: 'global',
      analysisDepth: 'comprehensive',
      capitalStrategy: 'flexible',
      investmentFocus: 'strategic',
      forecastHorizon: 'medium-term'
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
      { id: 'predictive', enabled: true, name: 'Market Predictor', description: 'Predicts market movements' },
      { id: 'intelligence', enabled: true, name: 'Market Scanner', description: 'Scans market intelligence' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cm_1', name: 'Market Monitoring', category: 'Market', description: 'Monitor markets', level: 'expert' },
      { id: 'cm_2', name: 'Market Analysis', category: 'Analysis', description: 'Analyze markets', level: 'expert' },
      { id: 'cm_3', name: 'Capital Raising', category: 'Capital', description: 'Raise capital', level: 'expert' },
      { id: 'cm_4', name: 'Investment Strategy', category: 'Investment', description: 'Develop investment strategy', level: 'expert' },
      { id: 'cm_5', name: 'Market Intelligence', category: 'Intelligence', description: 'Gather market intelligence', level: 'expert' }
    ],
    personality: [
      { trait: 'Market Savvy', value: 10, description: 'Deep market knowledge' },
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical skills' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic mindset' },
      { trait: 'Financial Acumen', value: 10, description: 'Strong financial sense' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
