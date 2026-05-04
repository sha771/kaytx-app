import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Users, Zap, TrendingUp, TrendingDown, Clock, 
  Globe, Monitor, Smartphone, Tablet, ArrowUpRight, RefreshCw
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LineChart, BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const REAL_TIME_STATS = [
  { label: 'Active Users', value: '2,847', change: '+12%', icon: Users, color: '#3B82F6' },
  { label: 'Page Views', value: '12.5K', change: '+8%', icon: Monitor, color: '#10B981' },
  { label: 'Events/sec', value: '458', change: '+23%', icon: Zap, color: '#F59E0B' },
  { label: 'Avg Session', value: '4m 32s', change: '-5%', icon: Clock, color: '#8B5CF6' },
];

const DEVICE_BREAKDOWN = [
  { device: 'Desktop', percentage: 58, color: '#3B82F6', icon: Monitor },
  { device: 'Mobile', percentage: 35, color: '#10B981', icon: Smartphone },
  { device: 'Tablet', percentage: 7, color: '#F59E0B', icon: Tablet },
];

const GEO_DATA = [
  { country: 'United States', users: 1245, percentage: 44 },
  { country: 'United Kingdom', users: 523, percentage: 18 },
  { country: 'Germany', users: 412, percentage: 14 },
  { country: 'France', users: 298, percentage: 10 },
  { country: 'Canada', users: 187, percentage: 7 },
  { country: 'Others', users: 182, percentage: 7 },
];

const LIVE_EVENTS = [
  { id: '1', event: 'User signed up', user: 'john@example.com', time: '2s ago', type: 'signup' },
  { id: '2', event: 'Purchase completed', user: 'sarah@shop.com', time: '5s ago', type: 'purchase', value: '$149' },
  { id: '3', event: 'Feature used', user: 'mike@corp.io', time: '8s ago', type: 'feature' },
  { id: '4', event: 'Page viewed', user: 'emma@tech.co', time: '12s ago', type: 'pageview' },
  { id: '5', event: 'Document shared', user: 'david@biz.com', time: '15s ago', type: 'share' },
];

export default function RealTimeAnalyticsScreen() {
  const { theme } = useTheme();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState('users');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      data: [1200, 1900, 3000, 5000, 4200, 2847],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    }],
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={[styles.liveIndicator, { backgroundColor: '#10B981' }]}>
              <Activity size={16} color="#fff" />
            </View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Real-Time Analytics
            </Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn}>
            <RefreshCw size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.updateText, { color: theme.colors.textSecondary }]}>
          Last updated: {lastUpdate.toLocaleTimeString()}
        </Text>
      </View>

      {/* Live Stats Grid */}
      <View style={styles.statsGrid}>
        {REAL_TIME_STATS.map((stat, i) => (
          <Animated.View
            key={stat.label}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.statCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <View style={[styles.changeBadge, { 
                backgroundColor: stat.change.startsWith('+') ? '#10B98115' : '#EF444415' 
              }]}>
                <Text style={[styles.changeText, { 
                  color: stat.change.startsWith('+') ? '#10B981' : '#EF4444' 
                }]}>
                  {stat.change}
                </Text>
              </View>
            </View>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Traffic Chart */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Live Traffic
          </Text>
          <View style={styles.metricTabs}>
            {['users', 'views', 'events'].map((metric) => (
              <TouchableOpacity
                key={metric}
                onPress={() => setSelectedMetric(metric)}
                style={[
                  styles.metricTab,
                  selectedMetric === metric && { backgroundColor: '#3B82F6' }
                ]}
              >
                <Text style={[
                  styles.metricText,
                  { color: selectedMetric === metric ? '#fff' : theme.colors.textSecondary }
                ]}>
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={width - 64}
            height={180}
            chartConfig={{
              backgroundColor: theme.colors.card,
              backgroundGradientFrom: theme.colors.card,
              backgroundGradientTo: theme.colors.card,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => theme.colors.textSecondary,
              style: { borderRadius: 16 },
              propsForDots: { r: '4', strokeWidth: '2', stroke: '#3B82F6' },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      {/* Device Breakdown */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Device Breakdown
        </Text>
        <View style={styles.deviceGrid}>
          {DEVICE_BREAKDOWN.map((device, i) => (
            <View key={device.device} style={styles.deviceCard}>
              <View style={[styles.deviceIcon, { backgroundColor: device.color + '15' }]}>
                <device.icon size={24} color={device.color} />
              </View>
              <Text style={[styles.devicePercent, { color: theme.colors.text }]}>
                {device.percentage}%
              </Text>
              <Text style={[styles.deviceName, { color: theme.colors.textSecondary }]}>
                {device.device}
              </Text>
              <View style={styles.deviceBar}>
                <View 
                  style={[
                    styles.deviceFill, 
                    { width: `${device.percentage}%`, backgroundColor: device.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Geographic Distribution */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Top Countries
          </Text>
          <View style={styles.globeBadge}>
            <Globe size={16} color="#3B82F6" />
            <Text style={[styles.globeText, { color: theme.colors.textSecondary }]}>
              Global
            </Text>
          </View>
        </View>
        {GEO_DATA.map((country, i) => (
          <View key={country.country} style={styles.geoRow}>
            <View style={styles.geoInfo}>
              <Text style={[styles.geoRank, { color: theme.colors.textSecondary }]}>
                #{i + 1}
              </Text>
              <Text style={[styles.geoCountry, { color: theme.colors.text }]}>
                {country.country}
              </Text>
            </View>
            <View style={styles.geoStats}>
              <Text style={[styles.geoUsers, { color: theme.colors.text }]}>
                {country.users.toLocaleString()}
              </Text>
              <View style={styles.geoBarContainer}>
                <View 
                  style={[
                    styles.geoBar, 
                    { width: `${country.percentage}%` }
                  ]} 
                />
              </View>
              <Text style={[styles.geoPercent, { color: theme.colors.textSecondary }]}>
                {country.percentage}%
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Live Events Feed */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Live Events
          </Text>
          <View style={styles.liveBadge}>
            <View style={styles.pulseDot} />
            <Text style={[styles.liveText, { color: '#10B981' }]}>LIVE</Text>
          </View>
        </View>
        {LIVE_EVENTS.map((event, i) => (
          <Animated.View 
            key={event.id} 
            entering={FadeInUp.delay(i * 30)}
            style={[styles.eventRow, { backgroundColor: theme.colors.background }]}
          >
            <View style={styles.eventIcon}>
              {event.type === 'signup' && <Users size={16} color="#3B82F6" />}
              {event.type === 'purchase' && <TrendingUp size={16} color="#10B981" />}
              {event.type === 'feature' && <Zap size={16} color="#F59E0B" />}
              {event.type === 'pageview' && <Monitor size={16} color="#8B5CF6" />}
              {event.type === 'share' && <ArrowUpRight size={16} color="#EC4899" />}
            </View>
            <View style={styles.eventInfo}>
              <Text style={[styles.eventName, { color: theme.colors.text }]}>
                {event.event}
              </Text>
              <Text style={[styles.eventUser, { color: theme.colors.textSecondary }]}>
                {event.user}
              </Text>
            </View>
            <View style={styles.eventMeta}>
              {event.value && (
                <Text style={[styles.eventValue, { color: '#10B981' }]}>
                  {event.value}
                </Text>
              )}
              <Text style={[styles.eventTime, { color: theme.colors.textSecondary }]}>
                {event.time}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  liveIndicator: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  refreshBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  updateText: { fontSize: 12, marginLeft: 46 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 16 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  changeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  changeText: { fontSize: 11, fontWeight: '700' },
  statValue: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  statLabel: { fontSize: 13 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  metricTabs: { flexDirection: 'row', gap: 8 },
  metricTab: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  metricText: { fontSize: 12, fontWeight: '600' },
  chartContainer: { alignItems: 'center' },
  chart: { borderRadius: 16, marginVertical: 8 },
  deviceGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  deviceCard: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 12 },
  deviceIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  devicePercent: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  deviceName: { fontSize: 12, marginBottom: 10 },
  deviceBar: { width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2 },
  deviceFill: { height: 4, borderRadius: 2 },
  globeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  globeText: { fontSize: 13 },
  geoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  geoInfo: { flexDirection: 'row', alignItems: 'center', width: 140 },
  geoRank: { fontSize: 12, width: 30 },
  geoCountry: { fontSize: 14, fontWeight: '600' },
  geoStats: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  geoUsers: { fontSize: 14, fontWeight: '600', width: 60 },
  geoBarContainer: { flex: 1, height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3 },
  geoBar: { height: 6, borderRadius: 3, backgroundColor: '#3B82F6' },
  geoPercent: { fontSize: 12, width: 40, textAlign: 'right' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  liveText: { fontSize: 12, fontWeight: '700' },
  eventRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  eventIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  eventInfo: { flex: 1, marginLeft: 12 },
  eventName: { fontSize: 14, fontWeight: '600' },
  eventUser: { fontSize: 12, marginTop: 2 },
  eventMeta: { alignItems: 'flex-end' },
  eventValue: { fontSize: 14, fontWeight: '700' },
  eventTime: { fontSize: 11, marginTop: 2 },
});
