import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ShoppingCart, Package, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Sparkles, ArrowUpRight, ArrowDownRight, FileText, Truck, Star, Shield } from 'lucide-react-native';

interface Vendor {
  id: string;
  name: string;
  category: string;
  performance: number;
  spend: string;
  status: 'active' | 'review' | 'inactive';
  contracts: number;
}

interface ProcurementMetrics {
  activeVendors: number;
  purchaseRequests: number;
  contractRenewals: number;
  totalSpend: string;
  avgProcessingTime: string;
  costSavings: string;
  vendorPerformance: number;
  procurementEfficiency: number;
}

interface VendorProcurementCenterProps {
  metrics: ProcurementMetrics;
  vendors: Vendor[];
}

export default function VendorProcurementCenter({ metrics, vendors }: VendorProcurementCenterProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'review': return '#F59E0B';
      case 'inactive': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return '#10B981';
    if (performance >= 75) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <ShoppingCart size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Vendor & Procurement Management
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Supply chain optimization
            </Text>
          </View>
        </View>
        <View style={[styles.efficiencyBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Sparkles size={16} color="#10B981" />
          <Text style={[styles.efficiencyBadgeText, { color: '#10B981' }]}>
            {metrics.procurementEfficiency}% Efficient
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <ShoppingCart size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Active Vendors
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.activeVendors}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +8.2%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <Package size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Purchase Requests
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.purchaseRequests}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +15.7%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <FileText size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Contract Renewals
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.contractRenewals}
          </Text>
          <View style={styles.metricTrend}>
            <AlertTriangle size={12} color="#F59E0B" />
            <Text style={[styles.trendText, { color: '#F59E0B' }]}>
              3 Due Soon
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <DollarSign size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Total Spend
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.totalSpend}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowDownRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              -12.3%
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.vendorsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.vendorsHeader}>
          <Package size={20} color="#8B5CF6" />
          <Text style={[styles.vendorsTitle, { color: theme.colors.text }]}>
            Top Vendors
          </Text>
          <View style={[styles.vendorsBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Star size={14} color="#8B5CF6" />
            <Text style={[styles.vendorsBadgeText, { color: '#8B5CF6' }]}>
              {metrics.vendorPerformance}% Avg
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vendorsScroll}>
          {vendors.map((vendor) => (
            <View key={vendor.id} style={[styles.vendorCard, { borderColor: getStatusColor(vendor.status) + '30', borderWidth: 1 }]}>
              <View style={styles.vendorHeader}>
                <View style={[styles.vendorAvatar, { backgroundColor: '#8B5CF6' + '20' }]}>
                  <ShoppingCart size={20} color="#8B5CF6" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vendor.status) + '20' }]}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(vendor.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(vendor.status) }]}>
                    {vendor.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.vendorName, { color: theme.colors.text }]}>
                {vendor.name}
              </Text>
              <Text style={[styles.vendorCategory, { color: theme.colors.textSecondary }]}>
                {vendor.category}
              </Text>

              <View style={styles.vendorMetrics}>
                <View style={styles.vendorMetric}>
                  <Star size={12} color="#F59E0B" />
                  <Text style={[styles.vendorMetricLabel, { color: theme.colors.textSecondary }]}>
                    Performance
                  </Text>
                  <Text style={[styles.vendorMetricValue, { color: getPerformanceColor(vendor.performance) }]}>
                    {vendor.performance}%
                  </Text>
                </View>

                <View style={styles.vendorMetric}>
                  <DollarSign size={12} color="#10B981" />
                  <Text style={[styles.vendorMetricLabel, { color: theme.colors.textSecondary }]}>
                    Spend
                  </Text>
                  <Text style={[styles.vendorMetricValue, { color: theme.colors.text }]}>
                    {vendor.spend}
                  </Text>
                </View>

                <View style={styles.vendorMetric}>
                  <FileText size={12} color="#3B82F6" />
                  <Text style={[styles.vendorMetricLabel, { color: theme.colors.textSecondary }]}>
                    Contracts
                  </Text>
                  <Text style={[styles.vendorMetricValue, { color: theme.colors.text }]}>
                    {vendor.contracts}
                  </Text>
                </View>
              </View>

              <View style={[styles.vendorProgress, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.vendorProgressFill, 
                    { 
                      backgroundColor: getPerformanceColor(vendor.performance),
                      width: `${vendor.performance}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.pipelineSection}>
        <View style={styles.pipelineHeader}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={[styles.pipelineTitle, { color: theme.colors.text }]}>
            Procurement Pipeline
          </Text>
        </View>

        <View style={styles.pipelineMetrics}>
          <View style={styles.pipelineMetric}>
            <View style={[styles.pipelineIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Clock size={16} color="#3B82F6" />
            </View>
            <View style={styles.pipelineInfo}>
              <Text style={[styles.pipelineLabel, { color: theme.colors.textSecondary }]}>
                Avg Processing Time
              </Text>
              <Text style={[styles.pipelineValue, { color: theme.colors.text }]}>
                {metrics.avgProcessingTime}
              </Text>
            </View>
          </View>

          <View style={styles.pipelineMetric}>
            <View style={[styles.pipelineIcon, { backgroundColor: '#10B981' + '20' }]}>
              <DollarSign size={16} color="#10B981" />
            </View>
            <View style={styles.pipelineInfo}>
              <Text style={[styles.pipelineLabel, { color: theme.colors.textSecondary }]}>
                Cost Savings
              </Text>
              <Text style={[styles.pipelineValue, { color: theme.colors.text }]}>
                {metrics.costSavings}
              </Text>
            </View>
          </View>

          <View style={styles.pipelineMetric}>
            <View style={[styles.pipelineIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Truck size={16} color="#F59E0B" />
            </View>
            <View style={styles.pipelineInfo}>
              <Text style={[styles.pipelineLabel, { color: theme.colors.textSecondary }]}>
                On-Time Delivery
              </Text>
              <Text style={[styles.pipelineValue, { color: theme.colors.text }]}>
                94.2%
              </Text>
            </View>
          </View>

          <View style={styles.pipelineMetric}>
            <View style={[styles.pipelineIcon, { backgroundColor: '#EF4444' + '20' }]}>
              <Shield size={16} color="#EF4444" />
            </View>
            <View style={styles.pipelineInfo}>
              <Text style={[styles.pipelineLabel, { color: theme.colors.textSecondary }]}>
                Compliance Rate
              </Text>
              <Text style={[styles.pipelineValue, { color: theme.colors.text }]}>
                98.7%
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.alertsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.alertsHeader}>
          <AlertTriangle size={20} color="#8B5CF6" />
          <Text style={[styles.alertsTitle, { color: theme.colors.text }]}>
            Attention Required
          </Text>
        </View>
        <View style={styles.alertsList}>
          <View style={styles.alertItem}>
            <Clock size={14} color="#F59E0B" />
            <Text style={[styles.alertText, { color: theme.colors.textSecondary }]}>
              3 contracts expiring within 30 days
            </Text>
          </View>
          <View style={styles.alertItem}>
            <AlertTriangle size={14} color="#EF4444" />
            <Text style={[styles.alertText, { color: theme.colors.textSecondary }]}>
              2 vendors below performance threshold
            </Text>
          </View>
          <View style={styles.alertItem}>
            <CheckCircle size={14} color="#10B981" />
            <Text style={[styles.alertText, { color: theme.colors.textSecondary }]}>
              15 pending purchase orders
            </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  efficiencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  efficiencyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  vendorsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  vendorsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  vendorsTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  vendorsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vendorsBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  vendorsScroll: {
    gap: 12,
  },
  vendorCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vendorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  vendorName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  vendorCategory: {
    fontSize: 11,
    marginBottom: 12,
  },
  vendorMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  vendorMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vendorMetricLabel: {
    fontSize: 10,
    flex: 1,
  },
  vendorMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  vendorProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  vendorProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  pipelineSection: {
    marginBottom: 16,
  },
  pipelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  pipelineTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  pipelineMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pipelineMetric: {
    flex: 1,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  pipelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pipelineInfo: {
    flex: 1,
  },
  pipelineLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  pipelineValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  alertsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  alertsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertsList: {
    gap: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertText: {
    fontSize: 12,
  },
});
