import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Trophy } from 'lucide-react-native';

export default function SalesCoachPage() {
  const agent = {
    id: 'sales-coach',
    name: 'AI Sales Coach',
    title: 'AI Sales Coach',
    description: 'The AI Sales Coach provides real-time coaching and feedback to sales representatives during calls and interactions.',
    capabilities: ["Task Automation","Data Processing","Sales Coaching","Real-time Feedback","Interaction Analysis","Communication","Analytics","Sales Intelligence"],
    icon: Trophy,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$74k/year',
    aiCost: '$4k/year',
    efficiency: '19x efficiency improvement',
    replacesRole: 'sales-coach',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,800',
      tasksAutomatedDaily: 318,
      responseTime: '0.6s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'coach',
      reportsTo: 'sales-training-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Sales Coaching',
      'Real-time Feedback',
      'Interaction Analysis',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Coaching Platforms',
      'Call Analysis Tools',
      'Real-time Systems',
      'Communication Platforms',
      'Coaching Data',
      'Interaction Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Sales Coaching',
      'Real-time Feedback',
      'Interaction Analysis',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Coaching Quality',
      'Feedback Impact',
      'Analysis Accuracy',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      coachingFocus: 'high',
      feedbackEfficiency: 'maximum',
      analysisAccuracy: 'optimized',
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
      { id: 'coaching', enabled: true, name: 'Sales Coach', description: 'Coaches sales' },
      { id: 'feedback', enabled: true, name: 'Real-time Feedback Provider', description: 'Provides real-time feedback' },
      { id: 'analysis', enabled: true, name: 'Interaction Analyzer', description: 'Analyzes interactions' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Sales Coaching', category: 'Coaching', description: 'Coach sales', level: 'expert' },
      { id: 'sales_2', name: 'Real-time Feedback', category: 'Feedback', description: 'Provide real-time feedback', level: 'expert' },
      { id: 'sales_3', name: 'Interaction Analysis', category: 'Analysis', description: 'Analyze interactions', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Coaching Expertise', value: 10, description: 'Coaching expertise' },
      { trait: 'Feedback Focus', value: 10, description: 'Feedback oriented' },
      { trait: 'Analysis Skills', value: 10, description: 'Analysis skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
