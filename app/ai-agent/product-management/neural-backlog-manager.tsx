import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-backlog-manager',
    name: 'AI Neural Backlog Manager',
    title: 'Neural Backlog Manager',
    description: 'Neural backlog management and prioritization with AI',
    capabilities: ["Backlog Management","Prioritization","Sprint Planning","Agile Management"],
    icon: FileText,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Backlog Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.7k',
      tasksAutomatedDaily: 289,
      responseTime: '0.6s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
