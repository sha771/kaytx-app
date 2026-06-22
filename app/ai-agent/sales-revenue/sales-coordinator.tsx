import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function SalesCoordinatorPage() {
  const agent = {
    id: 'sales-coordinator',
    name: 'AI Sales Coordinator',
    title: 'AI Sales Coordinator',
    description: 'The AI Sales Coordinator coordinates sales activities, manages schedules, and ensures smooth sales operations.',
    capabilities: ["Task Automation","Data Processing","Sales Coordination","Schedule Management","Operations Support","Communication","Analytics","Sales Intelligence"],
    icon: DollarSign,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$3k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'sales-coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,300',
      tasksAutomatedDaily: 260,
      responseTime: '0.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Sales Coordination',
      'Schedule Management',
      'Operations Support',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Scheduling Tools',
      'Communication Platforms',
      'Analytics Tools',
      'Operations Systems',
      'Sales Platforms',
      'Calendar Systems',
      'Task Management'
    ],
    automationFeatures: [
      'Sales Coordination',
      'Schedule Management',
      'Operations Support',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Coordination Efficiency',
      'Schedule Accuracy',
      'Operations Speed',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      coordinationFocus: 'high',
      scheduleAccuracy: 'maximum',
      operationsEfficiency: 'optimized',
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
      { id: 'coordination', enabled: true, name: 'Coordination Engine', description: 'Coordinates sales' },
      { id: 'schedule', enabled: true, name: 'Schedule Manager', description: 'Manages schedules' },
      { id: 'operations', enabled: true, name: 'Operations Support', description: 'Supports operations' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Sales Coordination', category: 'Coordination', description: 'Coordinate sales', level: 'expert' },
      { id: 'sales_2', name: 'Schedule Management', category: 'Schedule', description: 'Manage schedules', level: 'expert' },
      { id: 'sales_3', name: 'Operations Support', category: 'Operations', description: 'Support operations', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Coordination Expertise', value: 10, description: 'Coordination expertise' },
      { trait: 'Organization', value: 10, description: 'Highly organized' },
      { trait: 'Operations Focus', value: 10, description: 'Operations oriented' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
