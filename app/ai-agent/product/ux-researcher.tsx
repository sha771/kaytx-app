import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Microscope } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ux-researcher',
    name: 'ux-researcher',
    title: 'ux-researcher',
    description: 'The ux-researcher AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Microscope,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$61k/year',
    aiCost: '$1k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'ux-researcher',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1142,
      responseTime: '1.7s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Product',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
