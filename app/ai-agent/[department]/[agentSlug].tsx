/**
 * Universal Agent Page - Dynamic route that renders ANY agent from the registry
 * This replaces ALL 4,469 static .tsx files with a single dynamic page.
 * Route: /ai-agent/[department]/[agentSlug]
 * Example: /ai-agent/customer/chief-customer-officer
 */

import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { agentRegistry, getByUid, getByRoute } from '@/constants/aiAgentRegistry';
import { getDepartmentConfig, getAgentSystemPrompt, getAgentCapabilities, getAgentTools } from '@/constants/agent-configurations';
import { iconMap } from '@/constants/agentIconMap';
import { Bot } from 'lucide-react-native';

export default function UniversalAgentPage() {
  const params = useLocalSearchParams<{ department?: string; agentSlug?: string; id?: string }>();

  // Support both /ai-agent/[department]/[agentSlug] and /ai-agent/[id] patterns
  const agentData = useMemo(() => {
    const department = params.department || '';
    const agentSlug = params.agentSlug || '';
    const id = params.id || '';

    // Try to find by slug pattern first
    if (department && agentSlug) {
      const fullSlug = `${department}/${agentSlug}`;
      const found = agentRegistry.find(a => {
        const route = a.route.replace('/ai-agent/', '');
        return route === fullSlug || a.sidebarId.includes(agentSlug) || a.uid.includes(agentSlug);
      });
      if (found) return found;
    }

    // Try by id parameter (existing pattern)
    if (id) {
      const cleanId = id.replace(/^\d+-/, '');
      const found = getByUid(cleanId);
      if (found) return found;

      // Search registry by uid, sidebarId, or route
      return agentRegistry.find(a =>
        a.uid === cleanId ||
        a.sidebarId === cleanId ||
        a.route.includes(cleanId)
      );
    }

    // Try by department name from route
    if (department) {
      const found = agentRegistry.find(a => {
        const route = a.route.replace('/ai-agent/', '');
        return route.startsWith(department + '/');
      });
      if (found) return found;
    }

    return null;
  }, [params]);

  // Get department configuration for system prompt and tools
  const deptConfig = useMemo(() => {
    if (!agentData) return null;
    return getDepartmentConfig(agentData.departmentId);
  }, [agentData]);

  // Build the agent object for AgentPageWrapper
  const agent = useMemo(() => {
    if (!agentData) {
      // Fallback for unknown agents
      const fallbackId = params.id || params.agentSlug || 'unknown';
      return {
        id: fallbackId,
        name: params.agentSlug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'AI Agent',
        title: params.agentSlug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'AI Agent',
        description: 'AI agent providing specialized services and automation. This agent is powered by advanced LLM capabilities and can assist with various tasks in its domain.',
        capabilities: ['Task Automation', 'Data Processing', 'Analysis', 'Reporting', 'Workflow Management', 'Optimization'],
        icon: Bot,
        color: '#007AFF',
        type: 'employee' as const,
        humanCost: '$65k/year',
        aiCost: '$1.2k/year',
        efficiency: '54x efficiency improvement',
        replacesRole: 'AI Agent',
        infrastructure: {
          status: 'online' as const,
          health: 97,
          uptime: '99.9%',
          lastActive: 'Now' as const,
          processingPower: 'standard' as 'standard' | 'high' | 'enterprise',
        },
        roiMetrics: {
          savingsPerMonth: '$5.2k',
          tasksAutomatedDaily: 750,
          responseTime: '0.8s',
          accuracyRate: '96.5%',
        },
        hierarchy: {
          department: 'AI Operations',
          level: 'specialist',
        },
      };
    }

    const IconComponent = iconMap[agentData.icon] || Bot;
    const capabilities = deptConfig
      ? getAgentCapabilities(agentData.departmentId, agentData.level)
      : agentData.capabilities || ['Task Automation', 'Analysis', 'Reporting'];

    const levelLabels: Record<string, string> = {
      c_level: 'C-Level Executive',
      vp_director: 'VP / Director',
      manager: 'Manager',
      team_lead: 'Team Lead',
      specialist: 'Specialist',
    };

    const aiCostByLevel: Record<string, string> = {
      c_level: '$2.8k/year',
      vp_director: '$2.1k/year',
      manager: '$1.6k/year',
      team_lead: '$1.2k/year',
      specialist: '$0.8k/year',
    };

    const humanCostByLevel: Record<string, string> = {
      c_level: '$250k/year',
      vp_director: '$180k/year',
      manager: '$120k/year',
      team_lead: '$90k/year',
      specialist: '$65k/year',
    };

    return {
      id: agentData.uid,
      name: agentData.title,
      title: agentData.title,
      description: deptConfig
        ? `${agentData.title} - ${deptConfig.department} department agent. ${deptConfig.baseSystemPrompt.substring(0, 200)}...`
        : `${agentData.title} providing specialized AI services in ${agentData.department}.`,
      capabilities,
      icon: IconComponent,
      color: deptConfig?.color || '#007AFF',
      type: 'employee' as const,
      humanCost: humanCostByLevel[agentData.level] || '$65k/year',
      aiCost: aiCostByLevel[agentData.level] || '$1.2k/year',
      efficiency: agentData.level === 'c_level' ? '120x efficiency improvement' : agentData.level === 'vp_director' ? '85x efficiency improvement' : '54x efficiency improvement',
      replacesRole: agentData.title,
      infrastructure: {
        status: 'online' as const,
        health: agentData.level === 'c_level' ? 99 : agentData.level === 'vp_director' ? 97 : 95,
        uptime: '99.9%',
        lastActive: 'Now' as const,
        processingPower: (agentData.level === 'c_level' ? 'enterprise' : agentData.level === 'vp_director' ? 'high' : 'standard') as 'standard' | 'high' | 'enterprise',
      },
      roiMetrics: {
        savingsPerMonth: agentData.level === 'c_level' ? '$12.5k' : agentData.level === 'vp_director' ? '$8.3k' : '$5.2k',
        tasksAutomatedDaily: agentData.level === 'c_level' ? 1200 : agentData.level === 'vp_director' ? 850 : 500,
        responseTime: agentData.level === 'c_level' ? '0.5s' : '0.8s',
        accuracyRate: agentData.level === 'c_level' ? '98.2%' : '96.5%',
      },
      hierarchy: {
        department: agentData.department,
        level: levelLabels[agentData.level] || agentData.level,
        reportsTo: agentData.parentId || undefined,
      },
    };
  }, [agentData, deptConfig, params]);

  return <AgentPageWrapper agent={agent} />;
}
