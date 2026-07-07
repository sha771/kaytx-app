import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Award } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-performance-manager',
    name: 'AI Cognitive Performance Manager',
    title: 'Cognitive Performance Manager',
    description: 'Intelligent performance management and reviews with cognitive AI',
    capabilities: ["Performance Management","Reviews","Cognitive AI","Performance Analytics"],
    icon: Award,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$102k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Performance Manager',
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
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
