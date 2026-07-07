import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Building2, Truck, CheckCircle, TrendingUp, ArrowRight, BarChart3,
  Activity, AlertTriangle, Package, DollarSign, Star, Clock, FileText
} from 'lucide-react-native';

export default function VendorManagementCenter() {
  const router = useRouter();

  const VENDOR_STATS = [
    { label: 'Active Vendors', value: '8,920', icon: Building2, color: '#06B6D4', trend: '+10%' },
    { label: 'Contracts Active', value: '12,450', icon: FileText, color: '#8B5CF6', trend: '+8%' },
    { label: 'Deliveries Today', value: '3,240', icon: Truck, color: '#10B981', trend: '+15%' },
    { label: 'Avg Rating', value: '4.7/5', icon: Star, color: '#F59E0B', trend: '+3%' },
  ];

  const VENDORS = [
    {
      id: 1,
      name: 'Premium Catering Co.',
      category: 'Catering',
      rating: 4.9,
      totalContracts: 247,
      activeContracts: 12,
      totalSpent: '$8.4M',
      onTimeDelivery: 98,
      status: 'active',
      nextDelivery: 'Tech Summit 2026 - 2026-08-15'
    },
    {
      id: 2,
      name: 'Tech Equipment Rentals',
      category: 'Equipment',
      rating: 4.8,
      totalContracts: 189,
      activeContracts: 8,
      totalSpent: '$12.6M',
      onTimeDelivery: 96,
      status: 'active',
      nextDelivery: 'Global Music Festival - 2026-09-20'
    },
    {
      id: 3,
      name: 'Security Services Inc.',
      category: 'Security',
      rating: 4.7,
      totalContracts: 324,
      activeContracts: 15,
      totalSpent: '$6.2M',
      onTimeDelivery: 94,
      status: 'active',
      nextDelivery: 'AI Innovation Conference - 2026-10-10'
    },
  ];

  const VENDOR_CATEGORIES = [
    { category: 'Catering', count: 1240, avgRating: 4.8, totalSpent: '$340M', color: '#06B6D4' },
    { category: 'Equipment', count: 890, avgRating: 4.7, totalSpent: '$520M', color: '#8B5CF6' },
    { category: 'Security', count: 670, avgRating: 4.6, totalSpent: '$210M', color: '#10B981' },
    { category: 'Transportation', count: 450, avgRating: 4.5, totalSpent: '$180M', color: '#F59E0B' },
    { category: 'Decor/Design', count: 380, avgRating: 4.7, totalSpent: '$290M', color: '#EC4899' },
  ];

  const DELIVERY_STATUS = [
    { status: 'On Time', count: 2847, percentage: 88, color: '#10B981' },
    { status: 'In Transit', count: 324, percentage: 10, color: '#06B6D4' },
    { status: 'Delayed', count: 47, percentage: 1, color: '#F59E0B' },
    { status: 'Issues', count: 22, percentage: 1, color: '#EF4444' },
  ];

  const CONTRACT_TIMELINE = [
    { phase: 'Negotiation', contracts: 124, status: 'in-progress', color: '#F59E0B' },
    { phase: 'Signed', contracts: 847, status: 'completed', color: '#10B981' },
    { phase: 'Active', contracts: 12450, status: 'active', color: '#06B6D4' },
    { phase: 'Renewal Due', contracts: 289, status: 'attention', color: '#8B5CF6' },
    { phase: 'Expired', contracts: 67, status: 'expired', color: '#6B7280' },
  ];

  const RECENT_DELIVERIES = [
    { vendor: 'Premium Catering Co.', item: 'Lunch for 500', event: 'Tech Summit 2026', status: 'delivered', time: '2s ago', icon: CheckCircle, color: '#10B981' },
    { vendor: 'Tech Equipment Rentals', item: 'Audio Systems', event: 'Global Music Festival', status: 'in-transit', time: '5s ago', icon: Truck, color: '#06B6D4' },
    { vendor: 'Security Services Inc.', item: 'Security Team', event: 'AI Innovation Conference', status: 'delivered', time: '12s ago', icon: CheckCircle, color: '#10B981' },
    { vendor: 'Decor Masters', item: 'Stage Decor', event: 'Tech Summit 2026', status: 'delayed', time: '24s ago', icon: AlertTriangle, color: '#F59E0B' },
    { vendor: 'Transport Pro', item: 'Shuttle Service', event: 'Global Music Festival', status: 'in-transit', time: '31s ago', icon: Truck, color: '#06B6D4' },
  ];

  const PERFORMANCE_ANALYTICS = [
    { metric: 'On-Time Delivery', value: '94%', target: '95%', color: '#10B981' },
    { metric: 'Quality Score', value: '4.7/5', target: '4.8/5', color: '#F59E0B' },
    { metric: 'Cost Efficiency', value: '89%', target: '85%', color: '#06B6D4' },
    { metric: 'Response Time', value: '2.4h', target: '2h', color: '#8B5CF6' },
  ];

  const SPEND_ANALYTICS = [
    { category: 'Catering', spent: '$340M', budget: '$400M', progress: 85, color: '#06B6D4' },
    { category: 'Equipment', spent: '$520M', budget: '$600M', progress: 87, color: '#8B5CF6' },
    { category: 'Security', spent: '$210M', budget: '$250M', progress: 84, color: '#10B981' },
    { category: 'Transportation', spent: '$180M', budget: '$200M', progress: 90, color: '#F59E0B' },
  ];

  const CONTRACT_RENEWALS = [
    { vendor: 'Premium Catering Co.', contract: 'Annual Supply Agreement', expiresIn: '30 days', value: '$2.4M', status: 'renewal-due', color: '#F59E0B' },
    { vendor: 'Tech Equipment Rentals', contract: 'Audio Equipment Lease', expiresIn: '45 days', value: '$3.6M', status: 'upcoming', color: '#06B6D4' },
    { vendor: 'Security Services Inc.', contract: 'Security Services Contract', expiresIn: '60 days', value: '$1.8M', status: 'upcoming', color: '#10B981' },
    { vendor: 'Decor Masters', contract: 'Event Decor Supply', expiresIn: '15 days', value: '$890K', status: 'urgent', color: '#EF4444' },
  ];

  const VENDOR_PERFORMANCE = [
    { vendor: 'Premium Catering Co.', score: 98, onTime: 99, quality: 97, cost: 96, color: '#10B981' },
    { vendor: 'Tech Equipment Rentals', score: 95, onTime: 96, quality: 94, cost: 95, color: '#06B6D4' },
    { vendor: 'Security Services Inc.', score: 94, onTime: 94, quality: 95, cost: 93, color: '#8B5CF6' },
    { vendor: 'Decor Masters', score: 89, onTime: 87, quality: 92, cost: 88, color: '#F59E0B' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'attention': return '#8B5CF6';
      case 'expired': return '#6B7280';
      case 'delivered': return '#10B981';
      case 'in-transit': return '#06B6D4';
      case 'delayed': return '#F59E0B';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Building2 size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Vendor Management Center</Text>
          <Text style={styles.headerSubtitle}>Contracts & Delivery Tracking</Text>
        </View>
      </View>

      {/* Vendor Stats */}
      <View style={styles.statsContainer}>
        {VENDOR_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: stat.color + '20' }]}>
              <TrendingUp size={10} color={stat.color} />
              <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Vendor Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vendor Categories</Text>
        {VENDOR_CATEGORIES.map((cat, index) => (
          <View key={index} style={[styles.categoryCard, { borderColor: cat.color + '40' }]}>
            <View style={[styles.categoryHeader, { backgroundColor: cat.color + '20' }]}>
              <Text style={[styles.categoryName, { color: cat.color }]}>{cat.category}</Text>
              <Text style={[styles.categoryCount, { color: cat.color }]}>{cat.count} vendors</Text>
            </View>
            <View style={styles.categoryStats}>
              <View style={styles.categoryStat}>
                <Star size={14} color="#F59E0B" />
                <Text style={styles.categoryStatLabel}>Rating: {cat.avgRating}</Text>
              </View>
              <View style={styles.categoryStat}>
                <DollarSign size={14} color="#10B981" />
                <Text style={styles.categoryStatLabel}>Spent: {cat.totalSpent}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Delivery Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Status</Text>
        <View style={styles.deliveryGrid}>
          {DELIVERY_STATUS.map((status, index) => (
            <View key={index} style={[styles.deliveryCard, { borderColor: status.color + '40' }]}>
              <View style={[styles.deliveryIcon, { backgroundColor: status.color + '20' }]}>
                <Truck size={24} color={status.color} />
              </View>
              <Text style={styles.deliveryCount}>{status.count}</Text>
              <Text style={styles.deliveryLabel}>{status.status}</Text>
              <Text style={[styles.deliveryPercent, { color: status.color }]}>{status.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Performance Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Analytics</Text>
        <View style={styles.analyticsGrid}>
          {PERFORMANCE_ANALYTICS.map((metric, index) => (
            <View key={index} style={[styles.analyticsCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.analyticsValue}>{metric.value}</Text>
              <Text style={styles.analyticsMetric}>{metric.metric}</Text>
              <Text style={styles.analyticsTarget}>Target: {metric.target}</Text>
              <View style={[styles.analyticsIndicator, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={10} color={metric.color} />
                <Text style={[styles.analyticsIndicatorText, { color: metric.color }]}>
                  {parseFloat(metric.value.replace('%', '').replace('/5', '').replace('h', '')) >= parseFloat(metric.target.replace('%', '').replace('/5', '').replace('h', '')) ? 'On Track' : 'Needs Attention'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Spend Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spend Analytics</Text>
        <Text style={styles.sectionDescription}>Budget vs actual spending by category</Text>
        {SPEND_ANALYTICS.map((spend, index) => (
          <View key={index} style={styles.spendCard}>
            <View style={styles.spendHeader}>
              <Text style={styles.spendCategory}>{spend.category}</Text>
              <View style={styles.spendValues}>
                <Text style={styles.spentValue}>{spend.spent}</Text>
                <Text style={styles.budgetValue}>/ {spend.budget}</Text>
              </View>
            </View>
            <View style={styles.spendBar}>
              <View 
                style={[
                  styles.spendFill, 
                  { width: `${spend.progress}%`, backgroundColor: spend.color }
                ]} 
              />
            </View>
            <Text style={[styles.spendProgress, { color: spend.color }]}>{spend.progress}% of budget</Text>
          </View>
        ))}
      </View>

      {/* Contract Renewals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contract Renewals</Text>
        <Text style={styles.sectionDescription}>Upcoming contract expirations requiring attention</Text>
        {CONTRACT_RENEWALS.map((renewal, index) => (
          <View key={index} style={[styles.renewalCard, { borderColor: renewal.color + '40' }]}>
            <View style={styles.renewalHeader}>
              <Text style={styles.renewalVendor}>{renewal.vendor}</Text>
              <View style={[styles.renewalStatus, { backgroundColor: renewal.color + '20' }]}>
                <Clock size={12} color={renewal.color} />
                <Text style={[styles.renewalStatusText, { color: renewal.color }]}>{renewal.status}</Text>
              </View>
            </View>
            <Text style={styles.renewalContract}>{renewal.contract}</Text>
            <View style={styles.renewalDetails}>
              <View style={styles.renewalDetail}>
                <Text style={styles.renewalDetailLabel}>Expires In</Text>
                <Text style={styles.renewalDetailValue}>{renewal.expiresIn}</Text>
              </View>
              <View style={styles.renewalDetail}>
                <Text style={styles.renewalDetailLabel}>Contract Value</Text>
                <Text style={styles.renewalDetailValue}>{renewal.value}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Vendor Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vendor Performance</Text>
        <Text style={styles.sectionDescription}>Comprehensive vendor scoring and metrics</Text>
        {VENDOR_PERFORMANCE.map((vendor, index) => (
          <View key={index} style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceVendor}>{vendor.vendor}</Text>
              <View style={[styles.performanceScoreBadge, { backgroundColor: vendor.color + '20' }]}>
                <Text style={[styles.performanceScore, { color: vendor.color }]}>{vendor.score}</Text>
                <Text style={styles.performanceScoreLabel}>Score</Text>
              </View>
            </View>
            <View style={styles.performanceMetrics}>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceMetricLabel}>On-Time</Text>
                <Text style={[styles.performanceMetricValue, { color: vendor.onTime >= 95 ? '#10B981' : vendor.onTime >= 90 ? '#F59E0B' : '#EF4444' }]}>{vendor.onTime}%</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceMetricLabel}>Quality</Text>
                <Text style={[styles.performanceMetricValue, { color: vendor.quality >= 95 ? '#10B981' : vendor.quality >= 90 ? '#F59E0B' : '#EF4444' }]}>{vendor.quality}%</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceMetricLabel}>Cost</Text>
                <Text style={[styles.performanceMetricValue, { color: vendor.cost >= 95 ? '#10B981' : vendor.cost >= 90 ? '#F59E0B' : '#EF4444' }]}>{vendor.cost}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Contract Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contract Timeline</Text>
        {CONTRACT_TIMELINE.map((phase, index) => (
          <View key={index} style={styles.phaseCard}>
            <View style={styles.phaseHeader}>
              <Text style={styles.phaseName}>{phase.phase}</Text>
              <Text style={styles.phaseContracts}>{phase.contracts} contracts</Text>
            </View>
            <View style={styles.phaseBar}>
              <View 
                style={[
                  styles.phaseFill, 
                  { 
                    width: `${(phase.contracts / 12450) * 100}%`,
                    backgroundColor: phase.color
                  } 
                ]} 
              />
            </View>
            <View style={[styles.phaseStatus, { backgroundColor: phase.color + '20' }]}>
              <Text style={[styles.phaseStatusText, { color: phase.color }]}>{phase.status}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Vendors List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Vendors</Text>
        {VENDORS.map((vendor) => (
          <View key={vendor.id} style={[styles.vendorCard, { borderColor: getStatusColor(vendor.status) + '40' }]}>
            {/* Vendor Header */}
            <View style={styles.vendorHeader}>
              <View style={styles.vendorHeaderLeft}>
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <Text style={styles.vendorCategory}>{vendor.category}</Text>
              </View>
              <View style={[styles.vendorStatus, { backgroundColor: getStatusColor(vendor.status) + '20' }]}>
                <Activity size={14} color={getStatusColor(vendor.status)} />
                <Text style={[styles.vendorStatusText, { color: getStatusColor(vendor.status) }]}>{vendor.status}</Text>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.ratingSection}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingValue}>{vendor.rating}</Text>
              <Text style={styles.ratingLabel}>/ 5.0</Text>
            </View>

            {/* Contracts */}
            <View style={styles.contractsSection}>
              <View style={styles.contractItem}>
                <FileText size={16} color="#06B6D4" />
                <View>
                  <Text style={styles.contractLabel}>Active Contracts</Text>
                  <Text style={styles.contractValue}>{vendor.activeContracts}</Text>
                </View>
              </View>
              <View style={styles.contractItem}>
                <DollarSign size={16} color="#10B981" />
                <View>
                  <Text style={styles.contractLabel}>Total Spent</Text>
                  <Text style={styles.contractValue}>{vendor.totalSpent}</Text>
                </View>
              </View>
            </View>

            {/* Delivery Performance */}
            <View style={styles.deliveryPerformance}>
              <View style={styles.deliveryHeader}>
                <Truck size={16} color="#9CA3AF" />
                <Text style={styles.deliveryLabel}>On-Time Delivery</Text>
              </View>
              <View style={styles.deliveryBar}>
                <View 
                  style={[
                    styles.deliveryFill, 
                    { 
                      width: `${vendor.onTimeDelivery}%`,
                      backgroundColor: vendor.onTimeDelivery >= 95 ? '#10B981' : vendor.onTimeDelivery >= 90 ? '#F59E0B' : '#EF4444'
                    } 
                  ]} 
                />
              </View>
              <Text style={styles.deliveryPercent}>{vendor.onTimeDelivery}%</Text>
            </View>

            {/* Next Delivery */}
            <View style={styles.nextDeliverySection}>
              <Clock size={16} color="#9CA3AF" />
              <View style={styles.nextDeliveryContent}>
                <Text style={styles.nextDeliveryLabel}>Next Delivery</Text>
                <Text style={styles.nextDeliveryEvent}>{vendor.nextDelivery}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.vendorButton, { backgroundColor: '#06B6D4' }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.vendorButtonText}>View Vendor Details</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Recent Deliveries */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Deliveries</Text>
        <View style={styles.deliveriesList}>
          {RECENT_DELIVERIES.map((delivery, index) => (
            <View key={index} style={styles.deliveryItem}>
              <View style={[styles.deliveryStatusIcon, { backgroundColor: delivery.color + '20' }]}>
                <delivery.icon size={16} color={delivery.color} />
              </View>
              <View style={styles.deliveryContent}>
                <Text style={styles.deliveryVendor}>{delivery.vendor}</Text>
                <Text style={styles.deliveryItemName}>{delivery.item}</Text>
                <Text style={styles.deliveryEventName}>{delivery.event}</Text>
              </View>
              <Text style={styles.deliveryTime}>{delivery.time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Building2 size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Add Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <FileText size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>New Contract</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <Truck size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Track Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <BarChart3 size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  categoryStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryStatLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  deliveryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  deliveryCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  deliveryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deliveryLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  deliveryPercent: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  phaseCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  phaseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  phaseContracts: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  phaseBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  phaseFill: {
    height: '100%',
    borderRadius: 4,
  },
  phaseStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  phaseStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  vendorCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  vendorHeaderLeft: {
    flex: 1,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  vendorCategory: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  vendorStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  vendorStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  contractsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  contractItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contractLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  contractValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deliveryPerformance: {
    marginBottom: 16,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  deliveryBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  deliveryFill: {
    height: '100%',
    borderRadius: 4,
  },
  deliveryPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nextDeliverySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  nextDeliveryContent: {
    flex: 1,
  },
  nextDeliveryLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  nextDeliveryEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  vendorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  vendorButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveriesList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  deliveryStatusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryContent: {
    flex: 1,
  },
  deliveryVendor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deliveryItemName: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  deliveryEventName: {
    fontSize: 12,
    color: '#6B7280',
  },
  deliveryTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  analyticsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  analyticsMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  analyticsTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  analyticsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  analyticsIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
  spendCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  spendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spendCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spendValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  spentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  budgetValue: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  spendBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  spendFill: {
    height: '100%',
    borderRadius: 4,
  },
  spendProgress: {
    fontSize: 12,
    fontWeight: '600',
  },
  renewalCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  renewalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  renewalVendor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  renewalStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  renewalStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  renewalContract: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  renewalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  renewalDetail: {
    alignItems: 'center',
  },
  renewalDetailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  renewalDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  performanceCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceVendor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  performanceScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  performanceScoreLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceMetric: {
    alignItems: 'center',
  },
  performanceMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  performanceMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
