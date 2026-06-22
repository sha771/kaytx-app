import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Knife } from 'lucide-react-native';

export default function PrepCookPage() {
  const agent = {
    id: 'prep-cook',
    name: 'AI Prep Cook',
    title: 'AI Prep Cook',
    description: 'The AI Prep Cook handles food preparation, ingredient prep, and ensures kitchen readiness for service.',
    capabilities: ["Food Preparation","Ingredient Prep","Kitchen Readiness","Prep Organization","Food Safety","Prep Efficiency","Ingredient Management","Quality Control","Prep Standards","Prep Excellence"],
    icon: Knife,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$40k/year',
    aiCost: '$2k/year',
    efficiency: '16x efficiency improvement',
    replacesRole: 'prep-cook',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 220,
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
      'Food Preparation',
      'Ingredient Prep',
      'Kitchen Readiness',
      'Prep Organization',
      'Food Safety',
      'Prep Efficiency',
      'Ingredient Management',
      'Quality Control'
    ],
    integrationOptions: [
      'Recipe Management',
      'Inventory Systems',
      'Prep Lists',
      'Quality Control',
      'Safety Systems',
      'Organization Tools',
      'Prep Analytics',
      'Kitchen Systems'
    ],
    automationFeatures: [
      'Food Preparation',
      'Ingredient Prep',
      'Kitchen Readiness',
      'Prep Organization',
      'Food Safety',
      'Prep Efficiency',
      'Ingredient Management',
      'Quality Control'
    ],
    kpiMetrics: [
      'Prep Efficiency',
      'Food Quality',
      'Kitchen Readiness',
      'Ingredient Accuracy',
      'Food Safety',
      'Prep Organization',
      'Quality Standards',
      'Prep Excellence'
    ],
    customOptions: {
      prepStyle: 'organized',
      qualityStandard: 'high',
      efficiencyFocus: 'speed',
      organizationLevel: 'meticulous',
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
      { id: 'prep', enabled: true, name: 'Prep Cook', description: 'Prepares food' },
      { id: 'ingredient', enabled: true, name: 'Ingredient Manager', description: 'Manages ingredients' },
      { id: 'organize', enabled: true, name: 'Prep Organizer', description: 'Organizes prep' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'prep_cook_1', name: 'Food Preparation', category: 'Preparation', description: 'Prepare food', level: 'expert' },
      { id: 'prep_cook_2', name: 'Ingredient Prep', category: 'Ingredient', description: 'Prep ingredients', level: 'expert' },
      { id: 'prep_cook_3', name: 'Kitchen Readiness', category: 'Readiness', description: 'Ensure kitchen readiness', level: 'expert' },
      { id: 'prep_cook_4', name: 'Prep Organization', category: 'Organization', description: 'Organize prep', level: 'expert' },
      { id: 'prep_cook_5', name: 'Food Safety', category: 'Safety', description: 'Ensure food safety', level: 'expert' }
    ],
    personality: [
      { trait: 'Organization', value: 10, description: 'Excellent organization' },
      { trait: 'Efficiency', value: 10, description: 'Highly efficient' },
      { trait: 'Quality Focus', value: 10, description: 'Focused on quality' },
      { trait: 'Preparation', value: 10, description: 'Excellent preparation skills' },
      { trait: 'Teamwork', value: 10, description: 'Excellent team player' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
