import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Plus, Search, Funnel, BarChart3, Users, Mail, MousePointer,
  TrendingUp, Calendar, MoreVertical, Play, Pause, Edit3, Trash2, Target
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const CAMPAIGNS = [
  {
    id: '1',
    name: 'Q2 Product Launch',
    type: 'Email',
    status: 'active',
    progress: 78,
    sent: 15420,
    opened: 5230,
    clicked: 1845,
    converted: 245,
    budget: 25000,
    spent: 19500,
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    audience: 'Enterprise Prospects'
  },
  {
    id: '2',
    name: 'Enterprise Outreach',
    type: 'Multi-Channel',
    status: 'active',
    progress: 65,
    sent: 8750,
    opened: 3150,
    clicked: 985,
    converted: 156,
    budget: 50000,
    spent: 32500,
    startDate: '2026-03-15',
    endDate: '2026-05-15',
    audience: 'C-Level Executives'
  },
  {
    id: '3',
    name: 'Product Demo Series',
    type: 'Webinar',
    status: 'scheduled',
    progress: 30,
    sent: 3200,
    opened: 1890,
    clicked: 756,
    converted: 89,
    budget: 15000,
    spent: 4500,
    startDate: '2026-05-15',
    endDate: '2026-07-15',
    audience: 'Product Evaluators'
  },
  {
    id: '4',
    name: 'Holiday Special',
    type: 'Social',
    status: 'draft',
    progress: 0,
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    budget: 30000,
    spent: 0,
    startDate: '2026-11-01',
    endDate: '2026-12-31',
    audience: 'All Customers'
  },
  {
    id: '5',
    name: 'Customer Retention',
    type: 'Email',
    status: 'active',
    progress: 92,
    sent: 45000,
    opened: 28500,
    clicked: 11250,
    converted: 1890,
    budget: 20000,
    spent: 18400,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    audience: 'Existing Customers'
  },
];

const VIEWS = ['All Campaigns', 'Active', 'Scheduled', 'Draft', 'Completed'];
const CHANNELS = ['All', 'Email', 'Social', 'Webinar', 'Ads', 'Multi-Channel'];

export default function CampaignsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeView, setActiveView] = useState('All Campaigns');
  const [activeChannel, setActiveChannel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = CAMPAIGNS.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesView = activeView === 'All Campaigns' || campaign.status === activeView.toLowerCase();
    const matchesChannel = activeChannel === 'All' || campaign.type === activeChannel;
    return matchesSearch && matchesView && matchesChannel;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return '#10B981';
      case 'scheduled': return '#3B82F6';
      case 'draft': return '#F59E0B';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Campaigns</Text>
          <TouchableOpacity style={styles.backBtn}>
            <Plus size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#3B82F615' }]}>
              <BarChart3 size={20} color="#3B82F6" />
            </View>
            <View>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>12</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Active</Text>
            </View>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#10B98115' }]}>
              <Users size={20} color="#10B981" />
            </View>
            <View>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>72.4K</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Reach</Text>
            </View>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#8B5CF615' }]}>
              <TrendingUp size={20} color="#8B5CF6" />
            </View>
            <View>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>5.2%</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Conv. Rate</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search campaigns..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Funnel size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* View Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          {VIEWS.map((view) => (
            <TouchableOpacity
              key={view}
              onPress={() => setActiveView(view)}
              style={[
                styles.viewTab,
                activeView === view && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Text style={[
                styles.viewText,
                { color: activeView === view ? '#fff' : theme.colors.text }
              ]}>
                {view}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Channel Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.channelScroll}>
          {CHANNELS.map((channel) => (
            <TouchableOpacity
              key={channel}
              onPress={() => setActiveChannel(channel)}
              style={[
                styles.channelChip,
                activeChannel === channel && { backgroundColor: '#8B5CF6' }
              ]}
            >
              <Text style={[
                styles.channelText,
                { color: activeChannel === channel ? '#fff' : theme.colors.textSecondary }
              ]}>
                {channel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Campaigns List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredCampaigns.map((campaign, index) => (
          <Animated.View key={campaign.id} entering={FadeInUp.delay(index * 50)}>
            <TouchableOpacity 
              style={[styles.campaignCard, { backgroundColor: theme.colors.card }]}
              onPress={() => router.push(`/ai-agent/social-crm/campaign-detail?id=${campaign.id}`)}
            >
              {/* Header */}
              <View style={styles.campaignHeader}>
                <View style={styles.campaignTitleSection}>
                  <Text style={[styles.campaignName, { color: theme.colors.text }]}>
                    {campaign.name}
                  </Text>
                  <View style={styles.campaignMeta}>
                    <View style={[styles.typeBadge, { backgroundColor: theme.colors.background }]}>
                      <Text style={[styles.typeText, { color: theme.colors.textSecondary }]}>
                        {campaign.type}
                      </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) + '15' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(campaign.status) }]}>
                        {campaign.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.campaignActions}>
                  {campaign.status === 'active' ? (
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B15' }]}>
                      <Pause size={18} color="#F59E0B" />
                    </TouchableOpacity>
                  ) : campaign.status === 'scheduled' ? (
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#10B98115' }]}>
                      <Play size={18} color="#10B981" />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                    <MoreVertical size={18} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Progress */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                    Campaign Progress
                  </Text>
                  <Text style={[styles.progressValue, { color: theme.colors.text }]}>
                    {campaign.progress}%
                  </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${campaign.progress}%`, 
                        backgroundColor: getStatusColor(campaign.status)
                      }
                    ]} 
                  />
                </View>
                <View style={styles.dateRow}>
                  <Calendar size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}>
                    {campaign.startDate} → {campaign.endDate}
                  </Text>
                </View>
              </View>

              {/* Stats Grid */}
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Mail size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                    {formatNumber(campaign.sent)}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Sent</Text>
                </View>
                <View style={styles.statBox}>
                  <Target size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                    {formatNumber(campaign.opened)}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Opened</Text>
                </View>
                <View style={styles.statBox}>
                  <MousePointer size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                    {formatNumber(campaign.clicked)}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Clicked</Text>
                </View>
                <View style={styles.statBox}>
                  <TrendingUp size={16} color={theme.colors.textSecondary} />
                  <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                    {formatNumber(campaign.converted)}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Converted</Text>
                </View>
              </View>

              {/* Budget */}
              <View style={[styles.budgetSection, { backgroundColor: theme.colors.background }]}>
                <View style={styles.budgetRow}>
                  <Text style={[styles.budgetLabel, { color: theme.colors.textSecondary }]}>
                    Budget
                  </Text>
                  <Text style={[styles.budgetValue, { color: theme.colors.text }]}>
                    ${(campaign.spent / 1000).toFixed(1)}K / ${(campaign.budget / 1000).toFixed(0)}K
                  </Text>
                </View>
                <View style={[styles.budgetBar, { backgroundColor: theme.colors.card }]}>
                  <View 
                    style={[
                      styles.budgetFill, 
                      { width: `${(campaign.spent / campaign.budget) * 100}%` }
                    ]} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryCard: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, gap: 10 },
  summaryIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  summaryValue: { fontSize: 16, fontWeight: '800' },
  summaryLabel: { fontSize: 11 },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  tabsScroll: { marginHorizontal: -16, paddingHorizontal: 16, marginBottom: 10 },
  viewTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  viewText: { fontSize: 13, fontWeight: '600' },
  channelScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  channelChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  channelText: { fontSize: 12, fontWeight: '500' },
  content: { padding: 16 },
  campaignCard: { padding: 16, borderRadius: 16, marginBottom: 16 },
  campaignHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  campaignTitleSection: { flex: 1 },
  campaignName: { fontSize: 17, fontWeight: '700', marginBottom: 8 },
  campaignMeta: { flexDirection: 'row', gap: 8 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  typeText: { fontSize: 11, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  campaignActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  progressSection: { marginBottom: 16 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  progressLabel: { fontSize: 13 },
  progressValue: { fontSize: 14, fontWeight: '700' },
  progressBar: { height: 8, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: 8, borderRadius: 4 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 12 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBox: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 16, fontWeight: '700', marginTop: 6, marginBottom: 2 },
  statLabel: { fontSize: 11 },
  budgetSection: { padding: 12, borderRadius: 12 },
  budgetRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  budgetLabel: { fontSize: 12 },
  budgetValue: { fontSize: 14, fontWeight: '700' },
  budgetBar: { height: 6, borderRadius: 3 },
  budgetFill: { height: 6, borderRadius: 3, backgroundColor: '#3B82F6' },
});
