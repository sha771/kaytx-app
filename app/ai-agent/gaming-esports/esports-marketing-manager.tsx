import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Rocket } from 'lucide-react-native';

export default function AIEsportsMarketingManagerPage() {
  const agent = {
    id: 'esports-marketing-manager',
    name: 'AI Esports Marketing Manager',
    title: 'AI Esports Marketing Manager',
    description: 'The AI Esports Marketing Manager develops and executes marketing campaigns, manages sponsor partnerships, and drives audience growth for esports brands.',
    capabilities: ["Campaign Strategy","Sponsor Management","Brand Partnerships","Social Media Marketing","Content Marketing","Analytics","Budget Management","ROI Tracking"],
    icon: Rocket,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'esports-marketing-manager',
    hierarchy: {
      department: 'Gaming & Esports',
      level: 'manager',
      reportsTo: 'esports-director'
    },
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,516',
      tasksAutomatedDaily: 563,
      responseTime: '1.9s',
      accuracyRate: '96.9%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
