import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'seo-agent',
    name: 'seo-agent',
    title: 'seo-agent',
    description: 'The seo-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Search,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'seo-agent',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 703,
      responseTime: '1.1s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
