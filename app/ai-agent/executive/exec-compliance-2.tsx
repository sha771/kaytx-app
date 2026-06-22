import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-compliance-2',
    name: 'Executive Compliance Officer 2',
    title: 'Regulatory Compliance Officer',
    description: 'Manages regulatory compliance, industry standards adherence, and audit preparation.',
    capabilities: ["Regulatory Compliance","Industry Standards","Audit Preparation","Compliance Reporting","Regulatory Intelligence"],
    icon: FileCheck,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$175k/year',
    aiCost: '$3.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Executive Compliance Officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 198,
      responseTime: '0.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
