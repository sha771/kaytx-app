import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function OfficeBudgetControllerPage() {
  const agent = {
    id: 'office-budget-controller',
    name: 'AI Office Budget Controller',
    title: 'Finance Sub-Agent',
    description: 'Manages office budget tracking, expense monitoring, and cost control with automated variance analysis.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: DollarSign,
    color: '#059669',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Office Budget Controller',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
