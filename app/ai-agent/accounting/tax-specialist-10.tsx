import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-10',
    name: 'Tax Specialist X',
    title: 'Tax Specialist X',
    description: 'Tax specialist for tax data management, tax reporting systems, and analytics for strategic tax decision-making.',
    capabilities: [
      "Tax Data Management",
      "Tax Reporting Systems",
      "Tax Analytics",
      "Data Visualization",
      "Tax KPI Tracking",
      "Predictive Tax Modeling"
    ],
    icon: FileText,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$91k/year',
    aiCost: '$1.4k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'Tax Specialist X',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.4',
      tasksAutomatedDaily: 2400,
      responseTime: '0.8s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
