import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ProfitabilityHeatmapItem {
  client: string;
  margin: number;
  revenue: string;
}

interface ProfitabilityFinancialIntelligenceProps {
  data: {
    revenuePerEngagement?: any;
    costPerProject?: any;
    marginByClient?: any;
    resourceCostEfficiency?: any;
    profitLeakagePoints?: any[];
  };
}

export default function ProfitabilityFinancialIntelligence({ data }: ProfitabilityFinancialIntelligenceProps) {
  const revenuePerEngagement = data.revenuePerEngagement || {};
  const costPerProject = data.costPerProject || {};
  const marginByClient = data.marginByClient || {};
  const resourceCostEfficiency = data.resourceCostEfficiency || {};
  const profitLeakagePoints = data.profitLeakagePoints || [];
  const { theme } = useTheme();

  const getMarginColor = (margin: number) => {
    if (margin >= 35) return '#10B981';
    if (margin >= 25) return '#06B6D4';
    if (margin >= 15) return '#F59E0B';
    return '#EF4444';
  };

  const financialMetrics = [
    { label: 'Revenue per Engagement', value: data.revenuePerEngagement, color: '#10B981', trend: '+8% vs target' },
    { label: 'Cost per Project', value: data.costPerProject, color: '#F59E0B', trend: '-5% vs last quarter' },
    { label: 'Avg Client Margin', value: data.marginByClient, color: '#10B981', trend: '+2% vs last year' },
    { label: 'Resource Cost Efficiency', value: data.resourceCostEfficiency, color: '#06B6D4', trend: '+3% improvement' },
  ];

  const profitLeakageAreas = [
    { area: 'Under-billing', amount: '$520K', impact: 'High' },
    { area: 'Scope creep', amount: '$340K', impact: 'Medium' },
    { area: 'Resource inefficiency', amount: '$280K', impact: 'Medium' },
    { area: 'Re-work', amount: '$180K', impact: 'Low' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Profitability & Financial Intelligence
      </Text>

      {/* Financial Metrics */}
      <View style={styles.metricsGrid}>
        {financialMetrics.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${metric.color}30`, borderWidth: 1 }]}>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            <Text style={[styles.metricTrend, { color: 'rgba(255, 255, 255, 0.4)' }]}>
              {metric.trend}
            </Text>
          </View>
        ))}
      </View>

      {/* Profitability Heatmap */}
      <View style={[styles.heatmapSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Profitability Heatmap by Client
        </Text>
        <View style={styles.heatmapGrid}>
          {data.profitabilityHeatmap.map((item, index) => (
            <View key={index} style={[styles.heatmapCell, { backgroundColor: `${getMarginColor(item.margin)}20`, borderColor: `${getMarginColor(item.margin)}40`, borderWidth: 1 }]}>
              <Text style={[styles.heatmapClient, { color: '#FFFFFF' }]}>{item.client}</Text>
              <View style={styles.heatmapMetrics}>
                <View style={styles.heatmapMetric}>
                  <Text style={[styles.heatmapMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Margin</Text>
                  <Text style={[styles.heatmapMetricValue, { color: getMarginColor(item.margin) }]}>
                    {item.margin}%
                  </Text>
                </View>
                <View style={styles.heatmapMetric}>
                  <Text style={[styles.heatmapMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Revenue</Text>
                  <Text style={[styles.heatmapMetricValue, { color: '#8B5CF6' }]}>
                    {item.revenue}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Profit Leakage Analysis */}
      <View style={[styles.leakageSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Profit Leakage Analysis
        </Text>
        <View style={styles.leakageOverview}>
          <Text style={[styles.leakageTotal, { color: '#EF4444' }]}>
            {data.profitLeakagePoints} Leakage Points
          </Text>
          <Text style={[styles.leakageValue, { color: '#EF4444' }]}>
            $1.32M at risk
          </Text>
        </View>
        <View style={styles.leakageList}>
          {profitLeakageAreas.map((area, index) => (
            <View key={index} style={styles.leakageItem}>
              <View style={styles.leakageLeft}>
                <Text style={[styles.leakageArea, { color: '#FFFFFF' }]}>{area.area}</Text>
                <Text style={[styles.leakageAmount, { color: '#EF4444' }]}>{area.amount}</Text>
              </View>
              <View style={[styles.leakageImpact, { backgroundColor: area.impact === 'High' ? '#EF444420' : area.impact === 'Medium' ? '#F59E0B20' : '#10B98120' }]}>
                <Text style={[styles.leakageImpactText, { color: area.impact === 'High' ? '#EF4444' : area.impact === 'Medium' ? '#F59E0B' : '#10B981' }]}>
                  {area.impact}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Margin Breakdown */}
      <View style={[styles.marginSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Margin Breakdown by Service
        </Text>
        <View style={styles.marginList}>
          <View style={styles.marginItem}>
            <View style={styles.marginInfo}>
              <Text style={[styles.marginService, { color: '#FFFFFF' }]}>Digital Transformation</Text>
              <Text style={[styles.marginRevenue, { color: 'rgba(255, 255, 255, 0.6)' }]}>$3.2B revenue</Text>
            </View>
            <View style={styles.marginVisual}>
              <View style={styles.marginBar}>
                <View style={[styles.marginBarFill, { backgroundColor: '#10B981', width: '42%' }]} />
              </View>
              <Text style={[styles.marginPercent, { color: '#10B981' }]}>42%</Text>
            </View>
          </View>
          <View style={styles.marginItem}>
            <View style={styles.marginInfo}>
              <Text style={[styles.marginService, { color: '#FFFFFF' }]}>Cloud Services</Text>
              <Text style={[styles.marginRevenue, { color: 'rgba(255, 255, 255, 0.6)' }]}>$2.8B revenue</Text>
            </View>
            <View style={styles.marginVisual}>
              <View style={styles.marginBar}>
                <View style={[styles.marginBarFill, { backgroundColor: '#06B6D4', width: '38%' }]} />
              </View>
              <Text style={[styles.marginPercent, { color: '#06B6D4' }]}>38%</Text>
            </View>
          </View>
          <View style={styles.marginItem}>
            <View style={styles.marginInfo}>
              <Text style={[styles.marginService, { color: '#FFFFFF' }]}>AI/ML Solutions</Text>
              <Text style={[styles.marginRevenue, { color: 'rgba(255, 255, 255, 0.6)' }]}>$1.8B revenue</Text>
            </View>
            <View style={styles.marginVisual}>
              <View style={styles.marginBar}>
                <View style={[styles.marginBarFill, { backgroundColor: '#8B5CF6', width: '41%' }]} />
              </View>
              <Text style={[styles.marginPercent, { color: '#8B5CF6' }]}>41%</Text>
            </View>
          </View>
          <View style={styles.marginItem}>
            <View style={styles.marginInfo}>
              <Text style={[styles.marginService, { color: '#FFFFFF' }]}>Advisory Services</Text>
              <Text style={[styles.marginRevenue, { color: 'rgba(255, 255, 255, 0.6)' }]}>$1.2B revenue</Text>
            </View>
            <View style={styles.marginVisual}>
              <View style={styles.marginBar}>
                <View style={[styles.marginBarFill, { backgroundColor: '#F59E0B', width: '28%' }]} />
              </View>
              <Text style={[styles.marginPercent, { color: '#F59E0B' }]}>28%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Cost Allocation */}
      <View style={[styles.costSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Cost Allocation Analysis
        </Text>
        <View style={styles.costGrid}>
          <View style={styles.costItem}>
            <Text style={[styles.costLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Labor</Text>
            <Text style={[styles.costValue, { color: '#FFFFFF' }]}>68%</Text>
            <View style={[styles.costBar, { backgroundColor: '#10B981', width: '68%' }]} />
          </View>
          <View style={styles.costItem}>
            <Text style={[styles.costLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Technology</Text>
            <Text style={[styles.costValue, { color: '#FFFFFF' }]}>18%</Text>
            <View style={[styles.costBar, { backgroundColor: '#06B6D4', width: '18%' }]} />
          </View>
          <View style={styles.costItem}>
            <Text style={[styles.costLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Overhead</Text>
            <Text style={[styles.costValue, { color: '#FFFFFF' }]}>10%</Text>
            <View style={[styles.costBar, { backgroundColor: '#8B5CF6', width: '10%' }]} />
          </View>
          <View style={styles.costItem}>
            <Text style={[styles.costLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Travel</Text>
            <Text style={[styles.costValue, { color: '#FFFFFF' }]}>4%</Text>
            <View style={[styles.costBar, { backgroundColor: '#F59E0B', width: '4%' }]} />
          </View>
        </View>
      </View>

      {/* Revenue Optimization */}
      <View style={[styles.optimizationSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Revenue Optimization Engine
        </Text>
        <View style={styles.optimizationList}>
          <View style={styles.optimizationItem}>
            <View style={[styles.optimizationDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.optimizationText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Pricing optimization could increase margins by 8%
            </Text>
          </View>
          <View style={styles.optimizationItem}>
            <View style={[styles.optimizationDot, { backgroundColor: '#06B6D4' }]} />
            <Text style={[styles.optimizationText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Resource allocation efficiency saving $420K quarterly
            </Text>
          </View>
          <View style={styles.optimizationItem}>
            <View style={[styles.optimizationDot, { backgroundColor: '#8B5CF6' }]} />
            <Text style={[styles.optimizationText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Scope management improvement reducing leakage by 12%
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricTrend: {
    fontSize: 10,
  },
  heatmapSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  heatmapGrid: {
    gap: 8,
  },
  heatmapCell: {
    padding: 12,
    borderRadius: 8,
  },
  heatmapClient: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  heatmapMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heatmapMetric: {
    alignItems: 'center',
  },
  heatmapMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  heatmapMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  leakageSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  leakageOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leakageTotal: {
    fontSize: 14,
    fontWeight: '600',
  },
  leakageValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  leakageList: {
    gap: 8,
  },
  leakageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  leakageLeft: {
    flex: 1,
  },
  leakageArea: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  leakageAmount: {
    fontSize: 12,
  },
  leakageImpact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  leakageImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  marginSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  marginList: {
    gap: 10,
  },
  marginItem: {
    gap: 6,
  },
  marginInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marginService: {
    fontSize: 13,
    fontWeight: '600',
  },
  marginRevenue: {
    fontSize: 11,
  },
  marginVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  marginBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  marginBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  marginPercent: {
    fontSize: 12,
    fontWeight: '600',
    width: 35,
    textAlign: 'right',
  },
  costSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  costGrid: {
    gap: 10,
  },
  costItem: {
    gap: 4,
  },
  costLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  costBar: {
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
  optimizationSection: {
    padding: 16,
    borderRadius: 12,
  },
  optimizationList: {
    gap: 8,
  },
  optimizationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optimizationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  optimizationText: {
    fontSize: 12,
    flex: 1,
  },
});
