import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Globe, ArrowRight, Activity, MapPin, AlertTriangle, CheckCircle } from 'lucide-react-native';

export default function GlobalControlTower() {
  const { theme } = useTheme();

  const supplyChainStages = [
    { stage: 'Supplier', location: 'Global Network', status: 'optimal' as const, flow: '2.4M units', risk: 'low' },
    { stage: 'Factory', location: '42 Facilities', status: 'optimal' as const, flow: '1.8M units', risk: 'low' },
    { stage: 'Warehouse', location: '248 Centers', status: 'good' as const, flow: '1.6M units', risk: 'medium' },
    { stage: 'Distribution', location: '84 Hubs', status: 'optimal' as const, flow: '1.4M units', risk: 'low' },
    { stage: 'Retail', location: '12,400 Stores', status: 'good' as const, flow: '1.2M units', risk: 'low' },
    { stage: 'Customer', location: 'Global', status: 'optimal' as const, flow: '1.0M units', risk: 'low' },
  ];

  const globalFlows = [
    { region: 'North America', flow: '3.2M units', trend: 'up' as const, efficiency: 96 },
    { region: 'Europe', flow: '2.8M units', trend: 'up' as const, efficiency: 94 },
    { region: 'Asia Pacific', flow: '2.4M units', trend: 'stable' as const, efficiency: 92 },
    { region: 'Latin America', flow: '0.8M units', trend: 'up' as const, efficiency: 88 },
  ];

  const getNodeStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#10B981';
      case 'good': return '#3B82F6';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Globe size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Global Supply Chain Control Tower
        </Text>
      </View>

      {/* Supply Chain Flow */}
      <View style={styles.flowSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          End-to-End Supply Chain Flow
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.flowScroll}
          contentContainerStyle={styles.flowContent}
        >
          {supplyChainStages.map((stage, index) => (
            <View key={index}>
              <View 
                style={[
                  styles.stageCard, 
                  { 
                    backgroundColor: `${getNodeStatusColor(stage.status)}15`,
                    borderColor: `${getNodeStatusColor(stage.status)}40`,
                    borderWidth: 1
                  }
                ]}
              >
                <View style={styles.stageHeader}>
                  <Text style={[styles.stageName, { color: theme.colors.text }]}>
                    {stage.stage}
                  </Text>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: getNodeStatusColor(stage.status) + '20' }
                  ]}>
                    <Text style={[
                      styles.statusText, 
                      { color: getNodeStatusColor(stage.status) }
                    ]}>
                      {stage.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.stageInfo}>
                  <MapPin size={12} color="#6B7280" />
                  <Text style={[styles.stageLocation, { color: theme.colors.textSecondary }]}>
                    {stage.location}
                  </Text>
                </View>

                <View style={styles.stageMetrics}>
                  <View style={styles.stageMetric}>
                    <Activity size={12} color="#3B82F6" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Flow
                    </Text>
                    <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                      {stage.flow}
                    </Text>
                  </View>

                  <View style={styles.stageMetric}>
                    {stage.risk === 'low' ? (
                      <CheckCircle size={12} color="#10B981" />
                    ) : (
                      <AlertTriangle size={12} color="#F59E0B" />
                    )}
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Risk
                    </Text>
                    <Text style={[
                      styles.metricValue, 
                      { color: getRiskColor(stage.risk) }
                    ]}>
                      {stage.risk.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              {index < supplyChainStages.length - 1 && (
                <View style={styles.arrowContainer}>
                  <ArrowRight size={16} color="#6B7280" />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Global Regional Flows */}
      <View style={styles.regionalSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Regional Flow Analysis
        </Text>
        <View style={styles.regionalGrid}>
          {globalFlows.map((region, index) => (
            <View 
              key={index}
              style={[
                styles.regionalCard, 
                { 
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  borderColor: 'rgba(59, 130, 246, 0.2)',
                  borderWidth: 1
                }
              ]}
            >
              <Text style={[styles.regionName, { color: theme.colors.text }]}>
                {region.region}
              </Text>
              
              <View style={styles.regionMetrics}>
                <View style={styles.regionMetric}>
                  <Text style={[styles.regionLabel, { color: theme.colors.textSecondary }]}>
                    Flow
                  </Text>
                  <Text style={[styles.regionValue, { color: '#3B82F6' }]}>
                    {region.flow}
                  </Text>
                </View>

                <View style={styles.regionMetric}>
                  <Text style={[styles.regionLabel, { color: theme.colors.textSecondary }]}>
                    Trend
                  </Text>
                  <Text style={[
                    styles.regionTrend, 
                    { color: region.trend === 'up' ? '#10B981' : '#6B7280' }
                  ]}>
                    {getTrendIcon(region.trend)}
                  </Text>
                </View>

                <View style={styles.regionMetric}>
                  <Text style={[styles.regionLabel, { color: theme.colors.textSecondary }]}>
                    Efficiency
                  </Text>
                  <Text style={[styles.regionValue, { color: '#10B981' }]}>
                    {region.efficiency}%
                  </Text>
                </View>
              </View>

              <View style={styles.efficiencyBar}>
                <View 
                  style={[
                    styles.efficiencyFill, 
                    { 
                      backgroundColor: region.efficiency >= 95 ? '#10B981' : 
                                   region.efficiency >= 90 ? '#3B82F6' : '#F59E0B',
                      width: `${region.efficiency}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Control Tower Summary */}
      <View style={styles.summarySection}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          Control Tower Intelligence
        </Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#10B98120' }]}>
              <Activity size={16} color="#10B981" />
            </View>
            <View>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                Total Network Flow
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                8.4M units
              </Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#3B82F620' }]}>
              <Globe size={16} color="#3B82F6" />
            </View>
            <View>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                Global Coverage
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                142 Countries
              </Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#06B6D420' }]}>
              <CheckCircle size={16} color="#06B6D4" />
            </View>
            <View>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                Network Health
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                94% Optimal
              </Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#F59E0B20' }]}>
              <AlertTriangle size={16} color="#F59E0B" />
            </View>
            <View>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
                Active Alerts
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                8 Monitoring
              </Text>
            </View>
          </View>
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
  flowSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  flowScroll: {
    marginBottom: 8,
  },
  flowContent: {
    paddingRight: 16,
  },
  stageCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 140,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageName: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  stageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  stageLocation: {
    fontSize: 11,
    fontWeight: '500',
  },
  stageMetrics: {
    gap: 6,
  },
  stageMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  regionalSection: {
    marginBottom: 16,
  },
  regionalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  regionalCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 12,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  regionMetric: {
    alignItems: 'center',
  },
  regionLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  regionValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  regionTrend: {
    fontSize: 16,
    fontWeight: '700',
  },
  efficiencyBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  efficiencyFill: {
    height: '100%',
    borderRadius: 3,
  },
  summarySection: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});