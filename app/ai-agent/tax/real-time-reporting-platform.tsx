import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-reporting-platform',
    name: 'AI Real-Time Reporting Platform',
    title: 'Real-Time Reporting Platform',
    description: 'Real-time tax reporting and documentation with automated generation',
    capabilities: ["Tax Reporting","Real-Time Documentation","Automated Generation","Compliance Reporting"],
    icon: BarChart3,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2.1k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Tax Reporter',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.5k',
      tasksAutomatedDaily: 367,
      responseTime: '0.6s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
