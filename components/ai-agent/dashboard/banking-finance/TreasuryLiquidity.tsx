import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Activity, Building2 } from 'lucide-react-native';
import { TreasuryLiquidityConfig } from '../types';

interface TreasuryLiquidityProps {
  config: TreasuryLiquidityConfig;
}

export default function TreasuryLiquidity({ config }: TreasuryLiquidityProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.treasuryBadge, { backgroundColor: '#F59E0B20', borderColor: '#F59E0B' }]}>
            <Building2 size={16} color="#F59E0B" />
            <Text style={styles.treasuryBadgeText}>TREASURY</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Liquidity Management
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={styles.liveText}>OPTIMIZED</Text>
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Cash Flow Analysis</Text>
        <View style={styles.cashFlowRow}>
          <View style={styles.cashFlowItem}>
            <View style={[styles.cashFlowIcon, { backgroundColor: '#10B98120' }]}>
              <TrendingUp size={16} color="#10B981" />
            </View>
            <Text style={[styles.cashFlowLabel, { color: '#9CA3AF' }]}>Inflow</Text>
            <Text style={[styles.cashFlowValue, { color: '#10B981' }]}>{config.cashFlow.inflow}</Text>
          </View>
          <View style={styles.cashFlowItem}>
            <View style={[styles.cashFlowIcon, { backgroundColor: '#EF444420' }]}>
              <TrendingDown size={16} color="#EF4444" />
            </View>
            <Text style={[styles.cashFlowLabel, { color: '#9CA3AF' }]}>Outflow</Text>
            <Text style={[styles.cashFlowValue, { color: '#EF4444' }]}>{config.cashFlow.outflow}</Text>
          </View>
          <View style={styles.cashFlowItem}>
            <View style={[styles.cashFlowIcon, { backgroundColor: '#3B82F620' }]}>
              <Wallet size={16} color="#3B82F6" />
            </View>
            <Text style={[styles.cashFlowLabel, { color: '#9CA3AF' }]}>Net</Text>
            <Text style={[styles.cashFlowValue, { color: config.cashFlow.net.startsWith('+') ? '#10B981' : '#EF4444' }]}>
              {config.cashFlow.net}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Liquidity Position</Text>
        <View style={styles.liquidityRow}>
          <DollarSign size={14} color="#10B981" />
          <Text style={[styles.liquidityLabel, { color: '#9CA3AF' }]}>Available</Text>
          <Text style={[styles.liquidityValue, { color: '#FFFFFF' }]}>{config.liquidityPosition.available}</Text>
        </View>
        <View style={styles.liquidityRow}>
          <DollarSign size={14} color="#F59E0B" />
          <Text style={[styles.liquidityLabel, { color: '#9CA3AF' }]}>Required</Text>
          <Text style={[styles.liquidityValue, { color: '#FFFFFF' }]}>{config.liquidityPosition.required}</Text>
        </View>
        <View style={styles.liquidityRow}>
          <DollarSign size={14} color="#10B981" />
          <Text style={[styles.liquidityLabel, { color: '#9CA3AF' }]}>Buffer</Text>
          <Text style={[styles.liquidityValue, { color: '#10B981' }]}>{config.liquidityPosition.buffer}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Capital Reserves</Text>
        <View style={styles.reservesRow}>
          <View style={[styles.reserveItem, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
            <Text style={[styles.reserveLabel, { color: '#9CA3AF' }]}>Tier 1</Text>
            <Text style={[styles.reserveValue, { color: '#FFFFFF' }]}>{config.capitalReserves.tier1}</Text>
          </View>
          <View style={[styles.reserveItem, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
            <Text style={[styles.reserveLabel, { color: '#9CA3AF' }]}>Tier 2</Text>
            <Text style={[styles.reserveValue, { color: '#FFFFFF' }]}>{config.capitalReserves.tier2}</Text>
          </View>
          <View style={[styles.reserveItem, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
            <Text style={[styles.reserveLabel, { color: '#9CA3AF' }]}>Total</Text>
            <Text style={[styles.reserveValue, { color: '#10B981', fontWeight: '700' }]}>{config.capitalReserves.total}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Funding Gap Analysis</Text>
        {config.fundingGap.map((gap, index) => (
          <View key={index} style={styles.gapItem}>
            <Text style={[styles.gapPeriod, { color: '#FFFFFF' }]}>{gap.period}</Text>
            <View style={styles.gapBar}>
              <View style={[styles.gapFill, { width: `${(parseFloat(gap.available.replace(/[^0-9.]/g, '')) / parseFloat(gap.requirement.replace(/[^0-9.]/g, ''))) * 100}%`, backgroundColor: gap.gap.startsWith('+') ? '#10B981' : '#EF4444' }]} />
            </View>
            <Text style={[styles.gapValue, { color: gap.gap.startsWith('+') ? '#10B981' : '#EF4444' }]}>{gap.gap}</Text>
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
  treasuryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  treasuryBadgeText: {
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
  cashFlowRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cashFlowItem: {
    alignItems: 'center',
  },
  cashFlowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cashFlowLabel: {
    fontSize: 11,
    marginTop: 4,
    marginBottom: 2,
  },
  cashFlowValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  liquidityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  liquidityLabel: {
    fontSize: 12,
  },
  liquidityValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  reservesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  reserveItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  reserveLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  reserveValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  gapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gapPeriod: {
    width: 80,
    fontSize: 12,
  },
  gapBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  gapFill: {
    height: '100%',
    borderRadius: 4,
  },
  gapValue: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
});
