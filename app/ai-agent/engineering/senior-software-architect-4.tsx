import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layers } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-software-architect-4',
    name: 'Senior Software Architect',
    title: 'Senior Software Architect',
    description: 'The Senior Software Architect AI designs software architectures, establishes technical standards, and guides architectural decisions.',
    capabilities: ["Software Architecture","System Design","Technical Strategy","Architecture Patterns","Technology Selection","Code Quality Standards"],
    icon: Layers,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$190k/year',
    aiCost: '$4k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'Software Architecture',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 940,
      responseTime: '1.1s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
