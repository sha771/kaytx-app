import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function BudgetTravelAdvisorPage() {
  const agent = {
    id: 'budget-travel-advisor',
    name: 'AI Budget Travel Advisor',
    title: 'AI Budget Travel Advisor',
    description: 'The AI Budget Travel Advisor provides cost-effective travel solutions, finds budget deals, and maximizes value for budget-conscious travelers.',
    capabilities: ["Task Automation","Data Processing","Budget Travel Management","Deal Finding","Cost Optimization","Value Maximization","Communication","Budget Planning","Service Delivery","Traveler Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$42k/year',
    aiCost: '$2k/year',
    efficiency: '21x efficiency improvement',
    replacesRole: 'budget-travel-advisor',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,300',
      tasksAutomatedDaily: 230,
      responseTime: '0.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'booking-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Budget Travel Management',
      'Deal Finding',
      'Cost Optimization',
      'Value Maximization',
      'Communication',
      'Budget Planning',
      'Service Delivery',
      'Traveler Satisfaction'
    ],
    integrationOptions: [
      'Budget Travel Platforms',
      'Deal Aggregators',
      'Price Comparison Tools',
      'Communication Platforms',
      'Travel Apps',
      'Budget Planning Systems',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Deal Finding',
      'Price Comparison',
      'Budget Planning',
      'Cost Optimization',
      'Traveler Communication',
      'Value Tracking',
      'Savings Monitoring',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Cost Savings',
      'Deal Quality',
      'Budget Adherence',
      'Traveler Satisfaction',
      'Value Delivery',
      'Communication Effectiveness',
      'Traveler Experience',
      'Budget Efficiency'
    ],
    customOptions: {
      budgetFocus: 'high',
      dealQuality: 'verified',
      costOptimization: 'maximum',
      valueDelivery: 'exceptional',
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
      { id: 'budget', enabled: true, name: 'Budget Engine', description: 'Manages budget travel' },
      { id: 'deal', enabled: true, name: 'Deal Finder', description: 'Finds best deals' },
      { id: 'value', enabled: true, name: 'Value Optimizer', description: 'Maximizes value' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Budget Travel Management', category: 'Budget', description: 'Manage budget travel', level: 'expert' },
      { id: 'travel_2', name: 'Deal Finding', category: 'Research', description: 'Find deals', level: 'expert' },
      { id: 'travel_3', name: 'Cost Optimization', category: 'Finance', description: 'Optimize costs', level: 'expert' },
      { id: 'travel_4', name: 'Value Maximization', category: 'Service', description: 'Maximize value', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Value Focus', value: 10, description: 'Focus on value' },
      { trait: 'Cost Conscious', value: 10, description: 'Cost conscious' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
