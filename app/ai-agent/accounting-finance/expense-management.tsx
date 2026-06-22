import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CreditCard } from 'lucide-react-native';

export default function ExpenseManagementPage() {
  const agent = {
    id: 'expense-management',
    name: 'AI Expense Management',
    title: 'Accounting-finance Agent',
    description: 'Automated Expense Management agent specializing in accounting-finance operations with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: CreditCard,
    color: '#059669',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Expense Management',
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
