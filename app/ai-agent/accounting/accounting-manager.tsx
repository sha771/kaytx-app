import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'accounting-manager',
    name: 'accounting-manager',
    title: 'accounting-manager',
    description: 'The accounting-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: MessageSquare,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$67k/year',
    aiCost: '$1k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'accounting-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1258,
      responseTime: '0.6s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
