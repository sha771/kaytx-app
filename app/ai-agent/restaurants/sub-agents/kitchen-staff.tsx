import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function KitchenStaffPage() {
  const agent = {
    id: 'kitchen-staff',
    name: 'AI Kitchen Staff',
    title: 'AI Kitchen Staff',
    description: 'The AI Kitchen Staff provides general kitchen support, assists with various kitchen tasks, and ensures smooth kitchen operations.',
    capabilities: ["Kitchen Support","General Assistance","Task Flexibility","Kitchen Operations","Food Support","Cleanliness Support","Equipment Help","Kitchen Teamwork","Support Excellence","Kitchen Help"],
    icon: Users,
    color: '#78909C',
    type: 'employee' as const,
    humanCost: '$35k/year',
    aiCost: '$2k/year',
    efficiency: '14x efficiency improvement',
    replacesRole: 'kitchen-staff',
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
      reportsTo: 'kitchen-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Kitchen Support',
      'General Assistance',
      'Task Flexibility',
      'Kitchen Operations',
      'Food Support',
      'Cleanliness Support',
      'Equipment Help',
      'Kitchen Teamwork'
    ],
    integrationOptions: [
      'Kitchen Systems',
      'Task Management',
      'Support Tools',
      'Communication Platforms',
      'Equipment Management',
      'Cleanliness Tools',
      'Kitchen Operations',
      'Team Coordination'
    ],
    automationFeatures: [
      'Kitchen Support',
      'General Assistance',
      'Task Flexibility',
      'Kitchen Operations',
      'Food Support',
      'Cleanliness Support',
      'Equipment Help',
      'Kitchen Teamwork'
    ],
    kpiMetrics: [
      'Support Quality',
      'Task Flexibility',
      'Kitchen Operations',
      'Team Collaboration',
      'Support Efficiency',
      'Task Completion',
      'Kitchen Help',
      'Support Excellence'
    ],
    customOptions: {
      supportStyle: 'flexible',
      taskApproach: 'adaptable',
      teamworkLevel: 'high',
      supportPriority: 'immediate',
      kitchenFocus: 'operations'
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
      { id: 'task', enabled: true, name: 'Task Manager', description: 'Manages tasks' },
      { id: 'team', enabled: true, name: 'Team Coordinator', description: 'Coordinates team' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'kitchen_staff_1', name: 'Kitchen Support', category: 'Support', description: 'Support kitchen', level: 'expert' },
      { id: 'kitchen_staff_2', name: 'General Assistance', category: 'Assistance', description: 'Provide assistance', level: 'expert' },
      { id: 'kitchen_staff_3', name: 'Task Flexibility', category: 'Flexibility', description: 'Flexible tasks', level: 'expert' },
      { id: 'kitchen_staff_4', name: 'Kitchen Operations', category: 'Operations', description: 'Support operations', level: 'expert' },
      { id: 'kitchen_staff_5', name: 'Kitchen Teamwork', category: 'Teamwork', description: 'Team collaboration', level: 'expert' }
    ],
    personality: [
      { trait: 'Flexibility', value: 10, description: 'Highly flexible' },
      { trait: 'Helpfulness', value: 10, description: 'Extremely helpful' },
      { trait: 'Teamwork', value: 10, description: 'Excellent team player' },
      { trait: 'Adaptability', value: 10, description: 'Highly adaptable' },
      { trait: 'Support', value: 10, description: 'Highly supportive' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
