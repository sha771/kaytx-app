import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'community-manager',
    name: 'AI Community Manager',
    title: 'Social Media',
    description: 'Manages online communities, responds to comments, and builds brand loyalty.',
    capabilities: ["Community Engagement","Comment Management","Brand Loyalty Building"],
    icon: User,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$51k/year',
    aiCost: '$1k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'Social Media',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1305,
      responseTime: '0.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Social-media',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
