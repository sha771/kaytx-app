import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Activity } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-ab-testing',
    name: 'AI Real-Time A/B Testing',
    title: 'Real-Time A/B Testing',
    description: 'Real-time A/B testing and optimization platform with AI',
    capabilities: ["A/B Testing","Optimization","Real-Time Analysis","Experimentation"],
    icon: Activity,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'A/B Testing Specialist',
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
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
