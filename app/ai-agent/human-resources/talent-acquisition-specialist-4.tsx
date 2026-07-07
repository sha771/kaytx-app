import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'talent-acquisition-specialist-4',
    name: 'talent-acquisition-specialist-4',
    title: 'Campus Talent Acquisition Specialist',
    description: 'The Campus Talent Acquisition Specialist AI manages university recruitment programs, building relationships with academic institutions and identifying emerging talent.',
    capabilities: ["University Relations","Campus Recruiting","Internship Programs","Graduate Hiring"],
    icon: Star,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$1k/year',
    efficiency: '82x efficiency improvement',
    replacesRole: 'campus-talent-acquisition-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.7',
      tasksAutomatedDaily: 1380,
      responseTime: '0.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
