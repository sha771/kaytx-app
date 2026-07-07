import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-user-researcher',
    name: 'AI Adaptive User Researcher',
    title: 'Adaptive User Researcher',
    description: 'Adaptive user research and customer insights with AI',
    capabilities: ["User Research","Customer Insights","Adaptive Learning","User Experience"],
    icon: Users,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'User Researcher',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.7k',
      tasksAutomatedDaily: 289,
      responseTime: '0.7s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
