import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { getAgentById } from '@/constants/completeAIWorkforce_1108';
import { iconMap } from '@/constants/agentIconMap';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

  const rawId = id || '';
  const agentId = rawId.replace(/^\d+-/, '');

  const mainAgent = getAgentById(agentId);

  const buildAgent = (data: {
    id: string; name: string; title: string; description: string;
    capabilities: string[]; icon: typeof Bot; color: string;
    aiCost: string; efficiency: string; department: string;
    level?: string; reportsTo?: string;
    subAgents?: { id: string; name: string; label: string }[];
  }) => ({
    id: data.id,
    name: data.name,
    title: data.title,
    description: data.description,
    capabilities: data.capabilities,
    icon: data.icon,
    color: data.color,
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: data.aiCost,
    efficiency: data.efficiency,
    replacesRole: data.title,
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now' as const,
      processingPower: (data.level === 'c_level' ? 'enterprise' : data.level === 'vp_director' ? 'high' : 'standard') as 'standard' | 'high' | 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: `$${(Math.floor(Math.random() * 8) + 3).toFixed(1)}k`,
      tasksAutomatedDaily: Math.floor(Math.random() * 800) + 500,
      responseTime: `${(Math.random() * 1.5 + 0.3).toFixed(1)}s`,
      accuracyRate: `${(Math.random() * 5 + 93).toFixed(1)}%`,
    },
    hierarchy: {
      department: data.department,
      level: data.level,
      reportsTo: data.reportsTo,
    },
    subAgents: data.subAgents,
  });

  if (!mainAgent) {
    return <AgentPageWrapper agent={buildAgent({
      id: rawId || 'unknown',
      name: title || rawId || 'Agent',
      title: title || rawId || 'Agent',
      description: 'AI agent providing specialized services and automation.',
      capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
      icon: Bot,
      color: '#007AFF',
      aiCost: '$1.2k/year',
      efficiency: '54x efficiency improvement',
      department: 'AI Operations',
    })} />;
  }

  const IconComponent = iconMap[mainAgent.icon] || Bot;

  return <AgentPageWrapper agent={buildAgent({
    id: mainAgent.id,
    name: mainAgent.name,
    title: mainAgent.title,
    description: mainAgent.description,
    capabilities: mainAgent.capabilities,
    icon: IconComponent,
    color: mainAgent.color,
    aiCost: mainAgent.aiCost,
    efficiency: mainAgent.efficiency,
    department: mainAgent.department,
    level: mainAgent.level,
    reportsTo: mainAgent.reportsTo,
    subAgents: mainAgent.subAgents?.map(sa => ({
      id: sa.id,
      name: sa.name,
      label: sa.title,
    })),
  })} />;
}
