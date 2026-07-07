import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Activity } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-public-health',
    name: 'AI Real-Time Public Health',
    title: 'Real-Time Public Health',
    description: 'Real-time public health monitoring and response with AI',
    capabilities: ["Public Health","Real-Time Monitoring","Health Response","Disease Tracking"],
    icon: Activity,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$100k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Public Health Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.1k',
      tasksAutomatedDaily: 267,
      responseTime: '0.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
