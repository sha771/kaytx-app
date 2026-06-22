import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Crosshair } from 'lucide-react-native';

export default function SalesCompetitiveIntelligencePage() {
  const agent = {
    id: 'sales-competitive-intelligence',
    name: 'AI Sales Competitive Intelligence',
    title: 'AI Sales Competitive Intelligence',
    description: 'The AI Sales Competitive Intelligence monitors competitors and provides strategic insights to win competitive deals.',
    capabilities: ["Task Automation","Data Processing","Competitive Intelligence","Competitor Analysis","Win Strategy","Communication","Analytics","Sales Intelligence"],
    icon: Crosshair,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$5k/year',
    efficiency: '16x efficiency improvement',
    replacesRole: 'competitive-intelligence-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,300',
      tasksAutomatedDaily: 342,
      responseTime: '0.5s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-business-dev',
      manages: [],
    },
    specializedCapabilities: [
      'Competitive Intelligence',
      'Competitor Analysis',
      'Win Strategy',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Competitive Tools',
      'Analytics Platforms',
      'Research Systems',
      'Communication Platforms',
      'Competitor Data',
      'Market Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Competitive Intelligence',
      'Competitor Analysis',
      'Win Strategy',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Competitive Win Rate',
      'Analysis Accuracy',
      'Strategy Effectiveness',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      competitiveFocus: 'high',
      intelligenceEfficiency: 'maximum',
      strategyAccuracy: 'optimized',
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
      { id: 'competitive', enabled: true, name: 'Competitive Intelligence Engine', description: 'Intelligence on competition' },
      { id: 'competitor', enabled: true, name: 'Competitor Analyzer', description: 'Analyzes competitors' },
      { id: 'strategy', enabled: true, name: 'Win Strategist', description: 'Develops win strategies' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Competitive Intelligence', category: 'Competitive', description: 'Intelligence on competition', level: 'expert' },
      { id: 'sales_2', name: 'Competitor Analysis', category: 'Analysis', description: 'Analyze competitors', level: 'expert' },
      { id: 'sales_3', name: 'Win Strategy', category: 'Strategy', description: 'Develop win strategies', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Competitive Expertise', value: 10, description: 'Competitive expertise' },
      { trait: 'Intelligence Focus', value: 10, description: 'Intelligence oriented' },
      { trait: 'Strategy Skills', value: 10, description: 'Strategy skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
