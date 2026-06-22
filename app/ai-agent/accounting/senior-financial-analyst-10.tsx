import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-10',
    name: 'Senior Financial Analyst X',
    title: 'Senior Financial Analyst X',
    description: 'Principal financial analyst focused on strategic initiatives, business transformation, and financial impact analysis for major organizational changes.',
    capabilities: [
      "Strategic Initiative Analysis",
      "Business Transformation Finance",
      "ROI Analysis",
      "Scenario Planning",
      "Financial Impact Assessment",
      "Change Management Support"
    ],
    icon: TrendingUp,
    color: '#C8E6C9',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$2.1k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'Senior Financial Analyst X',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10.2',
      tasksAutomatedDaily: 3250,
      responseTime: '0.6s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
