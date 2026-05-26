import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sre-engineer',
    name: 'AI SRE Engineer',
    title: 'Engineering',
    description: 'The AI SRE Engineer ensures system reliability through proactive monitoring, incident management, capacity planning, and chaos engineering practices.',
    capabilities: ["Site Reliability Engineering","Incident Management","Capacity Planning","SLO/SLA Management","Monitoring & Alerting","Chaos Engineering"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$77k/year',
    aiCost: '$1k/year',
    efficiency: '77x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 682,
      responseTime: '1.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
