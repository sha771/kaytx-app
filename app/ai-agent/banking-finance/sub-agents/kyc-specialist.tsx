import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCheck } from 'lucide-react-native';

export default function KYCSpecialistPage() {
  const agent = {
    id: 'kyc-specialist',
    name: 'AI KYC Specialist',
    title: 'Banking Agent',
    description: 'Automated KYC Specialist agent specializing in Know Your Customer compliance with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","KYC Compliance","Identity Verification","Risk Assessment","Documentation","Regulatory Reporting"],
    icon: UserCheck,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'KYC Specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,700',
      tasksAutomatedDaily: 310,
      responseTime: '2.5s',
      accuracyRate: '98.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
