import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'board-relations-2',
    name: 'Board Relations Specialist 2',
    title: 'Board Meeting Coordinator',
    description: 'Coordinates board meetings, prepares board materials, and manages meeting logistics.',
    capabilities: ["Meeting Coordination","Board Materials","Meeting Logistics","Agenda Planning","Minutes Management"],
    icon: FileText,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$140k/year',
    aiCost: '$3k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'Board Relations Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$11k',
      tasksAutomatedDaily: 172,
      responseTime: '0.5s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
