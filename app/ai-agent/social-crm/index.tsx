import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Users, Activity, Star, TrendingUp, ArrowRight, ChartBar, MessageSquare, 
  Calendar, Shield, Search, Plus, Funnel, Phone, Mail, MoreVertical,
  UserCheck, Target, DollarSign, PieChart, BarChart3, UserPlus, HeartHandshake
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const CRM_STATS = [
  { label: 'Total Contacts', value: '2,847', change: '+12%', icon: Users, color: '#3B82F6' },
  { label: 'Active Deals', value: '156', change: '+8%', icon: Target, color: '#10B981' },
  { label: 'Revenue', value: '$1.2M', change: '+24%', icon: DollarSign, color: '#8B5CF6' },
  { label: 'Conversion', value: '34%', change: '+5%', icon: TrendingUp, color: '#F59E0B' },
];

const RECENT_CONTACTS = [
  { id: '1', name: 'Sarah Johnson', company: 'TechCorp Inc.', status: 'hot', lastContact: '2h ago', value: '$45K' },
  { id: '2', name: 'Michael Chen', company: 'Global Solutions', status: 'warm', lastContact: '1d ago', value: '$32K' },
  { id: '3', name: 'Emily Rodriguez', company: 'Innovate LLC', status: 'cold', lastContact: '3d ago', value: '$28K' },
  { id: '4', name: 'David Kim', company: 'Future Systems', status: 'hot', lastContact: '5h ago', value: '$67K' },
];

const ACTIVE_CAMPAIGNS = [
  { id: '1', name: 'Q2 Product Launch', status: 'active', progress: 78, leads: 234, conversions: 45 },
  { id: '2', name: 'Enterprise Outreach', status: 'active', progress: 65, leads: 156, conversions: 23 },
  { id: '3', name: 'Holiday Special', status: 'draft', progress: 30, leads: 0, conversions: 0 },
];

const DEALS_PIPELINE = [
  { stage: 'Lead', count: 156, value: '$890K', color: '#3B82F6' },
  { stage: 'Qualified', count: 89, value: '$567K', color: '#8B5CF6' },
  { stage: 'Proposal', count: 45, value: '$345K', color: '#F59E0B' },
  { stage: 'Negotiation', count: 23, value: '$234K', color: '#EF4444' },
  { stage: 'Closed Won', count: 67, value: '$1.2M', color: '#10B981' },
];

export default function SocialCRMIndex() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'deals' | 'campaigns'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <View style={[styles.iconWrap, { backgroundColor: '#3B82F615' }]}>
            <HeartHandshake size={32} color="#3B82F6" />
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.primary + '15' }]}>
              <Plus size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.border }]}>
              <Funnel size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.colors.text }]}>Social CRM</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Manage relationships, track deals, and nurture leads
        </Text>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search contacts, deals, or campaigns..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {CRM_STATS.map((stat, i) => (
          <Animated.View
            key={stat.label}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.statCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
              <stat.icon size={20} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
              <Text style={[styles.statChange, { color: stat.color }]}>{stat.change}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['overview', 'contacts', 'deals', 'campaigns'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: '#3B82F6' }
            ]}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? '#fff' : theme.colors.text }
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'overview' && (
        <>
          {/* Pipeline */}
          <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Deals Pipeline</Text>
              <TouchableOpacity onPress={() => router.push('/ai-agent/social-crm/deals')}>
                <Text style={[styles.seeAll, { color: '#3B82F6' }]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pipelineScroll}>
              {DEALS_PIPELINE.map((stage, i) => (
                <View key={stage.stage} style={[styles.pipelineCard, { backgroundColor: theme.colors.background }]}>
                  <View style={[styles.pipelineBar, { backgroundColor: stage.color }]} />
                  <Text style={[styles.pipelineStage, { color: theme.colors.text }]}>{stage.stage}</Text>
                  <Text style={[styles.pipelineCount, { color: stage.color }]}>{stage.count}</Text>
                  <Text style={[styles.pipelineValue, { color: theme.colors.textSecondary }]}>{stage.value}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Recent Contacts */}
          <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Contacts</Text>
              <TouchableOpacity onPress={() => router.push('/ai-agent/social-crm/contacts')}>
                <Text style={[styles.seeAll, { color: '#3B82F6' }]}>See All</Text>
              </TouchableOpacity>
            </View>
            {RECENT_CONTACTS.map((contact) => (
              <TouchableOpacity 
                key={contact.id} 
                style={[styles.contactRow, { backgroundColor: theme.colors.background }]}
                onPress={() => router.push(`/ai-agent/social-crm/contacts?id=${contact.id}`)}
              >
                <View style={[styles.contactAvatar, { backgroundColor: 
                  contact.status === 'hot' ? '#EF4444' : contact.status === 'warm' ? '#F59E0B' : '#3B82F6' }]}>
                  <Text style={styles.contactInitial}>{contact.name.charAt(0)}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactName, { color: theme.colors.text }]}>{contact.name}</Text>
                  <Text style={[styles.contactCompany, { color: theme.colors.textSecondary }]}>{contact.company}</Text>
                </View>
                <View style={styles.contactMeta}>
                  <Text style={[styles.contactValue, { color: '#10B981' }]}>{contact.value}</Text>
                  <Text style={[styles.contactTime, { color: theme.colors.textSecondary }]}>{contact.lastContact}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Active Campaigns */}
          <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Campaigns</Text>
              <TouchableOpacity onPress={() => router.push('/ai-agent/social-crm/campaigns')}>
                <Text style={[styles.seeAll, { color: '#3B82F6' }]}>See All</Text>
              </TouchableOpacity>
            </View>
            {ACTIVE_CAMPAIGNS.map((campaign) => (
              <TouchableOpacity 
                key={campaign.id}
                style={[styles.campaignCard, { backgroundColor: theme.colors.background }]}
                onPress={() => router.push(`/ai-agent/social-crm/campaigns?id=${campaign.id}`)}
              >
                <View style={styles.campaignHeader}>
                  <Text style={[styles.campaignName, { color: theme.colors.text }]}>{campaign.name}</Text>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: campaign.status === 'active' ? '#10B98115' : '#F59E0B15' 
                  }]}>
                    <Text style={[styles.statusText, { 
                      color: campaign.status === 'active' ? '#10B981' : '#F59E0B' 
                    }]}>
                      {campaign.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                    <View style={[styles.progressFill, { 
                      width: `${campaign.progress}%`, 
                      backgroundColor: campaign.status === 'active' ? '#3B82F6' : '#F59E0B' 
                    }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
                    {campaign.progress}%
                  </Text>
                </View>
                <View style={styles.campaignStats}>
                  <Text style={[styles.campaignStat, { color: theme.colors.textSecondary }]}>
                    {campaign.leads} leads
                  </Text>
                  <Text style={[styles.campaignStat, { color: theme.colors.textSecondary }]}>
                    {campaign.conversions} conversions
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {activeTab === 'contacts' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>All Contacts</Text>
          {RECENT_CONTACTS.map((contact) => (
            <TouchableOpacity 
              key={contact.id}
              style={[styles.contactRow, { backgroundColor: theme.colors.background }]}
              onPress={() => router.push(`/ai-agent/social-crm/contact-detail?id=${contact.id}`)}
            >
              <View style={[styles.contactAvatar, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.contactInitial}>{contact.name.charAt(0)}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={[styles.contactName, { color: theme.colors.text }]}>{contact.name}</Text>
                <Text style={[styles.contactCompany, { color: theme.colors.textSecondary }]}>{contact.company}</Text>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {activeTab === 'deals' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Deals</Text>
          {DEALS_PIPELINE.map((stage) => (
            <TouchableOpacity 
              key={stage.stage}
              style={[styles.dealStageCard, { backgroundColor: theme.colors.background }]}
              onPress={() => router.push(`/ai-agent/social-crm/deals?stage=${stage.stage}`)}
            >
              <View style={[styles.dealStageDot, { backgroundColor: stage.color }]} />
              <View style={styles.dealStageInfo}>
                <Text style={[styles.dealStageName, { color: theme.colors.text }]}>{stage.stage}</Text>
                <Text style={[styles.dealStageCount, { color: theme.colors.textSecondary }]}>
                  {stage.count} deals
                </Text>
              </View>
              <Text style={[styles.dealStageValue, { color: stage.color }]}>{stage.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {activeTab === 'campaigns' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>All Campaigns</Text>
          {ACTIVE_CAMPAIGNS.map((campaign) => (
            <TouchableOpacity 
              key={campaign.id}
              style={[styles.campaignCard, { backgroundColor: theme.colors.background }]}
              onPress={() => router.push(`/ai-agent/social-crm/campaign-detail?id=${campaign.id}`)}
            >
              <View style={styles.campaignHeader}>
                <Text style={[styles.campaignName, { color: theme.colors.text }]}>{campaign.name}</Text>
                <View style={[styles.statusBadge, { 
                  backgroundColor: campaign.status === 'active' ? '#10B98115' : '#F59E0B15' 
                }]}>
                  <Text style={[styles.statusText, { 
                    color: campaign.status === 'active' ? '#10B981' : '#F59E0B' 
                  }]}>
                    {campaign.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.campaignStats}>
                <Text style={[styles.campaignStat, { color: theme.colors.textSecondary }]}>
                  {campaign.leads} leads generated
                </Text>
                <Text style={[styles.campaignStat, { color: theme.colors.textSecondary }]}>
                  {campaign.conversions} conversions
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[
            { label: 'Add Contact', icon: UserPlus, route: '/ai-agent/social-crm/add-contact' },
            { label: 'New Deal', icon: Target, route: '/ai-agent/social-crm/add-deal' },
            { label: 'Campaign', icon: BarChart3, route: '/ai-agent/social-crm/add-campaign' },
            { label: 'Reports', icon: ChartBar, route: '/ai-agent/social-crm/reports' },
          ].map((act, i) => (
            <TouchableOpacity 
              key={act.label} 
              style={[styles.actionCard, { backgroundColor: '#3B82F615' }]}
              onPress={() => router.push(act.route as any)}
            >
              <act.icon size={24} color="#3B82F6" />
              <Text style={[styles.actionText, { color: '#3B82F6' }]}>{act.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  iconWrap: { width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  headerActions: { flexDirection: 'row', gap: 10 },
  actionBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 6 },
  subtitle: { fontSize: 15, marginBottom: 20 },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 16 },
  statIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statValue: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  statRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statLabel: { fontSize: 13 },
  statChange: { fontSize: 12, fontWeight: '700' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabText: { fontSize: 13, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  pipelineScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  pipelineCard: { width: 120, padding: 14, borderRadius: 12, marginRight: 10 },
  pipelineBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  pipelineStage: { fontSize: 12, fontWeight: '600', marginBottom: 8, marginLeft: 8 },
  pipelineCount: { fontSize: 22, fontWeight: '800', marginLeft: 8 },
  pipelineValue: { fontSize: 11, marginLeft: 8, marginTop: 2 },
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  contactAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  contactInitial: { color: '#fff', fontSize: 18, fontWeight: '700' },
  contactInfo: { flex: 1, marginLeft: 12 },
  contactName: { fontSize: 15, fontWeight: '600' },
  contactCompany: { fontSize: 13, marginTop: 2 },
  contactMeta: { alignItems: 'flex-end' },
  contactValue: { fontSize: 14, fontWeight: '700' },
  contactTime: { fontSize: 11, marginTop: 2 },
  campaignCard: { padding: 16, borderRadius: 12, marginBottom: 12 },
  campaignHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  campaignName: { fontSize: 15, fontWeight: '600', flex: 1 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  progressBar: { flex: 1, height: 6, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  progressText: { fontSize: 12, fontWeight: '600' },
  campaignStats: { flexDirection: 'row', gap: 16 },
  campaignStat: { fontSize: 12 },
  dealStageCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 10 },
  dealStageDot: { width: 12, height: 12, borderRadius: 6 },
  dealStageInfo: { flex: 1, marginLeft: 12 },
  dealStageName: { fontSize: 15, fontWeight: '600' },
  dealStageCount: { fontSize: 13, marginTop: 2 },
  dealStageValue: { fontSize: 16, fontWeight: '700' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
