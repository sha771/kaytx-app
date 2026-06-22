import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-compliance-officer',
    name: 'Financial Compliance Officer',
    title: 'Financial Compliance Officer',
    description: 'Officer ensuring comprehensive financial compliance across all regulatory requirements and internal policies.',
    capabilities: [
      "Regulatory Compliance Oversight",
      "Compliance Program Management",
      "Policy Development",
      "Compliance Training",
      "Regulatory Monitoring",
      "Compliance Reporting"
    ],
    icon: Shield,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$2k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Financial Compliance Officer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9',
      tasksAutomatedDaily: 2876,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
