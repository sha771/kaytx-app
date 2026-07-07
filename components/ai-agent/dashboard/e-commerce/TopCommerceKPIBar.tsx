import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  DollarSign, 
  Target, 
  ShoppingCart, 
  TrendingUp, 
  ArrowDown, 
  Percent,
  Activity,
  Zap
} from 'lucide-react-native';

interface KPICard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const mockKPIs: KPICard[] = [
  { label: 'Total Revenue', value: '$4.2B', change: '+12.4%', trend: 'up', color: '#22C55E' },
  { label: 'Conversion Rate', value: '3.8%', change: '+0.8%', trend: 'up', color: '#22C55E' },
  { label: 'Average Order Value', value: '$142', change: '+8.2%', trend: 'up', color: '#22C55E' },
  { label: 'Customer Acquisition Cost', value: '$28', change: '-5.4%', trend: 'up', color: '#22C55E' },
  { label: 'Customer Lifetime Value', value: '$1,250', change: '+12.8%', trend: 'up', color: '#22C55E' },
  { label: 'Cart Abandonment Rate', value: '68.2%', change: '-3.4%', trend: 'up', color: '#EF4444' },
  { label: 'ROAS', value: '4.2x', change: '+0.6', trend: 'up', color: '#22C55E' },
  { label: 'Gross Margin', value: '34.8%', change: '+2.1%', trend: 'up', color: '#22C55E' },
  { label: 'Inventory Turnover', value: '8.4', change: '+0.8', trend: 'up', color: '#22C55E' },
  { label: 'AI Revenue Uplift', value: '+$184M', change: '+18.2%', trend: 'up', color: '#38BDF8' },
];

export default function TopCommerceKPIBar() {
  const { theme } = useTheme();

  const getIcon = (color: string) => {
    const iconProps = { size: 16, color };
    return <DollarSign {...iconProps} />;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', color: string) => {
    if (trend === 'up') return <TrendingUp size={14} color={color} />;
    if (trend === 'down') return <ArrowDown size={14} color={color} />;
    return <Activity size={14} color={color} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>E-Commerce KPIs</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Real-time commerce metrics</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.kpiContainer}
      >
        {mockKPIs.map((kpi, index) => (
          <View 
            key={index}
            style={[
              styles.kpiCard, 
              { backgroundColor: theme.colors.background, borderColor: kpi.color + '30' }
            ]}
          >
            <View style={styles.kpiHeader}>
              <View style={[styles.iconContainer, { backgroundColor: kpi.color + '20' }]}>
                {getIcon(kpi.color)}
              </View>
              <View style={styles.trendContainer}>
                {getTrendIcon(kpi.trend, kpi.color)}
                <Text style={[styles.trendText, { color: kpi.color }]}>{kpi.change}</Text>
              </View>
            </View>
            
            <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  kpiContainer: {
    paddingRight: 16,
  },
  kpiCard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 12,
  },
});