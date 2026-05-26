import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-directors',
    name: 'VP & Director Level',
    title: 'Vice Presidents & Directors',
    description: 'The VP and Director level represents senior leadership responsible for departmental strategy execution. These agents translate C-Suite vision into actionable plans, manage departmental operations, and oversee team performance across all business units.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$248k/year',
    aiCost: '$4k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Vice Presidents & Directors',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18',
      tasksAutomatedDaily: 663,
      responseTime: '0.4s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Hierarchy',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
