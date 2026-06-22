import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bell } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'collections-specialist',
    name: 'Collections Specialist',
    title: 'Collections Specialist',
    description: 'Specialist managing collections activities, past-due accounts, and improving accounts receivable recovery rates.',
    capabilities: [
      "Collections Management",
      "Past-Due Account Resolution",
      "Customer Communication",
      "Payment Plan Negotiation",
      "Collections Reporting",
      "Dispute Resolution"
    ],
    icon: Bell,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Collections Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4.1',
      tasksAutomatedDaily: 1765,
      responseTime: '1.0s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
