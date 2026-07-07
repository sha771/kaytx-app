import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Palette } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-experience-design-director-2',
    name: 'Experience Design Director',
    title: 'Experience Design Director',
    description: 'The Experience Design Director AI leads design strategy, oversees user experience initiatives, and ensures consistent, delightful customer experiences across all touchpoints.',
    capabilities: ["Design Strategy","User Experience Design","Service Design","Design Systems","Team Leadership","Experience Innovation"],
    icon: Palette,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'Experience Design',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 820,
      responseTime: '1.4s',
      accuracyRate: '93.8%',
    },
    hierarchy: {
      department: 'Customer Experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
