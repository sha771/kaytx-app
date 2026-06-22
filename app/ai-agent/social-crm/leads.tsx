import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Radio } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'leads',
    name: 'leads',
    title: 'leads',
    description: 'The leads AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Radio,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'leads',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1317,
      responseTime: '0.4s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Social-crm',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
