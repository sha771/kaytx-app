import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Globe, MapPin, Users, DollarSign, Activity, TrendingUp, ArrowRight,
  BarChart3, Calendar, Radio, CheckCircle, AlertTriangle, Zap
} from 'lucide-react-native';

export default function GlobalEventOperations() {
  const router = useRouter();

  const GLOBAL_STATS = [
    { label: 'Total Events', value: '1,260', icon: Calendar, color: '#06B6D4', trend: '+12%' },
    { label: 'Total Attendees', value: '9.4M', icon: Users, color: '#8B5CF6', trend: '+15%' },
    { label: 'Total Revenue', value: '$7.2B', icon: DollarSign, color: '#10B981', trend: '+22%' },
    { label: 'Live Events', value: '47', icon: Radio, color: '#F59E0B', trend: '+8%' },
  ];

  const REGIONS = [
    {
      region: 'North America',
      events: 524,
      attendees: '4.2M',
      revenue: '$3.2B',
      liveEvents: 18,
      venues: 890,
      color: '#06B6D4',
      countries: ['USA', 'Canada', 'Mexico']
    },
    {
      region: 'Europe',
      events: 312,
      attendees: '2.8M',
      revenue: '$2.1B',
      liveEvents: 14,
      venues: 540,
      color: '#8B5CF6',
      countries: ['UK', 'Germany', 'France', 'Spain', 'Italy']
    },
    {
      region: 'Asia Pacific',
      events: 287,
      attendees: '1.8M',
      revenue: '$1.4B',
      liveEvents: 10,
      venues: 620,
      color: '#10B981',
      countries: ['Japan', 'China', 'Australia', 'Singapore', 'India']
    },
    {
      region: 'Latin America',
      events: 89,
      attendees: '420K',
      revenue: '$320M',
      liveEvents: 3,
      venues: 240,
      color: '#F59E0B',
      countries: ['Brazil', 'Argentina', 'Mexico', 'Chile']
    },
    {
      region: 'Middle East',
      events: 48,
      attendees: '180K',
      revenue: '$180M',
      liveEvents: 2,
      venues: 160,
      color: '#EC4899',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Israel']
    },
  ];

  const TOP_VENUES = [
    {
      name: 'Moscone Center',
      location: 'San Francisco, USA',
      events: 47,
      capacity: 25000,
      utilization: 87,
      revenue: '$890M',
      color: '#06B6D4'
    },
    {
      name: 'Madison Square Garden',
      location: 'New York, USA',
      events: 32,
      capacity: 20000,
      utilization: 94,
      revenue: '$720M',
      color: '#8B5CF6'
    },
    {
      name: 'O2 Arena',
      location: 'London, UK',
      events: 28,
      capacity: 20000,
      utilization: 91,
      revenue: '$640M',
      color: '#10B981'
    },
    {
      name: 'Tokyo Dome',
      location: 'Tokyo, Japan',
      events: 24,
      capacity: 45000,
      utilization: 88,
      revenue: '$580M',
      color: '#F59E0B'
    },
  ];

  const LIVE_EVENTS_GLOBAL = [
    { event: 'Tech Summit 2026', location: 'San Francisco, USA', status: 'live', attendees: 12400, icon: Radio, color: '#10B981' },
    { event: 'Global Music Festival', location: 'New York, USA', status: 'live', attendees: 28500, icon: Radio, color: '#10B981' },
    { event: 'AI Innovation Conference', location: 'London, UK', status: 'live', attendees: 8900, icon: Radio, color: '#10B981' },
    { event: 'Corporate Summit', location: 'Tokyo, Japan', status: 'upcoming', attendees: 0, icon: Calendar, color: '#06B6D4' },
    { event: 'Future Tech Expo', location: 'Berlin, Germany', status: 'upcoming', attendees: 0, icon: Calendar, color: '#06B6D4' },
  ];

  const VENUE_HEATMAP = [
    { venue: 'Moscone Center', utilization: 87, color: '#10B981' },
    { venue: 'Madison Square Garden', utilization: 94, color: '#10B981' },
    { venue: 'O2 Arena', utilization: 91, color: '#10B981' },
    { venue: 'Tokyo Dome', utilization: 88, color: '#10B981' },
    { venue: 'McCormick Place', utilization: 82, color: '#10B981' },
    { venue: 'ExCeL London', utilization: 76, color: '#F59E0B' },
    { venue: 'Singapore Expo', utilization: 71, color: '#F59E0B' },
    { venue: 'Sydney Convention Centre', utilization: 68, color: '#F59E0B' },
  ];

  const REGIONAL_PERFORMANCE = [
    { region: 'North America', revenue: '$3.2B', growth: '+24%', marketShare: '44%', color: '#06B6D4' },
    { region: 'Europe', revenue: '$2.1B', growth: '+18%', marketShare: '29%', color: '#8B5CF6' },
    { region: 'Asia Pacific', revenue: '$1.4B', growth: '+32%', marketShare: '19%', color: '#10B981' },
    { region: 'Latin America', revenue: '$320M', growth: '+28%', marketShare: '4%', color: '#F59E0B' },
    { region: 'Middle East', revenue: '$180M', growth: '+45%', marketShare: '2%', color: '#EC4899' },
  ];

  const MARKET_PENETRATION = [
    { market: 'Enterprise Events', penetration: '78%', potential: '+22%', color: '#10B981' },
    { market: 'Consumer Events', penetration: '65%', potential: '+35%', color: '#06B6D4' },
    { market: 'Hybrid Events', penetration: '42%', potential: '+58%', color: '#8B5CF6' },
    { market: 'Virtual Events', penetration: '34%', potential: '+66%', color: '#F59E0B' },
  ];

  const REGIONAL_GROWTH = [
    { region: 'North America', q1: '$720M', q2: '$780M', q3: '$840M', q4: '$860M', trend: 'up', color: '#06B6D4' },
    { region: 'Europe', q1: '$440M', q2: '$480M', q3: '$540M', q4: '$640M', trend: 'up', color: '#8B5CF6' },
    { region: 'Asia Pacific', q1: '$280M', q2: '$320M', q3: '$380M', q4: '$420M', trend: 'up', color: '#10B981' },
    { region: 'Latin America', q1: '$60M', q2: '$70M', q3: '$90M', q4: '$100M', trend: 'up', color: '#F59E0B' },
  ];

  const GEOGRAPHIC_DISTRIBUTION = [
    { country: 'USA', events: 287, revenue: '$1.8B', percentage: 25, color: '#06B6D4' },
    { country: 'UK', events: 124, revenue: '$640M', percentage: 9, color: '#8B5CF6' },
    { country: 'Japan', events: 89, revenue: '$420M', percentage: 6, color: '#10B981' },
    { country: 'Germany', events: 78, revenue: '$380M', percentage: 5, color: '#F59E0B' },
    { country: 'China', events: 67, revenue: '$340M', percentage: 5, color: '#EC4899' },
  ];

  const REGIONAL_COMPARISON = [
    { metric: 'Avg Event Revenue', northAmerica: '$6.1M', europe: '$6.7M', asiaPacific: '$4.9M', latinAmerica: '$3.6M', color: '#06B6D4' },
    { metric: 'Avg Attendance', northAmerica: '8,200', europe: '9,100', asiaPacific: '6,300', latinAmerica: '4,700', color: '#8B5CF6' },
    { metric: 'Venue Utilization', northAmerica: '87%', europe: '91%', asiaPacific: '82%', latinAmerica: '76%', color: '#10B981' },
    { metric: 'Sponsor ROI', northAmerica: '4.2x', europe: '4.8x', asiaPacific: '3.9x', latinAmerica: '3.4x', color: '#F59E0B' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#10B981';
      case 'upcoming': return '#06B6D4';
      case 'completed': return '#8B5CF6';
      case 'delayed': return '#F59E0B';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Globe size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Global Event Operations</Text>
          <Text style={styles.headerSubtitle}>Worldwide Event Intelligence</Text>
        </View>
      </View>

      {/* Global Stats */}
      <View style={styles.statsContainer}>
        {GLOBAL_STATS.map((stat, index) => (
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

      {/* Regional Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regional Overview</Text>
        {REGIONS.map((region, index) => (
          <View key={index} style={[styles.regionCard, { borderColor: region.color + '40' }]}>
            <View style={styles.regionHeader}>
              <View style={[styles.regionIcon, { backgroundColor: region.color + '20' }]}>
                <Globe size={24} color={region.color} />
              </View>
              <View style={styles.regionInfo}>
                <Text style={styles.regionName}>{region.region}</Text>
                <Text style={styles.regionCountries}>{region.countries.join(', ')}</Text>
              </View>
              <Text style={[styles.regionRevenue, { color: region.color }]}>{region.revenue}</Text>
            </View>
            <View style={styles.regionStats}>
              <View style={styles.regionStat}>
                <Calendar size={14} color="#9CA3AF" />
                <Text style={styles.regionStatLabel}>{region.events} events</Text>
              </View>
              <View style={styles.regionStat}>
                <Users size={14} color="#9CA3AF" />
                <Text style={styles.regionStatLabel}>{region.attendees}</Text>
              </View>
              <View style={styles.regionStat}>
                <Radio size={14} color="#9CA3AF" />
                <Text style={styles.regionStatLabel}>{region.liveEvents} live</Text>
              </View>
              <View style={styles.regionStat}>
                <MapPin size={14} color="#9CA3AF" />
                <Text style={styles.regionStatLabel}>{region.venues} venues</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Top Venues */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Venues Worldwide</Text>
        {TOP_VENUES.map((venue, index) => (
          <View key={index} style={[styles.venueCard, { borderColor: venue.color + '40' }]}>
            <View style={styles.venueHeader}>
              <View style={styles.venueHeaderLeft}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <Text style={styles.venueLocation}>{venue.location}</Text>
              </View>
              <Text style={[styles.venueRevenue, { color: venue.color }]}>{venue.revenue}</Text>
            </View>
            <View style={styles.venueStats}>
              <View style={styles.venueStat}>
                <Calendar size={14} color="#9CA3AF" />
                <View>
                  <Text style={styles.venueStatLabel}>Events</Text>
                  <Text style={styles.venueStatValue}>{venue.events}</Text>
                </View>
              </View>
              <View style={styles.venueStat}>
                <Users size={14} color="#9CA3AF" />
                <View>
                  <Text style={styles.venueStatLabel}>Capacity</Text>
                  <Text style={styles.venueStatValue}>{venue.capacity.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.venueStat}>
                <Activity size={14} color="#9CA3AF" />
                <View>
                  <Text style={styles.venueStatLabel}>Utilization</Text>
                  <Text style={styles.venueStatValue}>{venue.utilization}%</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Regional Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regional Performance</Text>
        <Text style={styles.sectionDescription}>Revenue, growth, and market share by region</Text>
        {REGIONAL_PERFORMANCE.map((perf, index) => (
          <View key={index} style={styles.regionalPerfCard}>
            <View style={styles.regionalPerfHeader}>
              <Text style={styles.regionalPerfRegion}>{perf.region}</Text>
              <View style={styles.regionalPerfRevenue}>
                <Text style={styles.regionalPerfRevenueLabel}>Revenue</Text>
                <Text style={[styles.regionalPerfRevenueValue, { color: perf.color }]}>{perf.revenue}</Text>
              </View>
            </View>
            <View style={styles.regionalPerfMetrics}>
              <View style={styles.regionalPerfMetric}>
                <Text style={styles.regionalPerfMetricLabel}>Growth</Text>
                <Text style={[styles.regionalPerfMetricValue, { color: '#10B981' }]}>{perf.growth}</Text>
              </View>
              <View style={styles.regionalPerfMetric}>
                <Text style={styles.regionalPerfMetricLabel}>Market Share</Text>
                <Text style={styles.regionalPerfMetricValue}>{perf.marketShare}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Market Penetration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Market Penetration</Text>
        <Text style={styles.sectionDescription}>Current penetration and growth potential by market segment</Text>
        {MARKET_PENETRATION.map((market, index) => (
          <View key={index} style={styles.marketCard}>
            <View style={styles.marketHeader}>
              <Text style={styles.marketName}>{market.market}</Text>
              <View style={styles.marketPenetration}>
                <Text style={styles.marketPenetrationLabel}>Penetration</Text>
                <Text style={[styles.marketPenetrationValue, { color: market.color }]}>{market.penetration}</Text>
              </View>
            </View>
            <View style={styles.marketBar}>
              <View style={[styles.marketBarFill, { width: market.penetration, backgroundColor: market.color }]} />
            </View>
            <View style={styles.marketPotential}>
              <Text style={styles.marketPotentialLabel}>Growth Potential</Text>
              <Text style={[styles.marketPotentialValue, { color: '#10B981' }]}>{market.potential}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Regional Growth */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regional Growth Trends</Text>
        <Text style={styles.sectionDescription}>Quarterly revenue growth by region</Text>
        {REGIONAL_GROWTH.map((growth, index) => (
          <View key={index} style={styles.growthCard}>
            <View style={styles.growthHeader}>
              <Text style={styles.growthRegion}>{growth.region}</Text>
              <View style={[styles.growthTrend, { backgroundColor: '#10B98120' }]}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.growthTrendText, { color: '#10B981' }]}>{growth.trend}</Text>
              </View>
            </View>
            <View style={styles.growthQuarters}>
              <View style={styles.growthQuarter}>
                <Text style={styles.growthQuarterLabel}>Q1</Text>
                <Text style={styles.growthQuarterValue}>{growth.q1}</Text>
              </View>
              <View style={styles.growthQuarter}>
                <Text style={styles.growthQuarterLabel}>Q2</Text>
                <Text style={styles.growthQuarterValue}>{growth.q2}</Text>
              </View>
              <View style={styles.growthQuarter}>
                <Text style={styles.growthQuarterLabel}>Q3</Text>
                <Text style={styles.growthQuarterValue}>{growth.q3}</Text>
              </View>
              <View style={styles.growthQuarter}>
                <Text style={styles.growthQuarterLabel}>Q4</Text>
                <Text style={[styles.growthQuarterValue, { color: growth.color }]}>{growth.q4}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Geographic Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geographic Distribution</Text>
        <Text style={styles.sectionDescription}>Top countries by events and revenue</Text>
        {GEOGRAPHIC_DISTRIBUTION.map((geo, index) => (
          <View key={index} style={styles.geoDistCard}>
            <View style={styles.geoDistHeader}>
              <Text style={styles.geoDistCountry}>{geo.country}</Text>
              <View style={styles.geoDistPercentage}>
                <Text style={[styles.geoDistPercentageValue, { color: geo.color }]}>{geo.percentage}%</Text>
              </View>
            </View>
            <View style={styles.geoDistBar}>
              <View style={[styles.geoDistBarFill, { width: `${geo.percentage}%`, backgroundColor: geo.color }]} />
            </View>
            <View style={styles.geoDistMetrics}>
              <View style={styles.geoDistMetric}>
                <Text style={styles.geoDistMetricLabel}>Events</Text>
                <Text style={styles.geoDistMetricValue}>{geo.events}</Text>
              </View>
              <View style={styles.geoDistMetric}>
                <Text style={styles.geoDistMetricLabel}>Revenue</Text>
                <Text style={styles.geoDistMetricValue}>{geo.revenue}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Regional Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regional Comparison</Text>
        <Text style={styles.sectionDescription}>Cross-region performance metrics comparison</Text>
        {REGIONAL_COMPARISON.map((comp, index) => (
          <View key={index} style={styles.compCard}>
            <Text style={styles.compMetric}>{comp.metric}</Text>
            <View style={styles.compRegions}>
              <View style={styles.compRegion}>
                <Text style={styles.compRegionLabel}>NA</Text>
                <Text style={styles.compRegionValue}>{comp.northAmerica}</Text>
              </View>
              <View style={styles.compRegion}>
                <Text style={styles.compRegionLabel}>EU</Text>
                <Text style={styles.compRegionValue}>{comp.europe}</Text>
              </View>
              <View style={styles.compRegion}>
                <Text style={styles.compRegionLabel}>APAC</Text>
                <Text style={styles.compRegionValue}>{comp.asiaPacific}</Text>
              </View>
              <View style={styles.compRegion}>
                <Text style={styles.compRegionLabel}>LATAM</Text>
                <Text style={styles.compRegionValue}>{comp.latinAmerica}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Venue Heatmap */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Venue Utilization Heatmap</Text>
        <View style={styles.heatmapGrid}>
          {VENUE_HEATMAP.map((venue, index) => (
            <View key={index} style={[styles.heatmapCard, { backgroundColor: venue.color + '20', borderColor: venue.color + '40' }]}>
              <Text style={styles.heatmapVenue}>{venue.venue}</Text>
              <View style={styles.heatmapBar}>
                <View 
                  style={[
                    styles.heatmapFill, 
                    { 
                      width: `${venue.utilization}%`,
                      backgroundColor: venue.color
                    } 
                  ]} 
                />
              </View>
              <Text style={styles.heatmapUtilization}>{venue.utilization}% utilized</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Live Events Global */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Events Worldwide</Text>
        <View style={styles.liveEventsList}>
          {LIVE_EVENTS_GLOBAL.map((event, index) => (
            <View key={index} style={styles.liveEventItem}>
              <View style={[styles.liveEventIcon, { backgroundColor: getStatusColor(event.status) + '20' }]}>
                <event.icon size={18} color={getStatusColor(event.status)} />
              </View>
              <View style={styles.liveEventContent}>
                <Text style={styles.liveEventName}>{event.event}</Text>
                <Text style={styles.liveEventLocation}>{event.location}</Text>
              </View>
              <View style={styles.liveEventRight}>
                <View style={[styles.liveEventStatus, { backgroundColor: getStatusColor(event.status) + '20' }]}>
                  <Text style={[styles.liveEventStatusText, { color: getStatusColor(event.status) }]}>{event.status}</Text>
                </View>
                {event.attendees > 0 && (
                  <View style={styles.liveEventAttendees}>
                    <Users size={12} color="#9CA3AF" />
                    <Text style={styles.liveEventAttendeesText}>{event.attendees.toLocaleString()}</Text>
                  </View>
                )}
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
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Globe size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>View Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <MapPin size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Venues</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Zap size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Live Ops</Text>
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
  regionCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  regionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  regionCountries: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  regionRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  regionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  regionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  regionStatLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  venueCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  venueHeaderLeft: {
    flex: 1,
  },
  venueName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  venueLocation: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  venueRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  venueStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  venueStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  venueStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  venueStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  heatmapCard: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  heatmapVenue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heatmapBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  heatmapFill: {
    height: '100%',
    borderRadius: 4,
  },
  heatmapUtilization: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  liveEventsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  liveEventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  liveEventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveEventContent: {
    flex: 1,
  },
  liveEventName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  liveEventLocation: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  liveEventRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  liveEventStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  liveEventStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  liveEventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveEventAttendeesText: {
    fontSize: 12,
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
  regionalPerfCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  regionalPerfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  regionalPerfRegion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  regionalPerfRevenue: {
    alignItems: 'flex-end',
  },
  regionalPerfRevenueLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  regionalPerfRevenueValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  regionalPerfMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  regionalPerfMetric: {
    alignItems: 'center',
  },
  regionalPerfMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  regionalPerfMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  marketCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  marketName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  marketPenetration: {
    alignItems: 'flex-end',
  },
  marketPenetrationLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  marketPenetrationValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  marketBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  marketPotential: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marketPotentialLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  marketPotentialValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  growthCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  growthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  growthRegion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  growthTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  growthTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  growthQuarters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  growthQuarter: {
    alignItems: 'center',
  },
  growthQuarterLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  growthQuarterValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  geoDistCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  geoDistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  geoDistCountry: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  geoDistPercentage: {
    alignItems: 'flex-end',
  },
  geoDistPercentageValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  geoDistBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  geoDistBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  geoDistMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  geoDistMetric: {
    alignItems: 'center',
  },
  geoDistMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  geoDistMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  compCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  compMetric: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  compRegions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  compRegion: {
    alignItems: 'center',
  },
  compRegionLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  compRegionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
