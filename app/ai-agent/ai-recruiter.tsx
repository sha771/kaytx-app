import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-recruiter',
    name: 'Ai Recruiter',
    title: 'Ai Recruiter',
    description: 'The Ai Recruiter AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: UserPlus,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Ai Recruiter',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 772,
      responseTime: '1.0s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'AI Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
