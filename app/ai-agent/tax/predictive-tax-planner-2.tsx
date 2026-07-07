import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-tax-planner-2',
    name: 'AI Predictive Tax Planner II',
    title: 'Predictive Tax Planner II',
    description: 'Advanced tax planning with predictive analytics and optimization',
    capabilities: ["Advanced Planning","Predictive Analytics","Optimization","Strategy"],
    icon: Calendar,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$118k/year',
    aiCost: '$3.2k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Senior Tax Planner',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.5k',
      tasksAutomatedDaily: 201,
      responseTime: '1.2s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
