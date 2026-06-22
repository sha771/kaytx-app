import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Crown } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'c-strategic-advisor-1',
    name: 'C-Level Strategic Advisor 1',
    title: 'Strategic Planning Advisor',
    description: 'Provides high-level strategic planning guidance and decision support for C-level executives.',
    capabilities: ["Strategic Planning","Executive Decision Support","Market Analysis","Risk Assessment","Competitive Intelligence"],
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
      tasksAutomatedDaily: 250,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
