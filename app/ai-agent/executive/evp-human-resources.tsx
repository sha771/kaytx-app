import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'evp-human-resources',
    name: 'Executive VP Human Resources',
    title: 'Executive Vice President of Human Resources',
    description: 'Manages human capital strategy, talent acquisition, and organizational development.',
    capabilities: ["HR Strategy","Talent Acquisition","Organizational Development","Employee Relations","Compensation Planning"],
    icon: Users,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$300k/year',
    aiCost: '$6k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Executive Vice President',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$24k',
      tasksAutomatedDaily: 275,
      responseTime: '0.4s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
