import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cog } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'accounting-systems-administrator',
    name: 'Accounting Systems Administrator',
    title: 'Accounting Systems Administrator',
    description: 'Administrator managing accounting system configurations, user access, security, and system maintenance.',
    capabilities: [
      "System Configuration",
      "User Access Management",
      "System Security",
      "Maintenance Coordination",
      "Troubleshooting",
      "System Upgrades"
    ],
    icon: Cog,
    color: '#4527A0',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Accounting Systems Administrator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
