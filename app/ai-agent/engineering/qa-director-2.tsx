import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'qa-director-2',
    name: 'QA Director',
    title: 'QA Director',
    description: 'The QA Director AI leads quality assurance strategy, oversees testing frameworks, and ensures high-quality software delivery.',
    capabilities: ["QA Strategy","Test Automation","Quality Governance","Testing Frameworks","Quality Metrics","Release Assurance"],
    icon: CheckCircle,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$4k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'Quality Assurance',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 860,
      responseTime: '1.2s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
