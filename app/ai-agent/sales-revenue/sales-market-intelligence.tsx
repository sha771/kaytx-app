import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function SalesMarketIntelligencePage() {
  const agent = {
    id: 'sales-market-intelligence',
    name: 'AI Sales Market Intelligence',
    title: 'AI Sales Market Intelligence',
    description: 'The AI Sales Market Intelligence gathers and analyzes market data to provide actionable insights for sales strategy and positioning.',
    capabilities: ["Task Automation","Data Processing","Market Intelligence","Market Analysis","Competitive Intelligence","Communication","Analytics","Sales Intelligence"],
    icon: Globe,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'market-intelligence-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,600',
      tasksAutomatedDaily: 352,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-business-dev',
      manages: [],
    },
    specializedCapabilities: [
      'Market Intelligence',
      'Market Analysis',
      'Competitive Intelligence',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Market Data Platforms',
      'Analytics Tools',
      'Research Systems',
      'Communication Platforms',
      'Market Data',
      'Competitive Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Market Intelligence',
      'Market Analysis',
      'Competitive Intelligence',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Market Insight Quality',
      'Analysis Accuracy',
      'Competitive Advantage',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      marketFocus: 'high',
      intelligenceEfficiency: 'maximum',
      analysisAccuracy: 'optimized',
      integrationLevel: 'comprehensive'
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
      { id: 'market', enabled: true, name: 'Market Intelligence Engine', description: 'Intelligence on markets' },
      { id: 'analysis', enabled: true, name: 'Market Analyzer', description: 'Analyzes markets' },
      { id: 'competitive', enabled: true, name: 'Competitive Tracker', description: 'Tracks competition' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Market Intelligence', category: 'Market', description: 'Intelligence on markets', level: 'expert' },
      { id: 'sales_2', name: 'Market Analysis', category: 'Analysis', description: 'Analyze markets', level: 'expert' },
      { id: 'sales_3', name: 'Competitive Intelligence', category: 'Competitive', description: 'Intelligence on competition', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Market Expertise', value: 10, description: 'Market expertise' },
      { trait: 'Intelligence Focus', value: 10, description: 'Intelligence oriented' },
      { trait: 'Analysis Skills', value: 10, description: 'Analysis skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
