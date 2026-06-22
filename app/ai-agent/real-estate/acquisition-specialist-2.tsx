import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'acquisition-specialist-2',
    uid: 'ktx-15-acquisition-specialist-2',
    name: 'Acquisition Specialist 2',
    title: 'Commercial Acquisition Specialist',
    description: 'Commercial Acquisition Specialist specializes in commercial property acquisitions and commercial deal management.',
    capabilities: ['Commercial Acquisitions', 'Commercial Deals', 'Property Evaluation', 'Negotiation Support', 'Commercial Strategy'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$2,500/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Acquisition Specialist',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9,833',
      tasksAutomatedDaily: 485,
      responseTime: '2.4s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'team_lead',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
