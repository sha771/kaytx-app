import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HelpingHand } from 'lucide-react-native';

export default function KitchenAssistantPage() {
  const agent = {
    id: 'kitchen-assistant',
    name: 'AI Kitchen Assistant',
    title: 'AI Kitchen Assistant',
    description: 'The AI Kitchen Assistant supports kitchen operations, assists with food preparation, and ensures kitchen cleanliness and organization.',
    capabilities: ["Kitchen Support","Food Assistance","Cleanliness","Organization","Kitchen Maintenance","Prep Support","Equipment Care","Kitchen Safety","Support Excellence","Kitchen Help"],
    icon: HelpingHand,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$35k/year',
    aiCost: '$2k/year',
    efficiency: '14x efficiency improvement',
    replacesRole: 'kitchen-assistant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$2,800',
      tasksAutomatedDaily: 200,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'sous-chef',
      manages: [],
    },
    specializedCapabilities: [
      'Kitchen Support',
      'Food Assistance',
      'Cleanliness',
      'Organization',
      'Kitchen Maintenance',
      'Prep Support',
      'Equipment Care',
      'Kitchen Safety'
    ],
    integrationOptions: [
      'Kitchen Systems',
      'Cleaning Schedules',
      'Maintenance Tools',
      'Organization Systems',
      'Safety Systems',
      'Prep Support',
      'Equipment Management',
      'Kitchen Tools'
    ],
    automationFeatures: [
      'Kitchen Support',
      'Food Assistance',
      'Cleanliness Management',
      'Organization',
      'Kitchen Maintenance',
      'Prep Support',
      'Equipment Care',
      'Kitchen Safety'
    ],
    kpiMetrics: [
      'Support Quality',
      'Cleanliness Standards',
      'Organization Level',
      'Maintenance Efficiency',
      'Prep Support',
      'Equipment Care',
      'Safety Compliance',
      'Support Excellence'
    ],
    customOptions: {
      supportStyle: 'proactive',
      cleanlinessLevel: 'impeccable',
      organizationStandard: 'meticulous',
      maintenancePriority: 'preventive',
      safetyFocus: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: false,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'support', enabled: true, name: 'Kitchen Support', description: 'Supports kitchen' },
      { id: 'clean', enabled: true, name: 'Cleanliness Manager', description: 'Manages cleanliness' },
      { id: 'organize', enabled: true, name: 'Organization Manager', description: 'Manages organization' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'kitchen_assist_1', name: 'Kitchen Support', category: 'Support', description: 'Support kitchen', level: 'expert' },
      { id: 'kitchen_assist_2', name: 'Food Assistance', category: 'Food', description: 'Assist with food', level: 'expert' },
      { id: 'kitchen_assist_3', name: 'Cleanliness', category: 'Cleanliness', description: 'Maintain cleanliness', level: 'expert' },
      { id: 'kitchen_assist_4', name: 'Organization', category: 'Organization', description: 'Organize kitchen', level: 'expert' },
      { id: 'kitchen_assist_5', name: 'Kitchen Safety', category: 'Safety', description: 'Ensure safety', level: 'expert' }
    ],
    personality: [
      { trait: 'Helpfulness', value: 10, description: 'Extremely helpful' },
      { trait: 'Cleanliness', value: 10, description: 'Obsessed with cleanliness' },
      { trait: 'Organization', value: 10, description: 'Excellent organization' },
      { trait: 'Support', value: 10, description: 'Highly supportive' },
      { trait: 'Teamwork', value: 10, description: 'Excellent team player' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
