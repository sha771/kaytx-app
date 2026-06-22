import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-data-analyst',
    name: 'Financial Data Analyst',
    title: 'Financial Data Analyst',
    description: 'Analyst specializing in financial data analysis, data visualization, and providing actionable insights from financial data.',
    capabilities: [
      "Financial Data Analysis",
      "Data Visualization",
      "Trend Identification",
      "Data Quality Management",
      "Reporting Automation",
      "Predictive Analytics"
    ],
    icon: BarChart,
    color: '#00838F',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Financial Data Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
