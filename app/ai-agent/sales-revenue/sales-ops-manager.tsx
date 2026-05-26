import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sales-ops-manager',
    name: 'sales-ops-manager',
    title: 'sales-ops-manager',
    description: 'The sales-ops-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1k/year',
    efficiency: '90x efficiency improvement',
    replacesRole: 'sales-ops-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1216,
      responseTime: '1.6s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
