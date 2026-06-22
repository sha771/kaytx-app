import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smartphone } from 'lucide-react-native';

export default function DigitalBankingSpecialistPage() {
  const agent = {
    id: 'digital-banking-specialist',
    name: 'AI Digital Banking Specialist',
    title: 'Banking Agent',
    description: 'Automated Digital Banking Specialist agent specializing in digital banking channels with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Digital Banking","Mobile Apps","Online Banking","User Experience","Digital Adoption"],
    icon: Smartphone,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1.5k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Digital Banking Specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,500',
      tasksAutomatedDaily: 370,
      responseTime: '2.0s',
      accuracyRate: '97.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
