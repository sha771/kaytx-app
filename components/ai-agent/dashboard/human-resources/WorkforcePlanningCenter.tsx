import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, TrendingUp, Calendar, Building2, Zap, Target, ArrowRight, ArrowUpRight, ArrowDownRight, Sparkles, Flame, Briefcase } from 'lucide-react-native';

interface WorkforcePlanningMetrics {
  futureHiringNeeds: number;
  capacityUtilization: number;
  successionReady: number;
  workforceGrowth: number;
  budgetUtilization: number;
  criticalRoles: number;
}

interface HiringForecast {
  quarter: string;
  planned: number;
  forecasted: number;
  confidence: number;
}

interface SuccessionPlan {
  role: string;
  incumbent: string;
  readyCount: number;
  readinessTime: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface WorkforcePlanningCenterProps {
  metrics: WorkforcePlanningMetrics;
  forecasts: HiringForecast[];
  successionPlans: SuccessionPlan[];
}

export default function WorkforcePlanningCenter({ metrics, forecasts, successionPlans }: WorkforcePlanningCenterProps) {
  const { theme } = useTheme();

  const planningCards = [
    {
      label: 'Future Hiring Needs',
      value: metrics.futureHiringNeeds.toString(),
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Next 12 months',
      trend: 'up' as const
    },
    {
      label: 'Capacity Utilization',
      value: `${metrics.capacityUtilization}%`,
      icon: Building2,
      color: '#10B981',
      subtitle: 'Current capacity',
      trend: 'up' as const
    },
    {
      label: 'Succession Ready',
      value: `${metrics.successionReady}%`,
      icon: Zap,
      color: '#8B5CF6',
      subtitle: 'Key roles covered',
      trend: 'up' as const
    },
    {
      label: 'Workforce Growth',
      value: `${metrics.workforceGrowth}%`,
      icon: TrendingUp,
      color: '#F59E0B',
      subtitle: 'Projected growth',
      trend: 'up' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={14} color="#10B981" />
      : <ArrowDownRight size={14} color="#EF4444" />;
  };

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Briefcase size={24} color="#8B5CF6" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Workforce Planning Center
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Strategic Workforce Intelligence
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardsRow}>
          {planningCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.planningCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: card.color + '30', borderWidth: 1 }]}>
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
          <Calendar size={20} color="#3B82F6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Hiring Forecast
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.forecastsRow}>
            {forecasts.map((forecast, index) => (
              <View key={index} style={[styles.forecastCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: forecast.confidence >= 80 ? '#10B981' + '30' : forecast.confidence >= 60 ? '#F59E0B' + '30' : '#EF4444' + '30', borderWidth: 1 }]}>
                <Text style={[styles.forecastQuarter, { color: theme.colors.text }]}>
                  {forecast.quarter}
                </Text>
                
                <View style={styles.forecastStats}>
                  <View style={styles.forecastStat}>
                    <Text style={[styles.forecastStatLabel, { color: theme.colors.textSecondary }]}>
                      Planned
                    </Text>
                    <Text style={[styles.forecastStatValue, { color: theme.colors.text }]}>
                      {forecast.planned}
                    </Text>
                  </View>
                  <View style={styles.forecastStat}>
                    <Text style={[styles.forecastStatLabel, { color: theme.colors.textSecondary }]}>
                      Forecasted
                    </Text>
                    <Text style={[styles.forecastStatValue, { color: theme.colors.text }]}>
                      {forecast.forecasted}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.confidenceSection}>
                  <Text style={[styles.confidenceLabel, { color: theme.colors.textSecondary }]}>
                    AI Confidence
                  </Text>
                  <Text style={[styles.confidenceValue, { color: theme.colors.text }]}>
                    {forecast.confidence}%
                  </Text>
                  <View style={[styles.confidenceBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[
                        styles.confidenceFill, 
                        { 
                          backgroundColor: forecast.confidence >= 80 ? '#10B981' : 
                                       forecast.confidence >= 60 ? '#F59E0B' : '#EF4444',
                          width: `${forecast.confidence}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Zap size={20} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Succession Planning
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.successionRow}>
            {successionPlans.map((plan, index) => (
              <View key={index} style={[styles.successionCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: getRiskColor(plan.riskLevel) + '30', borderWidth: 1 }]}>
                <View style={styles.successionHeader}>
                  <Text style={[styles.successionRole, { color: theme.colors.text }]}>
                    {plan.role}
                  </Text>
                  <View style={[styles.riskBadge, { backgroundColor: getRiskColor(plan.riskLevel) + '20' }]}>
                    <Text style={[styles.riskText, { color: getRiskColor(plan.riskLevel) }]}>
                      {plan.riskLevel} risk
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.incumbentLabel, { color: theme.colors.textSecondary }]}>
                  Incumbent
                </Text>
                <Text style={[styles.incumbentValue, { color: theme.colors.text }]}>
                  {plan.incumbent}
                </Text>
                
                <View style={styles.successionStats}>
                  <View style={styles.successionStat}>
                    <Users size={12} color="#10B981" />
                    <Text style={[styles.successionStatText, { color: theme.colors.textSecondary }]}>
                      {plan.readyCount} ready
                    </Text>
                  </View>
                  <View style={styles.successionStat}>
                    <Calendar size={12} color="#3B82F6" />
                    <Text style={[styles.successionStatText, { color: theme.colors.textSecondary }]}>
                      {plan.readinessTime}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.metricsSection}>
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: '#3B82F6' + '30', borderWidth: 1 }]}>
            <Target size={16} color="#3B82F6" />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Budget Utilization
            </Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.budgetUtilization}%
            </Text>
            <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
              Workforce budget used
            </Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: 'rgba(239, 68, 68, 0.08)', borderColor: '#EF4444' + '30', borderWidth: 1 }]}>
            <Zap size={16} color="#EF4444" />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Critical Roles
            </Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.criticalRoles}
            </Text>
            <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
              Need succession coverage
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.insightsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.insightItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Q3 hiring needs increased by 15% due to expansion
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Succession coverage improved to 85% for C-suite roles
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
    gap: 12,
    marginBottom: 16,
  },
  planningCard: {
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
  forecastsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  forecastCard: {
    width: 160,
    padding: 16,
    borderRadius: 14,
  },
  forecastQuarter: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  forecastStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  forecastStat: {
    flex: 1,
  },
  forecastStatLabel: {
    fontSize: 9,
    opacity: 0.7,
    marginBottom: 4,
  },
  forecastStatValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  confidenceSection: {
    marginTop: 8,
  },
  confidenceLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 4,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  confidenceBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 5,
  },
  successionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  successionCard: {
    width: 180,
    padding: 16,
    borderRadius: 14,
  },
  successionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  successionRole: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskText: {
    fontSize: 9,
    fontWeight: '600',
  },
  incumbentLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 4,
  },
  incumbentValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  successionStats: {
    flexDirection: 'row',
    gap: 12,
  },
  successionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  successionStatText: {
    fontSize: 10,
    opacity: 0.7,
  },
  metricsSection: {
    marginTop: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 6,
  },
  metricSubtitle: {
    fontSize: 11,
    opacity: 0.8,
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