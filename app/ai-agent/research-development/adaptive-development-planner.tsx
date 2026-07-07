import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-development-planner',
    name: 'AI Adaptive Development Planner',
    title: 'Adaptive Development Planner',
    description: 'Adaptive development planning and scheduling with AI',
    capabilities: ["Development Planning","Scheduling","Resource Management","Timeline Optimization"],
    icon: Calendar,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Development Planner',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 267,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
