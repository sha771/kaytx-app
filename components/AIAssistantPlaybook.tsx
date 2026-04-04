import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import type { AssistantPageDefinition, AssistantPageMetric } from '@/constants/aiAssistantPlaybooks';

interface AIAssistantPlaybookProps {
  title: string;
  subtitle?: string;
  stats: AssistantPageMetric[];
  pages: AssistantPageDefinition[];
  testID?: string;
}

const statusColors: Record<string, { text: string; background: string }> = {
  live: { text: '#0ACF83', background: '#0ACF8320' },
  beta: { text: '#FF9500', background: '#FF950020' },
  planned: { text: '#8E8E93', background: '#8E8E9320' },
};

export function AIAssistantPlaybook({ title, subtitle, stats, pages, testID }: AIAssistantPlaybookProps) {
  const { theme } = useTheme();

  const handleNavigate = useCallback((route: string, pageId: string) => {
    console.log('[AIAssistantPlaybook] navigate', { route, pageId });
    router.push(route as never);
  }, []);

  const renderMetric = ({ item }: { item: AssistantPageMetric }) => (
    <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
      <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
      {item.trend && (
        <Text style={[styles.metricTrend, { color: item.trend.startsWith('-') ? '#FF3B30' : '#34C759' }]}>
          {item.trend}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>{subtitle}</Text>
          ) : null}
        </View>
        <View style={styles.headerAccent} />
      </View>

      <FlatList
        data={stats}
        horizontal
        keyExtractor={({ label }) => label}
        renderItem={renderMetric}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricList}
      />

      <View style={styles.cardsContainer}>
        {pages.map(page => {
          const badgeColors = statusColors[page.status] ?? statusColors.live;
          const Icon = page.icon;
          return (
            <TouchableOpacity
              key={page.id}
              style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => handleNavigate(page.route, page.id)}
              activeOpacity={0.85}
              testID={`${testID ?? 'playbook'}-card-${page.id}`}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrap, { backgroundColor: `${theme.colors.primary}15` }]}> 
                  <Icon size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.cardTitleGroup}>
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{page.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: badgeColors.background }]}> 
                    <Text style={[styles.statusText, { color: badgeColors.text }]}>{page.status.toUpperCase()}</Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
                {page.description}
              </Text>

              <View style={styles.metricsRow}>
                {page.metrics.slice(0, 2).map(metric => (
                  <View key={`${page.id}-${metric.label}`} style={styles.inlineMetric}>
                    <Text style={[styles.inlineMetricLabel, { color: theme.colors.secondaryText }]}>
                      {metric.label}
                    </Text>
                    <Text style={[styles.inlineMetricValue, { color: theme.colors.text }]}> 
                      {metric.value}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.listGroup}>
                <Text style={[styles.listTitle, { color: theme.colors.secondaryText }]}>Automations</Text>
                {page.automations.slice(0, 3).map(item => (
                  <Text key={`${page.id}-auto-${item}`} style={[styles.listItem, { color: theme.colors.text }]}>• {item}</Text>
                ))}
              </View>

              <View style={styles.listGroup}>
                <Text style={[styles.listTitle, { color: theme.colors.secondaryText }]}>Guardrails</Text>
                {page.guardrails.slice(0, 2).map(item => (
                  <Text key={`${page.id}-guard-${item}`} style={[styles.listItem, { color: theme.colors.text }]}>• {item}</Text>
                ))}
              </View>

              {page.escalations.length > 0 && (
                <View style={styles.escalationRow}>
                  <Text style={[styles.escalationLabel, { color: theme.colors.secondaryText }]}>Escalate to</Text>
                  <Text style={[styles.escalationValue, { color: theme.colors.primary }]}> 
                    {page.escalations[0]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerAccent: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0ACF83',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  metricList: {
    paddingBottom: 12,
    paddingRight: 20,
  },
  metricCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 140,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  metricLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  metricTrend: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleGroup: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inlineMetric: {
    flex: 1,
  },
  inlineMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  inlineMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  listGroup: {
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  listItem: {
    fontSize: 13,
    lineHeight: 18,
  },
  escalationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  escalationLabel: {
    fontSize: 12,
  },
  escalationValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});
