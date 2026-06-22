import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function EventMarketingDirectorPage() {
  const agent = {
    id: 'event-marketing-director',
    name: 'AI Event Marketing Director',
    title: 'AI Event Marketing Director',
    description: 'The AI Event Marketing Director leads event marketing strategy, manages promotional campaigns, oversees attendee acquisition, and drives event awareness and attendance across all event types.',
    capabilities: ["Event Marketing Strategy","Promotional Campaigns","Attendee Acquisition","Event Awareness","Digital Marketing","Social Media","Content Marketing","Brand Integration","Marketing Analytics","Event Promotion"],
    icon: Megaphone,
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$140k/year',
    aiCost: '$4k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'event-marketing-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,500',
      tasksAutomatedDaily: 450,
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'director',
      reportsTo: 'vp-event-marketing',
      manages: ['campaign-manager', 'digital-marketing-lead', 'content-specialist'],
    },
    specializedCapabilities: [
      'Event Marketing Strategy',
      'Promotional Campaigns',
      'Attendee Acquisition',
      'Event Awareness',
      'Digital Marketing',
      'Social Media',
      'Content Marketing',
      'Brand Integration'
    ],
    integrationOptions: [
      'Marketing Platforms',
      'Campaign Management',
      'Social Media',
      'Digital Marketing',
      'Content Systems',
      'Analytics Tools',
      'Brand Management',
      'Event Platforms'
    ],
    automationFeatures: [
      'Marketing Strategy',
      'Promotional Campaigns',
      'Attendee Acquisition',
      'Digital Marketing',
      'Social Media Management',
      'Content Marketing',
      'Brand Integration',
      'Marketing Analytics'
    ],
    kpiMetrics: [
      'Event Attendance',
      'Marketing ROI',
      'Campaign Performance',
      'Attendee Acquisition Cost',
      'Brand Awareness',
      'Social Media Engagement',
      'Content Performance',
      'Event Conversion'
    ],
    customOptions: {
      marketingStrategy: 'integrated',
      promotionalApproach: 'multi-channel',
      digitalFocus: 'primary',
      contentStrategy: 'engaging',
      brandIntegration: 'seamless'
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
      { id: 'marketing', enabled: true, name: 'Marketing Optimizer', description: 'Optimizes event marketing' },
      { id: 'campaign', enabled: true, name: 'Campaign Manager', description: 'Manages promotional campaigns' },
      { id: 'acquisition', enabled: true, name: 'Acquisition Engine', description: 'Drives attendee acquisition' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'emarket_1', name: 'Event Marketing Strategy', category: 'Marketing', description: 'Develop marketing strategies', level: 'expert' },
      { id: 'emarket_2', name: 'Promotional Campaigns', category: 'Campaigns', description: 'Manage promotional campaigns', level: 'expert' },
      { id: 'emarket_3', name: 'Attendee Acquisition', category: 'Acquisition', description: 'Acquire event attendees', level: 'expert' },
      { id: 'emarket_4', name: 'Digital Marketing', category: 'Digital', description: 'Lead digital marketing', level: 'expert' },
      { id: 'emarket_5', name: 'Content Marketing', category: 'Content', description: 'Create marketing content', level: 'expert' }
    ],
    personality: [
      { trait: 'Marketing Excellence', value: 10, description: 'Exceptional marketing skills' },
      { trait: 'Creativity', value: 10, description: 'Creative marketing approach' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic marketing planner' },
      { trait: 'Communication', value: 10, description: 'Excellent communicator' },
      { trait: 'Results Focus', value: 10, description: 'Results-driven marketer' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}