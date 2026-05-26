import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-security-tech',
    name: 'vp-security-tech',
    title: 'vp-security-tech',
    description: 'The vp-security-tech AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#007AFF',
    type: 'employee' as const,
    humanCost: '$193k/year',
    aiCost: '$3k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'vp-security-tech',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 593,
      responseTime: '1.0s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Tech',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
