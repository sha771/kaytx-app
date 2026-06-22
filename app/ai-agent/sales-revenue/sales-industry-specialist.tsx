import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function SalesIndustrySpecialistPage() {
  const agent = {
    id: 'sales-industry-specialist',
    name: 'AI Sales Industry Specialist',
    title: 'AI Sales Industry Specialist',
    description: 'The AI Sales Industry Specialist provides deep industry expertise to tailor sales approaches for specific vertical markets.',
    capabilities: ["Task Automation","Data Processing","Industry Expertise","Vertical Sales","Industry Insights","Communication","Analytics","Sales Intelligence"],
    icon: Building2,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'industry-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,800',
      tasksAutomatedDaily: 360,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'specialist',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Industry Expertise',
      'Vertical Sales',
      'Industry Insights',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Industry Platforms',
      'Vertical Tools',
      'CRM Systems',
      'Communication Platforms',
      'Industry Data',
      'Vertical Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Industry Expertise',
      'Vertical Sales',
      'Industry Insights',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Industry Penetration',
      'Vertical Win Rate',
      'Insight Quality',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      industryFocus: 'high',
      verticalEfficiency: 'maximum',
      insightAccuracy: 'optimized',
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
      { id: 'industry', enabled: true, name: 'Industry Expert', description: 'Industry expertise' },
      { id: 'vertical', enabled: true, name: 'Vertical Sales Specialist', description: 'Vertical sales specialist' },
      { id: 'insight', enabled: true, name: 'Industry Insight Generator', description: 'Generates industry insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Industry Expertise', category: 'Industry', description: 'Industry expertise', level: 'expert' },
      { id: 'sales_2', name: 'Vertical Sales', category: 'Vertical', description: 'Vertical sales', level: 'expert' },
      { id: 'sales_3', name: 'Industry Insights', category: 'Insights', description: 'Industry insights', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Industry Expertise', value: 10, description: 'Industry expertise' },
      { trait: 'Vertical Focus', value: 10, description: 'Vertical oriented' },
      { trait: 'Insight Skills', value: 10, description: 'Insight skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
