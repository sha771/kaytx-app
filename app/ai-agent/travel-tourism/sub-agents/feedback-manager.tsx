import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageCircle } from 'lucide-react-native';

export default function FeedbackManagerPage() {
  const agent = {
    id: 'feedback-manager',
    name: 'AI Feedback Manager',
    title: 'AI Feedback Manager',
    description: 'The AI Feedback Manager collects and analyzes customer feedback, identifies improvement areas, drives customer satisfaction, and ensures voice of customer is heard and acted upon.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Feedback Collection","Sentiment Analysis","Insight Generation","Improvement Identification","Customer Satisfaction","Voice of Customer","Action Planning"],
    icon: MessageCircle,
    color: '#C2185B',
    type: 'employee' as const,
    humanCost: '$60k/year',
    aiCost: '$1.5k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'feedback-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,900',
      tasksAutomatedDaily: 380,
      responseTime: '1.2s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'manager',
      reportsTo: 'vp-customer-journey',
      manages: [],
    },
    specializedCapabilities: [
      'Feedback Collection',
      'Sentiment Analysis',
      'Insight Generation',
      'Improvement Identification',
      'Customer Satisfaction',
      'Voice of Customer',
      'Action Planning',
      'Trend Analysis'
    ],
    integrationOptions: [
      'Feedback Platforms',
      'Sentiment Analysis Tools',
      'Analytics Systems',
      'Communication Platforms',
      'CRM Systems',
      'Survey Tools',
      'Reporting Platforms'
    ],
    automationFeatures: [
      'Feedback Collection',
      'Sentiment Analysis',
      'Insight Generation',
      'Improvement Identification',
      'Customer Satisfaction',
      'Voice of Customer',
      'Action Planning',
      'Trend Analysis'
    ],
    kpiMetrics: [
      'Feedback Volume',
      'Sentiment Score',
      'Insight Quality',
      'Improvement Rate',
      'Customer Satisfaction',
      'Response Time',
      'Action Completion',
      'Trend Detection'
    ],
    customOptions: {
      feedbackVolume: 'high',
      insightQuality: 'high',
      actionSpeed: 'fast',
      customerSatisfaction: 'high',
      trendDetection: 'high'
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
      { id: 'feedback', enabled: true, name: 'Feedback Analyzer', description: 'Analyzes feedback' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Analyzer', description: 'Analyzes sentiment' },
      { id: 'insight', enabled: true, name: 'Insight Generator', description: 'Generates insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'feedback_mgr_1', name: 'Feedback Collection', category: 'Feedback', description: 'Collect feedback', level: 'expert' },
      { id: 'feedback_mgr_2', name: 'Sentiment Analysis', category: 'Sentiment', description: 'Analyze sentiment', level: 'expert' },
      { id: 'feedback_mgr_3', name: 'Insight Generation', category: 'Insight', description: 'Generate insights', level: 'expert' },
      { id: 'feedback_mgr_4', name: 'Improvement Identification', category: 'Improvement', description: 'Identify improvements', level: 'advanced' },
      { id: 'feedback_mgr_5', name: 'Action Planning', category: 'Action', description: 'Plan actions', level: 'advanced' }
    ],
    personality: [
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric' },
      { trait: 'Analytical', value: 10, description: 'Analytical thinker' },
      { trait: 'Insight Driven', value: 10, description: 'Insight-oriented' },
      { trait: 'Action Oriented', value: 9, description: 'Action-oriented' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
