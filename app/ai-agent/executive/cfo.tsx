import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cfo',
    name: 'cfo',
    title: 'cfo',
    description: 'The cfo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: DollarSign,
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$207k/year',
    aiCost: '$4k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'cfo',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 1101,
      responseTime: '1.0s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
