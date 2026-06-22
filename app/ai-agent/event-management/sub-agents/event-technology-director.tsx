import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Laptop } from 'lucide-react-native';

export default function EventTechnologyDirectorPage() {
  const agent = {
    id: 'event-technology-director',
    name: 'AI Event Technology Director',
    title: 'AI Event Technology Director',
    description: 'The AI Event Technology Director manages event technology infrastructure, oversees audiovisual systems, implements event tech solutions, and ensures seamless technology integration across all event types and scales.',
    capabilities: ["Event Technology","Audiovisual Systems","Tech Infrastructure","Event Solutions","Technology Integration","Live Event Tech","Virtual Events","Hybrid Events","Tech Support","Event Innovation"],
    icon: Laptop,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$135k/year',
    aiCost: '$4k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'event-technology-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,000',
      tasksAutomatedDaily: 440,
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'director',
      reportsTo: 'chief-event-officer',
      manages: ['av-manager', 'tech-support-lead', 'innovation-specialist'],
    },
    specializedCapabilities: [
      'Event Technology',
      'Audiovisual Systems',
      'Tech Infrastructure',
      'Event Solutions',
      'Technology Integration',
      'Live Event Tech',
      'Virtual Events',
      'Hybrid Events'
    ],
    integrationOptions: [
      'Event Tech Platforms',
      'AV Systems',
      'Live Streaming',
      'Virtual Event Platforms',
      'Hybrid Event Tools',
      'Technology Support',
      'Innovation Labs',
      'Event Management'
    ],
    automationFeatures: [
      'Technology Management',
      'AV Systems',
      'Event Solutions',
      'Technology Integration',
      'Live Event Tech',
      'Virtual Events',
      'Hybrid Events',
      'Tech Support'
    ],
    kpiMetrics: [
      'Technology Reliability',
      'AV Quality',
      'Tech Innovation',
      'Virtual Event Success',
      'Hybrid Event Performance',
      'Tech Support Response',
      'Infrastructure Uptime',
      'Event Satisfaction'
    ],
    customOptions: {
      technologyStrategy: 'cutting-edge',
      avStandard: 'premium',
      virtualCapability: 'advanced',
      hybridFocus: 'seamless',
      innovationPriority: 'high'
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
      { id: 'tech', enabled: true, name: 'Tech Innovator', description: 'Innovates event technology' },
      { id: 'av', enabled: true, name: 'AV Optimizer', description: 'Optimizes audiovisual systems' },
      { id: 'integration', enabled: true, name: 'Integration Manager', description: 'Manages technology integration' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'etech_1', name: 'Event Technology', category: 'Technology', description: 'Manage event technology', level: 'expert' },
      { id: 'etech_2', name: 'Audiovisual Systems', category: 'AV', description: 'Manage AV systems', level: 'expert' },
      { id: 'etech_3', name: 'Tech Infrastructure', category: 'Infrastructure', description: 'Manage tech infrastructure', level: 'expert' },
      { id: 'etech_4', name: 'Virtual Events', category: 'Virtual', description: 'Produce virtual events', level: 'expert' },
      { id: 'etech_5', name: 'Technology Integration', category: 'Integration', description: 'Integrate event technology', level: 'expert' }
    ],
    personality: [
      { trait: 'Technical Excellence', value: 10, description: 'Technical expert' },
      { trait: 'Innovation', value: 10, description: 'Technology innovator' },
      { trait: 'Problem Solving', value: 10, description: 'Exceptional problem solver' },
      { trait: 'Reliability', value: 10, description: 'Highly reliable' },
      { trait: 'Adaptability', value: 9, description: 'Adaptable to new technology' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}