import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lock } from 'lucide-react-native';

export default function AIQATesterPage() {
  const agent = {
    id: 'qa-tester',
    name: 'AI QA Tester',
    title: 'AI QA Tester',
    description: 'Automated testing for game bugs and issues.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Lock,
    color: 'undefined',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'qa-tester',
    hierarchy: {
      department: 'Gaming & Esports'
    },
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,444',
      tasksAutomatedDaily: 581,
      responseTime: '1.1s',
      accuracyRate: '98.3%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
