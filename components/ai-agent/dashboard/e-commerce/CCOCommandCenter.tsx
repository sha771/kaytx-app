import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface GrowthTrajectory {
  period: string;
  revenue: number;
  target: number;
}

interface RevenueFunnel {
  visitors: number;
  productViews: number;
  addToCart: number;
  checkout: number;
  purchase: number;
}

interface PlatformHealth {
  uptime: string;
  apiLatency: string;
  errorRate: string;
  satisfactionScore: string;
}

interface CCOCommandCenterProps {
  totalRevenue: string;
  conversionRate: string;
  activeCustomers: string;
  ordersToday: string;
  aiRevenueImpact: string;
  growthTrajectory: GrowthTrajectory[];
  revenueFunnel: RevenueFunnel;
  platformHealth: PlatformHealth;
}

export default function CCOCommandCenter({
  totalRevenue,
  conversionRate,
  activeCustomers,
  ordersToday,
  aiRevenueImpact,
  growthTrajectory,
  revenueFunnel,
  platformHealth
}: CCOCommandCenterProps) {
  const { theme } = useTheme();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const FunnelStep = ({ label, value, color, width }: any) => (
    <View style={styles.funnelStep}>
      <View style={styles.funnelLabelContainer}>
        <Text style={[styles.funnelLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>{label}</Text>
        <Text style={[styles.funnelValue, { color }]}>{formatNumber(value)}</Text>
      </View>
      <View style={[styles.funnelBar, { backgroundColor: `${color}30`, width: `${width}%` }]}>
        <View style={[styles.funnelBarFill, { backgroundColor: color, width: `${width}%` }]} />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#38BDF8' }]}>
        Chief Commerce Officer Dashboard
      </Text>

      {/* Executive KPI Cards */}
      <View style={styles.kpiGrid}>
        <View style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(34, 197, 94, 0.3)', borderWidth: 1 }]}>
          <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Revenue</Text>
          <Text style={[styles.kpiValue, { color: '#22C55E' }]}>{totalRevenue}</Text>
          <Text style={[styles.kpiSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Year to date</Text>
        </View>

        <View style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(34, 197, 94, 0.3)', borderWidth: 1 }]}>
          <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Conversion Rate</Text>
          <Text style={[styles.kpiValue, { color: '#22C55E' }]}>{conversionRate}</Text>
          <Text style={[styles.kpiSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Visitor to buyer</Text>
        </View>

        <View style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(59, 130, 246, 0.3)', borderWidth: 1 }]}>
          <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Active Customers</Text>
          <Text style={[styles.kpiValue, { color: '#3B82F6' }]}>{activeCustomers}</Text>
          <Text style={[styles.kpiSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Total active</Text>
        </View>

        <View style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(59, 130, 246, 0.3)', borderWidth: 1 }]}>
          <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Orders Today</Text>
          <Text style={[styles.kpiValue, { color: '#3B82F6' }]}>{ordersToday}</Text>
          <Text style={[styles.kpiSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Daily orders</Text>
        </View>

        <View style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(139, 92, 246, 0.3)', borderWidth: 1 }]}>
          <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI Revenue Impact</Text>
          <Text style={[styles.kpiValue, { color: '#8B5CF6' }]}>{aiRevenueImpact}</Text>
          <Text style={[styles.kpiSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>AI-generated</Text>
        </View>
      </View>

      {/* Growth Trajectory */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Growth Trajectory
        </Text>
        <View style={styles.growthChart}>
          {growthTrajectory.map((item, index) => {
            const maxValue = Math.max(...growthTrajectory.map(d => Math.max(d.revenue, d.target)));
            const revenueHeight = (item.revenue / maxValue) * 100;
            const targetHeight = (item.target / maxValue) * 100;
            
            return (
              <View key={index} style={styles.growthColumn}>
                <View style={styles.growthBars}>
                  <View style={[styles.growthBar, { backgroundColor: '#22C55E', height: `${revenueHeight}%` }]} />
                  <View style={[styles.growthBar, { backgroundColor: 'rgba(59, 130, 246, 0.5)', height: `${targetHeight}%` }]} />
                </View>
                <Text style={[styles.growthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  {item.period}
                </Text>
                <Text style={[styles.growthValue, { color: '#22C55E' }]}>
                  ${(item.revenue * 1000).toFixed(0)}M
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.growthLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#22C55E' }]} />
            <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.6)' }]}>Actual</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: 'rgba(59, 130, 246, 0.5)' }]} />
            <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.6)' }]}>Target</Text>
          </View>
        </View>
      </View>

      {/* Revenue Funnel */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Revenue Funnel Overview
        </Text>
        <View style={styles.funnelContainer}>
          <FunnelStep 
            label="Visitors" 
            value={revenueFunnel.visitors} 
            color="#3B82F6" 
            width={100} 
          />
          <FunnelStep 
            label="Product Views" 
            value={revenueFunnel.productViews} 
            color="#38BDF8" 
            width={(revenueFunnel.productViews / revenueFunnel.visitors) * 100} 
          />
          <FunnelStep 
            label="Add to Cart" 
            value={revenueFunnel.addToCart} 
            color="#8B5CF6" 
            width={(revenueFunnel.addToCart / revenueFunnel.visitors) * 100} 
          />
          <FunnelStep 
            label="Checkout" 
            value={revenueFunnel.checkout} 
            color="#F59E0B" 
            width={(revenueFunnel.checkout / revenueFunnel.visitors) * 100} 
          />
          <FunnelStep 
            label="Purchase" 
            value={revenueFunnel.purchase} 
            color="#22C55E" 
            width={(revenueFunnel.purchase / revenueFunnel.visitors) * 100} 
          />
        </View>
        <View style={styles.funnelSummary}>
          <Text style={[styles.funnelConversion, { color: '#22C55E' }]}>
            Overall Conversion: {((revenueFunnel.purchase / revenueFunnel.visitors) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>

      {/* Platform Health */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Platform Health Snapshot
        </Text>
        <View style={styles.healthGrid}>
          <View style={styles.healthItem}>
            <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Uptime</Text>
            <Text style={[styles.healthValue, { color: '#22C55E' }]}>{platformHealth.uptime}</Text>
          </View>
          <View style={styles.healthItem}>
            <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>API Latency</Text>
            <Text style={[styles.healthValue, { color: '#3B82F6' }]}>{platformHealth.apiLatency}</Text>
          </View>
          <View style={styles.healthItem}>
            <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Error Rate</Text>
            <Text style={[styles.healthValue, { color: '#22C55E' }]}>{platformHealth.errorRate}</Text>
          </View>
          <View style={styles.healthItem}>
            <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Satisfaction</Text>
            <Text style={[styles.healthValue, { color: '#22C55E' }]}>{platformHealth.satisfactionScore}</Text>
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
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  kpiCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginRight: '2%',
    marginBottom: 12,
  },
  kpiLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 11,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  growthChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 12,
  },
  growthColumn: {
    flex: 1,
    alignItems: 'center',
  },
  growthBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 8,
  },
  growthBar: {
    width: 12,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  growthLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  growthValue: {
    fontSize: 10,
    fontWeight: '600',
  },
  growthLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
  },
  funnelContainer: {
    marginBottom: 12,
  },
  funnelStep: {
    marginBottom: 12,
  },
  funnelLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  funnelLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  funnelValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  funnelBar: {
    height: 24,
    borderRadius: 4,
    overflow: 'hidden',
  },
  funnelBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  funnelSummary: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  funnelConversion: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  healthGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthItem: {
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  healthValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});