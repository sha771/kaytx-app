import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Flame } from 'lucide-react-native';

export default function LineCookPage() {
  const agent = {
    id: 'line-cook',
    name: 'AI Line Cook',
    title: 'AI Line Cook',
    description: 'The AI Line Cook executes food preparation on the line, maintains food quality standards, and ensures timely food service.',
    capabilities: ["Line Cooking","Food Preparation","Cooking Excellence","Food Quality","Speed","Recipe Execution","Station Management","Kitchen Safety","Food Standards","Cooking Excellence"],
    icon: Flame,
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$45k/year',
    aiCost: '$2k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'line-cook',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$3,600',
      tasksAutomatedDaily: 250,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'head-chef',
      manages: [],
    },
    specializedCapabilities: [
      'Line Cooking',
      'Food Preparation',
      'Cooking Excellence',
      'Food Quality',
      'Speed',
      'Recipe Execution',
      'Station Management',
      'Kitchen Safety'
    ],
    integrationOptions: [
      'Kitchen Display',
      'Recipe Management',
      'Quality Control',
      'Station Management',
      'Safety Systems',
      'Timing Tools',
      'Kitchen Analytics',
      'Prep Systems'
    ],
    automationFeatures: [
      'Line Cooking',
      'Food Preparation',
      'Recipe Execution',
      'Quality Control',
      'Station Management',
      'Kitchen Safety',
      'Food Standards',
      'Timing Management'
    ],
    kpiMetrics: [
      'Food Quality',
      'Cooking Speed',
      'Recipe Accuracy',
      'Station Efficiency',
      'Food Safety',
      'Quality Standards',
      'Preparation Excellence',
      'Cooking Performance'
    ],
    customOptions: {
      cookingStyle: 'precise',
      qualityStandard: 'high',
      speedPriority: 'balanced',
      stationFocus: 'organization',
      safetyPriority: 'high'
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
      { id: 'cook', enabled: true, name: 'Line Cook', description: 'Cooks on line' },
      { id: 'recipe', enabled: true, name: 'Recipe Executor', description: 'Executes recipes' },
      { id: 'quality', enabled: true, name: 'Quality Checker', description: 'Checks food quality' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'line_cook_1', name: 'Line Cooking', category: 'Cooking', description: 'Cook on line', level: 'expert' },
      { id: 'line_cook_2', name: 'Food Preparation', category: 'Preparation', description: 'Prepare food', level: 'expert' },
      { id: 'line_cook_3', name: 'Cooking Excellence', category: 'Excellence', description: 'Ensure cooking excellence', level: 'expert' },
      { id: 'line_cook_4', name: 'Recipe Execution', category: 'Recipe', description: 'Execute recipes', level: 'expert' },
      { id: 'line_cook_5', name: 'Station Management', category: 'Station', description: 'Manage station', level: 'expert' }
    ],
    personality: [
      { trait: 'Culinary Excellence', value: 10, description: 'Committed to culinary excellence' },
      { trait: 'Speed', value: 10, description: 'Fast and efficient' },
      { trait: 'Quality Focus', value: 10, description: 'Focused on quality' },
      { trait: 'Precision', value: 10, description: 'Precise execution' },
      { trait: 'Teamwork', value: 10, description: 'Excellent team player' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
