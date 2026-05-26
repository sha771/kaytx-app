import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Code } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-lead-dev',
    name: 'Ai Lead Dev',
    title: 'Ai Lead Dev',
    description: 'The Ai Lead Dev AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: Code,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Ai Lead Dev',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1270,
      responseTime: '1.5s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'AI Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
