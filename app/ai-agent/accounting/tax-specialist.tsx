import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist',
    name: 'tax-specialist',
    title: 'tax-specialist',
    description: 'The tax-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'tax-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1431,
      responseTime: '1.0s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
