import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AIEsportsAnalystPage() {
  const agent = {
    id: 'esports-analyst',
    name: 'AI Esports Analyst',
    title: 'AI Esports Analyst',
    description: 'The AI Esports Analyst provides deep competitive intelligence, match analysis, player performance metrics, and strategic insights for teams and organizations.',
    capabilities: ["Match Analysis","Player Performance Tracking","Competitive Intelligence","Strategy Development","Data Visualization","Predictive Analytics","Scouting Reports","Meta Analysis"],
    icon: BarChart3,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'esports-analyst',
    hierarchy: {
      department: 'Gaming & Esports',
      level: 'analyst',
      reportsTo: 'esports-director'
    },
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,676',
      tasksAutomatedDaily: 866,
      responseTime: '0.6s',
      accuracyRate: '97.6%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
