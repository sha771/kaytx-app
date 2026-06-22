import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'compliance-trading',
    name: 'compliance-trading',
    title: 'compliance-trading',
    description: 'The compliance-trading AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1k/year',
    efficiency: '75x efficiency improvement',
    replacesRole: 'compliance-trading',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1028,
      responseTime: '1.4s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Trading',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
