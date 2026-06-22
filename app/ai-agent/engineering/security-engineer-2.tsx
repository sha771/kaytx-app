import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'security-engineer-2',
    name: 'Security Engineer',
    title: 'Security Engineer',
    description: 'The Security Engineer AI implements security measures, conducts security assessments, and ensures application and infrastructure security.',
    capabilities: ["Security Implementation","Vulnerability Assessment","Security Testing","Penetration Testing","Security Monitoring","Incident Response"],
    icon: Shield,
    color: '#D32F2F',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$4k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Security Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 730,
      responseTime: '1.4s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
