import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCheck } from 'lucide-react-native';

export default function ProfessorSupportSystemPage() {
  const agent = {
    id: 'professor-support-system',
    name: 'AI Professor Support System',
    title: 'Education Agent',
    description: 'Automated Professor Support System agent specializing in faculty support with advanced AI capabilities for teaching assistance, research support, and administrative task automation.',
    capabilities: ["Teaching Assistance","Research Support","Administrative Task Automation","Content Generation","Grading Support","Professional Development Resources"],
    icon: UserCheck,
    color: '#3B82F6',
    type: 'agent' as const,
    humanCost: '$54k/year',
    aiCost: '$1.1k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Faculty Support Coordinator',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,500',
      tasksAutomatedDaily: 60,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}