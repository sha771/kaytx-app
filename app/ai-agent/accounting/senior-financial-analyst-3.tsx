import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-3',
    name: 'Senior Financial Analyst III',
    title: 'Senior Financial Analyst III',
    description: 'Principal financial analyst leading strategic financial initiatives, managing complex cross-functional projects, and providing executive-level financial insights.',
    capabilities: [
      "Strategic Financial Leadership",
      "Cross-Functional Project Management",
      "Executive Board Presentations",
      "Advanced Risk Analytics",
      "Market Intelligence",
      "Business Partnership"
    ],
    icon: TrendingUp,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2.0k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Senior Financial Analyst III',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.8',
      tasksAutomatedDaily: 3120,
      responseTime: '0.6s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
