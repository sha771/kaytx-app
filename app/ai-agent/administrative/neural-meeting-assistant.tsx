import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-meeting-assistant',
    name: 'AI Neural Meeting Assistant',
    title: 'Neural Meeting Assistant',
    description: 'Meeting preparation, scheduling, documentation, and follow-up with neural AI capabilities',
    capabilities: ["Meeting Preparation","Smart Scheduling","Documentation","Follow-up Automation"],
    icon: Calendar,
    color: '#4A148C',
    type: 'employee' as const,
    humanCost: '$62k/year',
    aiCost: '$1.4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'Meeting Assistant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.0k',
      tasksAutomatedDaily: 321,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
