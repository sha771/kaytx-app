import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'deputy-controller',
    name: 'Deputy Controller',
    title: 'Deputy Controller',
    description: 'Deputy controller acting as second-in-command, managing controller responsibilities in their absence and overseeing major accounting functions.',
    capabilities: [
      "Controller Backup & Support",
      "Financial Reporting Leadership",
      "Strategic Accounting Initiatives",
      "Team Development",
      "Cross-Department Coordination",
      "Risk Management Oversight"
    ],
    icon: User,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1.8k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Deputy Controller',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.2',
      tasksAutomatedDaily: 2654,
      responseTime: '0.6s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
