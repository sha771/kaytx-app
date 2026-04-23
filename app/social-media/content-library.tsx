 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Image as ImageIcon, Video, FileText, Upload, Grid, List, Search, MoreVertical, Heart, Eye } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'text';
  thumbnail: string;
  title: string;
  usedCount: number;
  likes: string;
  date: string;
}

export default function ContentLibrary() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video' | 'text'>('all');

  const mediaItems: MediaItem[] = [
    { id: '1', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400', title: 'Product Launch Banner', usedCount: 12, likes: '2.4K', date: 'Jan 15' },
    { id: '2', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400', title: 'Company Intro Video', usedCount: 8, likes: '5.1K', date: 'Jan 12' },
    { id: '3', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', title: 'Analytics Dashboard', usedCount: 5, likes: '1.8K', date: 'Jan 10' },
    { id: '4', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400', title: 'Team Photo', usedCount: 15, likes: '3.2K', date: 'Jan 8' },
    { id: '5', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400', title: 'Tutorial Clip', usedCount: 3, likes: '890', date: 'Jan 5' },
    { id: '6', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400', title: 'Feature Highlight', usedCount: 7, likes: '1.5K', date: 'Jan 3' },
  ];

  const types = [
    { id: 'all', label: 'All', icon: Grid, count: mediaItems.length },
    { id: 'image', label: 'Images', icon: ImageIcon, count: mediaItems.filter(m => m.type === 'image').length },
    { id: 'video', label: 'Videos', icon: Video, count: mediaItems.filter(m => m.type === 'video').length },
    { id: 'text', label: 'Templates', icon: FileText, count: 0 },
  ];

  const filteredItems = selectedType === 'all' ? mediaItems : mediaItems.filter(m => m.type === selectedType);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Content Library',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Upload Button */}
        <TouchableOpacity style={[styles.uploadButton, { borderColor: theme.colors.primary }]}>
          <Upload size={20} color={theme.colors.primary} />
          <Text style={[styles.uploadText, { color: theme.colors.primary }]}>Upload New Media</Text>
        </TouchableOpacity>

        {/* Type Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilter}>
          {types.map((type) => {
            const IconComponent = type.icon;
            return (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeChip, selectedType === type.id && { backgroundColor: theme.colors.primary }]}
                onPress={() => setSelectedType(type.id as any)}
              >
                <IconComponent size={16} color={selectedType === type.id ? '#FFF' : theme.colors.secondaryText} />
                <Text style={[styles.typeLabel, { color: selectedType === type.id ? '#FFF' : theme.colors.secondaryText }]}>
                  {type.label}
                </Text>
                <View style={[styles.typeCount, { backgroundColor: selectedType === type.id ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }]}>
                  <Text style={[styles.typeCountText, { color: selectedType === type.id ? '#FFF' : theme.colors.secondaryText }]}>
                    {type.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* View Toggle & Search */}
        <View style={styles.toolbar}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={16} color={theme.colors.secondaryText} />
            <Text style={[styles.searchPlaceholder, { color: theme.colors.secondaryText }]}>Search library...</Text>
          </View>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewBtn, viewMode === 'grid' && { backgroundColor: theme.colors.primary }]}
              onPress={() => setViewMode('grid')}
            >
              <Grid size={16} color={viewMode === 'grid' ? '#FFF' : theme.colors.secondaryText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewBtn, viewMode === 'list' && { backgroundColor: theme.colors.primary }]}
              onPress={() => setViewMode('list')}
            >
              <List size={16} color={viewMode === 'list' ? '#FFF' : theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Media Grid/List */}
        {viewMode === 'grid' ? (
          <View style={styles.grid}>
            {filteredItems.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.gridItem, { backgroundColor: theme.colors.cardBackground }]}>
                <Image source={{ uri: item.thumbnail }} style={styles.gridImage} />
                {item.type === 'video' && (
                  <View style={styles.videoBadge}>
                    <Video size={12} color="#FFF" />
                  </View>
                )}
                <View style={styles.gridInfo}>
                  <Text style={[styles.gridTitle, { color: theme.colors.text }]} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.gridStats}>
                    <View style={styles.gridStat}>
                      <Heart size={10} color={theme.colors.secondaryText} />
                      <Text style={[styles.gridStatText, { color: theme.colors.secondaryText }]}>{item.likes}</Text>
                    </View>
                    <Text style={[styles.gridDate, { color: theme.colors.secondaryText }]}>{item.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.list}>
            {filteredItems.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.listItem, { backgroundColor: theme.colors.cardBackground }]}>
                <Image source={{ uri: item.thumbnail }} style={styles.listImage} />
                <View style={styles.listInfo}>
                  <Text style={[styles.listTitle, { color: theme.colors.text }]}>{item.title}</Text>
                  <View style={styles.listMeta}>
                    <View style={styles.listStat}>
                      <Eye size={12} color={theme.colors.secondaryText} />
                      <Text style={[styles.listStatText, { color: theme.colors.secondaryText }]}>Used {item.usedCount}x</Text>
                    </View>
                    <View style={styles.listStat}>
                      <Heart size={12} color={theme.colors.secondaryText} />
                      <Text style={[styles.listStatText, { color: theme.colors.secondaryText }]}>{item.likes}</Text>
                    </View>
                  </View>
                  <Text style={[styles.listDate, { color: theme.colors.secondaryText }]}>{item.date}</Text>
                </View>
                <TouchableOpacity style={styles.moreBtn}>
                  <MoreVertical size={18} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  uploadButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 14, borderWidth: 2, borderStyle: 'dashed', gap: 10, marginBottom: 16 },
  uploadText: { fontSize: 15, fontWeight: '600' },
  typeFilter: { marginBottom: 16 },
  typeChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)', marginRight: 10, gap: 6 },
  typeLabel: { fontSize: 14, fontWeight: '600' },
  typeCount: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  typeCountText: { fontSize: 11, fontWeight: '600' },
  toolbar: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, gap: 8 },
  searchPlaceholder: { fontSize: 14 },
  viewToggle: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 8, padding: 2 },
  viewBtn: { padding: 8, borderRadius: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridItem: { width: '48%', borderRadius: 14, overflow: 'hidden' },
  gridImage: { width: '100%', height: 120 },
  videoBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.6)', padding: 6, borderRadius: 6 },
  gridInfo: { padding: 10 },
  gridTitle: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  gridStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gridStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  gridStatText: { fontSize: 11 },
  gridDate: { fontSize: 11 },
  list: { gap: 10 },
  listItem: { flexDirection: 'row', padding: 12, borderRadius: 14, alignItems: 'center' },
  listImage: { width: 64, height: 64, borderRadius: 10, marginRight: 12 },
  listInfo: { flex: 1 },
  listTitle: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  listMeta: { flexDirection: 'row', gap: 16, marginBottom: 4 },
  listStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  listStatText: { fontSize: 12 },
  listDate: { fontSize: 11 },
  moreBtn: { padding: 8 },
});
