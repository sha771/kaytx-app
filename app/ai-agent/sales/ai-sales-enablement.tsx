import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-enablement',
    name: 'ai-sales-enablement',
    title: 'ai-sales-enablement',
    description: 'The ai-sales-enablement AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: DollarSign,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'ai-sales-enablement',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 806,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Sales',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
