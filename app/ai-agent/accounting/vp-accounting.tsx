import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-accounting',
    name: 'vp-accounting',
    title: 'vp-accounting',
    description: 'The vp-accounting AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: MessageSquare,
    color: '#0D47A1',
    type: 'employee' as const,
    humanCost: '$239k/year',
    aiCost: '$4k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'vp-accounting',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1406,
      responseTime: '0.4s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
