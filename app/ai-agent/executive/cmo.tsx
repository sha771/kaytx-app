import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cmo',
    name: 'cmo',
    title: 'cmo',
    description: 'The cmo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$208k/year',
    aiCost: '$4k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'cmo',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 1464,
      responseTime: '1.1s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
