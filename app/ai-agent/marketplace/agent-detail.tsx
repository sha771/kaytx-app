import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ArrowLeft, Star, Download, User, Shield, Zap, ChevronRight, CheckCircle2, Globe, Clock, MessageSquare } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const AGENT_DATA = {
  name: 'SalesCloser Pro',
  author: 'KayTx Labs',
  version: '2.4.1',
  rating: 4.9,
  reviews: 2847,
  downloads: '12.5K',
  category: 'Sales',
  price: 'Free',
  description: 'Advanced sales agent with lead qualification, demo scheduling, proposal generation, and closing assistance. Integrates with CRM systems and provides real-time sales insights.',
  capabilities: ['Lead Qualification', 'Demo Scheduling', 'Proposal Gen', 'CRM Integration', 'Sales Analytics'],
  requirements: ['CRM Access', 'Email Integration', 'Calendar Access'],
  screenshots: 5,
  updated: '3 days ago',
  size: '45 MB',
};

const REVIEWS = [
  { id: 1, user: 'John D.', rating: 5, text: 'Amazing agent! Closed 3 deals in first week.', date: '2 days ago' },
  { id: 2, user: 'Sarah M.', rating: 5, text: 'Best sales assistant Ive used. Highly recommend!', date: '1 week ago' },
];

export default function AgentDetailPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <View style={[styles.iconWrap, { backgroundColor: '#8B5CF630' }]}>
          <Zap size={48} color="#8B5CF6" />
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>{AGENT_DATA.name}</Text>
        <Text style={[styles.author, { color: theme.colors.textSecondary }]}>by {AGENT_DATA.author}</Text>
        <View style={styles.ratingRow}>
          <Star size={18} color="#F59E0B" />
          <Text style={[styles.rating, { color: theme.colors.text }]}>{AGENT_DATA.rating}</Text>
          <Text style={[styles.reviews, { color: theme.colors.textSecondary }]}>({AGENT_DATA.reviews} reviews)</Text>
          <Text style={[styles.dot, { color: theme.colors.textSecondary }]}>•</Text>
          <Download size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.downloads, { color: theme.colors.textSecondary }]}>{AGENT_DATA.downloads}</Text>
        </View>
      </View>

      <View style={[styles.actionBar, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity style={[styles.installBtn, { backgroundColor: '#8B5CF6' }]}>
          <Text style={styles.installText}>Install Agent</Text>
        </TouchableOpacity>
        <View style={[styles.priceTag, { backgroundColor: '#10B98120' }]}>
          <Text style={[styles.priceText, { color: '#10B981' }]}>{AGENT_DATA.price}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Description</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{AGENT_DATA.description}</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.chipRow}>
          {AGENT_DATA.capabilities.map((cap) => (
            <View key={cap} style={[styles.chip, { backgroundColor: '#8B5CF620' }]}>
              <CheckCircle2 size={14} color="#8B5CF6" />
              <Text style={[styles.chipText, { color: '#8B5CF6' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Requirements</Text>
        {AGENT_DATA.requirements.map((req) => (
          <View key={req} style={styles.reqItem}>
            <Shield size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.reqText, { color: theme.colors.textSecondary }]}>{req}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reviews</Text>
        {REVIEWS.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUser}>
                <User size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.reviewName, { color: theme.colors.text }]}>{review.user}</Text>
              </View>
              <View style={styles.stars}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} color="#F59E0B" />
                ))}
              </View>
            </View>
            <Text style={[styles.reviewText, { color: theme.colors.textSecondary }]}>{review.text}</Text>
            <Text style={[styles.reviewDate, { color: theme.colors.textSecondary }]}>{review.date}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.metaSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.metaItem}>
          <Clock size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>Updated</Text>
          <Text style={[styles.metaValue, { color: theme.colors.text }]}>{AGENT_DATA.updated}</Text>
        </View>
        <View style={styles.metaItem}>
          <Globe size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>Version</Text>
          <Text style={[styles.metaValue, { color: theme.colors.text }]}>{AGENT_DATA.version}</Text>
        </View>
        <View style={styles.metaItem}>
          <Download size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>Size</Text>
          <Text style={[styles.metaValue, { color: theme.colors.text }]}>{AGENT_DATA.size}</Text>
        </View>
      </View>

      <AgentFeatures agentId="marketplace-detail" agentName="Agent Detail" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  backBtn: { width: 40, height: 40 },
  hero: { alignItems: 'center', padding: 20 },
  iconWrap: { width: 100, height: 100, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold' },
  author: { fontSize: 14, marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  rating: { fontSize: 16, fontWeight: '600' },
  reviews: { fontSize: 13 },
  dot: { fontSize: 13 },
  downloads: { fontSize: 13 },
  actionBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16, gap: 12 },
  installBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  installText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  priceTag: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  priceText: { fontSize: 14, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 22 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 4 },
  chipText: { fontSize: 12, fontWeight: '500' },
  reqItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  reqText: { fontSize: 14 },
  reviewCard: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  reviewUser: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  reviewName: { fontSize: 14, fontWeight: '500' },
  stars: { flexDirection: 'row', gap: 2 },
  reviewText: { fontSize: 13, lineHeight: 18, marginBottom: 4 },
  reviewDate: { fontSize: 11 },
  metaSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  metaLabel: { flex: 1, fontSize: 13 },
  metaValue: { fontSize: 13, fontWeight: '500' },
});
