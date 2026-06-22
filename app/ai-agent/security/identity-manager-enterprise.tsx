import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'identity-manager-enterprise',
    name: 'identity-manager-enterprise',
    title: 'identity-manager-enterprise',
    description: 'The identity-manager-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$54k/year',
    aiCost: '$1k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'identity-manager-enterprise',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1195,
      responseTime: '1.6s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Security',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
