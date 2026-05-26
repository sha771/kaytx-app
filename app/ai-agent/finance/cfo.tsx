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
    color: '#0D47A1',
    type: 'employee' as const,
    humanCost: '$179k/year',
    aiCost: '$3k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'cfo',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 983,
      responseTime: '1.3s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Finance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
