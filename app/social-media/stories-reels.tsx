 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Video, Zap, Plus, Eye, Heart, MessageCircle, Share2, Clock, Play, Instagram, Facebook } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface StoryItem {
  id: string;
  thumbnail: string;
  platform: string;
  views: string;
  type: 'story' | 'reel';
  duration: string;
  status: 'live' | 'expired' | 'scheduled';
}

export default function StoriesReels() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState<'stories' | 'reels'>('stories');

  const stories: StoryItem[] = [
    { id: '1', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400', platform: 'Instagram', views: '12.4K', type: 'story', duration: '15s', status: 'live' },
    { id: '2', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400', platform: 'Facebook', views: '8.2K', type: 'story', duration: '10s', status: 'live' },
    { id: '3', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', platform: 'Instagram', views: '45.1K', type: 'story', duration: '20s', status: 'expired' },
  ];

  const reels: StoryItem[] = [
    { id: '4', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400', platform: 'Instagram', views: '234K', type: 'reel', duration: '30s', status: 'live' },
    { id: '5', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400', platform: 'Instagram', views: '89.2K', type: 'reel', duration: '45s', status: 'live' },
    { id: '6', thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400', platform: 'Instagram', views: '156K', type: 'reel', duration: '60s', status: 'live' },
  ];

  const topPerformingReel = {
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    views: '1.2M',
    likes: '89K',
    comments: '4.5K',
    shares: '12K',
  };

  const items = selectedTab === 'stories' ? stories : reels;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Stories & Reels',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Create Buttons */}
        <View style={styles.createRow}>
          <TouchableOpacity style={[styles.createButton, { backgroundColor: '#E4405F' }]}>
            <Zap size={20} color="#FFF" />
            <Text style={styles.createText}>Create Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.createButton, { backgroundColor: '#AF52DE' }]}>
            <Video size={20} color="#FFF" />
            <Text style={styles.createText}>Create Reel</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <View style={[styles.tabContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'stories' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab('stories')}
          >
            <Zap size={18} color={selectedTab === 'stories' ? '#FFF' : theme.colors.secondaryText} />
            <Text style={[styles.tabText, { color: selectedTab === 'stories' ? '#FFF' : theme.colors.secondaryText }]}>Stories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'reels' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab('reels')}
          >
            <Video size={18} color={selectedTab === 'reels' ? '#FFF' : theme.colors.secondaryText} />
            <Text style={[styles.tabText, { color: selectedTab === 'reels' ? '#FFF' : theme.colors.secondaryText }]}>Reels</Text>
          </TouchableOpacity>
        </View>

        {/* Top Performing */}
        {selectedTab === 'reels' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performing Reel</Text>
            <View style={[styles.topReelCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.topReelMedia}>
                <Image source={{ uri: topPerformingReel.thumbnail }} style={styles.topReelImage} />
                <View style={styles.playButton}>
                  <Play size={24} color="#FFF" fill="#FFF" />
                </View>
              </View>
              <View style={styles.topReelStats}>
                <View style={styles.topStat}>
                  <Eye size={18} color={theme.colors.primary} />
                  <Text style={[styles.topStatValue, { color: theme.colors.text }]}>{topPerformingReel.views}</Text>
                  <Text style={[styles.topStatLabel, { color: theme.colors.secondaryText }]}>Views</Text>
                </View>
                <View style={styles.topStat}>
                  <Heart size={18} color="#FF2D55" />
                  <Text style={[styles.topStatValue, { color: theme.colors.text }]}>{topPerformingReel.likes}</Text>
                  <Text style={[styles.topStatLabel, { color: theme.colors.secondaryText }]}>Likes</Text>
                </View>
                <View style={styles.topStat}>
                  <MessageCircle size={18} color="#007AFF" />
                  <Text style={[styles.topStatValue, { color: theme.colors.text }]}>{topPerformingReel.comments}</Text>
                  <Text style={[styles.topStatLabel, { color: theme.colors.secondaryText }]}>Comments</Text>
                </View>
                <View style={styles.topStat}>
                  <Share2 size={18} color="#34C759" />
                  <Text style={[styles.topStatValue, { color: theme.colors.text }]}>{topPerformingReel.shares}</Text>
                  <Text style={[styles.topStatLabel, { color: theme.colors.secondaryText }]}>Shares</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Content Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {selectedTab === 'stories' ? 'Active Stories' : 'Your Reels'}
          </Text>
          <View style={styles.grid}>
            {items.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.gridItem, { backgroundColor: theme.colors.cardBackground }]}>
                <Image source={{ uri: item.thumbnail }} style={styles.gridImage} />
                <View style={styles.gridOverlay}>
                  <View style={styles.gridTop}>
                    <View style={[styles.platformBadge, { backgroundColor: item.platform === 'Instagram' ? '#E4405F' : '#1877F2' }]}>
                      {item.platform === 'Instagram' ? <Instagram size={12} color="#FFF" /> : <Facebook size={12} color="#FFF" />}
                    </View>
                    {item.status === 'live' && (
                      <View style={styles.liveBadge}>
                        <Text style={styles.liveText}>LIVE</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.gridBottom}>
                    <View style={styles.viewsContainer}>
                      <Eye size={12} color="#FFF" />
                      <Text style={styles.viewsText}>{item.views}</Text>
                    </View>
                    <View style={styles.durationContainer}>
                      <Clock size={10} color="#FFF" />
                      <Text style={styles.durationText}>{item.duration}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.addItem, { borderColor: theme.colors.border }]}>
              <Plus size={28} color={theme.colors.secondaryText} />
              <Text style={[styles.addItemText, { color: theme.colors.secondaryText }]}>Add New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  createRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  createButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 },
  createText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', borderRadius: 12, padding: 4, marginBottom: 20 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, gap: 8 },
  tabText: { fontSize: 15, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  topReelCard: { borderRadius: 16, overflow: 'hidden' },
  topReelMedia: { height: 200, position: 'relative' },
  topReelImage: { width: '100%', height: '100%' },
  playButton: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -24 }, { translateY: -24 }], width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  topReelStats: { flexDirection: 'row', padding: 16 },
  topStat: { flex: 1, alignItems: 'center' },
  topStatValue: { fontSize: 16, fontWeight: '700', marginVertical: 4 },
  topStatLabel: { fontSize: 11 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridItem: { width: '48%', height: 200, borderRadius: 14, overflow: 'hidden' },
  gridImage: { width: '100%', height: '100%' },
  gridOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'space-between', padding: 10 },
  gridTop: { flexDirection: 'row', justifyContent: 'space-between' },
  platformBadge: { width: 24, height: 24, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  liveBadge: { backgroundColor: '#FF3B30', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  liveText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  gridBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewsContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  viewsText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  durationContainer: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4 },
  durationText: { color: '#FFF', fontSize: 10, fontWeight: '600' },
  addItem: { width: '48%', height: 200, borderRadius: 14, borderWidth: 2, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  addItemText: { fontSize: 13, marginTop: 8 },
});
