import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Crown } from 'lucide-react-native';

export default function SalesStrategicAccountManagerPage() {
  const agent = {
    id: 'sales-strategic-account-manager',
    name: 'AI Sales Strategic Account Manager',
    title: 'AI Sales Strategic Account Manager',
    description: 'The AI Sales Strategic Account Manager manages key strategic accounts to maximize revenue and build long-term partnerships.',
    capabilities: ["Task Automation","Data Processing","Strategic Account Management","Key Account Strategy","Partnership Building","Communication","Analytics","Sales Intelligence"],
    icon: Crown,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$6k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'strategic-account-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8,200',
      tasksAutomatedDaily: 385,
      responseTime: '0.5s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Strategic Account Management',
      'Key Account Strategy',
      'Partnership Building',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Account Platforms',
      'Strategy Tools',
      'CRM Systems',
      'Communication Platforms',
      'Account Data',
      'Strategy Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Strategic Account Management',
      'Key Account Strategy',
      'Partnership Building',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Account Revenue',
      'Strategy Effectiveness',
      'Partnership Quality',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      strategicFocus: 'high',
      accountEfficiency: 'maximum',
      partnershipAccuracy: 'optimized',
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
      { id: 'strategic', enabled: true, name: 'Strategic Account Manager', description: 'Manages strategic accounts' },
      { id: 'account', enabled: true, name: 'Key Account Strategist', description: 'Key account strategy' },
      { id: 'partnership', enabled: true, name: 'Partnership Builder', description: 'Builds partnerships' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Strategic Account Management', category: 'Strategic', description: 'Manage strategic accounts', level: 'expert' },
      { id: 'sales_2', name: 'Key Account Strategy', category: 'Account', description: 'Key account strategy', level: 'expert' },
      { id: 'sales_3', name: 'Partnership Building', category: 'Partnership', description: 'Build partnerships', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic Expertise', value: 10, description: 'Strategic expertise' },
      { trait: 'Account Focus', value: 10, description: 'Account oriented' },
      { trait: 'Partnership Skills', value: 10, description: 'Partnership skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
