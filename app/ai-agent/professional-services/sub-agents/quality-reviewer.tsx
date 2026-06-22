import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function QualityReviewerPage() {
  const agent = {
    id: 'quality-reviewer',
    name: 'AI Quality Reviewer',
    title: 'Professional Services Agent',
    description: 'Automated Quality Reviewer agent specializing in consulting management with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: Bot,
    color: '#059669',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'Quality Reviewer',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,400',
      tasksAutomatedDaily: 85,
      responseTime: '<2s',
      accuracyRate: '94%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
