import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCog } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'assistant-controller',
    name: 'Assistant Controller',
    title: 'Assistant Controller',
    description: 'Assistant controller supporting the controller in managing accounting operations, financial reporting, and internal controls.',
    capabilities: [
      "Accounting Operations Support",
      "Financial Reporting Oversight",
      "Internal Control Monitoring",
      "Team Coordination",
      "Process Improvement",
      "Controller Delegation Support"
    ],
    icon: UserCog,
    color: '#1976D2',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Assistant Controller',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.4',
      tasksAutomatedDaily: 2543,
      responseTime: '0.7s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
