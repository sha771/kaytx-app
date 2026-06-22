import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-hr-advisor-1',
    name: 'Executive HR Advisor 1',
    title: 'Executive HR Strategy Advisor',
    description: 'Advises on HR strategy, talent planning, and organizational development for executives.',
    capabilities: ["HR Strategy","Talent Planning","Organizational Development","Executive Compensation","Succession Planning"],
    icon: Users,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3.5k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'Executive HR Advisor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 188,
      responseTime: '0.5s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
