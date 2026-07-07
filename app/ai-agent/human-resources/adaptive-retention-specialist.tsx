import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-retention-specialist',
    name: 'AI Adaptive Retention Specialist',
    title: 'Adaptive Retention Specialist',
    description: 'Adaptive retention strategies and programs with AI',
    capabilities: ["Retention Strategies","Programs","Adaptive AI","Employee Retention"],
    icon: Star,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Retention Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.7k',
      tasksAutomatedDaily: 234,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
