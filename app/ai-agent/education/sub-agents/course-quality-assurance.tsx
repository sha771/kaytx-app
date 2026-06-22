import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function CourseQualityAssurancePage() {
  const agent = {
    id: 'course-quality-assurance',
    name: 'AI Course Quality Assurance',
    title: 'Education Agent',
    description: 'Automated Course Quality Assurance agent specializing in course quality monitoring with advanced AI capabilities for content review, standard compliance checking, and quality improvement recommendations.',
    capabilities: ["Content Review","Standard Compliance Checking","Quality Improvement Recommendations","Learning Outcome Validation","Accessibility Compliance","Continuous Improvement"],
    icon: ShieldCheck,
    color: '#EF4444',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$0.9k/year',
    efficiency: '13x efficiency improvement',
    replacesRole: 'Quality Assurance Specialist',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,100',
      tasksAutomatedDaily: 65,
      responseTime: '<2s',
      accuracyRate: '96%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}