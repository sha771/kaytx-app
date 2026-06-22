import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Divide } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'divisional-controller',
    name: 'Divisional Controller',
    title: 'Divisional Controller',
    description: 'Controller managing accounting operations for a specific business division or geographic region.',
    capabilities: [
      "Divisional Accounting Management",
      "Local Financial Reporting",
      "Division Budgeting",
      "Team Management",
      "Business Partner Support",
      "Performance Analysis"
    ],
    icon: Divide,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Divisional Controller',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.8',
      tasksAutomatedDaily: 2987,
      responseTime: '0.6s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
<tool_call>write<arg_key>file_path</arg_key><arg_value>c:/Users/shaida/Desktop/kaytx-full-app/app/ai-agent/accounting/tax-director.tsx