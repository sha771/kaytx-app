import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Network } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-collaboration-platform',
    name: 'AI Cognitive Collaboration Platform',
    title: 'Cognitive Collaboration Platform',
    description: 'Research collaboration and knowledge sharing with cognitive AI',
    capabilities: ["Collaboration Platform","Knowledge Sharing","Team Coordination","Research Networking"],
    icon: Network,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$88k/year',
    aiCost: '$2.3k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Collaboration Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.1k',
      tasksAutomatedDaily: 345,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
