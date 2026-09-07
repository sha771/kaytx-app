import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Boxes } from 'lucide-react-native';

export default function EducationProductManagerPage() {
  const agent = {
    id: 'education-product-manager',
    name: 'AI Education Product Manager',
    title: 'Education Agent',
    description: 'Automated Education Product Manager agent specializing in educational product development with advanced AI capabilities for product strategy, user research, and feature prioritization.',
    capabilities: ["Product Strategy","User Research","Feature Prioritization","Roadmap Planning","Market Analysis","Performance Tracking"],
    icon: Boxes,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1.1k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Education Product Manager',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,600',
      tasksAutomatedDaily: 60,
      responseTime: '<3s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}