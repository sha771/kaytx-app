import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'inventory-specialist',
    name: 'inventory-specialist',
    title: 'inventory-specialist',
    description: 'The inventory-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$1k/year',
    efficiency: '72x efficiency improvement',
    replacesRole: 'inventory-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1387,
      responseTime: '1.4s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
