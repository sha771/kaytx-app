/**
 * =============================================================================
 * GLOBAL EDUCATION OPERATIONS
 * =============================================================================
 *
 * A comprehensive global operations dashboard that displays campus performance,
  * geographic distribution, regional metrics, international partnerships, and
  * worldwide education analytics with heatmap visualizations.
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
  TrendingUp,
  Activity,
  Zap,
  Clock,
  Target,
  Award,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Building2,
  Users,
  DollarSign,
  Flame,
  Shield,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Global Operations Data
const GLOBAL_DATA = {
  totalCampuses: 247,
  countries: 89,
  students: '1.8M',
  faculty: '42K',
  revenue: '$4.2B',
  trend: [240, 241, 242, 243, 244, 245, 246, 247],
};

// Regional Performance
const REGIONAL_PERFORMANCE = [
  { region: 'North America', campuses: 87, students: '647K', revenue: '$1.8B', growth: 12 },
  { region: 'Europe', campuses: 62, students: '423K', revenue: '$1.2B', growth: 8 },
  { region: 'Asia Pacific', campuses: 58, students: '521K', revenue: '$0.9B', growth: 18 },
  { region: 'Latin America', campuses: 28, students: '156K', revenue: '$0.2B', growth: 15 },
  { region: 'Middle East', campuses: 12, students: '53K', revenue: '$0.1B', growth: 22 },
];

// Top Campuses
const TOP_CAMPUSES = [
  { name: 'San Francisco HQ', students: '45.2K', satisfaction: 94, revenue: '$245M' },
  { name: 'London Campus', students: '38.7K', satisfaction: 92, revenue: '$198M' },
  { name: 'Singapore Hub', students: '52.1K', satisfaction: 95, revenue: '$287M' },
  { name: 'Berlin Center', students: '28.9K', satisfaction: 89, revenue: '$156M' },
  { name: 'Tokyo Campus', students: '34.2K', satisfaction: 91, revenue: '$178M' },
];

// International Partnerships
const INTERNATIONAL_PARTNERSHIPS = [
  { institution: 'MIT', country: 'USA', programs: 12, students: '8.4K' },
  { institution: 'Oxford', country: 'UK', programs: 8, students: '5.2K' },
  { institution: 'Tsinghua', country: 'China', programs: 15, students: '12.7K' },
  { institution: 'ETH Zurich', country: 'Switzerland', programs: 6, students: '3.8K' },
];

// Heatmap Data (simulated)
const HEATMAP_DATA = [
  { region: 'North America', intensity: 0.9 },
  { region: 'Europe', intensity: 0.8 },
  { region: 'Asia Pacific', intensity: 0.85 },
  { region: 'Latin America', intensity: 0.6 },
  { region: 'Middle East', intensity: 0.5 },
  { region: 'Africa', intensity: 0.4 },
];

export default function GlobalEducationOperations() {
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

  const renderTrendIndicator = (change: number, trend: string) => {
    if (trend === 'up') {
      return (
        <View style={styles.trendUp}>
          <ArrowUpRight size={12} color={THEME.emeraldGreen} />
          <Text style={[styles.trendText, { color: THEME.emeraldGreen }]}>{change}%</Text>
        </View>
      );
    } else if (trend === 'down') {
      return (
        <View style={styles.trendDown}>
          <ArrowDownRight size={12} color={THEME.red} />
          <Text style={[styles.trendText, { color: THEME.red }]}>{change}%</Text>
        </View>
      );
    }
    return null;
  };

  const renderSparkline = (data: number[], color: string) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    const chartWidth = 100;
    const chartHeight = 40;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((val - minVal) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
          fill={`url(#gradient-${color})`}
        />
        <Path
          d={`M ${points}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    );
  };

  const renderMetricCard = (title: string, value: string, color: string, subtitle?: string) => (
    <BlurView intensity={20} tint="dark" style={styles.metricCard}>
      <Text style={styles.metricLabel}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </BlurView>
  );

  const renderRegionCard = (region: typeof REGIONAL_PERFORMANCE[0]) => (
    <BlurView key={region.region} intensity={20} tint="dark" style={styles.regionCard}>
      <View style={styles.regionHeader}>
        <Text style={styles.regionName}>{region.region}</Text>
        <MapPin size={16} color={THEME.neonCyan} />
      </View>
      <View style={styles.regionMetrics}>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Campuses</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.neonCyan }]}>{region.campuses}</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Students</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.electricBlue }]}>{region.students}</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Revenue</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.emeraldGreen }]}>{region.revenue}</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Growth</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.amber }]}>{region.growth}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderCampusCard = (campus: typeof TOP_CAMPUSES[0]) => (
    <BlurView key={campus.name} intensity={20} tint="dark" style={styles.campusCard}>
      <View style={styles.campusHeader}>
        <Text style={styles.campusName}>{campus.name}</Text>
        <Building2 size={16} color={THEME.neonCyan} />
      </View>
      <View style={styles.campusMetrics}>
        <View style={styles.campusMetric}>
          <Text style={styles.campusMetricLabel}>Students</Text>
          <Text style={[styles.campusMetricValue, { color: THEME.neonCyan }]}>{campus.students}</Text>
        </View>
        <View style={styles.campusMetric}>
          <Text style={styles.campusMetricLabel}>Satisfaction</Text>
          <Text style={[styles.campusMetricValue, { color: THEME.emeraldGreen }]}>{campus.satisfaction}%</Text>
        </View>
        <View style={styles.campusMetric}>
          <Text style={styles.campusMetricLabel}>Revenue</Text>
          <Text style={[styles.campusMetricValue, { color: THEME.purple }]}>{campus.revenue}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderPartnershipCard = (partner: typeof INTERNATIONAL_PARTNERSHIPS[0]) => (
    <BlurView key={partner.institution} intensity={20} tint="dark" style={styles.partnershipCard}>
      <View style={styles.partnershipHeader}>
        <Text style={styles.partnershipInstitution}>{partner.institution}</Text>
        <Globe size={16} color={THEME.neonCyan} />
      </View>
      <Text style={styles.partnershipCountry}>{partner.country}</Text>
      <View style={styles.partnershipMetrics}>
        <View style={styles.partnershipMetric}>
          <Text style={styles.partnershipMetricLabel}>Programs</Text>
          <Text style={[styles.partnershipMetricValue, { color: THEME.electricBlue }]}>{partner.programs}</Text>
        </View>
        <View style={styles.partnershipMetric}>
          <Text style={styles.partnershipMetricLabel}>Students</Text>
          <Text style={[styles.partnershipMetricValue, { color: THEME.emeraldGreen }]}>{partner.students}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderHeatmapItem = (item: typeof HEATMAP_DATA[0]) => {
    const intensityColor = item.intensity > 0.8 ? THEME.emeraldGreen : item.intensity > 0.6 ? THEME.amber : item.intensity > 0.4 ? THEME.neonCyan : THEME.cardLight;
    return (
      <BlurView key={item.region} intensity={20} tint="dark" style={styles.heatmapCard}>
        <Text style={styles.heatmapRegion}>{item.region}</Text>
        <View style={[styles.heatmapIntensity, { backgroundColor: intensityColor, opacity: item.intensity }]} />
        <Text style={styles.heatmapValue}>{Math.round(item.intensity * 100)}%</Text>
      </BlurView>
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
            <Text style={styles.headerText}>Global Education Operations</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Global Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Global Metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Total Campuses', GLOBAL_DATA.totalCampuses.toString(), THEME.neonCyan, 'Worldwide')}
              {renderMetricCard('Countries', GLOBAL_DATA.countries.toString(), THEME.electricBlue, 'Operating in')}
              {renderMetricCard('Total Students', GLOBAL_DATA.students, THEME.emeraldGreen, 'Enrolled')}
              {renderMetricCard('Faculty', GLOBAL_DATA.faculty, THEME.purple, 'Total staff')}
              {renderMetricCard('Revenue', GLOBAL_DATA.revenue, THEME.amber, 'Annual')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Regional Performance */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Regional Performance</Text>
          </View>
          <View style={styles.regionsContainer}>
            {REGIONAL_PERFORMANCE.map((region) => renderRegionCard(region))}
          </View>
        </Animated.View>

        {/* Global Heatmap */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Flame size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Global Activity Heatmap</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.heatmapContainer}>
            <View style={styles.heatmapGrid}>
              {HEATMAP_DATA.map((item) => renderHeatmapItem(item))}
            </View>
          </BlurView>
        </Animated.View>

        {/* Top Campuses */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Building2 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Top Performing Campuses</Text>
          </View>
          <View style={styles.campusesContainer}>
            {TOP_CAMPUSES.map((campus) => renderCampusCard(campus))}
          </View>
        </Animated.View>

        {/* International Partnerships */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>International Partnerships</Text>
          </View>
          <View style={styles.partnershipsContainer}>
            {INTERNATIONAL_PARTNERSHIPS.map((partner) => renderPartnershipCard(partner))}
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
  metricsScroll: {
    marginBottom: 0,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  metricCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regionMetric: {
    alignItems: 'center',
  },
  regionMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  regionMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapContainer: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  heatmapCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    alignItems: 'center',
  },
  heatmapRegion: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  heatmapIntensity: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  heatmapValue: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  campusesContainer: {
    gap: 12,
  },
  campusCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  campusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  campusName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  campusMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campusMetric: {
    alignItems: 'center',
  },
  campusMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  campusMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  partnershipsContainer: {
    gap: 12,
  },
  partnershipCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  partnershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  partnershipInstitution: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  partnershipCountry: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 12,
  },
  partnershipMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  partnershipMetric: {
    alignItems: 'center',
  },
  partnershipMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  partnershipMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
