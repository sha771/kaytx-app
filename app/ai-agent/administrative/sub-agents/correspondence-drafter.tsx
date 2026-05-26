import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PenTool } from 'lucide-react-native';

export default function CorrespondenceDrafterPage() {
  const agent = {
    id: 'correspondence-drafter',
    name: 'AI Correspondence Drafter',
    title: 'Communication Sub-Agent',
    description: 'Drafts business correspondence, manages templates, and ensures consistency with automated style checking.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: PenTool,
    color: '#7C2D12',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Correspondence Drafter',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '94%',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
