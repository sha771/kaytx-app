import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function CompetitiveIntelligenceSpecialistPage() {
  const agent = {
    id: 'competitive-intelligence-specialist',
    name: 'AI Competitive Intelligence Specialist',
    title: 'AI Competitive Intelligence Specialist',
    description: 'The AI Competitive Intelligence Specialist monitors competitors, analyzes competitive moves, and provides competitive insights.',
    capabilities: ["Task Automation","Data Processing","Competitive Monitoring","Competitor Analysis","Intelligence Gathering","Strategic Insights","Threat Assessment","Reporting"],
    icon: Search,
    color: '#536DFE',
    type: 'employee' as const,
    humanCost: '$98k/year',
    aiCost: '$2.5k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'competitive-intelligence-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,900',
      tasksAutomatedDaily: 610,
      responseTime: '1.3s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Executive & Strategy',
      level: 'specialist',
      reportsTo: 'vp-market-intelligence',
      manages: [],
    },
    specializedCapabilities: [
      'Competitive Monitoring',
      'Competitor Analysis',
      'Intelligence Gathering',
      'Strategic Insights',
      'Threat Assessment',
      'Reporting',
      'Market Positioning',
      'Competitive Strategy'
    ],
    integrationOptions: [
      'Competitive Intelligence',
      'Monitoring Tools',
      'Analytics Platforms',
      'Research Systems',
      'Reporting Platforms',
      'Threat Assessment',
      'Strategy Tools'
    ],
    automationFeatures: [
      'Competitive Monitoring',
      'Competitor Analysis',
      'Intelligence Gathering',
      'Strategic Insights',
      'Threat Assessment',
      'Report Generation',
      'Market Positioning',
      'Competitive Strategy'
    ],
    kpiMetrics: [
      'Intelligence Accuracy',
      'Competitor Coverage',
      'Insight Quality',
      'Threat Detection',
      'Report Timeliness',
      'Strategic Value',
      'Monitoring Completeness',
      'Competitive Advantage'
    ],
    customOptions: {
      monitoringScope: 'comprehensive',
      analysisDepth: 'deep',
      intelligenceQuality: 'high',
      threatSensitivity: 'high',
      reportingFrequency: 'real-time'
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
      { id: 'predictive', enabled: true, name: 'Competitive Predictor', description: 'Predicts competitive moves' },
      { id: 'threat', enabled: true, name: 'Threat Detector', description: 'Detects competitive threats' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ci_1', name: 'Competitive Monitoring', category: 'Monitoring', description: 'Monitor competition', level: 'expert' },
      { id: 'ci_2', name: 'Competitor Analysis', category: 'Analysis', description: 'Analyze competitors', level: 'expert' },
      { id: 'ci_3', name: 'Intelligence Gathering', category: 'Intelligence', description: 'Gather intelligence', level: 'expert' },
      { id: 'ci_4', name: 'Threat Assessment', category: 'Threat', description: 'Assess threats', level: 'expert' },
      { id: 'ci_5', name: 'Strategic Insights', category: 'Strategy', description: 'Provide strategic insights', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical skills' },
      { trait: 'Curiosity', value: 10, description: 'Curious about competition' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { id: 'ci_5', name: 'Strategic Insights', category: 'Strategy', description: 'Provide strategic insights', level: 'expert' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
