import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function SalesAccountManagerPage() {
  const agent = {
    id: 'sales-account-manager',
    name: 'AI Sales Account Manager',
    title: 'AI Sales Account Manager',
    description: 'The AI Sales Account Manager manages key accounts, builds relationships, and ensures customer satisfaction.',
    capabilities: ["Task Automation","Data Processing","Account Management","Relationship Building","Customer Satisfaction","Communication","Analytics","Account Intelligence"],
    icon: DollarSign,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$79k/year',
    aiCost: '$4k/year',
    efficiency: '20x efficiency improvement',
    replacesRole: 'sales-account-manager',
    infrastructure: {
      status: 'online' as const,
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6,250',
      tasksAutomatedDaily: 335,
      responseTime: '0.5s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Account Management',
      'Relationship Building',
      'Customer Satisfaction',
      'Communication',
      'Analytics',
      'Account Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Account Platforms',
      'Communication Tools',
      'Analytics Systems',
      'Customer Platforms',
      'Sales Systems',
      'Relationship Management',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Account Management',
      'Relationship Building',
      'Customer Satisfaction',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Account Intelligence'
    ],
    kpiMetrics: [
      'Account Retention',
      'Relationship Quality',
      'Customer Satisfaction',
      'Communication Effectiveness',
      'Account Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      accountFocus: 'high',
      relationshipQuality: 'maximum',
      customerSatisfaction: 'optimized',
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
      { id: 'account', enabled: true, name: 'Account Engine', description: 'Manages accounts' },
      { id: 'relationship', enabled: true, name: 'Relationship Builder', description: 'Builds relationships' },
      { id: 'satisfaction', enabled: true, name: 'Satisfaction Monitor', description: 'Monitors satisfaction' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Account Management', category: 'Account', description: 'Manage accounts', level: 'expert' },
      { id: 'sales_2', name: 'Relationship Building', category: 'Relationship', description: 'Build relationships', level: 'expert' },
      { id: 'sales_3', name: 'Customer Satisfaction', category: 'Satisfaction', description: 'Ensure satisfaction', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Account Expertise', value: 10, description: 'Account expertise' },
      { trait: 'Relationship Focus', value: 10, description: 'Relationship oriented' },
      { trait: 'Customer Focus', value: 10, description: 'Customer focused' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
