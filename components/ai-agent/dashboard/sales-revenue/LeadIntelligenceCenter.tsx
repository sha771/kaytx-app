import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, Flame, Building2, Users, TrendingUp } from 'lucide-react-native';

interface Lead {
  id: string;
  company: string;
  source: string;
  score: number;
  intent: 'high' | 'medium' | 'low';
  industry: string;
  companySize: string;
}

interface LeadIntelligenceConfig {
  leads: Lead[];
  totalLeads: number;
  avgScore: number;
}

interface LeadIntelligenceCenterProps {
  config: LeadIntelligenceConfig;
}

export default function LeadIntelligenceCenter({ config }: LeadIntelligenceCenterProps) {
  const { theme } = useTheme();

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'high':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#6B7280';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 70) return '#3B82F6';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'website':
        return '🌐';
      case 'linkedin':
        return '💼';
      case 'referral':
        return '👥';
      case 'email':
        return '📧';
      case 'twitter':
        return '🐦';
      default:
        return '📊';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Target size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Lead Intelligence Center
        </Text>
      </View>

      <View style={styles.summaryStats}>
        <View style={styles.statCard}>
          <Users size={16} color="#3B82F6" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {config.totalLeads.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Total Leads
          </Text>
        </View>
        <View style={styles.statCard}>
          <Flame size={16} color="#F59E0B" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {config.avgScore}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Avg Score
          </Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={16} color="#10B981" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {config.leads.filter(l => l.intent === 'high').length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            High Intent
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.leadsRow}>
          {config.leads.map((lead) => (
            <View key={lead.id} style={[styles.leadCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
              <View style={styles.leadHeader}>
                <View style={styles.leadAvatar}>
                  <Text style={styles.leadAvatarText}>{getSourceIcon(lead.source)}</Text>
                </View>
                <View style={styles.leadInfo}>
                  <Text style={[styles.leadCompany, { color: theme.colors.text }]}>
                    {lead.company}
                  </Text>
                  <Text style={[styles.leadIndustry, { color: theme.colors.textSecondary }]}>
                    {lead.industry}
                  </Text>
                </View>
              </View>

              <View style={styles.leadScore}>
                <View style={styles.scoreBar}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                    Lead Score
                  </Text>
                  <Text style={[styles.scoreValue, { color: getScoreColor(lead.score) }]}>
                    {lead.score}
                  </Text>
                </View>
                <View style={[styles.scoreProgress, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
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
              </View>

              <View style={styles.leadDetails}>
                <View style={styles.detailItem}>
                  <Building2 size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                    {lead.companySize}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Target size={12} color={getIntentColor(lead.intent)} />
                  <Text style={[styles.detailText, { color: getIntentColor(lead.intent) }]}>
                    {lead.intent.charAt(0).toUpperCase() + lead.intent.slice(1)} Intent
                  </Text>
                </View>
              </View>

              <View style={[styles.intentBadge, { backgroundColor: getIntentColor(lead.intent) + '20' }]}>
                <Text style={[styles.intentText, { color: getIntentColor(lead.intent) }]}>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
  },
  leadsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  leadCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 200,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  leadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  leadAvatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  leadAvatarText: {
    fontSize: 18,
  },
  leadInfo: {
    flex: 1,
  },
  leadCompany: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  leadIndustry: {
    fontSize: 11,
  },
  leadScore: {
    marginBottom: 12,
  },
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 10,
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 2,
  },
  leadDetails: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 10,
  },
  intentBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  intentText: {
    fontSize: 10,
    fontWeight: '600',
  }
});