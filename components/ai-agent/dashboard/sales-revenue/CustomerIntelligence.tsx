import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, AlertTriangle, TrendingUp, Heart, Activity } from 'lucide-react-native';

interface CustomerIntelligenceConfig {
  expansionOpportunities: number;
  renewalRisks: number;
  upsellPotential: number;
  avgHealthScore: number;
  buyingSignals: number;
}

interface CustomerIntelligenceProps {
  config: CustomerIntelligenceConfig;
}

export default function CustomerIntelligence({ config }: CustomerIntelligenceProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#3B82F6';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Users size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Customer Intelligence
        </Text>
      </View>

      <View style={styles.intelligenceGrid}>
        <View style={styles.intelligenceCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#10B981' + '20' }]}>
              <TrendingUp size={16} color="#10B981" />
            </View>
            <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
              Expansion Opportunities
            </Text>
          </View>
          <Text style={[styles.cardValue, { color: theme.colors.text }]}>
            {config.expansionOpportunities}
          </Text>
          <Text style={[styles.cardSubtext, { color: theme.colors.textSecondary }]}>
            Accounts ready for growth
          </Text>
        </View>

        <View style={styles.intelligenceCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#EF4444' + '20' }]}>
              <AlertTriangle size={16} color="#EF4444" />
            </View>
            <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
              Renewal Risks
            </Text>
          </View>
          <Text style={[styles.cardValue, { color: theme.colors.text }]}>
            {config.renewalRisks}
          </Text>
          <Text style={[styles.cardSubtext, { color: theme.colors.textSecondary }]}>
            Accounts at risk
          </Text>
        </View>

        <View style={styles.intelligenceCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Activity size={16} color="#8B5CF6" />
            </View>
            <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
              Upsell Potential
            </Text>
          </View>
          <Text style={[styles.cardValue, { color: theme.colors.text }]}>
            {formatCurrency(config.upsellPotential)}
          </Text>
          <Text style={[styles.cardSubtext, { color: theme.colors.textSecondary }]}>
              Total opportunity value
          </Text>
        </View>

        <View style={styles.intelligenceCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: getHealthColor(config.avgHealthScore) + '20' }]}>
              <Heart size={16} color={getHealthColor(config.avgHealthScore)} />
            </View>
            <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
              Avg Health Score
            </Text>
          </View>
          <Text style={[styles.cardValue, { color: getHealthColor(config.avgHealthScore) }]}>
            {config.avgHealthScore}
          </Text>
          <View style={[styles.healthBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.healthFill, 
                { 
                  backgroundColor: getHealthColor(config.avgHealthScore),
                  width: `${config.avgHealthScore}%`
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.intelligenceCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#06B6D4' + '20' }]}>
              <Activity size={16} color="#06B6D4" />
            </View>
            <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
              Buying Signals
            </Text>
          </View>
          <Text style={[styles.cardValue, { color: theme.colors.text }]}>
            {config.buyingSignals}
          </Text>
          <Text style={[styles.cardSubtext, { color: theme.colors.textSecondary }]}>
            Active signals detected
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  intelligenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  intelligenceCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 11,
    flex: 1,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 10,
  },
  healthBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  healthFill: {
    height: '100%',
    borderRadius: 2,
  }
});