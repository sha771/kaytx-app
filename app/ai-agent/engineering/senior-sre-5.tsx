import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Activity } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-sre-5',
    name: 'Senior SRE',
    title: 'Senior Site Reliability Engineer',
    description: 'The Senior SRE AI ensures system reliability, monitors performance, and implements incident response strategies to maintain high availability.',
    capabilities: ["Site Reliability","Incident Response","Performance Monitoring","SLO Management","Capacity Planning","Reliability Engineering"],
    icon: Activity,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'Site Reliability Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 880,
      responseTime: '1.1s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
