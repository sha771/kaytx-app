import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BriefcaseIcon as Briefcase2 } from 'lucide-react-native';

export default function CareerGuidanceEnginePage() {
  const agent = {
    id: 'career-guidance-engine',
    name: 'AI Career Guidance Engine',
    title: 'Education Agent',
    description: 'Automated Career Guidance Engine agent specializing in career services with advanced AI capabilities for career path recommendation, skill assessment, and job market analysis.',
    capabilities: ["Career Path Recommendation","Skill Assessment","Job Market Analysis","Resume Optimization","Interview Preparation","Alumni Networking"],
    icon: Briefcase2,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$49k/year',
    aiCost: '$1.0k/year',
    efficiency: '13x efficiency improvement',
    replacesRole: 'Career Services Director',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 70,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}