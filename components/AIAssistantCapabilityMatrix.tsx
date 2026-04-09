import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowUpRight, ArrowDownRight, Minus, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import type { AIAssistantCapability, CapabilityStatus } from '@/constants/aiAssistants';

interface AIAssistantCapabilityMatrixProps {
  title: string;
  capabilities: AIAssistantCapability[];
  testID?: string;
}

type ViewMode = 'readiness' | 'automations';

type StatusFilter = CapabilityStatus | 'all';

const statusFilterOptions: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Operational', value: 'operational' },
  { label: 'Expanding', value: 'expanding' },
  { label: 'At Risk', value: 'at-risk' },
];

const viewModes: { label: string; value: ViewMode }[] = [
  { label: 'Readiness', value: 'readiness' },
  { label: 'Automations', value: 'automations' },
];

const readinessBg: Record<CapabilityStatus, string> = {
  operational: '#34C75920',
  'at-risk': '#FF3B3020',
  expanding: '#FF950020',
};

const readinessText: Record<CapabilityStatus, string> = {
  operational: '#34C759',
  'at-risk': '#FF3B30',
  expanding: '#FF9500',
};

export function AIAssistantCapabilityMatrix({ title, capabilities, testID }: AIAssistantCapabilityMatrixProps) {
  const { theme } = useTheme();
   
  const { activeAgents: _activeAgents } = useAIAssistant();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('readiness');

  // Fetch real-time metrics for capabilities from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'all' 
  });

  const filteredCapabilities = useMemo(() => {
    const next = statusFilter === 'all' ? capabilities : capabilities.filter(cap => cap.status === statusFilter);
    console.log('[AIAssistantCapabilityMatrix] filtered capabilities', {
      input: capabilities.length,
      filtered: next.length,
      statusFilter,
    });
    return next;
  }, [capabilities, statusFilter]);

  const handleFilterPress = useCallback((filterValue: StatusFilter) => {
    console.log('[AIAssistantCapabilityMatrix] status filter pressed', filterValue);
    setStatusFilter(filterValue);
  }, []);

  const handleViewModePress = useCallback((mode: ViewMode) => {
    console.log('[AIAssistantCapabilityMatrix] view mode pressed', mode);
    setViewMode(mode);
  }, []);

  const handleActionPress = useCallback((route: string, capabilityId: string) => {
    console.log('[AIAssistantCapabilityMatrix] action pressed', { route, capabilityId });
    try {
      router.push(route as never);
    } catch (error) {
      console.error('[AIAssistantCapabilityMatrix] failed to navigate', error);
    }
  }, []);

  const getMetricIntent = (trend: 'up' | 'down' | 'flat') => {
    switch (trend) {
      case 'up':
        return { Icon: ArrowUpRight, color: '#34C759' };
      case 'down':
        return { Icon: ArrowDownRight, color: '#FF3B30' };
      default:
        return { Icon: Minus, color: theme.colors.secondaryText };
    }
  };

  return (
    <View style={styles.container} testID={testID ?? 'ai-capability-matrix'}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Enterprise control plane for every AI touchpoint</Text>
        </View>
        <View style={styles.viewSwitch}>
          {viewModes.map(mode => (
            <TouchableOpacity
              key={mode.value}
              style={[
                styles.viewButton,
                viewMode === mode.value && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => handleViewModePress(mode.value)}
              testID={`view-mode-${mode.value}`}
            >
              <Text
                style={[
                  styles.viewButtonText,
                  { color: viewMode === mode.value ? '#FFFFFF' : theme.colors.secondaryText },
                ]}
              >
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterRow}>
        {statusFilterOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterChip,
              statusFilter === option.value && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => handleFilterPress(option.value)}
            testID={`status-filter-${option.value}`}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: statusFilter === option.value ? '#FFFFFF' : theme.colors.secondaryText },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredCapabilities.map(capability => {
        const Icon = capability.icon;
        return (
          <View
            key={capability.id}
            style={[styles.capabilityCard, { backgroundColor: theme.colors.cardBackground }]}
            testID={`capability-card-${capability.id}`}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconBadge}>
                <Icon size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={[styles.capabilityTitle, { color: theme.colors.text }]}>{capability.title}</Text>
                <Text style={[styles.capabilityDescription, { color: theme.colors.secondaryText }]}>{capability.description}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: readinessBg[capability.status] }]}
                testID={`status-badge-${capability.id}`}
              >
                <Text style={[styles.statusText, { color: readinessText[capability.status] }]}>{capability.status}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Owner</Text>
              <Text style={[styles.metaValue, { color: theme.colors.text }]}>{capability.owner}</Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { 
                    width: `${statsData?.avgSuccessRate ?? capability.readinessScore}%`, 
                    backgroundColor: theme.colors.primary 
                  },
                ]}
                testID={`readiness-progress-${capability.id}`}
              />
            </View>
            <View style={styles.progressStats}>
              <Text style={[styles.progressLabel, { color: theme.colors.secondaryText }]}>Readiness</Text>
              <Text style={[styles.progressValue, { color: theme.colors.text }]}>
                {statsData?.avgSuccessRate ?? capability.readinessScore}%
              </Text>
            </View>

            {viewMode === 'readiness' ? (
              <View style={styles.metricsRow}>
                {capability.metrics.map(metric => {
                  const { Icon: TrendIcon, color } = getMetricIntent(metric.trend);
                  return (
                    <View key={`${capability.id}-${metric.label}`} style={styles.metricCard}>
                      <View style={styles.metricLabelRow}>
                        <TrendIcon size={14} color={color} />
                        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
                      </View>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                      <Text style={[styles.metricChange, { color }]}>{metric.change}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.automationRow}>
                {capability.automations.map(automation => (
                  <View key={`${capability.id}-${automation}`} style={[styles.automationPill, { backgroundColor: theme.colors.background }]}
                    testID={`automation-pill-${capability.id}`}
                  >
                    <Sparkles size={14} color={theme.colors.primary} />
                    <Text style={[styles.automationText, { color: theme.colors.text }]}>{automation}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.actionRow}>
              {capability.actions.map(action => (
                <TouchableOpacity
                  key={`${capability.id}-${action.route}`}
                  style={[
                    styles.actionChip,
                    action.critical && { borderColor: '#FF3B30' },
                  ]}
                  onPress={() => handleActionPress(action.route, capability.id)}
                  testID={`capability-action-${capability.id}`}
                >
                  <Text
                    style={[
                      styles.actionChipText,
                      { color: action.critical ? '#FF3B30' : theme.colors.primary },
                    ]}
                  >
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  viewSwitch: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  capabilityCard: {
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(10,132,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
  },
  capabilityTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  capabilityDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(118,118,128,0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 120,
    borderRadius: 14,
    padding: 12,
    backgroundColor: 'rgba(118,118,128,0.1)',
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  metricChange: {
    fontSize: 12,
    marginTop: 2,
  },
  automationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  automationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  automationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(10,132,255,0.4)',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  actionChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
