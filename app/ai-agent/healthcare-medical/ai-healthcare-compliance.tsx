import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-healthcare-compliance',
    name: 'ai-healthcare-compliance',
    title: 'ai-healthcare-compliance',
    description: 'The ai-healthcare-compliance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$1k/year',
    efficiency: '72x efficiency improvement',
    replacesRole: 'ai-healthcare-compliance',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1472,
      responseTime: '1.2s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Healthcare',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
