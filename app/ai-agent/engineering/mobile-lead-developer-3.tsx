import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smartphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'mobile-lead-developer-3',
    name: 'Mobile Lead Developer',
    title: 'Mobile Lead Developer',
    description: 'The Mobile Lead Developer AI leads mobile development initiatives, oversees mobile app architecture, and ensures high-quality mobile experiences.',
    capabilities: ["Mobile Development","iOS Development","Android Development","Cross-Platform","Mobile Architecture","App Store Optimization"],
    icon: Smartphone,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$4k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'Mobile Development',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 800,
      responseTime: '1.3s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
