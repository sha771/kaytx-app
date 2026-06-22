import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function AMLAnalystPage() {
  const agent = {
    id: 'aml-analyst',
    name: 'AI AML Analyst',
    title: 'Banking Agent',
    description: 'Automated AML Analyst agent specializing in Anti-Money Laundering compliance with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","AML Compliance","Transaction Monitoring","Suspicious Activity Reporting","Risk Assessment","Investigation"],
    icon: Search,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'AML Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 350,
      responseTime: '2.0s',
      accuracyRate: '98.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
