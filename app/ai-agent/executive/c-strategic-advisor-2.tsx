import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Crown } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'c-strategic-advisor-2',
    name: 'C-Level Strategic Advisor 2',
    title: 'Business Strategy Advisor',
    description: 'Advises on business strategy, growth opportunities, and organizational development.',
    capabilities: ["Business Strategy","Growth Planning","Organizational Design","Market Entry Strategy","M&A Advisory"],
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
      tasksAutomatedDaily: 245,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
