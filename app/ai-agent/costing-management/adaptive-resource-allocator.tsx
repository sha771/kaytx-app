import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-resource-allocator',
    name: 'AI Adaptive Resource Allocator',
    title: 'Adaptive Resource Allocator',
    description: 'Adaptive resource allocation and optimization with AI',
    capabilities: ["Resource Allocation","Optimization","Adaptive Planning","Resource Management"],
    icon: Users,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Resource Allocator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 245,
      responseTime: '0.8s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
