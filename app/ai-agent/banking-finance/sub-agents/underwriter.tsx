import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function UnderwriterPage() {
  const agent = {
    id: 'underwriter',
    name: 'AI Underwriter',
    title: 'Banking Agent',
    description: 'Automated Underwriter agent specializing in loan underwriting with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Risk Assessment","Credit Analysis","Decision Making","Compliance","Documentation"],
    icon: ShieldCheck,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1.5k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Underwriter',
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
      responseTime: '2.3s',
      accuracyRate: '97.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
