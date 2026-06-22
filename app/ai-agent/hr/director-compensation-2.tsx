import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-compensation-2',
    name: 'Director of Compensation - Sales & Revenue',
    title: 'AI Director of Compensation - Sales & Revenue',
    description: 'The AI Director of Compensation for Sales & Revenue oversees sales compensation design, incentive plans, and commission structures for revenue-generating roles.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Sales Compensation Design","Incentive Plan Management","Commission Structure Design","Variable Pay Strategy","Performance Analytics","Plan Optimization","Team Leadership"],
    icon: DollarSign,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$3.5k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'director-compensation',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 900,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-compensation',
      manages: ['sales-comp-analysts'],
    },
    specializedCapabilities: [
      'Sales Comp Design',
      'Incentive Strategy',
      'Commission Structures',
      'Variable Pay',
      'Performance Analytics',
      'Plan Modeling',
      'Quota Setting',
      'Revenue Analytics'
    ],
    integrationOptions: [
      'Sales Comp Platforms',
      'Commission Systems',
      'CRM Integration',
      'Performance Data',
      'Quota Systems',
      'Analytics Suite',
      'Financial Systems',
      'Reporting Tools'
    ],
    automationFeatures: [
      'Commission Calculation',
      'Plan Modeling',
      'Performance Tracking',
      'Quota Management',
      'Incentive Payout',
      'Reporting Automation',
      'Plan Optimization',
      'Analytics Generation'
    ],
    kpiMetrics: [
      'Revenue per Rep',
      'Attainment Rate',
      'Plan Effectiveness',
      'Pay Accuracy',
      'Motivation Score',
      'Retention Impact',
      'Cost of Sales',
      'Satisfaction Score'
    ],
    customOptions: {
      focus: 'sales',
      payModel: 'performance-based',
      incentiveType: 'revenue-driven',
      frequency: 'monthly',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts sales comp impact' },
      { id: 'incentive', enabled: true, name: 'Incentive Core', description: 'Optimizes incentive plans' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dc_1', name: 'Sales Compensation', category: 'Compensation', description: 'Design sales comp', level: 'expert' },
      { id: 'dc_2', name: 'Incentive Design', category: 'Compensation', description: 'Design incentive plans', level: 'expert' },
      { id: 'dc_3', name: 'Commission Structure', category: 'Compensation', description: 'Structure commissions', level: 'expert' },
      { id: 'dc_4', name: 'Performance Analytics', category: 'Analytics', description: 'Analyze performance', level: 'expert' },
      { id: 'dc_5', name: 'Plan Optimization', category: 'Analytics', description: 'Optimize comp plans', level: 'expert' }
    ],
    personality: [
      { trait: 'Revenue-focused', value: 10, description: 'Focuses on revenue impact' },
      { trait: 'Analytical', value: 9, description: 'Analytical in modeling' },
      { trait: 'Motivation-focused', value: 9, description: 'Focuses on motivation' },
      { trait: 'Results-driven', value: 9, description: 'Driven by results' },
      { trait: 'Collaborative', value: 8, description: 'Works with sales leaders' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
