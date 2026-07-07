import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-tax-preparation',
    name: 'AI Automated Tax Preparation',
    title: 'Automated Tax Preparation',
    description: 'Automated tax return preparation with intelligent data processing',
    capabilities: ["Tax Preparation","Return Automation","Data Processing","Filing Support"],
    icon: FileCheck,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$72k/year',
    aiCost: '$1.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Tax Preparer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.8k',
      tasksAutomatedDaily: 412,
      responseTime: '0.4s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
