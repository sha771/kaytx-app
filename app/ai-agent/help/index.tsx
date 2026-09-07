import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { HelpCircle, Search, BookOpen, MessageCircle, Video, FileText, ChevronRight, Mail, PhoneCall, ExternalLink, Zap, Shield, Users, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const HELP_CATEGORIES = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: Zap,
    color: '#3B82F6',
    articles: ['Quick Start Guide', 'Creating Your First Agent', 'Understanding the Hierarchy', 'Basic Configuration'],
  },
  {
    id: 'agents',
    name: 'AI Agents',
    icon: Users,
    color: '#8B5CF6',
    articles: ['Agent Types Explained', 'Activating Agents', 'Customizing Capabilities', 'Agent Collaboration'],
  },
  {
    id: 'workflows',
    name: 'Workflows',
    icon: Settings,
    color: '#10B981',
    articles: ['Building Workflows', 'Automation Rules', 'Templates Library', 'Workflow Analytics'],
  },
  {
    id: 'security',
    name: 'Security & Privacy',
    icon: Shield,
    color: '#EF4444',
    articles: ['Data Protection', 'Access Controls', 'Compliance Features', 'Security Best Practices'],
  },
];

const QUICK_LINKS = [
  { id: 'docs', name: 'Documentation', icon: BookOpen, color: '#3B82F6', description: 'Comprehensive guides and API reference' },
  { id: 'videos', name: 'Video Tutorials', icon: Video, color: '#F59E0B', description: 'Step-by-step video guides' },
  { id: 'community', name: 'Community Forum', icon: Users, color: '#10B981', description: 'Connect with other users' },
  { id: 'updates', name: 'Product Updates', icon: FileText, color: '#8B5CF6', description: 'Latest features and releases' },
];

const FAQS = [
  { q: 'How do I create a new AI agent?', a: 'Navigate to AI Agents > Create, choose a template or start from scratch, configure capabilities, and activate.' },
  { q: 'What is the agent hierarchy?', a: 'Our 5-tier hierarchy (C-Suite, VP, Manager, Lead, Specialist) helps organize agents by responsibility level.' },
  { q: 'How does billing work?', a: 'We charge based on active agents and task volume. Check Billing & Usage for detailed breakdowns.' },
  { q: 'Can agents collaborate?', a: 'Yes! Use the A2A (Agent-to-Agent) network to enable consultation and collaboration between agents.' },
];

const SUPPORT_CHANNELS = [
  { id: 'chat', name: 'Live Chat', icon: MessageCircle, color: '#3B82F6', availability: 'Available 24/7' },
  { id: 'email', name: 'Email Support', icon: Mail, color: '#8B5CF6', availability: 'Response within 4 hours' },
  { id: 'phone', name: 'Phone Support', icon: PhoneCall, color: '#10B981', availability: 'Mon-Fri 9AM-6PM EST' },
];

export default function HelpPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.headerIconWrap, { backgroundColor: '#3B82F620' }]}>
          <HelpCircle size={40} color="#3B82F6" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Help Center</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Find answers and get support
        </Text>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search help articles..."
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.quickSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Resources</Text>
        <View style={styles.quickGrid}>
          {QUICK_LINKS.map((link) => (
            <TouchableOpacity key={link.id} style={[styles.quickCard, { backgroundColor: link.color + '15' }]}>
              <View style={[styles.quickIcon, { backgroundColor: link.color + '25' }]}>
                <link.icon size={24} color={link.color} />
              </View>
              <Text style={[styles.quickName, { color: theme.colors.text }]}>{link.name}</Text>
              <Text style={[styles.quickDesc, { color: theme.colors.textSecondary }]}>{link.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Categories */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Browse by Topic</Text>
        {HELP_CATEGORIES.map((category) => (
          <View key={category.id} style={[styles.categoryCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <category.icon size={24} color={category.color} />
              </View>
              <Text style={[styles.categoryName, { color: theme.colors.text }]}>{category.name}</Text>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </View>
            <View style={styles.articlesList}>
              {category.articles.map((article, i) => (
                <TouchableOpacity key={i} style={styles.articleItem}>
                  <FileText size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.articleText, { color: theme.colors.textSecondary }]}>{article}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* FAQs */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Frequently Asked Questions</Text>
        {FAQS.map((faq, i) => (
          <TouchableOpacity key={i} style={[styles.faqCard, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>{faq.q}</Text>
            <Text style={[styles.faqAnswer, { color: theme.colors.textSecondary }]} numberOfLines={2}>
              {faq.a}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={[styles.viewAllText, { color: '#3B82F6' }]}>View All FAQs</Text>
        </TouchableOpacity>
      </View>

      {/* Support Channels */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact Support</Text>
        <View style={styles.supportGrid}>
          {SUPPORT_CHANNELS.map((channel) => (
            <TouchableOpacity key={channel.id} style={[styles.supportCard, { backgroundColor: channel.color + '15' }]}>
              <View style={[styles.supportIcon, { backgroundColor: channel.color + '25' }]}>
                <channel.icon size={24} color={channel.color} />
              </View>
              <Text style={[styles.supportName, { color: theme.colors.text }]}>{channel.name}</Text>
              <Text style={[styles.supportAvailability, { color: theme.colors.textSecondary }]}>{channel.availability}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Feedback */}
      <TouchableOpacity style={[styles.feedbackCard, { backgroundColor: '#F59E0B20' }]}>
        <Text style={[styles.feedbackTitle, { color: theme.colors.text }]}>Send Feedback</Text>
        <Text style={[styles.feedbackDesc, { color: theme.colors.textSecondary }]}>
          Help us improve by sharing your thoughts
        </Text>
        <ChevronRight size={20} color="#F59E0B" style={styles.feedbackArrow} />
      </TouchableOpacity>

      <AgentFeatures agentId="help-center" agentName="Help Center" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20, borderBottomWidth: 1 },
  headerIconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 6, textAlign: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 14, height: 50, borderRadius: 12, marginTop: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
  quickSection: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickCard: { width: '48%', padding: 14, borderRadius: 12 },
  quickIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  quickName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  quickDesc: { fontSize: 11, lineHeight: 16 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  categoryCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  categoryIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  categoryName: { flex: 1, fontSize: 16, fontWeight: '600' },
  articlesList: { paddingLeft: 52 },
  articleItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
  articleText: { fontSize: 13 },
  faqCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  faqQuestion: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  faqAnswer: { fontSize: 13, lineHeight: 18 },
  viewAllBtn: { alignItems: 'center', marginTop: 8, paddingVertical: 8 },
  viewAllText: { fontSize: 14, fontWeight: '600' },
  supportGrid: { flexDirection: 'row', gap: 10 },
  supportCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  supportIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  supportName: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 2 },
  supportAvailability: { fontSize: 10, textAlign: 'center' },
  feedbackCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  feedbackTitle: { fontSize: 16, fontWeight: '600' },
  feedbackDesc: { fontSize: 13, marginTop: 2 },
  feedbackArrow: { marginLeft: 'auto' },
});
