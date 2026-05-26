import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'hr-compliance',
    name: 'hr-compliance',
    title: 'hr-compliance',
    description: 'The hr-compliance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$99k/year',
    aiCost: '$1k/year',
    efficiency: '99x efficiency improvement',
    replacesRole: 'hr-compliance',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 914,
      responseTime: '1.2s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Hr',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
