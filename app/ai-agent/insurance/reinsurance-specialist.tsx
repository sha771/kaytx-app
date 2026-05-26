import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'reinsurance-specialist',
    name: 'reinsurance-specialist',
    title: 'reinsurance-specialist',
    description: 'The reinsurance-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$83k/year',
    aiCost: '$1k/year',
    efficiency: '83x efficiency improvement',
    replacesRole: 'reinsurance-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1469,
      responseTime: '0.5s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Insurance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
