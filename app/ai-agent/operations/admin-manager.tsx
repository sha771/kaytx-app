import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'admin-manager',
    name: 'admin-manager',
    title: 'admin-manager',
    description: 'The admin-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$83k/year',
    aiCost: '$1k/year',
    efficiency: '83x efficiency improvement',
    replacesRole: 'admin-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 837,
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
