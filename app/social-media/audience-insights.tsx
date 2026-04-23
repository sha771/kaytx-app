 
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Users, MapPin, Clock, Smartphone, Globe, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

// const { width } = Dimensions.get('window'); // unused

export default function AudienceInsights() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const demographics = [
    { label: '18-24', percentage: 22, color: '#007AFF' },
    { label: '25-34', percentage: 38, color: '#34C759' },
    { label: '35-44', percentage: 24, color: '#FF9500' },
    { label: '45-54', percentage: 12, color: '#AF52DE' },
    { label: '55+', percentage: 4, color: '#FF2D55' },
  ];

  const genderSplit = [
    { label: 'Female', percentage: 58, color: '#FF2D55' },
    { label: 'Male', percentage: 40, color: '#007AFF' },
    { label: 'Other', percentage: 2, color: '#8E8E93' },
  ];

  const topLocations = [
    { city: 'New York', country: 'USA', percentage: '18%' },
    { city: 'Los Angeles', country: 'USA', percentage: '12%' },
    { city: 'London', country: 'UK', percentage: '9%' },
    { city: 'Toronto', country: 'Canada', percentage: '7%' },
    { city: 'Sydney', country: 'Australia', percentage: '5%' },
  ];

  const activeHours = [
    { time: '6AM', value: 15 },
    { time: '9AM', value: 45 },
    { time: '12PM', value: 68 },
    { time: '3PM', value: 82 },
    { time: '6PM', value: 95 },
    { time: '9PM', value: 78 },
    { time: '12AM', value: 32 },
  ];

  const devices = [
    { type: 'Mobile', percentage: 72, icon: Smartphone },
    { type: 'Desktop', percentage: 24, icon: Globe },
    { type: 'Tablet', percentage: 4, icon: Smartphone },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Audience Insights',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Overview */}
        <View style={[styles.overviewCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.overviewItem}>
            <Users size={22} color={theme.colors.primary} />
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>562K</Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Total Followers</Text>
          </View>
          <View style={[styles.overviewDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.overviewItem}>
            <TrendingUp size={22} color="#34C759" />
            <Text style={[styles.overviewValue, { color: '#34C759' }]}>+8.4K</Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>This Month</Text>
          </View>
        </View>

        {/* Age Demographics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Age Demographics</Text>
          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
            {demographics.map((item) => (
              <View key={item.label} style={styles.barItem}>
                <Text style={[styles.barLabel, { color: theme.colors.text }]}>{item.label}</Text>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                </View>
                <Text style={[styles.barValue, { color: theme.colors.secondaryText }]}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Gender Split */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Gender Distribution</Text>
          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.genderBar}>
              {genderSplit.map((item) => (
                <View key={item.label} style={[styles.genderSegment, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
              ))}
            </View>
            <View style={styles.genderLegend}>
              {genderSplit.map((item) => (
                <View key={item.label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>{item.label} {item.percentage}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Top Locations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Locations</Text>
          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
            {topLocations.map((loc, index) => (
              <View key={index} style={[styles.locationItem, index < topLocations.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.colors.border }]}>
                <View style={[styles.locationRank, { backgroundColor: index < 3 ? '#FFD70020' : 'rgba(0,0,0,0.05)' }]}>
                  <Text style={[styles.rankText, { color: index < 3 ? '#FFB800' : theme.colors.secondaryText }]}>#{index + 1}</Text>
                </View>
                <MapPin size={16} color={theme.colors.secondaryText} />
                <View style={styles.locationInfo}>
                  <Text style={[styles.locationCity, { color: theme.colors.text }]}>{loc.city}</Text>
                  <Text style={[styles.locationCountry, { color: theme.colors.secondaryText }]}>{loc.country}</Text>
                </View>
                <Text style={[styles.locationPercent, { color: theme.colors.primary }]}>{loc.percentage}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Active Hours */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Most Active Hours</Text>
          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.hoursChart}>
              {activeHours.map((hour) => (
                <View key={hour.time} style={styles.hourItem}>
                  <View style={styles.hourBarContainer}>
                    <View style={[styles.hourBar, { height: `${hour.value}%`, backgroundColor: theme.colors.primary }]} />
                  </View>
                  <Text style={[styles.hourLabel, { color: theme.colors.secondaryText }]}>{hour.time}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.peakTime, { backgroundColor: '#34C75915' }]}>
              <Clock size={16} color="#34C759" />
              <Text style={[styles.peakTimeText, { color: theme.colors.text }]}>Peak activity: 6PM EST</Text>
            </View>
          </View>
        </View>

        {/* Devices */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Device Usage</Text>
          <View style={styles.devicesGrid}>
            {devices.map((device) => {
              const IconComponent = device.icon;
              return (
                <View key={device.type} style={[styles.deviceCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <IconComponent size={24} color={theme.colors.primary} />
                  <Text style={[styles.devicePercent, { color: theme.colors.text }]}>{device.percentage}%</Text>
                  <Text style={[styles.deviceType, { color: theme.colors.secondaryText }]}>{device.type}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  overviewCard: { flexDirection: 'row', padding: 20, borderRadius: 16, marginBottom: 20 },
  overviewItem: { flex: 1, alignItems: 'center' },
  overviewDivider: { width: 1, marginHorizontal: 16 },
  overviewValue: { fontSize: 24, fontWeight: '700', marginVertical: 8 },
  overviewLabel: { fontSize: 12 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  card: { padding: 16, borderRadius: 16 },
  barItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  barLabel: { width: 50, fontSize: 13, fontWeight: '600' },
  barContainer: { flex: 1, height: 12, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 6, marginHorizontal: 12 },
  bar: { height: '100%', borderRadius: 6 },
  barValue: { width: 40, textAlign: 'right', fontSize: 13, fontWeight: '600' },
  genderBar: { flexDirection: 'row', height: 16, borderRadius: 8, overflow: 'hidden', marginBottom: 14 },
  genderSegment: { height: '100%' },
  genderLegend: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12 },
  locationItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 10 },
  locationRank: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  rankText: { fontSize: 12, fontWeight: '700' },
  locationInfo: { flex: 1 },
  locationCity: { fontSize: 14, fontWeight: '600' },
  locationCountry: { fontSize: 12 },
  locationPercent: { fontSize: 15, fontWeight: '700' },
  hoursChart: { flexDirection: 'row', justifyContent: 'space-between', height: 100, marginBottom: 14 },
  hourItem: { alignItems: 'center', flex: 1 },
  hourBarContainer: { flex: 1, width: 20, justifyContent: 'flex-end' },
  hourBar: { width: '100%', borderRadius: 4 },
  hourLabel: { fontSize: 10, marginTop: 6 },
  peakTime: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10, gap: 8 },
  peakTimeText: { fontSize: 13, fontWeight: '600' },
  devicesGrid: { flexDirection: 'row', gap: 12 },
  deviceCard: { flex: 1, padding: 16, borderRadius: 14, alignItems: 'center' },
  devicePercent: { fontSize: 22, fontWeight: '700', marginVertical: 8 },
  deviceType: { fontSize: 12 },
});
