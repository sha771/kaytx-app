import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-pipeline-builder',
    name: 'AI Pipeline Builder',
    title: 'Engineering',
    description: 'The AI Pipeline Builder constructs robust, scalable data pipelines with intelligent orchestration, transformation, and failure recovery capabilities.',
    capabilities: ["Pipeline Orchestration","Data Transformation","Dependency Management","Schedule Optimization","Failure Recovery","Incremental Processing"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1097,
      responseTime: '1.1s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
