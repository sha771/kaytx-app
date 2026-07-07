import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, TrendingUp, Building2, Users } from 'lucide-react-native';
import { LeadIntelligenceConfig } from './types';

interface LeadIntelligenceProps {
  config: LeadIntelligenceConfig;
}

export default function LeadIntelligence({ config }: LeadIntelligenceProps) {
  const { theme } = useTheme();

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'high': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'low': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Target size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Lead Intelligence
          </Text>
        </View>
        <View style={styles.headerStats}>
          <View style={[styles.statBadge, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {config.totalLeads}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Total Leads
            </Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.statValue, { color: getScoreColor(config.avgScore) }]}>
              {config.avgScore.toFixed(0)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Avg Score
            </Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.leadsContainer}>
          {config.leads.map((lead) => (
            <View key={lead.id} style={[styles.leadCard, { backgroundColor: theme.colors.background }]}>
              <View style={styles.leadHeader}>
                <Text style={[styles.companyName, { color: theme.colors.text }]} numberOfLines={1}>
                  {lead.company}
                </Text>
                <View style={[styles.intentBadge, { backgroundColor: getIntentColor(lead.intent) + '20' }]}>
                  <Text style={[styles.intentText, { color: getIntentColor(lead.intent) }]}>
                    {lead.intent.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.leadScore}>
                <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                  Lead Score
                </Text>
                <View style={styles.scoreBar}>
                  <View style={[styles.scoreTrack, { backgroundColor: theme.colors.card }]}>
                    <View 
                      style={[
                        styles.scoreFill, 
                        { 
                          backgroundColor: getScoreColor(lead.score),
                          width: `${lead.score}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.scoreValue, { color: getScoreColor(lead.score) }]}>
                    {lead.score}
                  </Text>
                </View>
              </View>

              <View style={styles.leadDetails}>
                <View style={styles.detail}>
                  <Building2 size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                    {lead.industry}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Users size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                    {lead.companySize}
                  </Text>
                </View>
              </View>

              <View style={[styles.sourceBadge, { backgroundColor: theme.colors.card }]}>
                <TrendingUp size={12} color={theme.colors.primary} />
                <Text style={[styles.sourceText, { color: theme.colors.textSecondary }]}>
                  {lead.source}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  leadsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  leadCard: {
    width: 200,
    padding: 12,
    borderRadius: 12,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  intentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  intentText: {
    fontSize: 10,
    fontWeight: '700',
  },
  leadScore: {
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  scoreBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  leadDetails: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  detailText: {
    fontSize: 10,
    flex: 1,
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  sourceText: {
    fontSize: 10,
  },
});
