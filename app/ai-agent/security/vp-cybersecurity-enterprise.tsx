import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-cybersecurity-enterprise',
    name: 'vp-cybersecurity-enterprise',
    title: 'vp-cybersecurity-enterprise',
    description: 'The vp-cybersecurity-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$186k/year',
    aiCost: '$3k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'vp-cybersecurity-enterprise',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 605,
      responseTime: '1.8s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Security',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
