import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Box } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'platform-architect',
    name: 'Platform Architect',
    title: 'Platform Architect',
    description: 'The Platform Architect AI designs platform strategies, oversees platform architecture, and ensures scalable and extensible platform solutions.',
    capabilities: ["Platform Architecture","Platform Strategy","Microservices Design","API Gateway","Service Mesh","Platform Engineering"],
    icon: Box,
    color: '#5C6BC0',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$4k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'Platform Architecture',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 925,
      responseTime: '1.1s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
