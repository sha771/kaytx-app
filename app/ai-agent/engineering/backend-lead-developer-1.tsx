import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'backend-lead-developer-1',
    name: 'Backend Lead Developer',
    title: 'Backend Lead Developer',
    description: 'The Backend Lead Developer AI leads backend development, oversees server-side architecture, and ensures robust API and service implementations.',
    capabilities: ["Backend Development","API Design","Microservices","Database Integration","Server Architecture","Performance Tuning"],
    icon: Server,
    color: '#009688',
    type: 'employee' as const,
    humanCost: '$150k/year',
    aiCost: '$4k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Backend Development',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 780,
      responseTime: '1.4s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
