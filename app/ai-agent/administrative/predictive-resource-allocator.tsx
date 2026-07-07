import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-resource-allocator',
    name: 'AI Predictive Resource Allocator',
    title: 'Predictive Resource Allocator',
    description: 'Resource allocation and optimization with predictive AI modeling and forecasting',
    capabilities: ["Resource Allocation","Predictive Modeling","Optimization","Capacity Planning"],
    icon: Users,
    color: '#4A148C',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$1.8k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'Resource Allocator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.0k',
      tasksAutomatedDaily: 278,
      responseTime: '0.6s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
