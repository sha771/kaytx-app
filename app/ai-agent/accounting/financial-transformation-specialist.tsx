import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { RefreshCw } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-transformation-specialist',
    name: 'Financial Transformation Specialist',
    title: 'Financial Transformation Specialist',
    description: 'Specialist leading financial transformation initiatives, process reengineering, and digital finance projects.',
    capabilities: [
      "Transformation Strategy",
      "Process Reengineering",
      "Digital Finance Implementation",
      "Change Management",
      "Stakeholder Alignment",
      "Transformation Governance"
    ],
    icon: RefreshCw,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Financial Transformation Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.4',
      tasksAutomatedDaily: 2876,
      responseTime: '0.7s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
