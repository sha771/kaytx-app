 
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Eye, TrendingUp, TrendingDown, ChartBar, Plus } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Competitor {
  id: string;
  name: string;
  logo: string;
  followers: string;
  growth: string;
  engagement: string;
  postsPerWeek: number;
  isGrowing: boolean;
}

export default function CompetitorAnalysis() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const competitors: Competitor[] = [
    { id: '1', name: 'Competitor A', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100', followers: '245K', growth: '+5.2%', engagement: '3.8%', postsPerWeek: 12, isGrowing: true },
    { id: '2', name: 'Competitor B', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100', followers: '189K', growth: '+2.1%', engagement: '4.2%', postsPerWeek: 8, isGrowing: true },
    { id: '3', name: 'Competitor C', logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100', followers: '312K', growth: '-1.3%', engagement: '2.9%', postsPerWeek: 15, isGrowing: false },
    { id: '4', name: 'Your Brand', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100', followers: '125K', growth: '+8.4%', engagement: '4.8%', postsPerWeek: 10, isGrowing: true },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Competitor Analysis',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Your Position */}
        <View style={[styles.positionCard, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.positionLabel}>Your Market Position</Text>
          <Text style={styles.positionValue}>#3 of 4</Text>
          <Text style={styles.positionSubtext}>Based on engagement rate</Text>
          <View style={styles.positionBadge}>
            <TrendingUp size={14} color="#34C759" />
            <Text style={styles.positionBadgeText}>Climbing up!</Text>
          </View>
        </View>

        {/* Comparison Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Competitor Comparison</Text>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Plus size={16} color={theme.colors.primary} />
              <Text style={[styles.addBtnText, { color: theme.colors.primary }]}>Add</Text>
            </TouchableOpacity>
          </View>

          {competitors.map((comp, index) => (
            <View key={comp.id} style={[styles.competitorCard, { backgroundColor: theme.colors.cardBackground }, comp.name === 'Your Brand' && { borderWidth: 2, borderColor: theme.colors.primary }]}>
              <View style={styles.competitorHeader}>
                <View style={styles.competitorInfo}>
                  <Image source={{ uri: comp.logo }} style={styles.competitorLogo} />
                  <View>
                    <View style={styles.nameRow}>
                      <Text style={[styles.competitorName, { color: theme.colors.text }]}>{comp.name}</Text>
                      {comp.name === 'Your Brand' && (
                        <View style={[styles.youBadge, { backgroundColor: theme.colors.primary }]}>
                          <Text style={styles.youBadgeText}>You</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.competitorFollowers, { color: theme.colors.secondaryText }]}>{comp.followers} followers</Text>
                  </View>
                </View>
                <Text style={[styles.rankText, { color: theme.colors.secondaryText }]}>#{index + 1}</Text>
              </View>

              <View style={styles.competitorStats}>
                <View style={styles.stat}>
                  <View style={[styles.statIcon, { backgroundColor: comp.isGrowing ? '#34C75915' : '#FF3B3015' }]}>
                    {comp.isGrowing ? <TrendingUp size={14} color="#34C759" /> : <TrendingDown size={14} color="#FF3B30" />}
                  </View>
                  <Text style={[styles.statValue, { color: comp.isGrowing ? '#34C759' : '#FF3B30' }]}>{comp.growth}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Growth</Text>
                </View>
                <View style={styles.stat}>
                  <View style={[styles.statIcon, { backgroundColor: '#007AFF15' }]}>
                    <ChartBar size={14} color="#007AFF" />
                  </View>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{comp.engagement}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Engagement</Text>
                </View>
                <View style={styles.stat}>
                  <View style={[styles.statIcon, { backgroundColor: '#FF950015' }]}>
                    <Eye size={14} color="#FF9500" />
                  </View>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{comp.postsPerWeek}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Posts/Week</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text>
          <View style={[styles.insightCard, { backgroundColor: '#34C75910', borderLeftColor: '#34C759' }]}>
            <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Strength</Text>
            <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>Your engagement rate (4.8%) is the highest among competitors. Keep focusing on quality content.</Text>
          </View>
          <View style={[styles.insightCard, { backgroundColor: '#FF950010', borderLeftColor: '#FF9500' }]}>
            <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Opportunity</Text>
            <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>Competitor C posts 15 times/week. Consider increasing your posting frequency to 12-14 posts.</Text>
          </View>
          <View style={[styles.insightCard, { backgroundColor: '#007AFF10', borderLeftColor: '#007AFF' }]}>
            <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Trend</Text>
            <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>Video content is driving 40% more engagement for top competitors. Consider adding more video posts.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  positionCard: { padding: 20, borderRadius: 20, marginBottom: 20, alignItems: 'center' },
  positionLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 8 },
  positionValue: { color: '#FFF', fontSize: 36, fontWeight: '700', marginBottom: 4 },
  positionSubtext: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 12 },
  positionBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
  positionBadgeText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  addBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, gap: 4 },
  addBtnText: { fontSize: 13, fontWeight: '600' },
  competitorCard: { padding: 16, borderRadius: 16, marginBottom: 12 },
  competitorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  competitorInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  competitorLogo: { width: 48, height: 48, borderRadius: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  competitorName: { fontSize: 16, fontWeight: '600' },
  youBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  youBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  competitorFollowers: { fontSize: 13, marginTop: 2 },
  rankText: { fontSize: 18, fontWeight: '700' },
  competitorStats: { flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statIcon: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  statValue: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  statLabel: { fontSize: 11 },
  insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, marginBottom: 10 },
  insightTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  insightText: { fontSize: 13, lineHeight: 18 },
});
