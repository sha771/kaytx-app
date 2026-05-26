import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'healthcare-compliance',
    name: 'healthcare-compliance',
    title: 'healthcare-compliance',
    description: 'The healthcare-compliance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'healthcare-compliance',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 642,
      responseTime: '0.9s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Healthcare',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
