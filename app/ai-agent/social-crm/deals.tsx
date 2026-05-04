import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Plus, Search, Funnel, TrendingUp, DollarSign, Calendar, 
  User, Building2, MoreVertical, ArrowUpRight, ArrowDownRight, Target
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const PIPELINE_STAGES = [
  { id: 'lead', name: 'Lead', count: 156, value: 890000, color: '#3B82F6', deals: [] },
  { id: 'qualified', name: 'Qualified', count: 89, value: 567000, color: '#8B5CF6', deals: [] },
  { id: 'proposal', name: 'Proposal', count: 45, value: 345000, color: '#F59E0B', deals: [] },
  { id: 'negotiation', name: 'Negotiation', count: 23, value: 234000, color: '#EF4444', deals: [] },
  { id: 'closed', name: 'Closed Won', count: 67, value: 1200000, color: '#10B981', deals: [] },
];

const DEALS = [
  { 
    id: '1', 
    name: 'Enterprise Software License', 
    company: 'TechCorp Inc.',
    contact: 'Sarah Johnson',
    value: 145000,
    stage: 'negotiation',
    probability: 75,
    closeDate: '2026-06-15',
    priority: 'high',
    lastActivity: '2 days ago'
  },
  { 
    id: '2', 
    name: 'Cloud Migration Project', 
    company: 'Global Solutions',
    contact: 'Michael Chen',
    value: 89000,
    stage: 'proposal',
    probability: 60,
    closeDate: '2026-05-30',
    priority: 'medium',
    lastActivity: '5 hours ago'
  },
  { 
    id: '3', 
    name: 'Analytics Platform', 
    company: 'DataDriven Co',
    contact: 'Lisa Thompson',
    value: 67000,
    stage: 'qualified',
    probability: 45,
    closeDate: '2026-07-01',
    priority: 'medium',
    lastActivity: '1 day ago'
  },
  { 
    id: '4', 
    name: 'AI Integration Suite', 
    company: 'Future Systems',
    contact: 'David Kim',
    value: 234000,
    stage: 'proposal',
    probability: 55,
    closeDate: '2026-06-01',
    priority: 'high',
    lastActivity: '3 hours ago'
  },
  { 
    id: '5', 
    name: 'Security Audit', 
    company: 'SecureNet LLC',
    contact: 'Robert Martinez',
    value: 45000,
    stage: 'lead',
    probability: 25,
    closeDate: '2026-08-15',
    priority: 'low',
    lastActivity: '1 week ago'
  },
];

const VIEWS = ['Pipeline', 'List', 'Forecast', 'Activity'];

export default function DealsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeView, setActiveView] = useState('Pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Deals</Text>
          <TouchableOpacity style={styles.backBtn}>
            <Plus size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#10B98115' }]}>
              <TrendingUp size={20} color="#10B981" />
            </View>
            <View>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>$2.4M</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Pipeline</Text>
            </View>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#3B82F615' }]}>
              <Target size={20} color="#3B82F6" />
            </View>
            <View>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>380</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Open Deals</Text>
            </View>
          </View>
        </View>

        {/* Search & Filter */}
        <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search deals..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Funnel size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* View Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.viewScroll}>
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
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pipeline Overview */}
        {activeView === 'Pipeline' && (
          <>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.pipelineScroll}
              contentContainerStyle={styles.pipelineContent}
            >
              {PIPELINE_STAGES.map((stage, index) => (
                <Animated.View 
                  key={stage.id} 
                  entering={FadeInUp.delay(index * 100)}
                  style={[styles.stageColumn, { backgroundColor: theme.colors.card }]}
                >
                  <View style={[styles.stageHeader, { borderBottomColor: stage.color }]}>
                    <View style={[styles.stageDot, { backgroundColor: stage.color }]} />
                    <Text style={[styles.stageName, { color: theme.colors.text }]}>{stage.name}</Text>
                    <View style={[styles.stageCount, { backgroundColor: stage.color + '15' }]}>
                      <Text style={[styles.stageCountText, { color: stage.color }]}>{stage.count}</Text>
                    </View>
                  </View>
                  <Text style={[styles.stageValue, { color: theme.colors.textSecondary }]}>
                    {formatCurrency(stage.value)}
                  </Text>
                  
                  {/* Stage Deals */}
                  <View style={styles.stageDeals}>
                    {DEALS.filter(d => d.stage === stage.id).map((deal) => (
                      <TouchableOpacity 
                        key={deal.id}
                        style={[styles.dealCard, { backgroundColor: theme.colors.background }]}
                        onPress={() => router.push(`/ai-agent/social-crm/deal-detail?id=${deal.id}`)}
                      >
                        <View style={styles.dealHeader}>
                          <Text style={[styles.dealName, { color: theme.colors.text }]} numberOfLines={2}>
                            {deal.name}
                          </Text>
                          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(deal.priority) + '15' }]}>
                            <Text style={[styles.priorityText, { color: getPriorityColor(deal.priority) }]}>
                              {deal.priority}
                            </Text>
                          </View>
                        </View>
                        <Text style={[styles.dealCompany, { color: theme.colors.textSecondary }]}>
                          {deal.company}
                        </Text>
                        <View style={styles.dealFooter}>
                          <Text style={[styles.dealValue, { color: '#10B981' }]}>
                            {formatCurrency(deal.value)}
                          </Text>
                          <View style={styles.probabilityBadge}>
                            <Text style={[styles.probabilityText, { color: theme.colors.textSecondary }]}>
                              {deal.probability}%
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                    
                    {DEALS.filter(d => d.stage === stage.id).length === 0 && (
                      <View style={[styles.emptyStage, { backgroundColor: theme.colors.background }]}>
                        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                          No deals in this stage
                        </Text>
                      </View>
                    )}
                  </View>
                </Animated.View>
              ))}
            </ScrollView>
          </>
        )}

        {activeView === 'List' && (
          <View style={styles.listSection}>
            {DEALS.map((deal, index) => (
              <Animated.View key={deal.id} entering={FadeInUp.delay(index * 50)}>
                <TouchableOpacity 
                  style={[styles.listDealCard, { backgroundColor: theme.colors.card }]}
                  onPress={() => router.push(`/ai-agent/social-crm/deal-detail?id=${deal.id}`)}
                >
                  <View style={styles.listDealMain}>
                    <View style={[styles.stageIndicator, { backgroundColor: 
                      PIPELINE_STAGES.find(s => s.id === deal.stage)?.color || '#6B7280' 
                    }]} />
                    <View style={styles.listDealInfo}>
                      <Text style={[styles.listDealName, { color: theme.colors.text }]}>{deal.name}</Text>
                      <View style={styles.listDealMeta}>
                        <Building2 size={14} color={theme.colors.textSecondary} />
                        <Text style={[styles.listDealCompany, { color: theme.colors.textSecondary }]}>
                          {deal.company}
                        </Text>
                      </View>
                      <View style={styles.listDealMeta}>
                        <User size={14} color={theme.colors.textSecondary} />
                        <Text style={[styles.listDealContact, { color: theme.colors.textSecondary }]}>
                          {deal.contact}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.listDealRight}>
                    <Text style={[styles.listDealValue, { color: '#10B981' }]}>
                      {formatCurrency(deal.value)}
                    </Text>
                    <View style={styles.listDealStats}>
                      <View style={[styles.probBadge, { backgroundColor: theme.colors.background }]}>
                        <Text style={[styles.probText, { color: theme.colors.textSecondary }]}>
                          {deal.probability}%
                        </Text>
                      </View>
                      <View style={[styles.dateBadge, { backgroundColor: theme.colors.background }]}>
                        <Calendar size={12} color={theme.colors.textSecondary} />
                        <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}>
                          {deal.closeDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}
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
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  summaryCard: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 12 },
  summaryIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '800' },
  summaryLabel: { fontSize: 12, marginTop: 2 },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  viewScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  viewTab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  viewText: { fontSize: 13, fontWeight: '600' },
  content: { flex: 1 },
  pipelineScroll: { marginTop: 16 },
  pipelineContent: { paddingHorizontal: 16, paddingBottom: 20 },
  stageColumn: { width: 280, marginRight: 12, borderRadius: 16, padding: 12 },
  stageHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 12, borderBottomWidth: 2, marginBottom: 8 },
  stageDot: { width: 10, height: 10, borderRadius: 5 },
  stageName: { flex: 1, fontSize: 14, fontWeight: '700', marginLeft: 8 },
  stageCount: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  stageCountText: { fontSize: 12, fontWeight: '700' },
  stageValue: { fontSize: 13, fontWeight: '600', marginBottom: 12 },
  stageDeals: { gap: 8 },
  dealCard: { padding: 12, borderRadius: 12 },
  dealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  dealName: { flex: 1, fontSize: 13, fontWeight: '600', marginRight: 8 },
  priorityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  priorityText: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase' },
  dealCompany: { fontSize: 12, marginBottom: 8 },
  dealFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dealValue: { fontSize: 14, fontWeight: '700' },
  probabilityBadge: { backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  probabilityText: { fontSize: 11, fontWeight: '600' },
  emptyStage: { padding: 20, borderRadius: 12, alignItems: 'center' },
  emptyText: { fontSize: 12 },
  listSection: { padding: 16 },
  listDealCard: { flexDirection: 'row', padding: 16, borderRadius: 16, marginBottom: 12 },
  listDealMain: { flex: 1, flexDirection: 'row' },
  stageIndicator: { width: 4, borderRadius: 2, marginRight: 12 },
  listDealInfo: { flex: 1 },
  listDealName: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  listDealMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  listDealCompany: { fontSize: 12 },
  listDealContact: { fontSize: 12 },
  listDealRight: { alignItems: 'flex-end' },
  listDealValue: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  listDealStats: { flexDirection: 'row', gap: 6 },
  probBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  probText: { fontSize: 11, fontWeight: '600' },
  dateBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  dateText: { fontSize: 11 },
});
