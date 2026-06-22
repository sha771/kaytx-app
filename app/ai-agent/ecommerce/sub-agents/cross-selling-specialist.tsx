import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowRightLeft } from 'lucide-react-native';

export default function CrossSellingSpecialistPage() {
  const agent = {
    id: 'cross-selling-specialist',
    name: 'AI Cross-Selling Specialist',
    title: 'E-Commerce Agent',
    description: 'Automated Cross-Selling Specialist agent specializing in cross-selling with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Cross-Selling","Product Recommendations","Customer Analysis","Revenue Optimization","Personalization"],
    icon: ArrowRightLeft,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Cross-Selling Specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,700',
      tasksAutomatedDaily: 310,
      responseTime: '2.4s',
      accuracyRate: '96.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
