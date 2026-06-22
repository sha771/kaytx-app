import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertCircle } from 'lucide-react-native';

export default function AiAtRiskIdentifierPage() {
  const agent = {
    id: 'ai-at-risk-identifier',
    name: 'AI Ai At Risk Identifier',
    title: 'AI Agent',
    description: 'Automated Ai At Risk Identifier agent with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: AlertCircle,
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1.2k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'Ai At Risk Identifier',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,800',
      tasksAutomatedDaily: 85,
      responseTime: '<1.5s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
