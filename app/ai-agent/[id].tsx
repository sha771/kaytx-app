import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { agentRegistry } from '@/constants/aiAgentRegistry';
import { getDepartmentConfig, getAgentCapabilities, getAgentSystemPrompt } from '@/constants/agent-configurations';
import { Bot } from 'lucide-react-native';

const DEPARTMENT_COLORS: Record<number, string> = {
  0: '#8B5CF6', 1: '#3B82F6', 2: '#10B981', 3: '#F59E0B',
  4: '#6366F1', 5: '#EC4899', 6: '#14B8A6', 7: '#F97316',
  8: '#EF4444', 9: '#8B5CF6', 10: '#06B6D4', 11: '#DC2626',
  12: '#7C3AED', 13: '#64748B', 14: '#059669', 15: '#2563EB',
  16: '#D97706', 17: '#0891B2', 18: '#4F46E5', 19: '#7C3AED',
  20: '#0D9488', 21: '#6366F1', 22: '#8B5CF6', 23: '#F59E0B',
  24: '#10B981', 25: '#3B82F6', 26: '#EC4899', 27: '#EF4444',
  28: '#F97316', 29: '#6366F1', 30: '#14B8A6', 31: '#DC2626',
  32: '#8B5CF6', 33: '#059669', 34: '#7C3AED', 35: '#EC4899',
  36: '#F59E0B', 37: '#3B82F6', 38: '#10B981', 39: '#EF4444',
  40: '#6366F1', 41: '#DC2626', 42: '#D97706', 43: '#0D9488',
  44: '#2563EB', 45: '#14B8A6', 46: '#7C3AED', 47: '#0891B2',
  48: '#4F46E5', 49: '#EC4899', 50: '#8B5CF6', 51: '#6366F1',
  52: '#3B82F6', 53: '#F97316', 54: '#8B5CF6', 55: '#059669',
  56: '#64748B', 57: '#DC2626', 58: '#10B981', 59: '#F59E0B',
  60: '#6366F1', 61: '#64748B', 62: '#64748B', 63: '#8B5CF6',
  64: '#3B82F6', 65: '#F97316', 66: '#14B8A6', 67: '#8B5CF6',
  68: '#EC4899', 69: '#6366F1', 70: '#059669', 71: '#3B82F6',
  72: '#EF4444', 73: '#6366F1', 74: '#10B981', 75: '#EF4444',
  76: '#0891B2', 77: '#64748B', 78: '#3B82F6', 79: '#8B5CF6',
  80: '#F59E0B',
};

export default function AgentPage() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const rawId = id || '';
  const agentId = rawId.replace(/^\d+-/, '');

  const registryEntry = useMemo(() => {
    return agentRegistry.find(
      a => a.uid === agentId || a.sidebarId === agentId || a.route?.includes(agentId)
    ) || agentRegistry.find(a =>
      a.title?.toLowerCase() === agentId.toLowerCase().replace(/-/g, ' ') ||
      a.uid?.toLowerCase().includes(agentId.toLowerCase())
    );
  }, [agentId]);

  const deptConfig = registryEntry ? getDepartmentConfig(registryEntry.departmentId) : null;
  const capabilities = registryEntry ? getAgentCapabilities(registryEntry.departmentId, registryEntry.level) : [
    'Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'
  ];
  const systemPrompt = registryEntry ? getAgentSystemPrompt(registryEntry.departmentId, registryEntry.level, registryEntry.title) : '';
  const deptColor = registryEntry ? (DEPARTMENT_COLORS[registryEntry.departmentId] || '#007AFF') : '#007AFF';

  const agentData = useMemo(() => {
    const uid = registryEntry?.uid || agentId || 'unknown';
    const agentName = registryEntry?.title || (title as string) || agentId || 'Agent';
    const department = registryEntry?.department || deptConfig?.department || 'AI Operations';
    const level = registryEntry?.level || 'specialist';
    const agentType = registryEntry?.type || 'subagent';

    return {
      id: uid,
      name: agentName,
      title: agentName,
      description: deptConfig
        ? `${agentName} - ${department} department. ${level.replace(/_/g, ' ')} level agent with specialized capabilities.`
        : `AI agent providing specialized ${department} services and automation.`,
      capabilities,
      icon: Bot,
      color: deptColor,
      type: agentType as any,
      humanCost: level === 'c_level' ? '$120k/year' : level === 'vp_director' ? '$90k/year' : '$60k/year',
      aiCost: level === 'c_level' ? '$2.4k/year' : level === 'vp_director' ? '$1.8k/year' : '$1.2k/year',
      efficiency: level === 'c_level' ? '54x' : level === 'vp_director' ? '42x' : '28x',
      replacesRole: agentName,
      infrastructure: {
        status: 'online' as const,
        health: 97,
        uptime: '99.9%',
        lastActive: 'Now' as const,
        processingPower: (level === 'c_level' ? 'enterprise' : level === 'vp_director' ? 'high' : 'standard') as 'standard' | 'high' | 'enterprise',
      },
      roiMetrics: {
        savingsPerMonth: level === 'c_level' ? '$12.5k' : level === 'vp_director' ? '$8.2k' : '$5.4k',
        tasksAutomatedDaily: level === 'c_level' ? 850 : level === 'vp_director' ? 620 : 400,
        responseTime: level === 'c_level' ? '0.5s' : '1.2s',
        accuracyRate: level === 'c_level' ? '98.5%' : '96.2%',
      },
      hierarchy: {
        department,
        level,
        reportsTo: registryEntry?.parentId || undefined,
      },
      category: department.toLowerCase(),
      systemPrompt,
      config: registryEntry ? {
        uid: registryEntry.uid,
        departmentId: registryEntry.departmentId,
        level: registryEntry.level,
        type: registryEntry.type,
        route: registryEntry.route,
        sidebarId: registryEntry.sidebarId,
      } : undefined,
    };
  }, [registryEntry, agentId, title, deptConfig, capabilities, systemPrompt, deptColor]);

  if (!registryEntry && !agentId) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading agent...</Text>
      </View>
    );
  }

  return <AgentPageWrapper agent={agentData} />;
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#94a3b8' },
});
