import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sales-enablement',
    name: 'sales-enablement',
    title: 'sales-enablement',
    description: 'The sales-enablement AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: DollarSign,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'sales-enablement',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1126,
      responseTime: '1.6s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Sales',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
