import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cpo',
    name: 'cpo',
    title: 'AI Chief Product Officer',
    description: 'The AI Chief Product Officer leads product strategy, oversees product development and innovation, drives user experience, and ensures product excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Product Strategy","Product Development","User Experience","Innovation Leadership","Roadmap Planning","Market Analysis","Team Leadership"],
    icon: Package,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$243k/year',
    aiCost: '$4k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'cpo',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18',
      tasksAutomatedDaily: 667,
      responseTime: '1.7s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Product',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-product', 'vp-product-strategy', 'vp-product-operations', 'product-manager', 'product-owner'],
    },
    specializedCapabilities: [
      'User Research',
      'Feature Prioritization',
      'Roadmap Planning',
      'Competitor Analysis',
      'User Story Creation',
      'A/B Testing',
      'Product Analytics',
      'Feedback Analysis',
      'Market Research',
      'Go-to-Market Strategy'
    ],
    integrationOptions: [
      'Product Analytics',
      'User Research Tools',
      'Project Management',
      'Feedback Platforms',
      'Design Tools',
      'Development Tools',
      'Communication Platforms',
      'Documentation Tools'
    ],
    automationFeatures: [
      'Feedback Collection',
      'User Research Scheduling',
      'Roadmap Updates',
      'Feature Tracking',
      'A/B Test Setup',
      'Report Generation',
      'Stakeholder Updates',
      'Release Coordination'
    ],
    kpiMetrics: [
      'User Adoption',
      'Feature Usage',
      'Customer Satisfaction',
      'Time to Market',
      'Product Quality',
      'User Retention',
      'Market Share',
      'NPS'
    ],
    customOptions: {
      userCentricity: 'high',
      innovationRate: 'balanced',
      dataDriven: 'true',
      speedToMarket: 'fast',
      customerFocus: 'obsessive'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts product trends and user behavior' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes user sentiment and feedback' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'prod_1', name: 'User Research', category: 'Research', description: 'Conduct user research', level: 'expert' },
      { id: 'prod_2', name: 'Product Strategy', category: 'Strategy', description: 'Develop product strategy', level: 'expert' },
      { id: 'prod_3', name: 'Roadmap Planning', category: 'Operations', description: 'Plan product roadmap', level: 'expert' },
      { id: 'prod_4', name: 'A/B Testing', category: 'Analytics', description: 'Run A/B tests', level: 'expert' },
      { id: 'prod_5', name: 'User Experience', category: 'Design', description: 'Optimize user experience', level: 'expert' }
    ],
    personality: [
      { trait: 'Creativity', value: 10, description: 'Offers innovative solutions' },
      { trait: 'Professionalism', value: 9, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Proactivity', value: 9, description: 'Takes initiative in interactions' },
      { trait: 'Efficiency', value: 8, description: 'Delivers quick, concise responses' },
      { trait: 'Analytical', value: 8, description: 'Breaks down problems logically' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
