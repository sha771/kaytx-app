import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-tax-specialist',
    name: 'AI Neural Tax Specialist',
    title: 'Neural Tax Specialist',
    description: 'Specialized tax services with neural AI expertise',
    capabilities: ["Specialized Tax","Expert Services","Niche Areas","Advanced Solutions"],
    icon: Star,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$112k/year',
    aiCost: '$3.1k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Tax Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.1k',
      tasksAutomatedDaily: 212,
      responseTime: '1.1s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
