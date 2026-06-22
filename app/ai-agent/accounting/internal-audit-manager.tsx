import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'internal-audit-manager',
    name: 'Internal Audit Manager',
    title: 'Internal Audit Manager',
    description: 'Manager overseeing internal audit function, planning audit engagements, managing audit team, and reporting to audit committee.',
    capabilities: [
      "Audit Planning & Scheduling",
      "Audit Team Management",
      "Risk-Based Audit Planning",
      "Audit Committee Reporting",
      "Quality Assurance Review",
      "Audit Methodology Development"
    ],
    icon: Users,
    color: '#4527A0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Internal Audit Manager',
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
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
