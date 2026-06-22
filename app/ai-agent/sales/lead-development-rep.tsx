import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'lead-development-rep',
    uid: 'ktx-02-lead-development-rep',
    name: 'AI Lead Development Rep (SDR)',
    title: 'AI Lead Development Rep (SDR)',
    description: 'The lead-development-rep AI provides specialized services and automation within the Sales & Revenue department.',
    capabilities: ["Task Automation", "Data Processing", "Workflow Management"],
    icon: Users,
    color: '#FFA000',
    type: 'main' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'lead-development-rep',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 970,
      responseTime: '1.6s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
