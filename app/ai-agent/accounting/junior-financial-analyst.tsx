import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'junior-financial-analyst',
    name: 'Junior Financial Analyst',
    title: 'Junior Financial Analyst',
    description: 'Entry-level financial analyst supporting data collection, basic analysis, and report preparation under senior analyst guidance.',
    capabilities: [
      "Data Collection & Validation",
      "Basic Financial Analysis",
      "Report Preparation",
      "Spreadsheet Management",
      "Trend Identification",
      "Support Senior Analysts"
    ],
    icon: BarChart2,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Junior Financial Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4.5',
      tasksAutomatedDaily: 1876,
      responseTime: '1.2s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
