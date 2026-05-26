import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cmo',
    name: 'cmo',
    title: 'cmo',
    description: 'The cmo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$3k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'cmo',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 745,
      responseTime: '1.6s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Marketing-growth',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
