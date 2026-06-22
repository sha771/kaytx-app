import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-kpi-dashboard-builder-agent',
    name: 'ai-kpi-dashboard-builder-agent',
    title: 'ai-kpi-dashboard-builder-agent',
    description: 'The ai-kpi-dashboard-builder-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'ai-kpi-dashboard-builder-agent',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 897,
      responseTime: '0.6s',
      accuracyRate: '98.9%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
