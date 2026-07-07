import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-patent-analyzer',
    name: 'AI Intelligent Patent Analyzer',
    title: 'Intelligent Patent Analyzer',
    description: 'Patent analysis and intellectual property management with AI',
    capabilities: ["Patent Analysis","IP Management","Prior Art Search","Innovation Tracking"],
    icon: FileText,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$3.1k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Patent Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.3k',
      tasksAutomatedDaily: 234,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
