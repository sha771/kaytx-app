import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, TrendingUp, Activity, Shield, BarChart3, Crown, Sparkles } from 'lucide-react-native';
import { CFOCommandCenterConfig } from '../types';

interface CFOCommandCenterProps {
  config: CFOCommandCenterConfig;
}

export default function CFOCommandCenter({ config }: CFOCommandCenterProps) {
  const { theme } = useTheme();

  const getRiskColor = (risk: string) => {
    if (risk.includes('Amber')) return '#F59E0B';
    if (risk.includes('Red')) return '#EF4444';
    return '#10B981';
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.cfoBadge, { backgroundColor: '#F59E0B20', borderColor: '#F59E0B' }]}>
            <Crown size={16} color="#F59E0B" />
            <Text style={styles.cfoBadgeText}>CFO COMMAND</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Executive Center
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Sparkles size={12} color="#10B981" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
          <View style={[styles.iconContainer, { backgroundColor: '#10B98120' }]}>
            <DollarSign size={24} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Total Portfolio</Text>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{config.totalPortfolioValue}</Text>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
          <View style={[styles.iconContainer, { backgroundColor: '#10B98120' }]}>
            <TrendingUp size={24} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Daily PnL</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{config.dailyPnL}</Text>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
          <View style={[styles.iconContainer, { backgroundColor: '#3B82F620' }]}>
            <Activity size={24} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Active Positions</Text>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{config.activePositions}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${getRiskColor(config.riskExposure)}20` }]}>
            <Shield size={24} color={getRiskColor(config.riskExposure)} />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Risk Exposure</Text>
          <Text style={[styles.metricValue, { color: getRiskColor(config.riskExposure) }]}>{config.riskExposure}</Text>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
          <View style={[styles.iconContainer, { backgroundColor: '#10B98120' }]}>
            <BarChart3 size={24} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Liquidity Available</Text>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{config.liquidityAvailable}</Text>
        </View>
      </View>

      <View style={[styles.healthSection, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Portfolio Health</Text>
        <View style={styles.healthBar}>
          <View style={[styles.healthFill, { width: `${config.portfolioHealth}%`, backgroundColor: config.portfolioHealth >= 80 ? '#10B981' : config.portfolioHealth >= 60 ? '#F59E0B' : '#EF4444' }]} />
        </View>
        <Text style={[styles.healthText, { color: '#FFFFFF' }]}>{config.portfolioHealth}%</Text>
      </View>

      <View style={[styles.exposureSection, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Market Exposure Breakdown</Text>
        {config.marketExposureBreakdown.map((item, index) => (
          <View key={index} style={styles.exposureItem}>
            <Text style={[styles.exposureLabel, { color: '#FFFFFF' }]}>{item.sector}</Text>
            <View style={styles.exposureBar}>
              <View style={[styles.exposureFill, { width: `${item.allocation}%`, backgroundColor: '#10B981' }]} />
            </View>
            <Text style={[styles.exposureValue, { color: '#FFFFFF' }]}>{item.allocation}%</Text>
            <Text style={[styles.exposureAmount, { color: '#9CA3AF' }]}>{item.value}</Text>
          </View>
        ))}
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
  cfoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  cfoBadgeText: {
    color: '#F59E0B',
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
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  healthSection: {
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthText: {
    fontSize: 20,
    fontWeight: '700',
  },
  exposureSection: {
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
  },
  exposureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exposureLabel: {
    width: 100,
    fontSize: 12,
  },
  exposureBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  exposureFill: {
    height: '100%',
    borderRadius: 3,
  },
  exposureValue: {
    width: 40,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  exposureAmount: {
    width: 60,
    fontSize: 11,
    textAlign: 'right',
  },
});
