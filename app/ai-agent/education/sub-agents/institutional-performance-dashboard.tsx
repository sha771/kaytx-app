import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Gauge } from 'lucide-react-native';

export default function InstitutionalPerformanceDashboardPage() {
  const agent = {
    id: 'institutional-performance-dashboard',
    name: 'AI Institutional Performance Dashboard',
    title: 'Education Agent',
    description: 'Automated Institutional Performance Dashboard agent specializing in institutional metrics with advanced AI capabilities for KPI tracking, performance visualization, and strategic insights.',
    capabilities: ["KPI Tracking","Performance Visualization","Strategic Insights","Benchmarking","Trend Analysis","Executive Reporting"],
    icon: Gauge,
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$56k/year',
    aiCost: '$1.1k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Institutional Effectiveness Director',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,700',
      tasksAutomatedDaily: 55,
      responseTime: '<3s',
      accuracyRate: '97%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}