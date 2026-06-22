import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function ContentWriterPage() {
  const agent = {
    id: 'content-writer',
    name: 'AI Content Writer',
    title: 'Content Writing Agent',
    description: 'Automated Content Writer agent specializing in content creation, copywriting, and storytelling with advanced AI capabilities for writing generation, content adaptation, and style consistency.',
    capabilities: ["Content Creation","Copywriting","Storytelling","Writing Generation","Content Adaptation","Style Consistency"],
    icon: FileText,
    color: '#3B82F6',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.3k/year',
    efficiency: '10x efficiency improvement',
    replacesRole: 'Content Writer',
    infrastructure: {
      status: 'online' as const,
      health: 91,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,400',
      tasksAutomatedDaily: 50,
      responseTime: '<2s',
      accuracyRate: '91%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
