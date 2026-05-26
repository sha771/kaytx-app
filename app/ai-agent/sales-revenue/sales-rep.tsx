import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sales-rep',
    name: 'sales-rep',
    title: 'sales-rep',
    description: 'The sales-rep AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: DollarSign,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$66k/year',
    aiCost: '$1k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'sales-rep',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1330,
      responseTime: '0.8s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
