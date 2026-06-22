import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'soc-manager-enterprise',
    name: 'soc-manager-enterprise',
    title: 'soc-manager-enterprise',
    description: 'The soc-manager-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'soc-manager-enterprise',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1196,
      responseTime: '0.9s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Security',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
