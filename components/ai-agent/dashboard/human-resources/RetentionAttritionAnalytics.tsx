import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, TrendingDown, AlertTriangle, Users, Clock, ArrowRight, Heart, ArrowUpRight, ArrowDownRight, Sparkles, Flame, ShieldAlert } from 'lucide-react-native';

interface RetentionMetrics {
  retentionRate: number;
  voluntaryTurnover: number;
  involuntaryTurnover: number;
  attritionRisk: number;
  flightRiskEmployees: number;
  avgTenureBeforeExit: number;
}

interface RiskSegment {
  segment: string;
  count: number;
  riskLevel: 'high' | 'medium' | 'low';
  percentage: number;
}

interface ExitReason {
  reason: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface RetentionAttritionAnalyticsProps {
  metrics: RetentionMetrics;
  riskSegments: RiskSegment[];
  exitReasons: ExitReason[];
}

export default function RetentionAttritionAnalytics({ metrics, riskSegments, exitReasons }: RetentionAttritionAnalyticsProps) {
  const { theme } = useTheme();

  const retentionCards = [
    {
      label: 'Retention Rate',
      value: `${metrics.retentionRate}%`,
      icon: Shield,
      color: '#10B981',
      subtitle: 'Year-to-date',
      trend: 'up' as const
    },
    {
      label: 'Voluntary Turnover',
      value: `${metrics.voluntaryTurnover}%`,
      icon: TrendingDown,
      color: '#EF4444',
      subtitle: 'Resignations',
      trend: 'down' as const
    },
    {
      label: 'Attrition Risk',
      value: `${metrics.attritionRisk}%`,
      icon: AlertTriangle,
      color: '#F59E0B',
      subtitle: 'High-risk employees',
      trend: 'down' as const
    },
    {
      label: 'Flight Risk',
      value: metrics.flightRiskEmployees.toString(),
      icon: ShieldAlert,
      color: '#8B5CF6',
      subtitle: 'Employees at risk',
      trend: 'down' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={14} color="#10B981" />
      : <ArrowDownRight size={14} color="#EF4444" />;
  };

  const getRiskColor = (risk: 'high' | 'medium' | 'low') => {
    switch (risk) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
    }
  };

  const getTrendIconForReason = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight size={14} color="#EF4444" />;
      case 'down':
        return <ArrowDownRight size={14} color="#10B981" />;
      case 'stable':
        return <ArrowRight size={14} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#10B981' + '20' }]}>
          <Shield size={24} color="#10B981" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Retention & Attrition Analytics
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Workforce Stability Intelligence
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardsRow}>
          {retentionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.retentionCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: card.color + '30', borderWidth: 1 }]}>
                <View style={[styles.iconContainer, { backgroundColor: card.color + '15' }]}>
                  <Icon size={22} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: card.color }]}>
                  {card.value}
                </Text>
                <View style={styles.cardFooter}>
                  {getTrendIcon(card.trend)}
                  <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                    {card.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <ShieldAlert size={20} color="#F59E0B" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Risk Segments
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.segmentsRow}>
            {riskSegments.map((segment, index) => (
              <View key={index} style={[styles.segmentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: getRiskColor(segment.riskLevel) + '30', borderWidth: 1 }]}>
                <View style={styles.segmentHeader}>
                  <Text style={[styles.segmentName, { color: theme.colors.text }]}>
                    {segment.segment}
                  </Text>
                  <View style={[styles.riskBadge, { backgroundColor: getRiskColor(segment.riskLevel) + '20' }]}>
                    <AlertTriangle size={12} color={getRiskColor(segment.riskLevel)} />
                    <Text style={[styles.riskText, { color: getRiskColor(segment.riskLevel) }]}>
                      {segment.riskLevel}
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.segmentCount, { color: getRiskColor(segment.riskLevel) }]}>
                  {segment.count}
                </Text>
                
                <Text style={[styles.segmentPercentage, { color: theme.colors.textSecondary }]}>
                  {segment.percentage}% of at-risk
                </Text>
                
                <View style={[styles.segmentBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.segmentFill, 
                      { 
                        backgroundColor: getRiskColor(segment.riskLevel),
                        width: `${segment.percentage}%`,
                        shadowColor: getRiskColor(segment.riskLevel),
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <TrendingDown size={20} color="#EF4444" />
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Exit Reasons Analysis
        </Text>
        </View>
        
        <View style={styles.exitReasonsGrid}>
          {exitReasons.map((reason, index) => (
            <View key={index} style={[styles.exitCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
              <View style={styles.exitHeader}>
                <Text style={[styles.exitReason, { color: theme.colors.text }]}>
                  {reason.reason}
                </Text>
                {getTrendIconForReason(reason.trend)}
              </View>
              
              <View style={styles.exitStats}>
                <View style={styles.exitStat}>
                  <Text style={[styles.exitCount, { color: theme.colors.text }]}>
                    {reason.count}
                  </Text>
                  <Text style={[styles.exitLabel, { color: theme.colors.textSecondary }]}>
                    exits
                  </Text>
                </View>
                <View style={styles.exitStat}>
                  <Text style={[styles.exitPercentage, { color: theme.colors.text }]}>
                    {reason.percentage}%
                  </Text>
                  <Text style={[styles.exitLabel, { color: theme.colors.textSecondary }]}>
                    of total
                  </Text>
                </View>
              </View>
              
              <View style={[styles.exitBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.exitFill, 
                    { 
                      backgroundColor: reason.trend === 'up' ? '#EF4444' : 
                                   reason.trend === 'down' ? '#10B981' : '#6B7280',
                      width: `${reason.percentage}%`,
                      shadowColor: reason.trend === 'up' ? '#EF4444' : reason.trend === 'down' ? '#10B981' : '#6B7280',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.4,
                      shadowRadius: 8,
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tenureSection}>
        <View style={[styles.tenureCard, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: '#06B6D4' + '30', borderWidth: 1 }]}>
          <View style={styles.tenureHeader}>
            <View style={[styles.tenureIcon, { backgroundColor: '#06B6D4' + '20' }]}>
              <Clock size={20} color="#06B6D4" />
            </View>
            <View style={styles.tenureHeaderInfo}>
              <Text style={[styles.tenureLabel, { color: theme.colors.textSecondary }]}>
                Average Tenure Before Exit
              </Text>
              <Text style={[styles.tenureSubtitle, { color: theme.colors.textSecondary }]}>
                Time before resignation
              </Text>
            </View>
          </View>
          <Text style={[styles.tenureValue, { color: '#06B6D4' }]}>
            {metrics.avgTenureBeforeExit} months
          </Text>
        </View>
      </View>

      <View style={styles.retentionScoreSection}>
        <View style={[styles.retentionScoreCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: '#10B981' + '30', borderWidth: 1 }]}>
          <View style={styles.retentionScoreHeader}>
            <View style={[styles.retentionScoreIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Heart size={20} color="#10B981" />
            </View>
            <View style={styles.retentionScoreHeaderInfo}>
              <Text style={[styles.retentionScoreLabel, { color: theme.colors.textSecondary }]}>
                Overall Retention Health
              </Text>
              <Text style={[styles.retentionScoreSubtitle, { color: theme.colors.textSecondary }]}>
                Workforce stability score
              </Text>
            </View>
          </View>
          <Text style={[styles.retentionScoreValue, { color: metrics.retentionRate >= 90 ? '#10B981' : metrics.retentionRate >= 80 ? '#F59E0B' : '#EF4444' }]}>
            {metrics.retentionRate >= 90 ? 'Excellent' : metrics.retentionRate >= 80 ? 'Good' : 'Needs Attention'}
          </Text>
          <View style={[styles.retentionScoreBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.retentionScoreFill, 
                { 
                  backgroundColor: metrics.retentionRate >= 90 ? '#10B981' : 
                               metrics.retentionRate >= 80 ? '#F59E0B' : '#EF4444',
                  width: `${metrics.retentionRate}%`,
                  shadowColor: metrics.retentionRate >= 90 ? '#10B981' : metrics.retentionRate >= 80 ? '#F59E0B' : '#EF4444',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={[styles.insightsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.insightItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Engineering attrition decreased by 12% after intervention
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            New retention program reduced flight risk by 18%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  retentionCard: {
    width: 160,
    padding: 16,
    borderRadius: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  section: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  segmentsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  segmentCard: {
    width: 180,
    padding: 16,
    borderRadius: 14,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  segmentName: {
    fontSize: 13,
    fontWeight: '600',
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '700',
  },
  segmentCount: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 6,
  },
  segmentPercentage: {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 12,
  },
  segmentBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  segmentFill: {
    height: '100%',
    borderRadius: 5,
  },
  exitReasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  exitCard: {
    flex: 1,
    minWidth: 160,
    padding: 16,
    borderRadius: 14,
  },
  exitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  exitReason: {
    fontSize: 13,
    fontWeight: '600',
  },
  exitStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 14,
  },
  exitStat: {
    alignItems: 'center',
  },
  exitCount: {
    fontSize: 20,
    fontWeight: '700',
  },
  exitPercentage: {
    fontSize: 20,
    fontWeight: '700',
  },
  exitLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  exitBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  exitFill: {
    height: '100%',
    borderRadius: 5,
  },
  tenureSection: {
    marginBottom: 16,
  },
  tenureCard: {
    padding: 18,
    borderRadius: 16,
  },
  tenureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  tenureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tenureHeaderInfo: {
    flex: 1,
  },
  tenureLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  tenureSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  tenureValue: {
    fontSize: 42,
    fontWeight: '800',
  },
  retentionScoreSection: {
    marginBottom: 16,
  },
  retentionScoreCard: {
    padding: 18,
    borderRadius: 16,
  },
  retentionScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  retentionScoreIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retentionScoreHeaderInfo: {
    flex: 1,
  },
  retentionScoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  retentionScoreSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  retentionScoreValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 14,
  },
  retentionScoreBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  retentionScoreFill: {
    height: '100%',
    borderRadius: 5,
  },
  insightsSection: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
  },
  insightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightText: {
    fontSize: 11,
    opacity: 0.8,
    flex: 1,
  },
});