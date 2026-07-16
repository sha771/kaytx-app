import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  DollarSign, Building2, TrendingUp, ArrowRight, BarChart3, Activity,
  Target, Star, Users, Eye, Zap, Award, CheckCircle, AlertTriangle
} from 'lucide-react-native';

export default function SponsorshipCommandCenter() {
  const router = useRouter();

  const SPONSOR_STATS = [
    { label: 'Active Sponsors', value: '3,240', icon: Building2, color: '#06B6D4', trend: '+10%' },
    { label: 'Sponsorship Revenue', value: '$920M', icon: DollarSign, color: '#FFD700', trend: '+22%' },
    { label: 'Avg ROI', value: '3.8x', icon: Target, color: '#10B981', trend: '+15%' },
    { label: 'Brand Exposure', value: '156M', icon: Eye, color: '#8B5CF6', trend: '+18%' },
  ];

  const SPONSORS = [
    {
      id: 1,
      name: 'TechCorp Global',
      tier: 'Platinum',
      investment: '$12.4M',
      roi: 4.2,
      leadsGenerated: 8470,
      brandExposure: '24.5M',
      boothTraffic: 12400,
      satisfaction: 4.9,
      status: 'active',
      contractEnds: '2026-12-31'
    },
    {
      id: 2,
      name: 'Innovation Ventures',
      tier: 'Gold',
      investment: '$8.7M',
      roi: 3.8,
      leadsGenerated: 6200,
      brandExposure: '18.2M',
      boothTraffic: 8900,
      satisfaction: 4.7,
      status: 'active',
      contractEnds: '2026-11-15'
    },
    {
      id: 3,
      name: 'Future Systems Inc.',
      tier: 'Silver',
      investment: '$4.2M',
      roi: 3.5,
      leadsGenerated: 3400,
      brandExposure: '12.8M',
      boothTraffic: 5600,
      satisfaction: 4.6,
      status: 'active',
      contractEnds: '2026-10-30'
    },
  ];

  const SPONSOR_TIERS = [
    { tier: 'Platinum', count: 47, avgInvestment: '$12.4M', totalRevenue: '$582M', color: '#FFD700' },
    { tier: 'Gold', count: 124, avgInvestment: '$8.7M', totalRevenue: '$1.08B', color: '#8B5CF6' },
    { tier: 'Silver', count: 289, avgInvestment: '$4.2M', totalRevenue: '$1.21B', color: '#06B6D4' },
    { tier: 'Bronze', count: 890, avgInvestment: '$1.8M', totalRevenue: '$1.60B', color: '#CD7F32' },
    { tier: 'Community', count: 1890, avgInvestment: '$240K', totalRevenue: '$454M', color: '#10B981' },
  ];

  const SPONSORSHIP_BENEFITS = [
    { benefit: 'Booth Space', utilization: '87%', satisfaction: 4.8, color: '#06B6D4' },
    { benefit: 'Speaking Slots', utilization: '94%', satisfaction: 4.9, color: '#8B5CF6' },
    { benefit: 'Logo Placement', utilization: '98%', satisfaction: 4.7, color: '#10B981' },
    { benefit: 'VIP Access', utilization: '91%', satisfaction: 4.8, color: '#F59E0B' },
    { benefit: 'Digital Ads', utilization: '89%', satisfaction: 4.6, color: '#EC4899' },
  ];

  const ROI_TRACKING = [
    { metric: 'Lead Generation', value: '124K', conversion: '24%', color: '#06B6D4' },
    { metric: 'Brand Awareness', value: '156M', conversion: '18%', color: '#8B5CF6' },
    { metric: 'Deal Pipeline', value: '$2.4B', conversion: '12%', color: '#10B981' },
    { metric: 'Customer Acquisition', value: '8.4K', conversion: '8%', color: '#F59E0B' },
  ];

  const RECENT_ACTIVATIONS = [
    { sponsor: 'TechCorp Global', activation: 'Keynote Sponsorship', event: 'Tech Summit 2026', status: 'active', time: '2s ago', icon: Zap, color: '#10B981' },
    { sponsor: 'Innovation Ventures', activation: 'Booth Activation', event: 'Global Music Festival', status: 'active', time: '5s ago', icon: Award, color: '#06B6D4' },
    { sponsor: 'Future Systems Inc.', activation: 'Workshop Sponsor', event: 'AI Innovation Conference', status: 'completed', time: '12s ago', icon: CheckCircle, color: '#8B5CF6' },
    { sponsor: 'DataFlow Corp', activation: 'Lounge Sponsor', event: 'Tech Summit 2026', status: 'attention', time: '24s ago', icon: AlertTriangle, color: '#F59E0B' },
    { sponsor: 'CloudNine', activation: 'Networking Event', event: 'Global Music Festival', status: 'active', time: '31s ago', icon: Zap, color: '#10B981' },
  ];

  const ROI_ANALYTICS = [
    { metric: 'Total ROI', value: '3.8x', target: '4.0x', color: '#10B981' },
    { metric: 'Lead Conversion', value: '24%', target: '28%', color: '#F59E0B' },
    { metric: 'Brand Lift', value: '67%', target: '70%', color: '#06B6D4' },
    { metric: 'Engagement Rate', value: '89%', target: '85%', color: '#8B5CF6' },
  ];

  const BRAND_EXPOSURE = [
    { channel: 'Social Media', impressions: '45.2M', engagement: '8.7M', rate: '19%', color: '#06B6D4' },
    { channel: 'Event App', impressions: '32.8M', engagement: '12.4M', rate: '38%', color: '#8B5CF6' },
    { channel: 'On-Site Displays', impressions: '28.5M', engagement: '24.2M', rate: '85%', color: '#10B981' },
    { channel: 'Digital Ads', impressions: '24.1M', engagement: '4.8M', rate: '20%', color: '#F59E0B' },
    { channel: 'Press Coverage', impressions: '18.4M', engagement: '6.2M', rate: '34%', color: '#EC4899' },
  ];

  const SPONSOR_PERFORMANCE = [
    { sponsor: 'TechCorp Global', score: 98, roi: 4.2, leads: 8470, exposure: '24.5M', color: '#FFD700' },
    { sponsor: 'Innovation Ventures', score: 95, roi: 3.8, leads: 6200, exposure: '18.2M', color: '#8B5CF6' },
    { sponsor: 'Future Systems Inc.', score: 92, roi: 3.5, leads: 3400, exposure: '12.8M', color: '#06B6D4' },
    { sponsor: 'DataFlow Corp', score: 87, roi: 3.2, leads: 2100, exposure: '8.4M', color: '#F59E0B' },
  ];

  const ACTIVATION_ANALYTICS = [
    { activation: 'Keynote Sponsorship', sponsors: 47, avgROI: 4.5, satisfaction: 4.9, color: '#FFD700' },
    { activation: 'Booth Activation', sponsors: 124, avgROI: 3.8, satisfaction: 4.7, color: '#8B5CF6' },
    { activation: 'Workshop Sponsor', sponsors: 89, avgROI: 3.2, satisfaction: 4.6, color: '#06B6D4' },
    { activation: 'Lounge Sponsor', sponsors: 67, avgROI: 2.8, satisfaction: 4.5, color: '#10B981' },
    { activation: 'Networking Event', sponsors: 156, avgROI: 3.5, satisfaction: 4.8, color: '#F59E0B' },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return '#FFD700';
      case 'Gold': return '#8B5CF6';
      case 'Silver': return '#06B6D4';
      case 'Bronze': return '#CD7F32';
      case 'Community': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#06B6D4';
      case 'attention': return '#F59E0B';
      case 'expired': return '#EF4444';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <DollarSign size={48} color="#FFD700" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Sponsorship Command Center</Text>
          <Text style={styles.headerSubtitle}>Partnership & ROI Management</Text>
        </View>
      </View>

      {/* Sponsor Stats */}
      <View style={styles.statsContainer}>
        {SPONSOR_STATS.map((stat, index) => (
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

      {/* Sponsor Tiers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sponsor Tiers</Text>
        {SPONSOR_TIERS.map((tier, index) => (
          <View key={index} style={[styles.tierCard, { borderColor: tier.color + '40' }]}>
            <View style={[styles.tierHeader, { backgroundColor: tier.color + '20' }]}>
              <Text style={[styles.tierName, { color: tier.color }]}>{tier.tier}</Text>
              <Text style={[styles.tierCount, { color: tier.color }]}>{tier.count} sponsors</Text>
            </View>
            <View style={styles.tierStats}>
              <View style={styles.tierStat}>
                <Text style={styles.tierStatLabel}>Avg Investment</Text>
                <Text style={styles.tierStatValue}>{tier.avgInvestment}</Text>
              </View>
              <View style={styles.tierStat}>
                <Text style={styles.tierStatLabel}>Total Revenue</Text>
                <Text style={styles.tierStatValue}>{tier.totalRevenue}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Sponsorship Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sponsorship Benefits</Text>
        {SPONSORSHIP_BENEFITS.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={styles.benefitHeader}>
              <Text style={styles.benefitName}>{benefit.benefit}</Text>
              <View style={styles.benefitRating}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.benefitRatingValue}>{benefit.satisfaction}</Text>
              </View>
            </View>
            <View style={styles.benefitBar}>
              <View 
                style={[
                  styles.benefitFill, 
                  { 
                    width: `${benefit.utilization}%`,
                    backgroundColor: benefit.color
                  } 
                ]} 
              />
            </View>
            <Text style={styles.benefitUtilization}>{benefit.utilization} utilized</Text>
          </View>
        ))}
      </View>

      {/* ROI Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ROI Analytics Dashboard</Text>
        <View style={styles.analyticsGrid}>
          {ROI_ANALYTICS.map((metric, index) => (
            <View key={index} style={[styles.analyticsCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.analyticsValue}>{metric.value}</Text>
              <Text style={styles.analyticsMetric}>{metric.metric}</Text>
              <Text style={styles.analyticsTarget}>Target: {metric.target}</Text>
              <View style={[styles.analyticsIndicator, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={10} color={metric.color} />
                <Text style={[styles.analyticsIndicatorText, { color: metric.color }]}>
                  {parseFloat(metric.value.replace('x', '').replace('%', '')) >= parseFloat(metric.target.replace('x', '').replace('%', '')) ? 'On Track' : 'Needs Attention'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Brand Exposure */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Brand Exposure Tracking</Text>
        <Text style={styles.sectionDescription}>Multi-channel brand visibility and engagement</Text>
        {BRAND_EXPOSURE.map((channel, index) => (
          <View key={index} style={styles.exposureCard}>
            <View style={styles.exposureHeader}>
              <Text style={styles.exposureChannel}>{channel.channel}</Text>
              <View style={styles.exposureStats}>
                <Text style={styles.exposureImpressions}>{channel.impressions}</Text>
                <Text style={styles.exposureEngagement}>{channel.engagement}</Text>
              </View>
            </View>
            <View style={styles.exposureBar}>
              <View 
                style={[
                  styles.exposureFill, 
                  { width: `${parseFloat(channel.rate)}%`, backgroundColor: channel.color }
                ]} 
              />
            </View>
            <Text style={[styles.exposureRate, { color: channel.color }]}>{channel.rate} engagement rate</Text>
          </View>
        ))}
      </View>

      {/* Sponsor Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sponsor Performance</Text>
        <Text style={styles.sectionDescription}>Comprehensive sponsor scoring and metrics</Text>
        {SPONSOR_PERFORMANCE.map((sponsor, index) => (
          <View key={index} style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceSponsor}>{sponsor.sponsor}</Text>
              <View style={[styles.performanceScoreBadge, { backgroundColor: sponsor.color + '20' }]}>
                <Text style={[styles.performanceScore, { color: sponsor.color }]}>{sponsor.score}</Text>
                <Text style={styles.performanceScoreLabel}>Score</Text>
              </View>
            </View>
            <View style={styles.performanceMetrics}>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceMetricLabel}>ROI</Text>
                <Text style={[styles.performanceMetricValue, { color: sponsor.roi >= 4 ? '#10B981' : sponsor.roi >= 3.5 ? '#F59E0B' : '#EF4444' }]}>{sponsor.roi}x</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceMetricLabel}>Leads</Text>
                <Text style={styles.performanceMetricValue}>{sponsor.leads.toLocaleString()}</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceMetricLabel}>Exposure</Text>
                <Text style={styles.performanceMetricValue}>{sponsor.exposure}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Activation Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activation Analytics</Text>
        <Text style={styles.sectionDescription}>Performance metrics by activation type</Text>
        {ACTIVATION_ANALYTICS.map((activation, index) => (
          <View key={index} style={styles.activationAnalyticsCard}>
            <View style={styles.activationAnalyticsHeader}>
              <Text style={styles.activationName}>{activation.activation}</Text>
              <View style={styles.activationAnalyticsStats}>
                <Text style={styles.activationSponsors}>{activation.sponsors} sponsors</Text>
              </View>
            </View>
            <View style={styles.activationMetrics}>
              <View style={styles.activationMetric}>
                <Text style={styles.activationMetricLabel}>Avg ROI</Text>
                <Text style={[styles.activationMetricValue, { color: activation.avgROI >= 4 ? '#10B981' : activation.avgROI >= 3.5 ? '#F59E0B' : '#EF4444' }]}>{activation.avgROI}x</Text>
              </View>
              <View style={styles.activationMetric}>
                <Text style={styles.activationMetricLabel}>Satisfaction</Text>
                <Text style={styles.activationMetricValue}>{activation.satisfaction}/5</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* ROI Tracking */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ROI Tracking</Text>
        <View style={styles.roiGrid}>
          {ROI_TRACKING.map((roi, index) => (
            <View key={index} style={[styles.roiCard, { borderColor: roi.color + '40' }]}>
              <Text style={styles.roiValue}>{roi.value}</Text>
              <Text style={styles.roiLabel}>{roi.metric}</Text>
              <View style={[styles.roiConversion, { backgroundColor: roi.color + '20' }]}>
                <Target size={12} color={roi.color} />
                <Text style={[styles.roiConversionText, { color: roi.color }]}>{roi.conversion} conversion</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Sponsors List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Sponsors</Text>
        {SPONSORS.map((sponsor) => (
          <View key={sponsor.id} style={[styles.sponsorCard, { borderColor: getTierColor(sponsor.tier) + '40' }]}>
            {/* Sponsor Header */}
            <View style={styles.sponsorHeader}>
              <View style={styles.sponsorHeaderLeft}>
                <Text style={styles.sponsorName}>{sponsor.name}</Text>
                <View style={[styles.tierBadge, { backgroundColor: getTierColor(sponsor.tier) + '20' }]}>
                  <Award size={14} color={getTierColor(sponsor.tier)} />
                  <Text style={[styles.tierBadgeText, { color: getTierColor(sponsor.tier) }]}>{sponsor.tier}</Text>
                </View>
              </View>
              <View style={[styles.sponsorStatus, { backgroundColor: getStatusColor(sponsor.status) + '20' }]}>
                <Activity size={14} color={getStatusColor(sponsor.status)} />
                <Text style={[styles.sponsorStatusText, { color: getStatusColor(sponsor.status) }]}>{sponsor.status}</Text>
              </View>
            </View>

            {/* Investment */}
            <View style={styles.investmentSection}>
              <DollarSign size={20} color="#FFD700" />
              <View>
                <Text style={styles.investmentLabel}>Total Investment</Text>
                <Text style={styles.investmentValue}>{sponsor.investment}</Text>
              </View>
            </View>

            {/* ROI */}
            <View style={styles.roiSection}>
              <View style={styles.roiHeader}>
                <Target size={16} color="#10B981" />
                <Text style={styles.roiLabel}>Return on Investment</Text>
              </View>
              <View style={styles.roiBar}>
                <View 
                  style={[
                    styles.roiFill, 
                    { 
                      width: `${(sponsor.roi / 5) * 100}%`,
                      backgroundColor: sponsor.roi >= 4 ? '#10B981' : sponsor.roi >= 3 ? '#F59E0B' : '#EF4444'
                    } 
                  ]} 
                />
              </View>
              <Text style={styles.roiValue}>{sponsor.roi}x ROI</Text>
            </View>

            {/* Performance Metrics */}
            <View style={styles.metricsSection}>
              <View style={styles.metricItem}>
                <Users size={16} color="#06B6D4" />
                <View>
                  <Text style={styles.metricLabel}>Leads Generated</Text>
                  <Text style={styles.metricValue}>{sponsor.leadsGenerated.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.metricItem}>
                <Eye size={16} color="#8B5CF6" />
                <View>
                  <Text style={styles.metricLabel}>Brand Exposure</Text>
                  <Text style={styles.metricValue}>{sponsor.brandExposure}</Text>
                </View>
              </View>
              <View style={styles.metricItem}>
                <Activity size={16} color="#10B981" />
                <View>
                  <Text style={styles.metricLabel}>Booth Traffic</Text>
                  <Text style={styles.metricValue}>{sponsor.boothTraffic.toLocaleString()}</Text>
                </View>
              </View>
            </View>

            {/* Satisfaction */}
            <View style={styles.satisfactionSection}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.satisfactionLabel}>Satisfaction Score</Text>
              <Text style={styles.satisfactionValue}>{sponsor.satisfaction} / 5.0</Text>
            </View>

            <TouchableOpacity
              style={[styles.sponsorButton, { backgroundColor: '#FFD700' }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.sponsorButtonText}>View Sponsor Details</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Recent Activations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activations</Text>
        <View style={styles.activationsList}>
          {RECENT_ACTIVATIONS.map((activation, index) => (
            <View key={index} style={styles.activationItem}>
              <View style={[styles.activationIcon, { backgroundColor: activation.color + '20' }]}>
                <activation.icon size={16} color={activation.color} />
              </View>
              <View style={styles.activationContent}>
                <Text style={styles.activationSponsor}>{activation.sponsor}</Text>
                <Text style={styles.activationName}>{activation.activation}</Text>
                <Text style={styles.activationEvent}>{activation.event}</Text>
              </View>
              <View style={[styles.activationStatus, { backgroundColor: getStatusColor(activation.status) + '20' }]}>
                <Text style={[styles.activationStatusText, { color: getStatusColor(activation.status) }]}>{activation.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#FFD70015', borderColor: '#FFD70040' }]}
          >
            <Building2 size={24} color="#FFD700" />
            <Text style={[styles.actionText, { color: '#FFD700' }]}>Add Sponsor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Award size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Create Tier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>ROI Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Zap size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Activation</Text>
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
    borderBottomColor: '#FFD70040',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFD70020',
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
  tierCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  tierName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tierCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tierStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  tierStat: {
    alignItems: 'center',
  },
  tierStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  tierStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  benefitCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  benefitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  benefitRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  benefitRatingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  benefitBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  benefitFill: {
    height: '100%',
    borderRadius: 4,
  },
  benefitUtilization: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  roiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  roiCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  roiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  roiLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  roiConversion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  roiConversionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sponsorCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sponsorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sponsorHeaderLeft: {
    flex: 1,
  },
  sponsorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
    alignSelf: 'flex-start',
  },
  tierBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sponsorStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  sponsorStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  investmentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  investmentLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  investmentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  roiSection: {
    marginBottom: 16,
  },
  roiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  roiLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  roiBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  roiFill: {
    height: '100%',
    borderRadius: 4,
  },
  roiValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  satisfactionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  satisfactionLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  satisfactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sponsorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  sponsorButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activationsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  activationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  activationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activationContent: {
    flex: 1,
  },
  activationSponsor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activationName: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  activationEvent: {
    fontSize: 12,
    color: '#6B7280',
  },
  activationStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activationStatusText: {
    fontSize: 11,
    fontWeight: '600',
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
  exposureCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exposureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exposureChannel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exposureStats: {
    alignItems: 'flex-end',
  },
  exposureImpressions: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#06B6D4',
  },
  exposureEngagement: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  exposureBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  exposureFill: {
    height: '100%',
    borderRadius: 4,
  },
  exposureRate: {
    fontSize: 12,
    fontWeight: '600',
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
  performanceSponsor: {
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
    color: '#FFFFFF',
  },
  activationAnalyticsCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activationAnalyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activationAnalyticsStats: {
    alignItems: 'flex-end',
  },
  activationSponsors: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  activationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activationMetric: {
    alignItems: 'center',
  },
  activationMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  activationMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
