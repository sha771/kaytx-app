import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, DollarSign, Package, Truck, Clock, Factory, Target, Navigation } from 'lucide-react-native';

interface KPIMetric {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  icon: React.ReactNode;
}

export default function ExecutiveKPIBar() {
  const { theme } = useTheme();

  const kpiMetrics: KPIMetric[] = [
    {
      id: '1',
      label: 'End-to-End Fulfillment Rate',
      value: '97.8%',
      trend: 'up',
      trendValue: '+2.3%',
      riskLevel: 'low',
      icon: <Target size={16} color="#10B981" />
    },
    {
      id: '2',
      label: 'Order Cycle Time',
      value: '4.2 days',
      trend: 'down',
      trendValue: '-0.8 days',
      riskLevel: 'low',
      icon: <Clock size={16} color="#3B82F6" />
    },
    {
      id: '3',
      label: 'Inventory Turnover',
      value: '8.4x',
      trend: 'up',
      trendValue: '+0.6x',
      riskLevel: 'low',
      icon: <Package size={16} color="#06B6D4" />
    },
    {
      id: '4',
      label: 'Supplier On-Time Delivery',
      value: '94.2%',
      trend: 'up',
      trendValue: '+1.8%',
      riskLevel: 'medium',
      icon: <Navigation size={16} color="#8B5CF6" />
    },
    {
      id: '5',
      label: 'Logistics Cost per Unit',
      value: '$12.40',
      trend: 'down',
      trendValue: '-4.2%',
      riskLevel: 'low',
      icon: <DollarSign size={16} color="#F59E0B" />
    },
    {
      id: '6',
      label: 'Stockout Risk Index',
      value: '12.8',
      trend: 'up',
      trendValue: '+2.1',
      riskLevel: 'high',
      icon: <AlertTriangle size={16} color="#EF4444" />
    },
    {
      id: '7',
      label: 'Forecast Accuracy',
      value: '94.6%',
      trend: 'up',
      trendValue: '+3.2%',
      riskLevel: 'low',
      icon: <Activity size={16} color="#EC4899" />
    },
    {
      id: '8',
      label: 'Warehouse Efficiency',
      value: '92.4%',
      trend: 'up',
      trendValue: '+1.5%',
      riskLevel: 'low',
      icon: <Factory size={16} color="#14B8A6" />
    },
    {
      id: '9',
      label: 'Transport Utilization',
      value: '87.6%',
      trend: 'up',
      trendValue: '+4.2%',
      riskLevel: 'medium',
      icon: <Package size={16} color="#6366F1" />
    },
    {
      id: '10',
      label: 'AI Optimization Savings',
      value: '$284M',
      trend: 'up',
      trendValue: '+$42M',
      riskLevel: 'low',
      icon: <DollarSign size={16} color="#10B981" />
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      case 'neutral': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'critical': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getRiskBackground = (risk?: string) => {
    const color = getRiskColor(risk);
    return color + '15';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={12} color={getTrendColor(trend)} />;
      case 'down': return <TrendingDown size={12} color={getTrendColor(trend)} />;
      case 'neutral': return <Activity size={12} color={getTrendColor(trend)} />;
      default: return <Activity size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Activity size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Supply Chain Executive KPIs
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.kpiScroll}
        contentContainerStyle={styles.kpiContent}
      >
        {kpiMetrics.map((metric) => (
          <View 
            key={metric.id}
            style={[
              styles.kpiCard, 
              { 
                backgroundColor: getRiskBackground(metric.riskLevel),
                borderColor: `${getRiskColor(metric.riskLevel)}30`,
                borderWidth: 1
              }
            ]}
          >
            <View style={styles.kpiHeader}>
              <View style={styles.kpiIconContainer}>
                {metric.icon}
              </View>
              {metric.riskLevel && (
                <View style={[
                  styles.riskBadge, 
                  { backgroundColor: getRiskColor(metric.riskLevel) + '20' }
                ]}>
                  <View style={[
                    styles.riskDot, 
                    { backgroundColor: getRiskColor(metric.riskLevel) }
                  ]} />
                  <Text style={[
                    styles.riskText, 
                    { color: getRiskColor(metric.riskLevel) }
                  ]}>
                    {metric.riskLevel.toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
              {metric.value}
            </Text>

            <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>
              {metric.label}
            </Text>

            <View style={styles.trendContainer}>
              {getTrendIcon(metric.trend)}
              <Text style={[
                styles.trendValue, 
                { color: getTrendColor(metric.trend) }
              ]}>
                {metric.trendValue}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  kpiScroll: {
    marginBottom: 8,
  },
  kpiContent: {
    paddingRight: 16,
  },
  kpiCard: {
    width: 140,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  riskDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
    flex: 1,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendValue: {
    fontSize: 12,
    fontWeight: '600',
  },
});