import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Salad } from 'lucide-react-native';

export default function PantryCookPage() {
  const agent = {
    id: 'pantry-cook',
    name: 'AI Pantry Cook',
    title: 'AI Pantry Cook',
    description: 'The AI Pantry Cook handles cold food preparation, salads, appetizers, and ensures fresh cold food quality.',
    capabilities: ["Cold Food Preparation","Salad Preparation","Appetizers","Cold Food Quality","Fresh Ingredients","Pantry Station","Food Presentation","Food Safety","Pantry Standards","Pantry Excellence"],
    icon: Salad,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$40k/year',
    aiCost: '$2k/year',
    efficiency: '16x efficiency improvement',
    replacesRole: 'pantry-cook',
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
      reportsTo: 'sous-chef',
      manages: [],
    },
    specializedCapabilities: [
      'Cold Food Preparation',
      'Salad Preparation',
      'Appetizers',
      'Cold Food Quality',
      'Fresh Ingredients',
      'Pantry Station',
      'Food Presentation',
      'Food Safety'
    ],
    integrationOptions: [
      'Recipe Management',
      'Inventory Systems',
      'Quality Control',
      'Pantry Management',
      'Safety Systems',
      'Presentation Tools',
      'Fresh Food Systems',
      'Pantry Analytics'
    ],
    automationFeatures: [
      'Cold Food Preparation',
      'Salad Preparation',
      'Appetizer Creation',
      'Quality Control',
      'Food Presentation',
      'Fresh Ingredient Management',
      'Food Safety',
      'Pantry Standards'
    ],
    kpiMetrics: [
      'Cold Food Quality',
      'Freshness',
      'Presentation Quality',
      'Preparation Speed',
      'Food Safety',
      'Ingredient Quality',
      'Pantry Standards',
      'Pantry Excellence'
    ],
    customOptions: {
      pantryStyle: 'fresh',
      qualityStandard: 'high',
      presentationFocus: 'artistic',
      freshnessPriority: 'peak',
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
      { id: 'pantry', enabled: true, name: 'Pantry Cook', description: 'Cooks pantry items' },
      { id: 'fresh', enabled: true, name: 'Freshness Manager', description: 'Manages freshness' },
      { id: 'present', enabled: true, name: 'Presentation Specialist', description: 'Specializes in presentation' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'pantry_cook_1', name: 'Cold Food Preparation', category: 'Preparation', description: 'Prepare cold food', level: 'expert' },
      { id: 'pantry_cook_2', name: 'Salad Preparation', category: 'Salad', description: 'Prepare salads', level: 'expert' },
      { id: 'pantry_cook_3', name: 'Appetizers', category: 'Appetizer', description: 'Prepare appetizers', level: 'expert' },
      { id: 'pantry_cook_4', name: 'Food Presentation', category: 'Presentation', description: 'Present food', level: 'expert' },
      { id: 'pantry_cook_5', name: 'Food Safety', category: 'Safety', description: 'Ensure food safety', level: 'expert' }
    ],
    personality: [
      { trait: 'Freshness', value: 10, description: 'Obsessed with freshness' },
      { trait: 'Presentation', value: 10, description: 'Excellent presentation skills' },
      { trait: 'Quality Focus', value: 10, description: 'Focused on quality' },
      { trait: 'Precision', value: 10, description: 'Precise preparation' },
      { trait: 'Teamwork', value: 10, description: 'Excellent team player' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
