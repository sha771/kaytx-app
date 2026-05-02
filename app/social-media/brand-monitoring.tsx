 
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Shield, TriangleAlert, CircleCheck, TrendingUp, Globe, Bell, Eye, Settings } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function BrandMonitoring() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const brandHealth = { score: 87, change: '+3' };

  const alerts = [
    { id: '1', type: 'warning', title: 'Negative spike detected', desc: 'Unusual increase in negative mentions in the last hour', time: '15 min ago' },
    { id: '2', type: 'info', title: 'Competitor campaign launched', desc: 'Competitor A started a new marketing campaign', time: '2 hours ago' },
    { id: '3', type: 'success', title: 'Viral content', desc: 'Your latest post is gaining traction rapidly', time: '4 hours ago' },
  ];

  const trackingKeywords = [
    { keyword: 'YourBrand', mentions: '2.4K', trend: 'up' },
    { keyword: '@yourbrand', mentions: '1.8K', trend: 'up' },
    { keyword: 'your brand review', mentions: '456', trend: 'down' },
    { keyword: 'brand alternative', mentions: '234', trend: 'stable' },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <TriangleAlert size={18} color="#FF9500" />;
      case 'success': return <CircleCheck size={18} color="#34C759" />;
      default: return <Bell size={18} color="#007AFF" />;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'warning': return '#FF950015';
      case 'success': return '#34C75915';
      default: return '#007AFF15';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Brand Monitoring',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Brand Health Score */}
        <View style={[styles.healthCard, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.healthHeader}>
            <Shield size={24} color="#FFF" />
            <Text style={styles.healthLabel}>Brand Health Score</Text>
          </View>
          <View style={styles.healthScore}>
            <Text style={styles.scoreValue}>{brandHealth.score}</Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>
          <View style={styles.scoreChange}>
            <TrendingUp size={14} color="#34C759" />
            <Text style={styles.changeText}>{brandHealth.change} from last month</Text>
          </View>
          <View style={styles.healthBar}>
            <View style={[styles.healthProgress, { width: `${brandHealth.score}%` }]} />
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Alerts</Text>
            <TouchableOpacity>
              <Settings size={18} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>
          {alerts.map((alert) => (
            <TouchableOpacity key={alert.id} style={[styles.alertCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={[styles.alertIcon, { backgroundColor: getAlertBg(alert.type) }]}>
                {getAlertIcon(alert.type)}
              </View>
              <View style={styles.alertInfo}>
                <Text style={[styles.alertTitle, { color: theme.colors.text }]}>{alert.title}</Text>
                <Text style={[styles.alertDesc, { color: theme.colors.secondaryText }]}>{alert.desc}</Text>
                <Text style={[styles.alertTime, { color: theme.colors.secondaryText }]}>{alert.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tracking Keywords */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tracked Keywords</Text>
            <TouchableOpacity style={[styles.addKeyword, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Text style={[styles.addKeywordText, { color: theme.colors.primary }]}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {trackingKeywords.map((kw, index) => (
            <View key={index} style={[styles.keywordCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={[styles.keywordIcon, { backgroundColor: '#007AFF15' }]}>
                <Eye size={16} color="#007AFF" />
              </View>
              <View style={styles.keywordInfo}>
                <Text style={[styles.keywordText, { color: theme.colors.text }]}>{kw.keyword}</Text>
                <Text style={[styles.keywordMentions, { color: theme.colors.secondaryText }]}>{kw.mentions} mentions this week</Text>
              </View>
              <View style={[styles.trendBadge, { backgroundColor: kw.trend === 'up' ? '#34C75915' : kw.trend === 'down' ? '#FF3B3015' : 'rgba(0,0,0,0.05)' }]}>
                <TrendingUp size={12} color={kw.trend === 'up' ? '#34C759' : kw.trend === 'down' ? '#FF3B30' : '#8E8E93'} />
              </View>
            </View>
          ))}
        </View>

        {/* Web Monitoring */}
        <View style={[styles.webCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Globe size={22} color={theme.colors.primary} />
          <View style={styles.webInfo}>
            <Text style={[styles.webTitle, { color: theme.colors.text }]}>Web Monitoring Active</Text>
            <Text style={[styles.webDesc, { color: theme.colors.secondaryText }]}>Scanning news sites, forums, and review platforms</Text>
          </View>
          <View style={[styles.activeDot, { backgroundColor: '#34C759' }]} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  healthCard: { padding: 20, borderRadius: 20, marginBottom: 20 },
  healthHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  healthLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
  healthScore: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  scoreValue: { color: '#FFF', fontSize: 56, fontWeight: '700' },
  scoreMax: { color: 'rgba(255,255,255,0.6)', fontSize: 20, marginLeft: 4 },
  scoreChange: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  changeText: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  healthBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
  healthProgress: { height: '100%', backgroundColor: '#FFF', borderRadius: 4 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  alertCard: { flexDirection: 'row', padding: 14, borderRadius: 14, marginBottom: 10 },
  alertIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  alertInfo: { flex: 1 },
  alertTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  alertDesc: { fontSize: 12, lineHeight: 16, marginBottom: 4 },
  alertTime: { fontSize: 11 },
  addKeyword: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  addKeywordText: { fontSize: 13, fontWeight: '600' },
  keywordCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, marginBottom: 10 },
  keywordIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  keywordInfo: { flex: 1 },
  keywordText: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  keywordMentions: { fontSize: 12 },
  trendBadge: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  webCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, marginBottom: 20, gap: 12 },
  webInfo: { flex: 1 },
  webTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  webDesc: { fontSize: 12 },
  activeDot: { width: 10, height: 10, borderRadius: 5 },
});
