import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, AlertTriangle, TrendingUp, TrendingDown, Minus, Activity, Lock } from 'lucide-react-native';
import { RiskComplianceConfig } from '../types';

interface RiskComplianceProps {
  config: RiskComplianceConfig;
}

export default function RiskCompliance({ config }: RiskComplianceProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp size={12} color="#EF4444" />;
      case 'down': return <TrendingDown size={12} color="#10B981" />;
      default: return <Minus size={12} color="#6B7280" />;
    }
  };

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage > 70) return '#EF4444';
    if (percentage > 50) return '#F59E0B';
    return '#10B981';
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.riskBadge, { backgroundColor: '#EF444420', borderColor: '#EF4444' }]}>
            <Shield size={16} color="#EF4444" />
            <Text style={styles.riskBadgeText}>RISK CONTROL</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Compliance Center
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={styles.liveText}>MONITORING</Text>
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Risk Categories</Text>
        {config.riskCategories.map((category, index) => (
          <View key={index} style={styles.riskItem}>
            <Text style={[styles.riskLabel, { color: '#FFFFFF' }]}>{category.category}</Text>
            <View style={styles.riskBar}>
              <View style={[styles.riskFill, { width: `${(category.score / category.max) * 100}%`, backgroundColor: getScoreColor(category.score, category.max) }]} />
            </View>
            <Text style={[styles.riskScore, { color: getScoreColor(category.score, category.max) }]}>
              {category.score}
            </Text>
            <View style={styles.riskTrend}>
              {getTrendIcon(category.trend)}
            </View>
            {category.alerts > 0 && (
              <View style={[styles.alertBadge, { backgroundColor: '#EF444420', borderColor: '#EF4444' }]}>
                <AlertTriangle size={12} color="#EF4444" />
                <Text style={[styles.alertCount, { color: '#EF4444' }]}>{category.alerts}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Stress Test Scenarios</Text>
        {config.stressTestScenarios.map((scenario, index) => (
          <View key={index} style={[styles.scenarioCard, { backgroundColor: '#0A0F14', borderColor: '#F59E0B' }]}>
            <View style={[styles.scenarioIcon, { backgroundColor: '#F59E0B20' }]}>
              <Shield size={16} color="#F59E0B" />
            </View>
            <View style={styles.scenarioContent}>
              <Text style={[styles.scenarioName, { color: '#FFFFFF' }]}>{scenario.scenario}</Text>
              <Text style={[styles.scenarioImpact, { color: '#EF4444' }]}>{scenario.impact}</Text>
              <Text style={[styles.scenarioDetails, { color: '#9CA3AF' }]}>
                Probability: {scenario.probability}% | Mitigation: {scenario.mitigation}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Value at Risk (VaR)</Text>
        <View style={styles.varContainer}>
          <View style={[styles.varItem, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
            <Lock size={20} color="#06B6D4" />
            <Text style={[styles.varLabel, { color: '#9CA3AF' }]}>VaR (95%)</Text>
            <Text style={[styles.varValue, { color: '#FFFFFF' }]}>{config.varMetrics.var95}</Text>
          </View>
          <View style={[styles.varItem, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
            <Lock size={20} color="#F59E0B" />
            <Text style={[styles.varLabel, { color: '#9CA3AF' }]}>VaR (99%)</Text>
            <Text style={[styles.varValue, { color: '#FFFFFF' }]}>{config.varMetrics.var99}</Text>
          </View>
          <View style={[styles.varItem, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
            <Activity size={20} color="#10B981" />
            <Text style={[styles.varLabel, { color: '#9CA3AF' }]}>Time Horizon</Text>
            <Text style={[styles.varValue, { color: '#FFFFFF' }]}>{config.varMetrics.timeHorizon}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  riskBadgeText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskLabel: {
    width: 100,
    fontSize: 12,
  },
  riskBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  riskFill: {
    height: '100%',
    borderRadius: 4,
  },
  riskScore: {
    width: 30,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  riskTrend: {
    width: 20,
    alignItems: 'center',
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
    borderWidth: 1,
  },
  alertCount: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  scenarioCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  scenarioIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scenarioContent: {
    flex: 1,
  },
  scenarioName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  scenarioImpact: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  scenarioDetails: {
    fontSize: 11,
  },
  varContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  varItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  varLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  varValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
