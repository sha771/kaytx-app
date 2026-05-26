import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-customer-success',
    name: 'AI VP of Customer Success',
    title: 'VP Customer Success & Retention',
    description: 'Leads customer success teams, retention strategies, and customer health programs. Drives expansion revenue and ensures customer value realization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$183k/year',
    aiCost: '$3k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'VP Customer Success & Retention',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 1347,
      responseTime: '0.9s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Cx',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
