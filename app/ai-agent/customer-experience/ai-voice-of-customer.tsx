import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageCircle } from 'lucide-react-native';

export default function AIVoiceOfCustomerPage() {
  const agent = {
    id: 'ai-voice-of-customer',
    name: 'AI Voice of Customer',
    title: 'AI Voice of Customer',
    description: 'The AI Voice of Customer captures, analyzes, and amplifies customer feedback across all channels to drive customer-centric decisions.',
    capabilities: ["Task Automation","Data Processing","Voice of Customer Analysis","Feedback Collection","Sentiment Analysis","Communication","Analytics","Customer Intelligence"],
    icon: MessageCircle,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'voice-of-customer-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 358,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'management',
      reportsTo: 'chief-customer-officer',
      manages: [],
    },
    specializedCapabilities: [
      'Voice of Customer Analysis',
      'Feedback Collection',
      'Sentiment Analysis',
      'Communication',
      'Analytics',
      'Customer Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Feedback Platforms',
      'Social Media',
      'Survey Tools',
      'Analytics Systems',
      'Communication Platforms',
      'Customer Data',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Voice of Customer Analysis',
      'Feedback Collection',
      'Sentiment Analysis',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Customer Intelligence'
    ],
    kpiMetrics: [
      'Voice of Customer Score',
      'Feedback Collection Rate',
      'Sentiment Analysis Accuracy',
      'Communication Effectiveness',
      'Customer Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      vocFocus: 'high',
      feedbackEfficiency: 'maximum',
      sentimentAccuracy: 'optimized',
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
      { id: 'voc', enabled: true, name: 'Voice of Customer Engine', description: 'Analyzes customer voice' },
      { id: 'feedback', enabled: true, name: 'Feedback Collector', description: 'Collects feedback' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Analyzer', description: 'Analyzes sentiment' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cx_1', name: 'Voice of Customer Analysis', category: 'VOC', description: 'Analyze customer voice', level: 'expert' },
      { id: 'cx_2', name: 'Feedback Collection', category: 'Feedback', description: 'Collect feedback', level: 'expert' },
      { id: 'cx_3', name: 'Sentiment Analysis', category: 'Sentiment', description: 'Analyze sentiment', level: 'expert' },
      { id: 'cx_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'cx_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Customer Focus', value: 10, description: 'Customer focused' },
      { trait: 'Analysis Skills', value: 10, description: 'Strong analysis' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Insight Generation', value: 10, description: 'Insight generator' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
