import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { PieChart, TrendingUp, AlertTriangle, Target, ArrowRight } from 'lucide-react-native';
import { PortfolioManagementConfig } from '../types';

interface PortfolioManagementProps {
  config: PortfolioManagementConfig;
}

export default function PortfolioManagement({ config }: PortfolioManagementProps) {
  const { theme } = useTheme();

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.portfolioBadge, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
            <PieChart size={16} color="#10B981" />
            <Text style={styles.portfolioBadgeText}>PORTFOLIO</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Management Hub
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Target size={12} color="#10B981" />
          <Text style={styles.liveText}>OPTIMIZED</Text>
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Asset Allocation</Text>
        {config.assetAllocation.map((asset, index) => (
          <View key={index} style={styles.allocationItem}>
            <Text style={[styles.assetName, { color: '#FFFFFF' }]}>{asset.asset}</Text>
            <View style={styles.allocationBar}>
              <View style={[styles.allocationFill, { width: `${asset.allocation}%`, backgroundColor: '#10B981' }]} />
            </View>
            <Text style={[styles.allocationPercent, { color: '#FFFFFF' }]}>{asset.allocation}%</Text>
            <Text style={[styles.allocationValue, { color: '#9CA3AF' }]}>{asset.value}</Text>
            <Text style={[styles.allocationPerformance, { color: asset.performance.startsWith('+') ? '#10B981' : '#EF4444' }]}>
              {asset.performance}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Sector Exposure</Text>
        {config.sectorExposure.map((sector, index) => (
          <View key={index} style={styles.exposureItem}>
            <Text style={[styles.sectorName, { color: '#FFFFFF' }]}>{sector.sector}</Text>
            <View style={styles.exposureBar}>
              <View style={[styles.exposureFill, { width: `${sector.exposure}%`, backgroundColor: getRiskColor(sector.risk) }]} />
            </View>
            <Text style={[styles.exposurePercent, { color: '#FFFFFF' }]}>{sector.exposure}%</Text>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(sector.risk) + '20', borderColor: getRiskColor(sector.risk) }]}>
              <Text style={[styles.riskText, { color: getRiskColor(sector.risk) }]}>{sector.risk}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Rebalancing Suggestions</Text>
        {config.rebalancingSuggestions.map((suggestion, index) => (
          <View key={suggestion.id} style={[styles.suggestionCard, { backgroundColor: '#0A0F14', borderColor: '#F59E0B' }]}>
            <View style={[styles.suggestionIcon, { backgroundColor: '#F59E0B20' }]}>
              <AlertTriangle size={16} color="#F59E0B" />
            </View>
            <View style={styles.suggestionContent}>
              <Text style={[styles.suggestionAsset, { color: '#FFFFFF' }]}>{suggestion.asset}</Text>
              <Text style={[styles.suggestionReason, { color: '#9CA3AF' }]}>{suggestion.reason}</Text>
              <View style={styles.suggestionMetrics}>
                <Text style={[styles.suggestionMetric, { color: '#9CA3AF' }]}>
                  Current: {suggestion.currentAllocation}%
                </Text>
                <ArrowRight size={12} color="#F59E0B" />
                <Text style={[styles.suggestionMetric, { color: '#F59E0B' }]}>
                  Target: {suggestion.targetAllocation}%
                </Text>
              </View>
            </View>
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
  portfolioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  portfolioBadgeText: {
    color: '#10B981',
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
  allocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  assetName: {
    width: 100,
    fontSize: 12,
  },
  allocationBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  allocationFill: {
    height: '100%',
    borderRadius: 4,
  },
  allocationPercent: {
    width: 40,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  allocationValue: {
    width: 60,
    fontSize: 11,
    textAlign: 'right',
  },
  allocationPerformance: {
    width: 50,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'right',
  },
  exposureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectorName: {
    width: 100,
    fontSize: 12,
  },
  exposureBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  exposureFill: {
    height: '100%',
    borderRadius: 4,
  },
  exposurePercent: {
    width: 40,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  suggestionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionAsset: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  suggestionReason: {
    fontSize: 11,
    marginBottom: 8,
  },
  suggestionMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  suggestionMetric: {
    fontSize: 11,
  },
});
