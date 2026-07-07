import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-workforce-planner',
    name: 'AI Predictive Workforce Planner',
    title: 'Predictive Workforce Planner',
    description: 'Predictive workforce planning and analytics with AI',
    capabilities: ["Workforce Planning","Predictive Analytics","Resource Planning","Workforce Intelligence"],
    icon: Users,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$112k/year',
    aiCost: '$3.0k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Workforce Planner',
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
      responseTime: '0.9s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
