import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Home } from 'lucide-react-native';

export default function MortgageSpecialistPage() {
  const agent = {
    id: 'mortgage-specialist',
    name: 'AI Mortgage Specialist',
    title: 'Banking Agent',
    description: 'Automated Mortgage Specialist agent specializing in mortgage lending operations with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Mortgage Processing","Credit Assessment","Documentation","Compliance","Customer Service"],
    icon: Home,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'Mortgage Specialist',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 350,
      responseTime: '2.5s',
      accuracyRate: '96.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
