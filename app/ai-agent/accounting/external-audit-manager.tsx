import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'external-audit-manager',
    name: 'External Audit Manager',
    title: 'External Audit Manager',
    description: 'Manager coordinating external audit engagements, liaising with external auditors, and managing audit documentation processes.',
    capabilities: [
      "External Audit Coordination",
      "PBC Request Management",
      "Audit Documentation Support",
      "Auditor Communication",
      "Audit Finding Resolution",
      "Audit Schedule Management"
    ],
    icon: Briefcase,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'External Audit Manager',
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
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
