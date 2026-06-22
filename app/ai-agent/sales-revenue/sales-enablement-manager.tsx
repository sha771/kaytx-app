import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function SalesEnablementManagerPage() {
  const agent = {
    id: 'sales-enablement-manager',
    name: 'AI Sales Enablement Manager',
    title: 'AI Sales Enablement Manager',
    description: 'The AI Sales Enablement Manager manages sales enablement programs, provides resources, and ensures sales team effectiveness.',
    capabilities: ["Task Automation","Data Processing","Sales Enablement","Resource Management","Content Development","Communication","Analytics","Enablement Intelligence"],
    icon: DollarSign,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$4k/year',
    efficiency: '21x efficiency improvement',
    replacesRole: 'sales-enablement-manager',
    infrastructure: {
      status: 'online' as const,
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 345,
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
      'Sales Enablement',
      'Resource Management',
      'Content Development',
      'Communication',
      'Analytics',
      'Enablement Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Enablement Platforms',
      'Content Management',
      'Analytics Systems',
      'Communication Platforms',
      'Sales Systems',
      'Resource Libraries',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Sales Enablement',
      'Resource Management',
      'Content Development',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Enablement Intelligence'
    ],
    kpiMetrics: [
      'Enablement Effectiveness',
      'Resource Availability',
      'Content Quality',
      'Communication Effectiveness',
      'Enablement Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      enablementFocus: 'high',
      resourceAvailability: 'maximum',
      contentQuality: 'optimized',
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
      { id: 'enablement', enabled: true, name: 'Enablement Engine', description: 'Enables sales' },
      { id: 'resource', enabled: true, name: 'Resource Manager', description: 'Manages resources' },
      { id: 'content', enabled: true, name: 'Content Developer', description: 'Develops content' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Sales Enablement', category: 'Enablement', description: 'Enable sales teams', level: 'expert' },
      { id: 'sales_2', name: 'Resource Management', category: 'Resource', description: 'Manage resources', level: 'expert' },
      { id: 'sales_3', name: 'Content Development', category: 'Content', description: 'Develop content', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Enablement Expertise', value: 10, description: 'Enablement expertise' },
      { trait: 'Resource Focus', value: 10, description: 'Resource oriented' },
      { trait: 'Content Development', value: 10, description: 'Content developer' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
