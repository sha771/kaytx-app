import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-compensation-analyst',
    name: 'AI Intelligent Compensation Analyst',
    title: 'Intelligent Compensation Analyst',
    description: 'Compensation analysis and optimization with intelligent AI',
    capabilities: ["Compensation Analysis","Optimization","Salary Planning","Benefits Analysis"],
    icon: DollarSign,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Compensation Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.7k',
      tasksAutomatedDaily: 234,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
