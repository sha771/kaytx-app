import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function ReviewManagerTravelPage() {
  const agent = {
    id: 'review-manager-travel',
    name: 'AI Review Manager (Travel)',
    title: 'AI Review Manager (Travel)',
    description: 'The AI Review Manager monitors travel reviews, manages reputation, and responds to guest feedback effectively.',
    capabilities: ["Task Automation","Data Processing","Review Monitoring","Reputation Management","Feedback Analysis","Response Management","Communication","Sentiment Analysis","Service Delivery","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$44k/year',
    aiCost: '$2k/year',
    efficiency: '22x efficiency improvement',
    replacesRole: 'review-manager-travel',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,500',
      tasksAutomatedDaily: 240,
      responseTime: '0.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'customer-experience',
      manages: [],
    },
    specializedCapabilities: [
      'Review Monitoring',
      'Reputation Management',
      'Feedback Analysis',
      'Response Management',
      'Communication',
      'Sentiment Analysis',
      'Service Delivery',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Review Platforms',
      'Social Media APIs',
      'Feedback Systems',
      'Communication Tools',
      'Analytics Platforms',
      'Sentiment Analysis',
      'Reputation Management',
      'Guest Apps'
    ],
    automationFeatures: [
      'Review Monitoring',
      'Sentiment Analysis',
      'Response Generation',
      'Reputation Tracking',
      'Feedback Analysis',
      'Guest Communication',
      'Issue Resolution',
      'Performance Tracking'
    ],
    kpiMetrics: [
      'Response Rate',
      'Reputation Score',
      'Guest Satisfaction',
      'Sentiment Improvement',
      'Service Quality',
      'Communication Effectiveness',
      'Guest Experience',
      'Reputation Growth'
    ],
    customOptions: {
      reviewFocus: 'high',
      responseSpeed: 'fast',
      sentimentAccuracy: 'high',
      reputationManagement: 'proactive',
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
      { id: 'review', enabled: true, name: 'Review Monitor', description: 'Monitors reviews' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Analyzer', description: 'Analyzes sentiment' },
      { id: 'response', enabled: true, name: 'Response Generator', description: 'Generates responses' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Review Monitoring', category: 'Monitoring', description: 'Monitor reviews', level: 'expert' },
      { id: 'travel_2', name: 'Reputation Management', category: 'Reputation', description: 'Manage reputation', level: 'expert' },
      { id: 'travel_3', name: 'Feedback Analysis', category: 'Analysis', description: 'Analyze feedback', level: 'expert' },
      { id: 'travel_4', name: 'Response Management', category: 'Communication', description: 'Manage responses', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Responsiveness', value: 10, description: 'Highly responsive' },
      { trait: 'Professionalism', value: 10, description: 'Highly professional' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Empathy', value: 9, description: 'Empathetic approach' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
