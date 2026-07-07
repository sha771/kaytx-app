import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'talent-acquisition-specialist-2',
    name: 'talent-acquisition-specialist-2',
    title: 'Technical Talent Acquisition Specialist',
    description: 'The Technical Talent Acquisition Specialist AI specializes in recruiting technical talent, understanding technical requirements and identifying skilled engineering candidates.',
    capabilities: ["Technical Screening","Skills Assessment","Tech Community Engagement","Pipeline Building"],
    icon: Users,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$1k/year',
    efficiency: '110x efficiency improvement',
    replacesRole: 'technical-talent-acquisition-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9.1',
      tasksAutomatedDaily: 1520,
      responseTime: '0.4s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
