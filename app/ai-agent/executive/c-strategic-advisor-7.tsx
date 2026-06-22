import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Crown } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'c-strategic-advisor-7',
    name: 'C-Level Strategic Advisor 7',
    title: 'Talent Strategy Advisor',
    description: 'Provides talent strategy guidance, workforce planning, and organizational culture advisory.',
    capabilities: ["Talent Strategy","Workforce Planning","Culture Advisory","Succession Planning","Leadership Development"],
    icon: Crown,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$250k/year',
    aiCost: '$5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'C-Level Strategic Advisor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$20k',
      tasksAutomatedDaily: 240,
      responseTime: '0.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
