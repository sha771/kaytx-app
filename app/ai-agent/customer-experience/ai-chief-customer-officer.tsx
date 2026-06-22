import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-customer-officer',
    name: 'ai-chief-customer-officer',
    title: 'ai-chief-customer-officer',
    description: '{agent.longDescription}',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Users,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$54k/year',
    aiCost: '$1k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'ai-chief-customer-officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1380,
      responseTime: '0.8s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
