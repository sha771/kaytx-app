import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function ConsultantCoordinatorPage() {
  const agent = {
    id: 'consultant-coordinator',
    name: 'AI Consultant Coordinator',
    title: 'Professional Services Agent',
    description: 'Automated Consultant Coordinator agent specializing in consulting management with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: Bot,
    color: '#059669',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'Consultant Coordinator',
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
