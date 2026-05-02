 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { MessageCircle, Heart, Share2, Send, Image, Video, Calendar, ChartBar, Users, Settings } from 'lucide-react-native';

const platforms = [
  { id: 1, name: 'Facebook', color: '#1877F2', posts: 45, followers: '12.5K', engagement: '4.2%' },
  { id: 2, name: 'Instagram', color: '#E4405F', posts: 32, followers: '8.9K', engagement: '6.1%' },
  { id: 3, name: 'Twitter', color: '#1DA1F2', posts: 78, followers: '5.2K', engagement: '3.8%' },
  { id: 4, name: 'LinkedIn', color: '#0A66C2', posts: 23, followers: '3.1K', engagement: '5.4%' },
  { id: 5, name: 'TikTok', color: '#000000', posts: 15, followers: '2.8K', engagement: '8.7%' },
];

const recentPosts = [
  { id: 1, platform: 'Instagram', content: 'New product launch announcement', likes: 234, comments: 45, shares: 12, time: '2h ago' },
  { id: 2, platform: 'Facebook', content: 'Behind the scenes content', likes: 189, comments: 67, shares: 23, time: '4h ago' },
  { id: 3, platform: 'Twitter', content: 'Industry insights thread', likes: 156, comments: 34, shares: 78, time: '6h ago' },
];

export default function SocialMediaScreen() {
  const [newPost, setNewPost] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);

  const togglePlatform = (platformId: number) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Social Media Management',
          headerStyle: { backgroundColor: '#6366F1' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <ScrollView style={styles.content}>
        {/* Platform Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Overview</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {platforms.map((platform) => (
              <View key={platform.id} style={[styles.platformCard, { borderLeftColor: platform.color }]}>
                <Text style={styles.platformName}>{platform.name}</Text>
                <Text style={styles.platformStat}>{platform.followers} followers</Text>
                <Text style={styles.platformStat}>{platform.posts} posts</Text>
                <Text style={[styles.platformStat, { color: platform.color }]}>{platform.engagement} engagement</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={24} color="#6366F1" />
              <Text style={styles.actionText}>Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Calendar size={24} color="#6366F1" />
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <ChartBarBig size={24} color="#6366F1" />
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Users size={24} color="#6366F1" />
              <Text style={styles.actionText}>Audience</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Create New Post */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create New Post</Text>
          <View style={styles.postCreator}>
            <TextInput
              style={styles.postInput}
              placeholder="What's on your mind?"
              multiline
              value={newPost}
              onChangeText={setNewPost}
            />
            <View style={styles.postActions}>
              <View style={styles.mediaButtons}>
                <TouchableOpacity style={styles.mediaButton}>
                  <Image size={20} color="#6366F1" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaButton}>
                  <Video size={20} color="#6366F1" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.postButton}>
                <Send size={16} color="#FFFFFF" />
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Platform Selection */}
          <Text style={styles.subTitle}>Select Platforms</Text>
          <View style={styles.platformSelection}>
            {platforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                style={[
                  styles.platformChip,
                  selectedPlatforms.includes(platform.id) && { backgroundColor: platform.color }
                ]}
                onPress={() => togglePlatform(platform.id)}
              >
                <Text style={[
                  styles.platformChipText,
                  selectedPlatforms.includes(platform.id) && { color: '#FFFFFF' }
                ]}>
                  {platform.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Posts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {recentPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Text style={styles.postPlatform}>{post.platform}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              <View style={styles.postStats}>
                <View style={styles.statItem}>
                  <Heart size={16} color="#EF4444" />
                  <Text style={styles.statText}>{post.likes}</Text>
                </View>
                <View style={styles.statItem}>
                  <MessageCircle size={16} color="#3B82F6" />
                  <Text style={styles.statText}>{post.comments}</Text>
                </View>
                <View style={styles.statItem}>
                  <Share2 size={16} color="#10B981" />
                  <Text style={styles.statText}>{post.shares}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginTop: 16,
  },
  platformCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 120,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  platformName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  platformStat: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  postCreator: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mediaButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  postButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  platformSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  platformChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postPlatform: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  postTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  postContent: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
    lineHeight: 24,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
});