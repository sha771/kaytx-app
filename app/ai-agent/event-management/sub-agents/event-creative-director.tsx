import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Palette } from 'lucide-react-native';

export default function EventCreativeDirectorPage() {
  const agent = {
    id: 'event-creative-director',
    name: 'AI Event Creative Director',
    title: 'AI Event Creative Director',
    description: 'The AI Event Creative Director oversees creative direction for events, manages design and theme development, coordinates visual elements, and ensures memorable and impactful event experiences through creative excellence.',
    capabilities: ["Creative Direction","Event Design","Theme Development","Visual Elements","Brand Integration","Creative Strategy","Design Management","Event Atmosphere","Creative Innovation","Experience Design"],
    icon: Palette,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$5k/year',
    efficiency: '29x efficiency improvement',
    replacesRole: 'event-creative-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,500',
      tasksAutomatedDaily: 440,
      responseTime: '1.3s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'director',
      reportsTo: 'chief-event-officer',
      manages: ['design-manager', 'theme-specialist', 'creative-lead'],
    },
    specializedCapabilities: [
      'Creative Direction',
      'Event Design',
      'Theme Development',
      'Visual Elements',
      'Brand Integration',
      'Creative Strategy',
      'Design Management',
      'Event Atmosphere'
    ],
    integrationOptions: [
      'Design Tools',
      'Creative Platforms',
      'Visual Systems',
      'Brand Management',
      'Theme Development',
      'Experience Design',
      'Creative Collaboration',
      'Event Planning'
    ],
    automationFeatures: [
      'Creative Direction',
      'Event Design',
      'Theme Development',
      'Visual Elements',
      'Brand Integration',
      'Creative Strategy',
      'Design Management',
      'Event Atmosphere'
    ],
    kpiMetrics: [
      'Creative Excellence',
      'Design Impact',
      'Theme Success',
      'Visual Consistency',
      'Brand Integration',
      'Guest Experience',
      'Creative Innovation',
      'Atmosphere Rating'
    ],
    customOptions: {
      creativeApproach: 'innovative',
      designStandard: 'exceptional',
      themeStrategy: 'memorable',
      visualImpact: 'high',
      experienceFocus: 'immersive'
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
      { id: 'creative', enabled: true, name: 'Creative Director', description: 'Directs event creativity' },
      { id: 'design', enabled: true, name: 'Design Innovator', description: 'Innovates event design' },
      { id: 'theme', enabled: true, name: 'Theme Developer', description: 'Develops event themes' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ecreative_1', name: 'Creative Direction', category: 'Creative', description: 'Direct event creativity', level: 'expert' },
      { id: 'ecreative_2', name: 'Event Design', category: 'Design', description: 'Design event experiences', level: 'expert' },
      { id: 'ecreative_3', name: 'Theme Development', category: 'Theme', description: 'Develop event themes', level: 'expert' },
      { id: 'ecreative_4', name: 'Visual Elements', category: 'Visual', description: 'Manage visual elements', level: 'expert' },
      { id: 'ecreative_5', name: 'Experience Design', category: 'Experience', description: 'Design event experiences', level: 'expert' }
    ],
    personality: [
      { trait: 'Creativity', value: 10, description: 'Exceptionally creative' },
      { trait: 'Design Excellence', value: 10, description: 'Design expert' },
      { trait: 'Innovation', value: 10, description: 'Creative innovator' },
      { trait: 'Visual Sense', value: 10, description: 'Strong visual sensibility' },
      { trait: 'Experience Focus', value: 9, description: 'Experience-oriented designer' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}