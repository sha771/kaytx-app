import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-executive',
    name: 'ai-sales-executive',
    title: 'ai-sales-executive',
    description: 'The ai-sales-executive AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: DollarSign,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$86k/year',
    aiCost: '$1k/year',
    efficiency: '86x efficiency improvement',
    replacesRole: 'ai-sales-executive',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1459,
      responseTime: '1.6s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Sales',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
