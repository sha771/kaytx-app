import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function SalesCoordinatorLeadPage() {
  const agent = {
    id: 'sales-coordinator-lead',
    name: 'AI Sales Coordinator Lead',
    title: 'AI Sales Coordinator Lead',
    description: 'The AI Sales Coordinator Lead leads and coordinates sales activities across teams to ensure smooth operations and collaboration.',
    capabilities: ["Task Automation","Data Processing","Coordination Leadership","Team Collaboration","Activity Management","Communication","Analytics","Sales Intelligence"],
    icon: Users,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$4k/year',
    efficiency: '16x efficiency improvement',
    replacesRole: 'sales-coordinator-lead',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,100',
      tasksAutomatedDaily: 288,
      responseTime: '0.6s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'coordination',
      reportsTo: 'sales-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Coordination Leadership',
      'Team Collaboration',
      'Activity Management',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Coordination Platforms',
      'Team Tools',
      'Activity Systems',
      'Communication Platforms',
      'Coordination Data',
      'Team Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Coordination Leadership',
      'Team Collaboration',
      'Activity Management',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Coordination Efficiency',
      'Collaboration Quality',
      'Activity Success',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      coordinationFocus: 'high',
      collaborationEfficiency: 'maximum',
      activityAccuracy: 'optimized',
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
      { id: 'coordination', enabled: true, name: 'Coordination Leader', description: 'Leads coordination' },
      { id: 'collaboration', enabled: true, name: 'Team Collaborator', description: 'Collaborates teams' },
      { id: 'activity', enabled: true, name: 'Activity Manager', description: 'Manages activities' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Coordination Leadership', category: 'Coordination', description: 'Lead coordination', level: 'expert' },
      { id: 'sales_2', name: 'Team Collaboration', category: 'Collaboration', description: 'Collaborate teams', level: 'expert' },
      { id: 'sales_3', name: 'Activity Management', category: 'Activity', description: 'Manage activities', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Coordination Expertise', value: 10, description: 'Coordination expertise' },
      { trait: 'Collaboration Focus', value: 10, description: 'Collaboration oriented' },
      { trait: 'Activity Skills', value: 10, description: 'Activity skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
