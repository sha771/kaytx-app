import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'talent-acquisition-specialist-3',
    name: 'talent-acquisition-specialist-3',
    title: 'Executive Talent Acquisition Specialist',
    description: 'The Executive Talent Acquisition Specialist AI handles C-suite and senior executive recruitment, managing confidential searches and executive negotiations.',
    capabilities: ["Executive Search","Confidential Screening","Executive Compensation","Board Relations"],
    icon: Target,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$1k/year',
    efficiency: '150x efficiency improvement',
    replacesRole: 'executive-talent-acquisition-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$12.4',
      tasksAutomatedDaily: 1200,
      responseTime: '0.5s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
