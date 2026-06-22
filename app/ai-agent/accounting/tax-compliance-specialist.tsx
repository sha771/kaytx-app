import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-compliance-specialist',
    name: 'Tax Compliance Specialist',
    title: 'Tax Compliance Specialist',
    description: 'Specialist ensuring full tax compliance across federal, state, and local jurisdictions with automated filing and monitoring systems.',
    capabilities: [
      "Tax Compliance Monitoring",
      "Automated Tax Filing",
      "Compliance Calendar Management",
      "Tax Document Preparation",
      "Compliance Risk Assessment",
      "Audit Trail Maintenance"
    ],
    icon: ShieldCheck,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Tax Compliance Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
