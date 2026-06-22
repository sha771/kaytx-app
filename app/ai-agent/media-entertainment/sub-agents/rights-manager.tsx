import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function RightsManagerPage() {
  const agent = {
    id: 'rights-manager',
    name: 'AI Rights Manager',
    title: 'Rights Management Agent',
    description: 'Automated Rights Manager agent specializing in intellectual property management, licensing, and rights clearance with advanced AI capabilities for rights tracking, compliance monitoring, and licensing automation.',
    capabilities: ["Intellectual Property Management","Licensing","Rights Clearance","Rights Tracking","Compliance Monitoring","Licensing Automation"],
    icon: ShieldCheck,
    color: '#DC2626',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.3k/year',
    efficiency: '10x efficiency improvement',
    replacesRole: 'Rights Manager',
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
