import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowRightLeft } from 'lucide-react-native';

export default function WireTransferSpecialistPage() {
  const agent = {
    id: 'wire-transfer-specialist',
    name: 'AI Wire Transfer Specialist',
    title: 'Banking Agent',
    description: 'Automated Wire Transfer Specialist agent specializing in wire transfer operations with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Wire Transfers","International Payments","Compliance","Verification","Settlement"],
    icon: ArrowRightLeft,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Wire Transfer Specialist',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,700',
      tasksAutomatedDaily: 310,
      responseTime: '2.2s',
      accuracyRate: '99.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
