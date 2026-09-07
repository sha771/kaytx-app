import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-analytics-manager',
    name: 'AI Data Analytics Manager',
    title: 'Data Analytics Manager',
    description: 'AI Data Analytics Manager - Data Analytics Manager level AI agent in the analytics insights department. Part of the Kaytx AI Workforce hierarchy providing specialized analytics insights capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: 'hsl(205, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Data Analytics Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'analytics insights',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
