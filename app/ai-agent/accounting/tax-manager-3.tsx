import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-manager-3',
    name: 'Tax Manager III',
    title: 'Tax Manager III',
    description: 'Tax manager focused on state and local tax (SALT) compliance, nexus management, and multi-state tax optimization strategies.',
    capabilities: [
      "State & Local Tax Compliance",
      "Nexus Management",
      "Multi-State Tax Strategy",
      "Sales Tax Optimization",
      "Property Tax Planning",
      "State Audit Defense"
    ],
    icon: FileText,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$108k/year',
    aiCost: '$1.6k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'Tax Manager III',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.9',
      tasksAutomatedDaily: 2780,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
