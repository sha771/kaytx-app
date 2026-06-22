import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'devops-manager',
    name: 'devops-manager',
    title: 'devops-manager',
    description: 'The devops-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$66k/year',
    aiCost: '$1k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'devops-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 887,
      responseTime: '1.7s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Tech',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
