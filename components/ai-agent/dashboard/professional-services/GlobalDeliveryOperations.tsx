import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  Globe,
  MapPin,
  Users,
  Briefcase,
  TrendingUp,
  Activity,
  Building2,
  BarChart3,
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Clock,
  Shield,
  Zap,
} from 'lucide-react-native';

interface GlobalDeliveryOperationsProps {
  data?: {
    deliveryCenters: any[];
    regionalPerformance: any;
    workforceDistribution: any;
    activeEngagements: any;
    deliveryCapacity: any;
  };
}

export default function GlobalDeliveryOperations({ data }: GlobalDeliveryOperationsProps) {
  // Mock data for Global Delivery Operations
  const deliveryCenters = [
    { id: 1, name: 'North America HQ', location: 'New York, USA', consultants: 12400, projects: 4200, utilization: 88, capacity: 92, status: 'operational' },
    { id: 2, name: 'EMEA Hub', location: 'London, UK', consultants: 8200, projects: 2800, utilization: 84, capacity: 89, status: 'operational' },
    { id: 3, name: 'APAC Center', location: 'Singapore', consultants: 6800, projects: 2400, utilization: 82, capacity: 86, status: 'operational' },
    { id: 4, name: 'LATAM Operations', location: 'São Paulo, Brazil', consultants: 3400, projects: 1200, utilization: 78, capacity: 82, status: 'operational' },
    { id: 5, name: 'India Delivery', location: 'Bangalore, India', consultants: 15200, projects: 5200, utilization: 92, capacity: 95, status: 'operational' },
    { id: 6, name: 'Europe Tech Hub', location: 'Berlin, Germany', consultants: 2000, projects: 650, utilization: 86, capacity: 88, status: 'operational' },
  ];

  const regionalPerformance = {
    northAmerica: { revenue: '$840M', growth: '+18%', satisfaction: 94, onTimeDelivery: 92 },
    emea: { revenue: '$620M', growth: '+14%', satisfaction: 91, onTimeDelivery: 89 },
    apac: { revenue: '$580M', growth: '+22%', satisfaction: 88, onTimeDelivery: 86 },
    latam: { revenue: '$240M', growth: '+16%', satisfaction: 86, onTimeDelivery: 84 },
    india: { revenue: '$120M', growth: '+28%', satisfaction: 92, onTimeDelivery: 94 },
  };

  const workforceDistribution = {
    totalConsultants: 48000,
    byRegion: [
      { region: 'North America', count: 12400, percentage: 26 },
      { region: 'EMEA', count: 10200, percentage: 21 },
      { region: 'APAC', count: 6800, percentage: 14 },
      { region: 'India', count: 15200, percentage: 32 },
      { region: 'LATAM', count: 3400, percentage: 7 },
    ],
    byPractice: [
      { practice: 'Strategy', count: 4800, percentage: 10 },
      { practice: 'Digital', count: 14400, percentage: 30 },
      { practice: 'Cloud', count: 9600, percentage: 20 },
      { practice: 'Security', count: 4800, percentage: 10 },
      { practice: 'Data & AI', count: 7200, percentage: 15 },
      { practice: 'Operations', count: 7200, percentage: 15 },
    ],
  };

  const activeEngagements = {
    total: 12450,
    byRegion: [
      { region: 'North America', count: 4200, value: '$4.2B' },
      { region: 'EMEA', count: 2800, value: '$2.8B' },
      { region: 'APAC', count: 2400, value: '$2.4B' },
      { region: 'India', count: 5200, value: '$5.2B' },
      { region: 'LATAM', count: 1200, value: '$1.2B' },
    ],
    byIndustry: [
      { industry: 'Financial Services', count: 3200, value: '$3.2B' },
      { industry: 'Healthcare', count: 2400, value: '$2.4B' },
      { industry: 'Technology', count: 2800, value: '$2.8B' },
      { industry: 'Retail', count: 1800, value: '$1.8B' },
      { industry: 'Manufacturing', count: 2200, value: '$2.2B' },
    ],
  };

  const deliveryCapacity = {
    totalCapacity: 52000,
    utilized: 48000,
    available: 4000,
    utilizationRate: 92,
    forecastDemand: 56000,
    capacityGap: -4000,
  };

  const renderDeliveryCenterCard = (center: any, index: number) => (
    <View key={center.id} style={[styles.centerCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
      <View style={styles.centerHeader}>
        <View style={[styles.centerIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <Building2 size={24} color="#10B981" />
        </View>
        <View style={styles.centerInfo}>
          <Text style={[styles.centerName, { color: '#FFFFFF' }]}>{center.name}</Text>
          <View style={styles.centerLocation}>
            <MapPin size={14} color="rgba(255, 255, 255, 0.5)" />
            <Text style={[styles.centerLocationText, { color: 'rgba(255, 255, 255, 0.6)' }]}>{center.location}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.statusText, { color: '#10B981' }]}>Operational</Text>
        </View>
      </View>

      <View style={styles.centerMetrics}>
        <View style={styles.metricRow}>
          <Users size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{center.consultants.toLocaleString()}</Text>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Consultants</Text>
        </View>
        <View style={styles.metricRow}>
          <Briefcase size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{center.projects.toLocaleString()}</Text>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Projects</Text>
        </View>
        <View style={styles.metricRow}>
          <Activity size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{center.utilization}%</Text>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Utilization</Text>
        </View>
        <View style={styles.metricRow}>
          <Target size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{center.capacity}%</Text>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Capacity</Text>
        </View>
      </View>
    </View>
  );

  const renderRegionalCard = (region: string, data: any, index: number) => (
    <View key={region} style={[styles.regionalCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }]}>
      <Text style={[styles.regionName, { color: '#FFFFFF' }]}>{region}</Text>
      <View style={styles.regionMetrics}>
        <View style={styles.regionMetric}>
          <Text style={[styles.regionMetricValue, { color: '#3B82F6' }]}>{data.revenue}</Text>
          <Text style={[styles.regionMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Revenue</Text>
        </View>
        <View style={styles.regionMetric}>
          <View style={styles.growthBadge}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.growthText, { color: '#10B981' }]}>{data.growth}</Text>
          </View>
          <Text style={[styles.regionMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Growth</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={[styles.regionMetricValue, { color: '#10B981' }]}>{data.satisfaction}%</Text>
          <Text style={[styles.regionMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>CSAT</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={[styles.regionMetricValue, { color: '#8B5CF6' }]}>{data.onTimeDelivery}%</Text>
          <Text style={[styles.regionMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>On-Time</Text>
        </View>
      </View>
    </View>
  );

  const renderCapacityCard = (label: string, value: string | number, IconComponent: any, color: string) => (
    <View style={[styles.capacityCard, { backgroundColor: `${color}15`, borderColor: `${color}40` }]}>
      <View style={[styles.capacityIcon, { backgroundColor: `${color}25` }]}>
        <IconComponent size={24} color={color} />
      </View>
      <Text style={[styles.capacityValue, { color: '#FFFFFF' }]}>{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text style={[styles.capacityLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <Globe size={28} color="#10B981" />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Global Delivery Operations</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Worldwide Delivery Centers • Regional Performance • Workforce Distribution
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Capacity Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Delivery Capacity Overview</Text>
          <View style={styles.capacityGrid}>
            {renderCapacityCard('Total Capacity', deliveryCapacity.totalCapacity, Users, '#3B82F6')}
            {renderCapacityCard('Utilized', deliveryCapacity.utilized, Briefcase, '#10B981')}
            {renderCapacityCard('Available', deliveryCapacity.available, Target, '#8B5CF6')}
            {renderCapacityCard('Utilization Rate', `${deliveryCapacity.utilizationRate}%`, Activity, '#F59E0B')}
            {renderCapacityCard('Forecast Demand', deliveryCapacity.forecastDemand, TrendingUp, '#06B6D4')}
            {renderCapacityCard('Capacity Gap', deliveryCapacity.capacityGap, AlertTriangle, deliveryCapacity.capacityGap < 0 ? '#EF4444' : '#10B981')}
          </View>
        </View>

        {/* Global Delivery Centers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Global Delivery Centers</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: '#10B981' }]}>View Map →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centersList}>
            {deliveryCenters.map((center, index) => renderDeliveryCenterCard(center, index))}
          </View>
        </View>

        {/* Regional Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Regional Performance</Text>
          <View style={styles.regionalGrid}>
            {renderRegionalCard('North America', regionalPerformance.northAmerica, 0)}
            {renderRegionalCard('EMEA', regionalPerformance.emea, 1)}
            {renderRegionalCard('APAC', regionalPerformance.apac, 2)}
            {renderRegionalCard('LATAM', regionalPerformance.latam, 3)}
            {renderRegionalCard('India', regionalPerformance.india, 4)}
          </View>
        </View>

        {/* Workforce Distribution */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Workforce Distribution</Text>
          
          <View style={[styles.distributionCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <Text style={[styles.distributionSubtitle, { color: '#FFFFFF' }]}>By Region</Text>
            <View style={styles.distributionBars}>
              {workforceDistribution.byRegion.map((item, index) => (
                <View key={index} style={styles.distributionBarRow}>
                  <Text style={[styles.barLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>{item.region}</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.barFill, { backgroundColor: '#10B981', width: `${item.percentage * 3}%` }]} />
                    <Text style={[styles.barValue, { color: '#FFFFFF' }]}>{item.count.toLocaleString()}</Text>
                  </View>
                  <Text style={[styles.barPercentage, { color: 'rgba(255, 255, 255, 0.6)' }]}>{item.percentage}%</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.distributionCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }]}>
            <Text style={[styles.distributionSubtitle, { color: '#FFFFFF' }]}>By Practice</Text>
            <View style={styles.distributionBars}>
              {workforceDistribution.byPractice.map((item, index) => (
                <View key={index} style={styles.distributionBarRow}>
                  <Text style={[styles.barLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>{item.practice}</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.barFill, { backgroundColor: '#3B82F6', width: `${item.percentage * 3}%` }]} />
                    <Text style={[styles.barValue, { color: '#FFFFFF' }]}>{item.count.toLocaleString()}</Text>
                  </View>
                  <Text style={[styles.barPercentage, { color: 'rgba(255, 255, 255, 0.6)' }]}>{item.percentage}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Active Engagements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Active Engagements</Text>
          
          <View style={styles.engagementSummary}>
            <View style={[styles.engagementStat, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Briefcase size={32} color="#10B981" />
              <Text style={[styles.engagementStatValue, { color: '#FFFFFF' }]}>{activeEngagements.total.toLocaleString()}</Text>
              <Text style={[styles.engagementStatLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Engagements</Text>
            </View>
            <View style={[styles.engagementStat, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
              <BarChart3 size={32} color="#3B82F6" />
              <Text style={[styles.engagementStatValue, { color: '#FFFFFF' }]}>$15.8B</Text>
              <Text style={[styles.engagementStatLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Value</Text>
            </View>
          </View>

          <View style={[styles.engagementCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <Text style={[styles.engagementCardTitle, { color: '#FFFFFF' }]}>By Region</Text>
            {activeEngagements.byRegion.map((item, index) => (
              <View key={index} style={styles.engagementRow}>
                <Text style={[styles.engagementRegion, { color: 'rgba(255, 255, 255, 0.8)' }]}>{item.region}</Text>
                <View style={styles.engagementMetrics}>
                  <Text style={[styles.engagementCount, { color: '#FFFFFF' }]}>{item.count.toLocaleString()}</Text>
                  <Text style={[styles.engagementValue, { color: '#10B981' }]}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.engagementCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
            <Text style={[styles.engagementCardTitle, { color: '#FFFFFF' }]}>By Industry</Text>
            {activeEngagements.byIndustry.map((item, index) => (
              <View key={index} style={styles.engagementRow}>
                <Text style={[styles.engagementRegion, { color: 'rgba(255, 255, 255, 0.8)' }]}>{item.industry}</Text>
                <View style={styles.engagementMetrics}>
                  <Text style={[styles.engagementCount, { color: '#FFFFFF' }]}>{item.count.toLocaleString()}</Text>
                  <Text style={[styles.engagementValue, { color: '#8B5CF6' }]}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.3)',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  capacityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  capacityCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  capacityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  capacityLabel: {
    fontSize: 12,
  },
  centersList: {
    gap: 12,
  },
  centerCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  centerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  centerInfo: {
    flex: 1,
  },
  centerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  centerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  centerLocationText: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  centerMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '45%',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricLabel: {
    fontSize: 11,
  },
  regionalGrid: {
    gap: 12,
  },
  regionalCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regionMetric: {
    alignItems: 'center',
  },
  regionMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  regionMetricLabel: {
    fontSize: 11,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  distributionCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  distributionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  distributionBars: {
    gap: 12,
  },
  distributionBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barLabel: {
    fontSize: 13,
    width: 100,
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barFill: {
    height: 8,
    borderRadius: 4,
    minWidth: 4,
  },
  barValue: {
    fontSize: 13,
    fontWeight: '600',
    width: 60,
  },
  barPercentage: {
    fontSize: 12,
    width: 40,
  },
  engagementSummary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  engagementStat: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  engagementStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  engagementStatLabel: {
    fontSize: 12,
  },
  engagementCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  engagementCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  engagementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  engagementRegion: {
    fontSize: 14,
    width: '40%',
  },
  engagementMetrics: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  engagementCount: {
    fontSize: 14,
    fontWeight: '600',
    width: 60,
  },
  engagementValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
