import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, AlertTriangle, TrendingUp, Activity, Zap, Target, Clock, DollarSign } from 'lucide-react-native';

interface RiskFactor {
  category: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  trend: 'improving' | 'stable' | 'deteriorating';
}

interface FinancialRiskRadarProps {
  risks: RiskFactor[];
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
}

export default function FinancialRiskRadar({ risks, overallRiskLevel, riskScore }: FinancialRiskRadarProps) {
  const { theme } = useTheme();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'critical': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: 'improving' | 'stable' | 'deteriorating') => {
    switch (trend) {
      case 'improving':
        return <TrendingUp size={12} color="#10B981" />;
      case 'stable':
        return <Activity size={12} color="#6B7280" />;
      case 'deteriorating':
        return <AlertTriangle size={12} color="#EF4444" />;
    }
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'Financial': return <DollarSign size={16} color={theme.colors.primary} />;
      case 'Operational': return <Activity size={16} color={theme.colors.primary} />;
      case 'Regulatory': return <Shield size={16} color={theme.colors.primary} />;
      case 'Market': return <TrendingUp size={16} color={theme.colors.primary} />;
      case 'Liquidity': return <Zap size={16} color={theme.colors.primary} />;
      case 'Credit': return <Target size={16} color={theme.colors.primary} />;
      default: return <AlertTriangle size={16} color={theme.colors.primary} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Shield size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Financial Risk Radar
        </Text>
      </View>

      {/* Overall Risk Score */}
      <View style={[styles.overallRiskCard, { backgroundColor: `${getRiskColor(overallRiskLevel)}20`, borderColor: getRiskColor(overallRiskLevel) }]}>
        <View style={styles.overallRiskLeft}>
          <Text style={[styles.overallRiskLabel, { color: theme.colors.textSecondary }]}>Overall Risk Level</Text>
          <Text style={[styles.overallRiskLevel, { color: getRiskColor(overallRiskLevel) }]}>
            {overallRiskLevel.toUpperCase()}
          </Text>
        </View>
        <View style={styles.overallRiskRight}>
          <Text style={[styles.overallRiskScore, { color: getRiskColor(overallRiskLevel) }]}>
            {riskScore}
          </Text>
          <Text style={[styles.overallRiskScoreLabel, { color: theme.colors.textSecondary }]}>
            Risk Score
          </Text>
        </View>
      </View>

      {/* Risk Factors Grid */}
      <View style={styles.risksGrid}>
        {risks.map((risk, index) => (
          <View key={index} style={[styles.riskCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.riskHeader}>
              <View style={styles.riskIcon}>
                {getRiskIcon(risk.category)}
              </View>
              <Text style={[styles.riskCategory, { color: theme.colors.text }]}>
                {risk.category}
              </Text>
            </View>
            
            <View style={styles.riskScoreBar}>
              <View style={styles.riskScoreBarBackground}>
                <View 
                  style={[
                    styles.riskScoreBarFill, 
                    { 
                      width: `${risk.score}%`,
                      backgroundColor: getRiskColor(risk.level)
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.riskScoreText, { color: theme.colors.text }]}>
                {risk.score}/100
              </Text>
            </View>

            <View style={styles.riskFooter}>
              <View style={[styles.riskLevelBadge, { backgroundColor: `${getRiskColor(risk.level)}20` }]}>
                <Text style={[styles.riskLevelText, { color: getRiskColor(risk.level) }]}>
                  {risk.level.toUpperCase()}
                </Text>
              </View>
              <View style={styles.riskTrend}>
                {getTrendIcon(risk.trend)}
                <Text style={[styles.riskTrendText, { color: theme.colors.textSecondary }]}>
                  {risk.trend}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Risk Alerts */}
      <View style={[styles.alertsContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.alertsTitle, { color: theme.colors.text }]}>Active Risk Alerts</Text>
        <View style={styles.alertRow}>
          <View style={styles.alertItem}>
            <Clock size={14} color="#F59E0B" />
            <Text style={[styles.alertText, { color: theme.colors.text }]}>
              2 high-priority risks require attention
            </Text>
          </View>
          <View style={styles.alertItem}>
            <AlertTriangle size={14} color="#EF4444" />
            <Text style={[styles.alertText, { color: theme.colors.text }]}>
              Liquidity risk elevated in Q3 forecast
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  overallRiskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  overallRiskLeft: {
    flex: 1,
  },
  overallRiskLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  overallRiskLevel: {
    fontSize: 20,
    fontWeight: '700',
  },
  overallRiskRight: {
    alignItems: 'flex-end',
  },
  overallRiskScore: {
    fontSize: 32,
    fontWeight: '700',
  },
  overallRiskScoreLabel: {
    fontSize: 11,
  },
  risksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  riskCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  riskIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskCategory: {
    fontSize: 13,
    fontWeight: '600',
  },
  riskScoreBar: {
    marginBottom: 12,
  },
  riskScoreBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginBottom: 4,
  },
  riskScoreBarFill: {
    height: 8,
    borderRadius: 4,
  },
  riskScoreText: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskLevelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskLevelText: {
    fontSize: 10,
    fontWeight: '700',
  },
  riskTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  riskTrendText: {
    fontSize: 10,
  },
  alertsContainer: {
    padding: 16,
    borderRadius: 12,
  },
  alertsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  alertRow: {
    gap: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertText: {
    fontSize: 12,
  },
});
