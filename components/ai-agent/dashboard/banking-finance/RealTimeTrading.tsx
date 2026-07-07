import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Activity, Zap, Globe, ArrowRight, Play } from 'lucide-react-native';
import { RealTimeTradingConfig } from '../types';

interface RealTimeTradingProps {
  config: RealTimeTradingConfig;
}

export default function RealTimeTrading({ config }: RealTimeTradingProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? '#10B981' : '#EF4444';
  };

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'active': return '#06B6D4';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.tradingBadge, { backgroundColor: '#06B6D420', borderColor: '#06B6D4' }]}>
            <Zap size={16} color="#06B6D4" />
            <Text style={styles.tradingBadgeText}>HFT TRADING</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Trading Control Center
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      <View style={styles.marketsGrid}>
        {config.markets.map((market) => {
          const TrendIcon = getTrendIcon(market.trend);
          return (
            <View key={market.id} style={[styles.marketCard, { backgroundColor: '#0A0F14', borderColor: getTrendColor(market.trend) }]}>
              <Text style={[styles.marketName, { color: '#FFFFFF' }]}>{market.name}</Text>
              <Text style={[styles.marketVolume, { color: '#FFFFFF' }]}>{market.volume}</Text>
              <View style={styles.marketChange}>
                <TrendIcon size={16} color={getTrendColor(market.trend)} />
                <Text style={[styles.changeText, { color: getTrendColor(market.trend) }]}>
                  {market.change}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getWorkflowStatusColor(market.status) + '20', borderColor: getWorkflowStatusColor(market.status) }]}>
                <Text style={[styles.statusText, { color: getWorkflowStatusColor(market.status) }]}>{market.status}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={[styles.workflowSection, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Trading Workflow</Text>
        {config.workflow.map((step, index) => (
          <View key={index} style={styles.workflowStep}>
            <View style={[styles.stepIndicator, { backgroundColor: getWorkflowStatusColor(step.status) + '20', borderColor: getWorkflowStatusColor(step.status) }]}>
              {step.status === 'active' && <Play size={10} color={getWorkflowStatusColor(step.status)} />}
              {step.status !== 'active' && <Text style={[styles.stepNumber, { color: getWorkflowStatusColor(step.status) }]}>{index + 1}</Text>}
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepName, { color: '#FFFFFF' }]}>{step.step}</Text>
              {step.duration && (
                <Text style={[styles.stepDuration, { color: '#9CA3AF' }]}>{step.duration}</Text>
              )}
            </View>
            {index < config.workflow.length - 1 && <ArrowRight size={16} color="#6B7280" />}
          </View>
        ))}
      </View>

      <View style={[styles.heatmapSection, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Global Trading Heatmap</Text>
        {config.heatmapData.map((region, index) => (
          <View key={index} style={styles.heatmapItem}>
            <Globe size={16} color="#06B6D4" />
            <Text style={[styles.regionName, { color: '#FFFFFF' }]}>{region.region}</Text>
            <View style={styles.heatmapBar}>
              <View style={[styles.heatmapFill, { width: `${region.intensity}%`, backgroundColor: region.intensity > 70 ? '#10B981' : region.intensity > 50 ? '#3B82F6' : '#F59E0B' }]} />
            </View>
            <Text style={[styles.regionVolume, { color: '#FFFFFF' }]}>{region.volume}</Text>
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
  tradingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  tradingBadgeText: {
    color: '#06B6D4',
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
  marketsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  marketCard: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    marginRight: '2%',
    marginBottom: 8,
    borderWidth: 1,
  },
  marketName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  marketVolume: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  marketChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  workflowSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  workflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    fontSize: 13,
    fontWeight: '500',
  },
  stepDuration: {
    fontSize: 11,
    marginTop: 2,
  },
  heatmapSection: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  heatmapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  regionName: {
    width: 100,
    fontSize: 12,
  },
  heatmapBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  heatmapFill: {
    height: '100%',
    borderRadius: 4,
  },
  regionVolume: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
});
