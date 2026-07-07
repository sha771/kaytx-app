import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-tax-analyst',
    name: 'AI Neural Tax Analyst',
    title: 'Neural Tax Analyst',
    description: 'Comprehensive tax analysis and insights with neural AI capabilities',
    capabilities: ["Tax Analysis","Data Insights","Trend Analysis","Reporting"],
    icon: PieChart,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$98k/year',
    aiCost: '$2.6k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Tax Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.9k',
      tasksAutomatedDaily: 278,
      responseTime: '0.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
