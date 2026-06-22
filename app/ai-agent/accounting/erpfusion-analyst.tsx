import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Zap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'erpfusion-analyst',
    name: 'ERP Fusion Analyst',
    title: 'ERP Fusion Analyst',
    description: 'Specialist in Oracle Fusion Cloud ERP, managing cloud financial modules and integrations.',
    capabilities: [
      "Fusion Cloud Management",
      "Financial Module Configuration",
      "Cloud Integration",
      "Fusion Reporting",
      "Process Automation",
      "User Training"
    ],
    icon: Zap,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1.8k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'ERP Fusion Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.2',
      tasksAutomatedDaily: 2654,
      responseTime: '0.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
