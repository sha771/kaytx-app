import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-hr-analytics',
    name: 'AI Real-Time HR Analytics',
    title: 'Real-Time HR Analytics',
    description: 'Real-time HR analytics and insights with AI',
    capabilities: ["HR Analytics","Real-Time Insights","Data Analysis","HR Intelligence"],
    icon: BarChart3,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$100k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'HR Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.1k',
      tasksAutomatedDaily: 278,
      responseTime: '0.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
