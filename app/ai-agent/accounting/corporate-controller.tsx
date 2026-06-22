import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'corporate-controller',
    name: 'Corporate Controller',
    title: 'Corporate Controller',
    description: 'Senior controller overseeing all accounting operations across multiple entities and business units.',
    capabilities: [
      "Corporate Accounting Oversight",
      "Multi-Entity Management",
      "Financial Reporting Leadership",
      "Policy Development",
      "Team Leadership",
      "Strategic Support"
    ],
    icon: Building2,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$2.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Corporate Controller',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$12.3',
      tasksAutomatedDaily: 3456,
      responseTime: '0.5s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
