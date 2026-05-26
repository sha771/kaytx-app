import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-asset-manager',
    name: 'ai-asset-manager',
    title: 'ai-asset-manager',
    description: 'The ai-asset-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#8BC34A',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'ai-asset-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1224,
      responseTime: '0.6s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Realestate',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
