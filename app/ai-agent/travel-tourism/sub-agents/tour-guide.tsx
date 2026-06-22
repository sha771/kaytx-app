import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Signpost } from 'lucide-react-native';

export default function TourGuidePage() {
  const agent = {
    id: 'tour-guide',
    name: 'AI Tour Guide',
    title: 'AI Tour Guide',
    description: 'The AI Tour Guide leads tours, provides destination information, ensures guest safety, and delivers engaging and informative tour experiences.",
    capabilities: ["Task Automation","Data Processing","Workflow Management","Tour Leading","Destination Information","Guest Safety","Engagement Delivery","Storytelling","Group Management","Cultural Education"],
    icon: Signpost,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$45k/year',
    aiCost: '$1k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'tour-guide',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,700',
      tasksAutomatedDaily: 300,
      responseTime: '1.0s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'guide',
      reportsTo: 'vp-tour-experiences',
      manages: [],
    },
    specializedCapabilities: [
      'Tour Leading',
      'Destination Information',
      'Guest Safety',
      'Engagement Delivery',
      'Storytelling',
      'Group Management',
      'Cultural Education',
      'Experience Creation'
    ],
    integrationOptions: [
      'Tour Platforms',
      'Information Systems',
      'Communication Tools',
      'Safety Systems',
      'Content Management',
      'Guest Data',
      'Cultural Resources'
    ],
    automationFeatures: [
      'Tour Leading',
      'Information Delivery',
      'Safety Management',
      'Engagement Delivery',
      'Storytelling',
      'Group Management',
      'Cultural Education',
      'Experience Creation'
    ],
    kpiMetrics: [
      'Guest Satisfaction',
      'Information Accuracy',
      'Safety Record',
      'Engagement Level',
      'Storytelling Quality',
      'Group Management',
      'Cultural Education',
      'Experience Quality'
    ],
    customOptions: {
      engagementLevel: 'high',
      informationAccuracy: 'strict',
      safetyPriority: 'high',
      storytellingQuality: 'high',
      culturalEducation: 'high'
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
      { id: 'guide', enabled: true, name: 'Tour Assistant', description: 'Assists with tour leading' },
      { id: 'story', enabled: true, name: 'Storyteller', description: 'Provides storytelling' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'guide_1', name: 'Tour Leading', category: 'Tour', description: 'Lead tours', level: 'expert' },
      { id: 'guide_2', name: 'Destination Information', category: 'Information', description: 'Provide information', level: 'expert' },
      { id: 'guide_3', name: 'Guest Safety', category: 'Safety', description: 'Ensure guest safety', level: 'expert' },
      { id: 'guide_4', name: 'Storytelling', category: 'Storytelling', description: 'Tell stories', level: 'expert' },
      { id: 'guide_5', name: 'Group Management', category: 'Group', description: 'Manage groups', level: 'advanced' }
    ],
    personality: [
      { trait: 'Engagement', value: 10, description: 'Highly engaging' },
      { trait: 'Knowledge', value: 10, description: 'Knowledgeable' },
      { trait: 'Safety Conscious', value: 10, description: 'Safety-conscious' },
      { trait: 'Storytelling', value: 10, description: 'Great storyteller' },
      { trait: 'Guest Focus', value: 9, description: 'Guest-centric' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
