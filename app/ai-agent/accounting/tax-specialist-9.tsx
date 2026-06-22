import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-9',
    name: 'Tax Specialist IX',
    title: 'Tax Specialist IX',
    description: 'Tax specialist for expatriate taxation, global mobility programs, and international assignment tax compliance.',
    capabilities: [
      "Expatriate Tax Compliance",
      "Global Mobility Tax",
      "Equalization Policy",
      "Tax Protection Plans",
      "International Assignment",
      "Social Security Totalization"
    ],
    icon: FileText,
    color: '#1E88E5',
    type: 'agent' as const,
    humanCost: '$93k/year',
    aiCost: '$1.5k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Tax Specialist IX',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.6',
      tasksAutomatedDaily: 2450,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
