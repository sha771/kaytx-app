import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'advanced-financial-analyst',
    name: 'Advanced Financial Analyst',
    title: 'Advanced Financial Analyst',
    description: 'The Advanced Financial Analyst AI provides sophisticated financial analysis, forecasting, and strategic insights for complex financial decisions.',
    capabilities: ["Advanced Financial Modeling","Forecasting & Projections","Risk Assessment","Investment Analysis","Strategic Planning"],
    icon: BarChart3,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Senior Financial Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1347,
      responseTime: '1.2s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },
    complianceFeatures: ['SOX Compliance', 'GAAP Standards', 'IFRS Reporting'],
  };
  return <AgentPageWrapper agent={agent} />;
}
