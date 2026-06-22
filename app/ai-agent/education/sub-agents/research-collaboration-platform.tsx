import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FlaskConical } from 'lucide-react-native';

export default function ResearchCollaborationPlatformPage() {
  const agent = {
    id: 'research-collaboration-platform',
    name: 'AI Research Collaboration Platform',
    title: 'Education Agent',
    description: 'Automated Research Collaboration Platform agent specializing in research coordination with advanced AI capabilities for project management, collaboration facilitation, and research analytics.',
    capabilities: ["Project Management","Collaboration Facilitation","Research Analytics","Grant Coordination","Publication Support","Resource Allocation"],
    icon: FlaskConical,
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1.1k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Research Collaboration Director',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,600',
      tasksAutomatedDaily: 55,
      responseTime: '<3s',
      accuracyRate: '96%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}