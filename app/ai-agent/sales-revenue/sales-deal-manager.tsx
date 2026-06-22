import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function SalesDealManagerPage() {
  const agent = {
    id: 'sales-deal-manager',
    name: 'AI Sales Deal Manager',
    title: 'AI Sales Deal Manager',
    description: 'The AI Sales Deal Manager tracks and manages deals through the sales pipeline to ensure successful closures and revenue realization.',
    capabilities: ["Task Automation","Data Processing","Deal Management","Pipeline Tracking","Deal Closure","Communication","Analytics","Sales Intelligence"],
    icon: Briefcase,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$4k/year',
    efficiency: '19x efficiency improvement',
    replacesRole: 'deal-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,900',
      tasksAutomatedDaily: 322,
      responseTime: '0.6s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Deal Management',
      'Pipeline Tracking',
      'Deal Closure',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Pipeline Tools',
      'Sales Platforms',
      'Communication Platforms',
      'Sales Data',
      'Deal Data',
      'Analytics Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Deal Management',
      'Pipeline Tracking',
      'Deal Closure',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Deal Velocity',
      'Pipeline Health',
      'Closure Rate',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      dealFocus: 'high',
      pipelineEfficiency: 'maximum',
      closureAccuracy: 'optimized',
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
      { id: 'deal', enabled: true, name: 'Deal Manager', description: 'Manages deals' },
      { id: 'pipeline', enabled: true, name: 'Pipeline Tracker', description: 'Tracks pipeline' },
      { id: 'closure', enabled: true, name: 'Closure Accelerator', description: 'Accelerates closure' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Deal Management', category: 'Deal', description: 'Manage deals', level: 'expert' },
      { id: 'sales_2', name: 'Pipeline Tracking', category: 'Pipeline', description: 'Track pipeline', level: 'expert' },
      { id: 'sales_3', name: 'Deal Closure', category: 'Closure', description: 'Close deals', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Deal Expertise', value: 10, description: 'Deal expertise' },
      { trait: 'Pipeline Focus', value: 10, description: 'Pipeline oriented' },
      { trait: 'Closure Skills', value: 10, description: 'Closure skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
