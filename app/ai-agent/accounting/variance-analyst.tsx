import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Gauge } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'variance-analyst',
    name: 'Variance Analyst',
    title: 'Variance Analyst',
    description: 'Analyst specializing in budget vs actual variance analysis, identifying root causes, and recommending corrective actions.',
    capabilities: [
      "Budget vs Actual Analysis",
      "Variance Identification",
      "Root Cause Analysis",
      "Corrective Action Recommendations",
      "Variance Reporting",
      "Trend Analysis"
    ],
    icon: Gauge,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Variance Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.3',
      tasksAutomatedDaily: 1987,
      responseTime: '0.9s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
