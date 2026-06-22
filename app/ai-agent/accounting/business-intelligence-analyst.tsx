import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Brain } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'business-intelligence-analyst',
    name: 'Business Intelligence Analyst',
    title: 'Business Intelligence Analyst',
    description: 'Analyst developing BI dashboards, financial KPIs, and providing strategic business intelligence for decision-making.',
    capabilities: [
      "BI Dashboard Development",
      "KPI Design & Tracking",
      "Data Warehousing Support",
      "Strategic Analytics",
      "Performance Reporting",
      "Executive Dashboards"
    ],
    icon: Brain,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Business Intelligence Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
