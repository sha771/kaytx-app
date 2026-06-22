import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-ai-ml',
    uid: 'ktx-06-vp-ai-ml',
    name: 'AI VP AI/ML',
    title: 'AI VP AI/ML',
    description: 'The vp-ai-ml AI provides specialized services and automation within the Technology & Engineering department.',
    capabilities: ["Task Automation", "Data Processing", "Workflow Management"],
    icon: Users,
    color: '#1565C0',
    type: 'main' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'vp-ai-ml',
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
      department: 'Technology & Engineering',
      level: 'vp_director',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
