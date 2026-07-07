import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function StrategicCommunicationsDirectorPage() {
  const agent = {
    id: 'strategic-communications-director',
    name: 'AI Strategic Communications Director',
    title: 'AI Strategic Communications Director',
    description: 'The AI Strategic Communications Director manages corporate communications, oversees public relations, handles crisis communications, and ensures consistent strategic messaging across all stakeholder channels.',
    capabilities: ["Strategic Communications","Public Relations","Crisis Communications","Corporate Messaging","Media Relations","Internal Communications","Stakeholder Communications","Brand Voice","Communication Strategy","Reputation Management"],
    icon: MessageSquare,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$5k/year',
    efficiency: '31x efficiency improvement',
    replacesRole: 'strategic-communications-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,500',
      tasksAutomatedDaily: 450,
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive & Strategy',
      level: 'director',
      reportsTo: 'chief-strategy-officer',
      manages: ['pr-manager', 'media-relations', 'internal-communications'],
    },
    specializedCapabilities: [
      'Strategic Communications',
      'Public Relations',
      'Crisis Communications',
      'Corporate Messaging',
      'Media Relations',
      'Internal Communications',
      'Stakeholder Communications',
      'Brand Voice'
    ],
    integrationOptions: [
      'Communications Platforms',
      'PR Management',
      'Media Monitoring',
      'Crisis Systems',
      'Internal Communications',
      'Social Media',
      'Analytics Tools',
      'Reputation Management'
    ],
    automationFeatures: [
      'Strategic Communications',
      'Public Relations',
      'Crisis Communications',
      'Corporate Messaging',
      'Media Relations',
      'Internal Communications',
      'Stakeholder Communications',
      'Reputation Management'
    ],
    kpiMetrics: [
      'Message Consistency',
      'Media Coverage',
      'Crisis Response',
      'Stakeholder Engagement',
      'Brand Voice Alignment',
      'Communication Effectiveness',
      'Reputation Score',
      'Internal Communication Success'
    ],
    customOptions: {
      communicationStrategy: 'strategic',
      crisisReadiness: 'high',
      messagingApproach: 'consistent',
      stakeholderFocus: 'comprehensive',
      reputationPriority: 'paramount'
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
      { id: 'communications', enabled: true, name: 'Communication Strategist', description: 'Strategic communications planning' },
      { id: 'pr', enabled: true, name: 'PR Manager', description: 'Manages public relations' },
      { id: 'crisis', enabled: true, name: 'Crisis Responder', description: 'Responds to communication crises' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'comm_1', name: 'Strategic Communications', category: 'Communications', description: 'Lead strategic communications', level: 'expert' },
      { id: 'comm_2', name: 'Public Relations', category: 'PR', description: 'Manage public relations', level: 'expert' },
      { id: 'comm_3', name: 'Crisis Communications', category: 'Crisis', description: 'Handle crisis communications', level: 'expert' },
      { id: 'comm_4', name: 'Corporate Messaging', category: 'Messaging', description: 'Develop corporate messaging', level: 'expert' },
      { id: 'comm_5', name: 'Media Relations', category: 'Media', description: 'Manage media relations', level: 'expert' }
    ],
    personality: [
      { trait: 'Communication Excellence', value: 10, description: 'Exceptional communicator' },
      { trait: 'Strategic Thinking', value: 10, description: 'Strategic communication planner' },
      { trait: 'Crisis Management', value: 10, description: 'Crisis communication expert' },
      { trait: 'Diplomacy', value: 10, description: 'Skilled diplomat' },
      { trait: 'Message Consistency', value: 10, description: 'Consistent messaging focus' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}