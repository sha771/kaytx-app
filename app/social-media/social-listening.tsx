 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Radio, TrendingUp, TrendingDown, Hash, MessageCircle, ThumbsUp, ThumbsDown, Minus, Bell } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Mention {
  id: string;
  source: string;
  author: string;
  avatar: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: string;
  reach: string;
}

export default function SocialListening() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedSentiment, setSelectedSentiment] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  const sentimentOverview = { positive: 68, negative: 12, neutral: 20 };

  const trendingTopics = [
    { topic: '#YourBrand', mentions: '2.4K', change: '+45%', isUp: true },
    { topic: 'Product Launch', mentions: '1.8K', change: '+120%', isUp: true },
    { topic: 'Customer Service', mentions: '890', change: '-12%', isUp: false },
    { topic: 'Innovation', mentions: '650', change: '+28%', isUp: true },
  ];

  const mentions: Mention[] = [
    { id: '1', source: 'Twitter', author: 'TechReview', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100', content: 'Just tried @YourBrand\'s new product and it\'s absolutely amazing! Game changer for our workflow. 🚀', sentiment: 'positive', timestamp: '2 hours ago', reach: '45K' },
    { id: '2', source: 'Reddit', author: 'user_tech_fan', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', content: 'Has anyone else experienced issues with the latest update? Mine keeps crashing...', sentiment: 'negative', timestamp: '3 hours ago', reach: '12K' },
    { id: '3', source: 'Instagram', author: 'DigitalNomad', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', content: 'Using @YourBrand for my business. Pretty solid so far, nothing extraordinary but gets the job done.', sentiment: 'neutral', timestamp: '5 hours ago', reach: '28K' },
    { id: '4', source: 'LinkedIn', author: 'CEO_Insights', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', content: 'Impressed by the innovation coming from YourBrand. This is the future of our industry!', sentiment: 'positive', timestamp: '6 hours ago', reach: '89K' },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp size={14} color="#34C759" />;
      case 'negative': return <ThumbsDown size={14} color="#FF3B30" />;
      default: return <Minus size={14} color="#8E8E93" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#34C759';
      case 'negative': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const filteredMentions = selectedSentiment === 'all' ? mentions : mentions.filter(m => m.sentiment === selectedSentiment);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Social Listening',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Sentiment Overview */}
        <View style={[styles.sentimentCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Brand Sentiment</Text>
          <View style={styles.sentimentBar}>
            <View style={[styles.sentimentSegment, { width: `${sentimentOverview.positive}%`, backgroundColor: '#34C759' }]} />
            <View style={[styles.sentimentSegment, { width: `${sentimentOverview.neutral}%`, backgroundColor: '#8E8E93' }]} />
            <View style={[styles.sentimentSegment, { width: `${sentimentOverview.negative}%`, backgroundColor: '#FF3B30' }]} />
          </View>
          <View style={styles.sentimentLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
              <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Positive {sentimentOverview.positive}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#8E8E93' }]} />
              <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Neutral {sentimentOverview.neutral}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF3B30' }]} />
              <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Negative {sentimentOverview.negative}%</Text>
            </View>
          </View>
        </View>

        {/* Trending Topics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Trending Topics</Text>
          <View style={styles.topicsGrid}>
            {trendingTopics.map((topic, index) => (
              <View key={index} style={[styles.topicCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Hash size={18} color={theme.colors.primary} />
                <Text style={[styles.topicName, { color: theme.colors.text }]}>{topic.topic}</Text>
                <Text style={[styles.topicMentions, { color: theme.colors.secondaryText }]}>{topic.mentions} mentions</Text>
                <View style={[styles.topicChange, { backgroundColor: topic.isUp ? '#34C75915' : '#FF3B3015' }]}>
                  {topic.isUp ? <TrendingUp size={12} color="#34C759" /> : <TrendingDown size={12} color="#FF3B30" />}
                  <Text style={[styles.changeText, { color: topic.isUp ? '#34C759' : '#FF3B30' }]}>{topic.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          {(['all', 'positive', 'negative', 'neutral'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterTab, selectedSentiment === filter && { backgroundColor: theme.colors.primary }]}
              onPress={() => setSelectedSentiment(filter)}
            >
              <Text style={[styles.filterTabText, { color: selectedSentiment === filter ? '#FFF' : theme.colors.secondaryText }]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mentions Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Mentions</Text>
          {filteredMentions.map((mention) => (
            <View key={mention.id} style={[styles.mentionCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.mentionHeader}>
                <Image source={{ uri: mention.avatar }} style={styles.mentionAvatar} />
                <View style={styles.mentionInfo}>
                  <Text style={[styles.mentionAuthor, { color: theme.colors.text }]}>{mention.author}</Text>
                  <Text style={[styles.mentionSource, { color: theme.colors.secondaryText }]}>{mention.source} • {mention.timestamp}</Text>
                </View>
                <View style={[styles.sentimentBadge, { backgroundColor: `${getSentimentColor(mention.sentiment)}15` }]}>
                  {getSentimentIcon(mention.sentiment)}
                </View>
              </View>
              <Text style={[styles.mentionContent, { color: theme.colors.text }]}>{mention.content}</Text>
              <View style={styles.mentionFooter}>
                <View style={styles.mentionReach}>
                  <Radio size={12} color={theme.colors.secondaryText} />
                  <Text style={[styles.reachText, { color: theme.colors.secondaryText }]}>{mention.reach} reach</Text>
                </View>
                <TouchableOpacity style={[styles.respondBtn, { backgroundColor: `${theme.colors.primary}15` }]}>
                  <MessageCircle size={14} color={theme.colors.primary} />
                  <Text style={[styles.respondText, { color: theme.colors.primary }]}>Respond</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Alert Setup */}
        <TouchableOpacity style={[styles.alertCard, { backgroundColor: '#FF950010', borderColor: '#FF9500' }]}>
          <Bell size={20} color="#FF9500" />
          <View style={styles.alertContent}>
            <Text style={[styles.alertTitle, { color: theme.colors.text }]}>Set Up Alerts</Text>
            <Text style={[styles.alertText, { color: theme.colors.secondaryText }]}>Get notified when sentiment changes or new mentions spike</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  sentimentCard: { padding: 16, borderRadius: 16, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  sentimentBar: { flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 14 },
  sentimentSegment: { height: '100%' },
  sentimentLegend: { flexDirection: 'row', justifyContent: 'space-around' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  topicsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  topicCard: { width: '48%', padding: 14, borderRadius: 14 },
  topicName: { fontSize: 14, fontWeight: '600', marginTop: 8, marginBottom: 4 },
  topicMentions: { fontSize: 12, marginBottom: 8 },
  topicChange: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4 },
  changeText: { fontSize: 11, fontWeight: '600' },
  filterTabs: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)' },
  filterTabText: { fontSize: 14, fontWeight: '600' },
  mentionCard: { padding: 14, borderRadius: 14, marginBottom: 12 },
  mentionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  mentionAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  mentionInfo: { flex: 1 },
  mentionAuthor: { fontSize: 14, fontWeight: '600' },
  mentionSource: { fontSize: 12, marginTop: 2 },
  sentimentBadge: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  mentionContent: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  mentionFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mentionReach: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reachText: { fontSize: 12 },
  respondBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, gap: 6 },
  respondText: { fontSize: 12, fontWeight: '600' },
  alertCard: { flexDirection: 'row', padding: 16, borderRadius: 14, borderLeftWidth: 4, gap: 12, marginBottom: 20 },
  alertContent: { flex: 1 },
  alertTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  alertText: { fontSize: 12 },
});
