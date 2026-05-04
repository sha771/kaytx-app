import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Plus, Search, Funnel, Target, UserPlus, Phone, Mail, 
  Calendar, Star, MoreVertical, TrendingUp, TrendingDown, Clock, 
  CheckCircle, XCircle, AlertCircle, ArrowRight, Zap
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const LEAD_SOURCES = [
  { name: 'Website', count: 245, percentage: 35, color: '#3B82F6' },
  { name: 'Social Media', count: 189, percentage: 27, color: '#EC4899' },
  { name: 'Referrals', count: 134, percentage: 19, color: '#10B981' },
  { name: 'Email Campaign', count: 89, percentage: 13, color: '#F59E0B' },
  { name: 'Events', count: 45, percentage: 6, color: '#8B5CF6' },
];

const LEADS = [
  {
    id: '1',
    name: 'Alex Thompson',
    company: 'TechStart Inc.',
    email: 'alex@techstart.com',
    phone: '+1 (555) 123-4567',
    source: 'Website',
    status: 'new',
    score: 85,
    temperature: 'hot',
    lastActivity: '2 hours ago',
    assigned: 'Sarah Chen',
    value: '$25K',
    aiRecommended: true
  },
  {
    id: '2',
    name: 'Maria Garcia',
    company: 'Growth Labs',
    email: 'maria@growthlabs.io',
    phone: '+1 (555) 234-5678',
    source: 'Social Media',
    status: 'contacted',
    score: 72,
    temperature: 'warm',
    lastActivity: '1 day ago',
    assigned: 'Mike Johnson',
    value: '$18K',
    aiRecommended: false
  },
  {
    id: '3',
    name: 'James Wilson',
    company: 'InnovateCo',
    email: 'james@innovate.co',
    phone: '+1 (555) 345-6789',
    source: 'Referral',
    status: 'qualified',
    score: 91,
    temperature: 'hot',
    lastActivity: '5 hours ago',
    assigned: 'Sarah Chen',
    value: '$45K',
    aiRecommended: true
  },
  {
    id: '4',
    name: 'Emily Brown',
    company: 'Future Scale',
    email: 'emily@futurescale.com',
    phone: '+1 (555) 456-7890',
    source: 'Email Campaign',
    status: 'nurturing',
    score: 58,
    temperature: 'cold',
    lastActivity: '3 days ago',
    assigned: 'David Lee',
    value: '$12K',
    aiRecommended: false
  },
  {
    id: '5',
    name: 'Robert Taylor',
    company: 'NextGen Solutions',
    email: 'robert@nextgen.io',
    phone: '+1 (555) 567-8901',
    source: 'Website',
    status: 'new',
    score: 78,
    temperature: 'warm',
    lastActivity: '12 hours ago',
    assigned: 'Unassigned',
    value: '$32K',
    aiRecommended: true
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    company: 'CloudFirst',
    email: 'lisa@cloudfirst.com',
    phone: '+1 (555) 678-9012',
    source: 'Events',
    status: 'contacted',
    score: 66,
    temperature: 'warm',
    lastActivity: '2 days ago',
    assigned: 'Mike Johnson',
    value: '$22K',
    aiRecommended: false
  },
];

const STATUS_FILTERS = ['All', 'New', 'Contacted', 'Qualified', 'Nurturing', 'Converted'];
const TEMP_FILTERS = ['All', 'Hot', 'Warm', 'Cold'];

export default function LeadsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tempFilter, setTempFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const filteredLeads = LEADS.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter.toLowerCase();
    const matchesTemp = tempFilter === 'All' || lead.temperature === tempFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesTemp;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return '#3B82F6';
      case 'contacted': return '#F59E0B';
      case 'qualified': return '#10B981';
      case 'nurturing': return '#8B5CF6';
      case 'converted': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTempColor = (temp: string) => {
    switch(temp) {
      case 'hot': return '#EF4444';
      case 'warm': return '#F59E0B';
      case 'cold': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Lead Management
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              {LEADS.length} leads • {LEADS.filter(l => l.temperature === 'hot').length} hot
            </Text>
          </View>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: '#3B82F6' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Lead Source Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sourceScroll}>
          {LEAD_SOURCES.map((source, i) => (
            <View key={source.name} style={[styles.sourceCard, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.sourceDot, { backgroundColor: source.color }]} />
              <Text style={[styles.sourceCount, { color: theme.colors.text }]}>{source.count}</Text>
              <Text style={[styles.sourceName, { color: theme.colors.textSecondary }]}>{source.name}</Text>
              <Text style={[styles.sourcePercent, { color: source.color }]}>{source.percentage}%</Text>
            </View>
          ))}
        </ScrollView>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search leads..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Funnel size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Status Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {STATUS_FILTERS.map((filter) => (
            <TouchableOpacity
              key={Funnel}
              onPress={() => setStatusFilter(filter)}
              style={[
                styles.filterChip,
                statusFilter === filter && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Text style={[
                styles.filterText,
                { color: statusFilter === filter ? '#fff' : theme.colors.text }
              ]}>
                {Funnel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Temperature Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tempScroll}>
          {TEMP_FILTERS.map((filter) => (
            <TouchableOpacity
              key={Funnel}
              onPress={() => setTempFilter(filter)}
              style={[
                styles.tempChip,
                tempFilter === filter && { 
                  backgroundColor: filter === 'Hot' ? '#EF4444' : filter === 'Warm' ? '#F59E0B' : '#3B82F6' 
                }
              ]}
            >
              <Text style={[
                styles.tempText,
                { color: tempFilter === filter ? '#fff' : theme.colors.textSecondary }
              ]}>
                {Funnel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Leads List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredLeads.map((lead, index) => (
          <Animated.View key={lead.id} entering={FadeInUp.delay(index * 50)}>
            <TouchableOpacity
              style={[styles.leadCard, { backgroundColor: theme.colors.card }]}
              onPress={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
            >
              {/* Lead Header */}
              <View style={styles.leadHeader}>
                <View style={styles.leadLeft}>
                  <View style={[styles.leadAvatar, { backgroundColor: getTempColor(lead.temperature) }]}>
                    <Text style={styles.leadAvatarText}>{lead.name.charAt(0)}</Text>
                  </View>
                  <View>
                    <View style={styles.leadNameRow}>
                      <Text style={[styles.leadName, { color: theme.colors.text }]}>
                        {lead.name}
                      </Text>
                      {lead.aiRecommended && (
                        <View style={[styles.aiBadge, { backgroundColor: '#3B82F615' }]}>
                          <Zap size={10} color="#3B82F6" />
                          <Text style={[styles.aiBadgeText, { color: '#3B82F6' }]}>AI</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.leadCompany, { color: theme.colors.textSecondary }]}>
                      {lead.company}
                    </Text>
                  </View>
                </View>
                <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(lead.score) + '15' }]}>
                  <Text style={[styles.scoreText, { color: getScoreColor(lead.score) }]}>
                    {lead.score}
                  </Text>
                </View>
              </View>

              {/* Lead Info */}
              <View style={styles.leadInfo}>
                <View style={styles.infoRow}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(lead.status) + '15' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(lead.status) }]}>
                      {lead.status.toUpperCase()}
                    </Text>
                  </View>
                  <View style={[styles.tempBadge, { backgroundColor: getTempColor(lead.temperature) + '15' }]}>
                    <Text style={[styles.tempText, { color: getTempColor(lead.temperature) }]}>
                      {lead.temperature.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={[styles.sourceText, { color: theme.colors.textSecondary }]}>
                    via {lead.source}
                  </Text>
                </View>
                <View style={styles.leadMeta}>
                  <Clock size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                    {lead.lastActivity}
                  </Text>
                  <Text style={[styles.metaDot, { color: theme.colors.textSecondary }]}>•</Text>
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                    {lead.assigned}
                  </Text>
                </View>
              </View>

              {/* Lead Value & Actions */}
              <View style={styles.leadFooter}>
                <Text style={[styles.leadValue, { color: '#10B981' }]}>{lead.value}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                    <Phone size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                    <Mail size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                    <Calendar size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Expanded Details */}
              {selectedLead === lead.id && (
                <View style={[styles.expandedSection, { backgroundColor: theme.colors.background }]}>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Email</Text>
                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>{lead.email}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Phone</Text>
                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>{lead.phone}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Source</Text>
                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>{lead.source}</Text>
                  </View>
                  <View style={styles.expandedActions}>
                    <TouchableOpacity style={[styles.expandedBtn, { backgroundColor: '#3B82F6' }]}>
                      <Text style={styles.expandedBtnText}>Qualify Lead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.expandedBtn, { backgroundColor: '#EF4444' }]}>
                      <Text style={styles.expandedBtnText}>Mark Lost</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  addBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' },
  sourceScroll: { marginHorizontal: -16, paddingHorizontal: 16, marginBottom: 12 },
  sourceCard: { width: 100, padding: 12, borderRadius: 12, marginRight: 10, alignItems: 'center' },
  sourceDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 8 },
  sourceCount: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
  sourceName: { fontSize: 11, marginBottom: 4 },
  sourcePercent: { fontSize: 12, fontWeight: '700' },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 10, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  filterScroll: { marginBottom: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  filterText: { fontSize: 12, fontWeight: '600' },
  tempScroll: {},
  tempChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  tempText: { fontSize: 12, fontWeight: '600' },
  content: { padding: 16 },
  leadCard: { padding: 14, borderRadius: 16, marginBottom: 12 },
  leadHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  leadLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  leadAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  leadAvatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  leadNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  leadName: { fontSize: 15, fontWeight: '600' },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  aiBadgeText: { fontSize: 9, fontWeight: '700' },
  leadCompany: { fontSize: 12, marginTop: 2 },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  scoreText: { fontSize: 14, fontWeight: '700' },
  leadInfo: { marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: '700' },
  tempBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  tempText: { fontSize: 10, fontWeight: '700' },
  sourceText: { fontSize: 12 },
  leadMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12 },
  metaDot: { fontSize: 12 },
  leadFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leadValue: { fontSize: 16, fontWeight: '700' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  expandedSection: { marginTop: 12, padding: 12, borderRadius: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { fontSize: 13 },
  detailValue: { fontSize: 13, fontWeight: '600' },
  expandedActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  expandedBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  expandedBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
