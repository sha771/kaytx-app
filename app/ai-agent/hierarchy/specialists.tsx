import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'specialists',
    name: 'Specialist Level',
    title: 'Individual Contributors & Domain Experts',
    description: 'The Specialist level represents the foundation of the AI workforce - individual contributors with deep domain expertise. These agents execute specific tasks with high precision, delivering consistent quality in their specialized functional areas.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$93k/year',
    aiCost: '$1k/year',
    efficiency: '93x efficiency improvement',
    replacesRole: 'Individual Contributors & Domain Experts',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1429,
      responseTime: '0.9s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Hierarchy',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
