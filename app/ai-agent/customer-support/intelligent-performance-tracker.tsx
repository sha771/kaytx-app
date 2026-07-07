import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-performance-tracker',
    name: 'AI Intelligent Performance Tracker',
    title: 'Intelligent Performance Tracker',
    description: 'Support performance tracking and metrics with intelligent analytics',
    capabilities: ["Performance Tracking","Metrics Analytics","KPI Management","Reporting"],
    icon: PieChart,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$67k/year',
    aiCost: '$1.7k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'Performance Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.4k',
      tasksAutomatedDaily: 401,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
