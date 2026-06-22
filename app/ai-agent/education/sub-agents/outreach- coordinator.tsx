import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Radio } from 'lucide-react-native';

export default function OutreachCoordinatorPage() {
  const agent = {
    id: 'outreach-coordinator',
    name: 'AI Outreach Coordinator',
    title: 'Education Agent',
    description: 'Automated Outreach Coordinator agent specializing in community outreach with advanced AI capabilities for event planning, partnership development, and community engagement.',
    capabilities: ["Event Planning","Partnership Development","Community Engagement","Outreach Analytics","Communication Management","Relationship Building"],
    icon: Radio,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$46k/year',
    aiCost: '$0.9k/year',
    efficiency: '12x efficiency improvement',
    replacesRole: 'Outreach Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,900',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}