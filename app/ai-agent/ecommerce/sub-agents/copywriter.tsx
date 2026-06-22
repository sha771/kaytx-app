import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function CopywriterPage() {
  const agent = {
    id: 'copywriter',
    name: 'AI Copywriter',
    title: 'E-Commerce Agent',
    description: 'Automated Copywriter agent specializing in copywriting with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Copywriting","Brand Voice","SEO Copy","Product Descriptions","Marketing Content"],
    icon: FileText,
    color: '#FF9800',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1.5k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'Copywriter',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,000',
      tasksAutomatedDaily: 340,
      responseTime: '2.4s',
      accuracyRate: '96.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
