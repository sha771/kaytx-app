import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'dept-liaison',
    uid: 'ktx-00-dept-liaison',
    name: 'AI Department Liaison',
    title: 'AI Department Liaison',
    description: 'The dept-liaison AI provides specialized services and automation within the Cross-Department department.',
    capabilities: ["Task Automation", "Data Processing", "Workflow Management"],
    icon: Users,
    color: '#7C4DFF',
    type: 'main' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'dept-liaison',
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
      department: 'Cross-Department',
      level: 'bridge',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
