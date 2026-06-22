import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BadgeCheck } from 'lucide-react-native';

export default function SalesAssociatePage() {
  const agent = {
    id: 'sales-associate',
    name: 'AI Sales Associate',
    title: 'AI Sales Associate',
    description: 'The AI Sales Associate assists customers with product selection, provides product information, processes sales, and delivers excellent customer service.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Customer Service","Product Knowledge","Sales Support","Transaction Processing","Customer Assistance","Product Recommendations","Communication"],
    icon: BadgeCheck,
    color: '#388E3C',
    type: 'employee' as const,
    humanCost: '$35k/year',
    aiCost: '$800/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'sales-associate',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,850',
      tasksAutomatedDaily: 250,
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'associate',
      reportsTo: 'sales-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Customer Service',
      'Product Knowledge',
      'Sales Support',
      'Transaction Processing',
      'Customer Assistance',
      'Product Recommendations',
      'Communication',
      'Problem Solving'
    ],
    integrationOptions: [
      'POS Systems',
      'Inventory Systems',
      'Product Catalogs',
      'Communication Platforms',
      'Customer Data',
      'Analytics Tools'
    ],
    automationFeatures: [
      'Customer Service',
      'Product Recommendations',
      'Transaction Processing',
      'Customer Assistance',
      'Product Information',
      'Sales Support',
      'Communication',
      'Task Management'
    ],
    kpiMetrics: [
      'Customer Satisfaction',
      'Sales Volume',
      'Conversion Rate',
      'Product Knowledge',
      'Customer Assistance',
      'Transaction Accuracy',
      'Service Quality',
      'Team Collaboration'
    ],
    customOptions: {
      customerFocus: 'high',
      productKnowledge: 'high',
      serviceQuality: 'premium',
      salesSupport: 'high',
      communication: 'high'
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
      { id: 'recommend', enabled: true, name: 'Product Recommender', description: 'Recommends products to customers' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'assoc_1', name: 'Customer Service', category: 'Customer', description: 'Provide customer service', level: 'expert' },
      { id: 'assoc_2', name: 'Product Knowledge', category: 'Product', description: 'Maintain product knowledge', level: 'expert' },
      { id: 'assoc_3', name: 'Sales Support', category: 'Sales', description: 'Support sales activities', level: 'expert' },
      { id: 'assoc_4', name: 'Transaction Processing', category: 'Transaction', description: 'Process transactions', level: 'advanced' },
      { id: 'assoc_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'advanced' }
    ],
    personality: [
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric' },
      { trait: 'Helpful', value: 10, description: 'Helpful assistant' },
      { trait: 'Product Knowledge', value: 9, description: 'Product expert' },
      { trait: 'Friendly', value: 9, description: 'Friendly demeanor' },
      { trait: 'Patient', value: 9, description: 'Patient with customers' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
