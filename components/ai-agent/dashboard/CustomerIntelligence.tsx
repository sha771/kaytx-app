import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Heart, AlertTriangle, TrendingUp, Users } from 'lucide-react-native';
import { CustomerIntelligenceConfig } from './types';

interface CustomerIntelligenceProps {
  config: CustomerIntelligenceConfig;
}

export default function CustomerIntelligence({ config }: CustomerIntelligenceProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Users size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Customer Intelligence
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <TrendingUp size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {config.expansionOpportunities}
          </Text>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Expansion Opportunities
          </Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#EF4444' + '20' }]}>
            <AlertTriangle size={20} color="#EF4444" />
          </View>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {config.renewalRisks}
          </Text>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Renewal Risks
          </Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <TrendingUp size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            ${(config.upsellPotential / 1000).toFixed(0)}K
          </Text>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Upsell Potential
          </Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.metricIcon, { backgroundColor: config.avgHealthScore >= 80 ? '#10B981' : config.avgHealthScore >= 60 ? '#F59E0B' : '#EF4444', opacity: 0.2 }]}>
            <Heart size={20} color={config.avgHealthScore >= 80 ? '#10B981' : config.avgHealthScore >= 60 ? '#F59E0B' : '#EF4444'} />
          </View>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {config.avgHealthScore.toFixed(0)}
          </Text>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Avg Health Score
          </Text>
        </View>
      </View>

      <View style={[styles.buyingSignalsSection, { backgroundColor: theme.colors.background }]}>
        <View style={styles.buyingSignalsHeader}>
          <TrendingUp size={16} color={theme.colors.primary} />
          <Text style={[styles.buyingSignalsTitle, { color: theme.colors.text }]}>
            Buying Signals Detected
          </Text>
        </View>
        <Text style={[styles.buyingSignalsValue, { color: theme.colors.text }]}>
          {config.buyingSignals}
        </Text>
        <Text style={[styles.buyingSignalsDescription, { color: theme.colors.textSecondary }]}>
          Active buying signals across customer base
        </Text>
      </View>
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
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  metricCard: {
    width: '50%',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
  },
  buyingSignalsSection: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyingSignalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  buyingSignalsTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  buyingSignalsValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  buyingSignalsDescription: {
    fontSize: 12,
  },
});
