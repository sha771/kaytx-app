import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PenTool } from 'lucide-react-native';

export default function ContentCreatorPage() {
  const agent = {
    id: 'content-creator',
    name: 'AI Content Creator',
    title: 'E-Commerce Agent',
    description: 'Automated Content Creator agent specializing in content creation with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Content Creation","Copywriting","Visual Content","Storytelling","Brand Voice"],
    icon: PenTool,
    color: '#FF9800',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'Content Creator',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 350,
      responseTime: '2.3s',
      accuracyRate: '96.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
