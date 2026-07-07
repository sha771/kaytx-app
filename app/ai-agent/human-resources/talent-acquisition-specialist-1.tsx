import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'talent-acquisition-specialist-1',
    name: 'talent-acquisition-specialist-1',
    title: 'Senior Talent Acquisition Specialist',
    description: 'The Senior Talent Acquisition Specialist AI manages end-to-end recruitment processes, from sourcing to hiring, ensuring top talent acquisition for the organization.',
    capabilities: ["Candidate Sourcing","Interview Coordination","Offer Management","Employer Branding"],
    icon: UserPlus,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'senior-talent-acquisition-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 1450,
      responseTime: '0.3s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
