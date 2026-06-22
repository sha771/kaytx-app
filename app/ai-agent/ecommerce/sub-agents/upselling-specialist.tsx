import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function UpsellingSpecialistPage() {
  const agent = {
    id: 'upselling-specialist',
    name: 'AI Upselling Specialist',
    title: 'E-Commerce Agent',
    description: 'Automated Upselling Specialist agent specializing in upselling with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Upselling","Product Recommendations","Customer Analysis","Revenue Optimization","Personalization"],
    icon: TrendingUp,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Upselling Specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,700',
      tasksAutomatedDaily: 310,
      responseTime: '2.4s',
      accuracyRate: '96.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
