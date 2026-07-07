import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-release-planner',
    name: 'AI Adaptive Release Planner',
    title: 'Adaptive Release Planner',
    description: 'Adaptive release planning and scheduling with AI',
    capabilities: ["Release Planning","Scheduling","Deployment Coordination","Release Management"],
    icon: Calendar,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$102k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Release Planner',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.3k',
      tasksAutomatedDaily: 256,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
