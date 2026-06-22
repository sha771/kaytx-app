import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sparkles } from 'lucide-react-native';

export default function AIGameDesignerPage() {
  const agent = {
    id: 'game-designer',
    name: 'AI Game Designer',
    title: 'AI Game Designer',
    description: 'The AI Game Designer creates engaging game mechanics, balanced gameplay systems, and immersive player experiences across various gaming genres.',
    capabilities: ["Game Mechanics Design","Balance Tuning","Level Design","Player Progression Systems","UI/UX Design","Narrative Design","Prototyping","Playtesting Analysis"],
    icon: Sparkles,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$3k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'game-designer',
    hierarchy: {
      department: 'Gaming & Esports',
      level: 'designer',
      reportsTo: 'game-producer'
    },
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,167',
      tasksAutomatedDaily: 504,
      responseTime: '1.3s',
      accuracyRate: '98.8%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
