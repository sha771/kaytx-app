import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-compliance-monitor',
    name: 'AI Automated Compliance Monitor',
    title: 'Automated Compliance Monitor',
    description: 'Automated compliance monitoring and reporting with AI',
    capabilities: ["Compliance Monitoring","Automated Reporting","Regulatory Adherence","Risk Assessment"],
    icon: CheckCircle,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Compliance Monitor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.7k',
      tasksAutomatedDaily: 301,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
