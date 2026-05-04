import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutGrid, Users, FileText, Folder, Star, Clock, Search, Plus,
  MoreVertical, Funnel, Grid3X3, List, ChevronRight, Edit3, Share2,
  MessageSquare, CheckCircle, AlertCircle
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const WORKSPACES = [
  { 
    id: '1', 
    name: 'Product Development', 
    icon: LayoutGrid, 
    color: '#3B82F6',
    members: 12,
    files: 45,
    lastActive: '2 min ago',
    starred: true,
    aiAgent: 'Product AI'
  },
  { 
    id: '2', 
    name: 'Marketing Campaigns', 
    icon: FileText, 
    color: '#EC4899',
    members: 8,
    files: 23,
    lastActive: '15 min ago',
    starred: true,
    aiAgent: 'Marketing AI'
  },
  { 
    id: '3', 
    name: 'Sales Pipeline', 
    icon: Users, 
    color: '#10B981',
    members: 15,
    files: 67,
    lastActive: '1 hour ago',
    starred: false,
    aiAgent: 'Sales AI'
  },
  { 
    id: '4', 
    name: 'Customer Support', 
    icon: MessageSquare, 
    color: '#F59E0B',
    members: 20,
    files: 89,
    lastActive: 'Just now',
    starred: true,
    aiAgent: 'Support AI'
  },
  { 
    id: '5', 
    name: 'HR & Recruitment', 
    icon: Users, 
    color: '#8B5CF6',
    members: 6,
    files: 34,
    lastActive: '3 hours ago',
    starred: false,
    aiAgent: 'HR AI'
  },
  { 
    id: '6', 
    name: 'Finance & Accounting', 
    icon: FileText, 
    color: '#14B8A6',
    members: 5,
    files: 56,
    lastActive: '5 hours ago',
    starred: false,
    aiAgent: 'Finance AI'
  },
];

const RECENT_FILES = [
  { id: '1', name: 'Q2 Roadmap.docx', type: 'doc', size: '2.4 MB', updated: '10 min ago', workspace: 'Product Development', author: 'Sarah Chen' },
  { id: '2', name: 'Campaign Assets.zip', type: 'zip', size: '45.2 MB', updated: '30 min ago', workspace: 'Marketing Campaigns', author: 'Mike Johnson' },
  { id: '3', name: 'Sales Forecast.xlsx', type: 'sheet', size: '1.8 MB', updated: '1 hour ago', workspace: 'Sales Pipeline', author: 'David Lee' },
  { id: '4', name: 'Support Scripts.pdf', type: 'pdf', size: '3.2 MB', updated: '2 hours ago', workspace: 'Customer Support', author: 'Emma Wilson' },
];

const AI_INSIGHTS = [
  { id: '1', type: 'suggestion', message: '3 tasks in Product Development need your attention', workspace: 'Product Development', priority: 'high' },
  { id: '2', type: 'update', message: 'Marketing AI completed campaign analysis', workspace: 'Marketing Campaigns', priority: 'medium' },
  { id: '3', type: 'alert', message: 'Sales Pipeline approaching quarterly target', workspace: 'Sales Pipeline', priority: 'low' },
];

const VIEW_MODES = ['Grid', 'List'];
const FILTERS = ['All', 'Starred', 'Recent', 'Shared'];

export default function SharedWorkspaceScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('Grid');
  const [activeFilter, setActiveFilter] = useState('All');

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'doc': return <FileText size={20} color="#3B82F6" />;
      case 'sheet': return <Grid3X3 size={20} color="#10B981" />;
      case 'pdf': return <FileText size={20} color="#EF4444" />;
      case 'zip': return <Folder size={20} color="#F59E0B" />;
      default: return <FileText size={20} color={theme.colors.textSecondary} />;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconWrap, { backgroundColor: '#8B5CF615' }]}>
              <LayoutGrid size={28} color="#8B5CF6" />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                Shared Workspaces
              </Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                {WORKSPACES.length} workspaces • Collaborate with AI
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.newBtn, { backgroundColor: '#8B5CF6' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search workspaces, files, or AI agents..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Funnel size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterChip,
                activeFilter === filter && { backgroundColor: '#8B5CF6' }
              ]}
            >
              <Text style={[
                styles.filterText,
                { color: activeFilter === filter ? '#fff' : theme.colors.text }
              ]}>
                {Funnel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* AI Insights */}
      <View style={[styles.insightsSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            AI Insights
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: '#8B5CF6' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        {AI_INSIGHTS.map((insight, i) => (
          <Animated.View 
            key={insight.id}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.insightCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={[styles.insightIcon, { 
              backgroundColor: insight.type === 'alert' ? '#EF444415' : insight.type === 'suggestion' ? '#F59E0B15' : '#3B82F615' 
            }]}>
              {insight.type === 'alert' && <AlertCircle size={18} color="#EF4444" />}
              {insight.type === 'suggestion' && <CheckCircle size={18} color="#F59E0B" />}
              {insight.type === 'update' && <Clock size={18} color="#3B82F6" />}
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightMessage, { color: theme.colors.text }]}>
                {insight.message}
              </Text>
              <Text style={[styles.insightMeta, { color: theme.colors.textSecondary }]}>
                {insight.workspace} • AI Generated
              </Text>
            </View>
            <View style={[styles.priorityBadge, { 
              backgroundColor: insight.priority === 'high' ? '#EF444415' : insight.priority === 'medium' ? '#F59E0B15' : '#10B98115' 
            }]}>
              <Text style={[styles.priorityText, { 
                color: insight.priority === 'high' ? '#EF4444' : insight.priority === 'medium' ? '#F59E0B' : '#10B981' 
              }]}>
                {insight.priority.toUpperCase()}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Workspaces Grid */}
      <View style={[styles.workspacesSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Workspaces
          </Text>
          <View style={styles.viewToggle}>
            {VIEW_MODES.map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => setViewMode(mode)}
                style={[
                  styles.viewBtn,
                  viewMode === mode && { backgroundColor: '#8B5CF6' }
                ]}
              >
                {mode === 'Grid' ? (
                  <Grid3X3 size={16} color={viewMode === mode ? '#fff' : theme.colors.textSecondary} />
                ) : (
                  <List size={16} color={viewMode === mode ? '#fff' : theme.colors.textSecondary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={viewMode === 'Grid' ? styles.gridContainer : styles.listContainer}>
          {WORKSPACES.map((workspace, i) => (
            <Animated.View 
              key={workspace.id}
              entering={FadeInUp.delay(i * 50)}
            >
              <TouchableOpacity
                style={[
                  viewMode === 'Grid' ? styles.workspaceGridCard : styles.workspaceListCard,
                  { backgroundColor: theme.colors.background }
                ]}
                onPress={() => router.push(`/ai-agent/collaboration/workspace?id=${workspace.id}`)}
              >
                <View style={styles.workspaceHeader}>
                  <View style={[styles.workspaceIcon, { backgroundColor: workspace.color + '15' }]}>
                    <workspace.icon size={24} color={workspace.color} />
                  </View>
                  {workspace.starred && (
                    <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  )}
                </View>
                
                <Text style={[styles.workspaceName, { color: theme.colors.text }]}>
                  {workspace.name}
                </Text>
                
                <View style={styles.workspaceMeta}>
                  <View style={styles.metaItem}>
                    <Users size={14} color={theme.colors.textSecondary} />
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                      {workspace.members}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Folder size={14} color={theme.colors.textSecondary} />
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                      {workspace.files}
                    </Text>
                  </View>
                </View>

                <View style={styles.aiBadge}>
                  <View style={[styles.aiDot, { backgroundColor: '#10B981' }]} />
                  <Text style={[styles.aiText, { color: theme.colors.textSecondary }]}>
                    {workspace.aiAgent}
                  </Text>
                </View>

                <View style={styles.workspaceFooter}>
                  <Clock size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
                    {workspace.lastActive}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Recent Files */}
      <View style={[styles.filesSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Files
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: '#8B5CF6' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {RECENT_FILES.map((file, i) => (
          <Animated.View key={file.id} entering={FadeInUp.delay(i * 50)}>
            <TouchableOpacity style={[styles.fileCard, { backgroundColor: theme.colors.background }]}>
              <View style={styles.fileIcon}>
                {getFileIcon(file.type)}
              </View>
              <View style={styles.fileInfo}>
                <Text style={[styles.fileName, { color: theme.colors.text }]}>{file.name}</Text>
                <View style={styles.fileMeta}>
                  <Text style={[styles.fileMetaText, { color: theme.colors.textSecondary }]}>
                    {file.workspace}
                  </Text>
                  <Text style={[styles.fileDot, { color: theme.colors.textSecondary }]}>•</Text>
                  <Text style={[styles.fileMetaText, { color: theme.colors.textSecondary }]}>
                    {file.size}
                  </Text>
                </View>
              </View>
              <View style={styles.fileRight}>
                <Text style={[styles.fileTime, { color: theme.colors.textSecondary }]}>
                  {file.updated}
                </Text>
                <TouchableOpacity style={styles.fileAction}>
                  <MoreVertical size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  newBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  filterScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  filterText: { fontSize: 13, fontWeight: '600' },
  insightsSection: { marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  insightCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  insightIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  insightContent: { flex: 1, marginLeft: 12 },
  insightMessage: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
  insightMeta: { fontSize: 12 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  priorityText: { fontSize: 10, fontWeight: '700' },
  workspacesSection: { marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16 },
  viewToggle: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 8, padding: 2 },
  viewBtn: { padding: 6, borderRadius: 6 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  workspaceGridCard: { width: '48%', padding: 14, borderRadius: 12 },
  listContainer: { gap: 10 },
  workspaceListCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 },
  workspaceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  workspaceIcon: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  workspaceName: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  workspaceMeta: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  aiDot: { width: 6, height: 6, borderRadius: 3 },
  aiText: { fontSize: 11 },
  workspaceFooter: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  timeText: { fontSize: 11 },
  filesSection: { marginHorizontal: 16, marginTop: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  fileCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  fileIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  fileInfo: { flex: 1, marginLeft: 12 },
  fileName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  fileMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fileMetaText: { fontSize: 12 },
  fileDot: { fontSize: 12 },
  fileRight: { alignItems: 'flex-end' },
  fileTime: { fontSize: 11, marginBottom: 4 },
  fileAction: { padding: 4 },
});
