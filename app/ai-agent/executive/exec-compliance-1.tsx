import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-compliance-1',
    name: 'Executive Compliance Officer 1',
    title: 'Corporate Compliance Officer',
    description: 'Manages corporate compliance programs, regulatory adherence, and compliance monitoring.',
    capabilities: ["Corporate Compliance","Regulatory Adherence","Compliance Monitoring","Policy Enforcement","Compliance Training"],
    icon: CheckCircle,
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
      tasksAutomatedDaily: 195,
      responseTime: '0.5s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
