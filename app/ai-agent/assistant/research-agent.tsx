import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Microscope } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'research-agent',
    name: 'AI Research Agent',
    title: 'Research & Analysis AI',
    description: 'The AI Research Agent conducts thorough research, analyzes information from multiple sources, and delivers comprehensive reports to support decision-making.',
    capabilities: ["Research Execution","Information Analysis","Report Generation","Data Mining","Source Verification","Trend Analysis","Competitive Intelligence","Literature Review"],
    icon: Microscope,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'Research & Analysis AI',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 734,
      responseTime: '0.4s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Assistant',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
