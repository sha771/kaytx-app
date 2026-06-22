import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'container-orchestration-specialist',
    name: 'Container Orchestration Specialist',
    title: 'Engineering',
    description: 'The Container Orchestration Specialist manages Docker, Kubernetes, and containerized applications at scale.',
    capabilities: ["Docker Management","Kubernetes Configuration","Container Security","Service Discovery","Load Balancing","Auto-scaling"],
    icon: Server,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$98k/year',
    aiCost: '$1k/year',
    efficiency: '98x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8',
      tasksAutomatedDaily: 687,
      responseTime: '1.0s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
