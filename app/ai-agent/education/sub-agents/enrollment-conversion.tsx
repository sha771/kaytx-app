import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function EnrollmentConversionPage() {
  const agent = {
    id: 'enrollment-conversion',
    name: 'AI Enrollment Conversion',
    title: 'Education Agent',
    description: 'Automated Enrollment Conversion agent specializing in prospective student conversion with advanced AI capabilities for lead nurturing, enrollment analytics, and conversion optimization.',
    capabilities: ["Lead Nurturing","Enrollment Analytics","Conversion Optimization","Prospect Engagement","Follow-up Automation","Conversion Tracking"],
    icon: TrendingUp,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$0.9k/year',
    efficiency: '13x efficiency improvement',
    replacesRole: 'Enrollment Specialist',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,100',
      tasksAutomatedDaily: 70,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}