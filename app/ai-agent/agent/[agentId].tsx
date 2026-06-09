import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { completeAIWorkforce } from '@/constants/completeAIWorkforce_1108';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const { agentId } = useLocalSearchParams<{ agentId: string }>();
  const rawId = agentId || '';

  let subAgent: { id: string; name: string; title: string; description: string; capabilities: string[] } | undefined;
  let parentColor = '#9C27B0';
  let parentDept = 'Agent';

  for (const main of completeAIWorkforce) {
    const found = main.subAgents.find(sa => sa.id === rawId);
    if (found) {
      subAgent = found;
      parentColor = main.color;
      parentDept = main.department;
      break;
    }
  }

  const buildSubAgent = (data: {
    id: string; name: string; title: string; description: string;
    capabilities: string[]; color: string; department: string;
  }) => ({
    id: data.id,
    name: data.name,
    title: data.title,
    description: data.description,
    capabilities: data.capabilities,
    icon: Bot,
    color: data.color,
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$990/mo',
    efficiency: '95%',
    replacesRole: data.title,
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.8%',
      lastActive: 'Now' as const,
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: `$${(Math.floor(Math.random() * 5) + 2).toFixed(1)}k`,
      tasksAutomatedDaily: Math.floor(Math.random() * 600) + 300,
      responseTime: `${(Math.random() * 2 + 0.5).toFixed(1)}s`,
      accuracyRate: `${(Math.random() * 4 + 94).toFixed(1)}%`,
    },
    hierarchy: {
      department: data.department,
    },
  });

  if (!subAgent) {
    return <AgentPageWrapper agent={buildSubAgent({
      id: rawId || 'unknown',
      name: rawId || 'Sub-Agent',
      title: rawId || 'Sub-Agent',
      description: 'AI sub-agent providing specialized support services.',
      capabilities: ['Task Support', 'Data Processing', 'Reporting'],
      color: '#9C27B0',
      department: 'Agent',
    })} />;
  }

  return <AgentPageWrapper agent={buildSubAgent({
    id: subAgent.id,
    name: subAgent.name,
    title: subAgent.title,
    description: subAgent.description,
    capabilities: subAgent.capabilities,
    color: parentColor,
    department: parentDept,
  })} />;
}