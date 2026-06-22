import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LayoutGrid } from 'lucide-react-native';

export default function MerchandisingAssistantPage() {
  const agent = {
    id: 'merchandising-assistant',
    name: 'AI Merchandising Assistant',
    title: 'AI Merchandising Assistant',
    description: 'The AI Merchandising Assistant supports merchandising operations, manages merchandising data, and coordinates merchandising activities.',
    capabilities: ["Merchandising Support","Data Management","Activity Coordination","Merchandising Administration","Team Support","Process Assistance","Merchandising Organization","Reporting Support","Communication Support","Task Coordination"],
    icon: LayoutGrid,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$2.5k/year',
    efficiency: '22x efficiency improvement',
    replacesRole: 'merchandising-assistant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$4,400',
      tasksAutomatedDaily: 300,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Fashion & Luxury',
      level: 'specialist',
      reportsTo: 'merchandising-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Merchandising Support',
      'Data Management',
      'Activity Coordination',
      'Merchandising Administration',
      'Team Support',
      'Process Assistance',
      'Merchandising Organization',
      'Task Coordination'
    ],
    integrationOptions: [
      'Merchandising Systems',
      'Data Management',
      'Coordination Tools',
      'Reporting Platforms',
      'Communication Systems',
      'Task Management',
      'Process Automation',
      'Team Collaboration'
    ],
    automationFeatures: [
      'Merchandising Support',
      'Data Management',
      'Activity Coordination',
      'Process Assistance',
      'Team Support',
      'Reporting Support',
      'Communication Support',
      'Task Coordination'
    ],
    kpiMetrics: [
      'Support Quality',
      'Data Accuracy',
      'Coordination Efficiency',
      'Team Productivity',
      'Process Efficiency',
      'Organization Quality',
      'Reporting Accuracy',
      'Task Completion'
    ],
    customOptions: {
      supportStyle: 'proactive',
      dataFocus: 'accuracy',
      coordinationLevel: 'high',
      teamApproach: 'supportive',
      processStandard: 'efficient'
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
      { id: 'support', enabled: true, name: 'Merchandising Support', description: 'Supports merchandising' },
      { id: 'data', enabled: true, name: 'Data Manager', description: 'Manages merchandising data' },
      { id: 'coordinate', enabled: true, name: 'Activity Coordinator', description: 'Coordinates activities' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'merch_assist_1', name: 'Merchandising Support', category: 'Support', description: 'Support merchandising', level: 'expert' },
      { id: 'merch_assist_2', name: 'Data Management', category: 'Data', description: 'Manage data', level: 'expert' },
      { id: 'merch_assist_3', name: 'Activity Coordination', category: 'Coordination', description: 'Coordinate activities', level: 'expert' },
      { id: 'merch_assist_4', name: 'Process Assistance', category: 'Process', description: 'Assist with processes', level: 'expert' },
      { id: 'merch_assist_5', name: 'Team Support', category: 'Team', description: 'Support teams', level: 'expert' }
    ],
    personality: [
      { trait: 'Supportive', value: 10, description: 'Highly supportive' },
      { trait: 'Organization', value: 10, description: 'Excellent organization' },
      { trait: 'Coordination', value: 10, description: 'Excellent coordination' },
      { trait: 'Detail Oriented', value: 10, description: 'Meticulous attention to detail' },
      { trait: 'Team Focus', value: 10, description: 'Team-focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
