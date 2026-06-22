import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'transformation-director-3',
    name: 'Transformation Director 3',
    title: 'Director of Cultural Transformation',
    description: 'Manages cultural transformation, employee experience, and organizational culture change.',
    capabilities: ["Cultural Transformation","Employee Experience","Culture Change","Organizational Development","Cultural Strategy"],
    icon: Layout,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Transformation Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 198,
      responseTime: '0.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
