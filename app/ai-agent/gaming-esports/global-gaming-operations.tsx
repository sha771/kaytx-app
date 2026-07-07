/**
 * =============================================================================
 * GLOBAL GAMING OPERATIONS
 * =============================================================================
 *
 * A comprehensive global operations dashboard that tracks regional activity,
 * server distribution, revenue by region, tournament locations, and community growth.
 *
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  Globe,
  Server,
  DollarSign,
  Trophy,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Activity,
  BarChart3,
  MapPin,
  Zap,
  Flame,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricPurple: '#8B5CF6',
  neonGreen: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Global Operations Data
const GLOBAL_DATA = {
  regionalActivity: {
    northAmerica: { players: 42000000, growth: 12, revenue: 1800000000 },
    europe: { players: 38000000, growth: 8, revenue: 1560000000 },
    asiaPacific: { players: 52000000, growth: 18, revenue: 2100000000 },
    latinAmerica: { players: 18000000, growth: 15, revenue: 540000000 },
    middleEast: { players: 8000000, growth: 22, revenue: 240000000 },
  },
  serverDistribution: {
    totalServers: 247,
    regionsOnline: 5,
    avgUptime: 99.7,
    capacity: 85,
  },
  revenueByRegion: {
    northAmerica: '$1.8B',
    europe: '$1.56B',
    asiaPacific: '$2.1B',
    latinAmerica: '$540M',
    middleEast: '$240M',
    total: '$6.24B',
  },
  tournamentLocations: {
    active: 45,
    regions: 12,
    cities: 28,
    prizePool: 45000000,
  },
  communityGrowth: {
    totalMembers: 8470000,
    newMembers: 124000,
    growthRate: 1.47,
    activeRegions: 5,
  },
};

// Regional Data Cards
const REGIONAL_DATA = [
  { id: 1, name: 'North America', players: '42M', growth: '+12%', revenue: '$1.8B', servers: 87, color: THEME.neonCyan },
  { id: 2, name: 'Europe', players: '38M', growth: '+8%', revenue: '$1.56B', servers: 72, color: THEME.electricPurple },
  { id: 3, name: 'Asia Pacific', players: '52M', growth: '+18%', revenue: '$2.1B', servers: 98, color: THEME.neonGreen },
  { id: 4, name: 'Latin America', players: '18M', growth: '+15%', revenue: '$540M', servers: 45, color: THEME.amber },
  { id: 5, name: 'Middle East', players: '8M', growth: '+22%', revenue: '$240M', servers: 25, color: THEME.magenta },
];

// Tournament Locations
const TOURNAMENT_LOCATIONS = [
  { id: 1, city: 'Los Angeles', country: 'USA', tournaments: 8, prizePool: '$15M', status: 'active' },
  { id: 2, city: 'Seoul', country: 'South Korea', tournaments: 12, prizePool: '$12M', status: 'active' },
  { id: 3, city: 'Berlin', country: 'Germany', tournaments: 6, prizePool: '$8M', status: 'active' },
  { id: 4, city: 'Tokyo', country: 'Japan', tournaments: 10, prizePool: '$10M', status: 'scheduled' },
  { id: 5, city: 'São Paulo', country: 'Brazil', tournaments: 4, prizePool: '$5M', status: 'scheduled' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'regional',
    title: 'Regional Growth',
    message: 'Asia Pacific showing 18% growth - highest among all regions. Consider infrastructure investment.',
    impact: 'High',
    action: 'Evaluate APAC server expansion',
  },
  {
    type: 'server',
    title: 'Server Capacity',
    message: 'North America servers at 92% capacity during peak hours. Recommend scaling.',
    impact: 'Medium',
    action: 'Scale NA infrastructure for peak hours',
  },
  {
    type: 'tournament',
    title: 'Tournament Expansion',
    message: 'Middle East showing 22% community growth. Prime for tournament expansion.',
    impact: 'Positive',
    action: 'Plan MEA tournament series',
  },
];

export default function GlobalGamingOperations() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTrendIndicator = (growth: string) => {
    const value = parseInt(growth.replace('+', '').replace('%', ''));
    return (
      <View style={styles.trendUp}>
        <ArrowUpRight size={12} color={THEME.neonGreen} />
        <Text style={[styles.trendText, { color: THEME.neonGreen }]}>{growth}</Text>
      </View>
    );
  };

  const renderRegionCard = (region: typeof REGIONAL_DATA[0]) => (
    <BlurView key={region.id} intensity={20} tint="dark" style={styles.regionCard}>
      <View style={styles.regionHeader}>
        <View style={[styles.regionIndicator, { backgroundColor: region.color }]} />
        <Text style={styles.regionName}>{region.name}</Text>
        {renderTrendIndicator(region.growth)}
      </View>
      <View style={styles.regionMetrics}>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Players</Text>
          <Text style={[styles.regionMetricValue, { color: region.color }]}>{region.players}</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Revenue</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.neonGreen }]}>{region.revenue}</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Servers</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.amber }]}>{region.servers}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderLocationCard = (location: typeof TOURNAMENT_LOCATIONS[0]) => {
    const statusColors = {
      active: THEME.neonGreen,
      scheduled: THEME.amber,
      ended: THEME.textMuted,
    };
    const statusColor = statusColors[location.status as keyof typeof statusColors];

    return (
      <BlurView key={location.id} intensity={20} tint="dark" style={styles.locationCard}>
        <View style={styles.locationHeader}>
          <View style={styles.locationCity}>
            <MapPin size={14} color={THEME.textMuted} />
            <Text style={styles.locationCityName}>{location.city}</Text>
          </View>
          <Text style={styles.locationCountry}>{location.country}</Text>
          <View style={[styles.locationStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.locationStatusText, { color: statusColor }]}>{location.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.locationDetails}>
          <View style={styles.locationDetail}>
            <Text style={styles.locationDetailLabel}>Tournaments</Text>
            <Text style={[styles.locationDetailValue, { color: THEME.neonCyan }]}>{location.tournaments}</Text>
          </View>
          <View style={styles.locationDetail}>
            <Text style={styles.locationDetailLabel}>Prize Pool</Text>
            <Text style={[styles.locationDetailValue, { color: THEME.neonGreen }]}>{location.prizePool}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      regional: THEME.neonCyan,
      server: THEME.amber,
      tournament: THEME.neonGreen,
    };
    const typeIcons = {
      regional: Globe,
      server: Server,
      tournament: Trophy,
    };
    const Icon = typeIcons[insight.type as keyof typeof typeIcons];
    const color = typeColors[insight.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={[styles.insightImpact, { backgroundColor: color + '30' }]}>
                <Text style={[styles.insightImpactText, { color }]}>{insight.impact}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightAction}>
            <Text style={styles.insightActionLabel}>Suggested Action:</Text>
            <Text style={styles.insightActionText}>{insight.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Globe size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Global Gaming Operations</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Regional Activity */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Regional Activity</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.activityCard}>
            <View style={styles.activityGrid}>
              <View style={styles.activityMetric}>
                <Text style={styles.activityLabel}>Total Players</Text>
                <Text style={[styles.activityValue, { color: THEME.neonCyan }]}>{((GLOBAL_DATA.regionalActivity.northAmerica.players + GLOBAL_DATA.regionalActivity.europe.players + GLOBAL_DATA.regionalActivity.asiaPacific.players + GLOBAL_DATA.regionalActivity.latinAmerica.players + GLOBAL_DATA.regionalActivity.middleEast.players) / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.activityMetric}>
                <Text style={styles.activityLabel}>Avg Growth</Text>
                <Text style={[styles.activityValue, { color: THEME.neonGreen }]}>+15%</Text>
              </View>
              <View style={styles.activityMetric}>
                <Text style={styles.activityLabel}>Total Revenue</Text>
                <Text style={[styles.activityValue, { color: THEME.amber }]}>${(GLOBAL_DATA.revenueByRegion.total.replace('$', '').replace('B', ''))}B</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.regionsContainer}>
            {REGIONAL_DATA.map((region) => renderRegionCard(region))}
          </View>
        </Animated.View>

        {/* Server Distribution */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Server size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Server Distribution</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.serverCard}>
            <View style={styles.serverGrid}>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Total Servers</Text>
                <Text style={[styles.serverValue, { color: THEME.neonCyan }]}>{GLOBAL_DATA.serverDistribution.totalServers}</Text>
              </View>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Regions Online</Text>
                <Text style={[styles.serverValue, { color: THEME.neonGreen }]}>{GLOBAL_DATA.serverDistribution.regionsOnline}/5</Text>
              </View>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Avg Uptime</Text>
                <Text style={[styles.serverValue, { color: THEME.electricPurple }]}>{GLOBAL_DATA.serverDistribution.avgUptime}%</Text>
              </View>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Capacity</Text>
                <Text style={[styles.serverValue, { color: THEME.amber }]}>{GLOBAL_DATA.serverDistribution.capacity}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Revenue by Region */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Revenue by Region</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.revenueCard}>
            <View style={styles.revenueGrid}>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>North America</Text>
                <Text style={[styles.revenueValue, { color: THEME.neonCyan }]}>{GLOBAL_DATA.revenueByRegion.northAmerica}</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Europe</Text>
                <Text style={[styles.revenueValue, { color: THEME.electricPurple }]}>{GLOBAL_DATA.revenueByRegion.europe}</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Asia Pacific</Text>
                <Text style={[styles.revenueValue, { color: THEME.neonGreen }]}>{GLOBAL_DATA.revenueByRegion.asiaPacific}</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Latin America</Text>
                <Text style={[styles.revenueValue, { color: THEME.amber }]}>{GLOBAL_DATA.revenueByRegion.latinAmerica}</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Middle East</Text>
                <Text style={[styles.revenueValue, { color: THEME.magenta }]}>{GLOBAL_DATA.revenueByRegion.middleEast}</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Total</Text>
                <Text style={[styles.revenueValue, { color: THEME.neonCyan, fontWeight: '700' }]}>{GLOBAL_DATA.revenueByRegion.total}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Tournament Locations */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Tournament Locations</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.tournamentCard}>
            <View style={styles.tournamentGrid}>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Active</Text>
                <Text style={[styles.tournamentValue, { color: THEME.neonGreen }]}>{GLOBAL_DATA.tournamentLocations.active}</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Regions</Text>
                <Text style={[styles.tournamentValue, { color: THEME.electricPurple }]}>{GLOBAL_DATA.tournamentLocations.regions}</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Cities</Text>
                <Text style={[styles.tournamentValue, { color: THEME.amber }]}>{GLOBAL_DATA.tournamentLocations.cities}</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Prize Pool</Text>
                <Text style={[styles.tournamentValue, { color: THEME.neonCyan }]}>${(GLOBAL_DATA.tournamentLocations.prizePool / 1000000).toFixed(0)}M</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.locationsContainer}>
            {TOURNAMENT_LOCATIONS.map((location) => renderLocationCard(location))}
          </View>
        </Animated.View>

        {/* Community Growth */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Community Growth</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.communityCard}>
            <View style={styles.communityGrid}>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Total Members</Text>
                <Text style={[styles.communityValue, { color: THEME.neonCyan }]}>{(GLOBAL_DATA.communityGrowth.totalMembers / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>New Members</Text>
                <Text style={[styles.communityValue, { color: THEME.neonGreen }]}>+{(GLOBAL_DATA.communityGrowth.newMembers / 1000).toFixed(0)}K</Text>
              </View>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Growth Rate</Text>
                <Text style={[styles.communityValue, { color: THEME.amber }]}>{GLOBAL_DATA.communityGrowth.growthRate}%</Text>
              </View>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Active Regions</Text>
                <Text style={[styles.communityValue, { color: THEME.electricPurple }]}>{GLOBAL_DATA.communityGrowth.activeRegions}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  activityCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  activityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityMetric: {
    alignItems: 'center',
  },
  activityLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  activityValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  regionsContainer: {
    gap: 12,
  },
  regionCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  regionIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  regionName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regionMetric: {
    flex: 1,
  },
  regionMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  regionMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  serverCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  serverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serverMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  serverLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  serverValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  revenueCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  revenueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  revenueMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  revenueLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  revenueValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  tournamentCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  tournamentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  tournamentMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  tournamentLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  tournamentValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  locationsContainer: {
    gap: 12,
  },
  locationCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationCity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationCityName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  locationCountry: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  locationStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  locationStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  locationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationDetail: {
    flex: 1,
  },
  locationDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  locationDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  communityCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  communityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  communityMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  communityLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  communityValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  insightCardBlur: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  insightAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  insightActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  insightActionText: {
    fontSize: 13,
    color: THEME.text,
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
