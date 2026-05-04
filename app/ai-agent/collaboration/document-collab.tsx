import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, FileText, Folder, FilePlus, Search, Funnel, MoreVertical,
  Users, Clock, Edit3, MessageSquare, Share2, Star, CheckCircle,
  ChevronRight, FileCode, FileSpreadsheet, FileImage, Zap,
  History, Download, Trash2, Move
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const FOLDERS = [
  { id: '1', name: 'Product Docs', count: 12, updated: '2 hours ago' },
  { id: '2', name: 'Marketing Assets', count: 8, updated: '5 hours ago' },
  { id: '3', name: 'Financial Reports', count: 24, updated: '1 day ago' },
  { id: '4', name: 'Meeting Notes', count: 45, updated: '3 hours ago' },
];

const DOCUMENTS = [
  {
    id: '1',
    name: 'Q1 Product Roadmap',
    type: 'doc',
    size: '2.4 MB',
    updated: '30 min ago',
    author: 'Sarah Chen',
    collaborators: ['Mike', 'David', 'Emma'],
    starred: true,
    aiSummary: 'Product strategy for Q1 including AI features integration',
    comments: 12,
    version: 'v2.4'
  },
  {
    id: '2',
    name: 'Marketing Campaign Budget',
    type: 'sheet',
    size: '1.8 MB',
    updated: '1 hour ago',
    author: 'Lisa Thompson',
    collaborators: ['John', 'Sarah'],
    starred: false,
    aiSummary: 'Budget allocation across channels with ROI projections',
    comments: 5,
    version: 'v1.2'
  },
  {
    id: '3',
    name: 'Design System Guidelines',
    type: 'doc',
    size: '5.6 MB',
    updated: '2 hours ago',
    author: 'Emma Rodriguez',
    collaborators: ['David', 'Mike', 'Anna'],
    starred: true,
    aiSummary: 'Updated design tokens and component library specifications',
    comments: 23,
    version: 'v3.1'
  },
  {
    id: '4',
    name: 'User Research Analysis',
    type: 'doc',
    size: '3.2 MB',
    updated: '4 hours ago',
    author: 'James Wilson',
    collaborators: ['Sarah'],
    starred: false,
    aiSummary: 'Customer interview insights and pain point analysis',
    comments: 8,
    version: 'v1.0'
  },
  {
    id: '5',
    name: 'API Documentation',
    type: 'doc',
    size: '4.1 MB',
    updated: 'Yesterday',
    author: 'David Kim',
    collaborators: ['Mike', 'Alex', 'Lisa', 'Tom'],
    starred: true,
    aiSummary: 'Complete API reference with authentication flows',
    comments: 15,
    version: 'v4.0'
  },
];

const RECENT_ACTIVITY = [
  { user: 'Sarah Chen', action: 'edited', document: 'Q1 Product Roadmap', time: '30 min ago' },
  { user: 'Mike Johnson', action: 'commented on', document: 'API Documentation', time: '1 hour ago' },
  { user: 'Lisa Thompson', action: 'shared', document: 'Marketing Campaign Budget', time: '2 hours ago' },
];

const FILE_TYPES = {
  doc: { icon: FileText, color: '#3B82F6' },
  sheet: { icon: FileSpreadsheet, color: '#10B981' },
  code: { icon: FileCode, color: '#F59E0B' },
  image: { icon: FileImage, color: '#EC4899' },
};

const FILTERS = ['All', 'Documents', 'Spreadsheets', 'Presentations', 'Images'];

export default function DocumentCollaborationScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const getFileIcon = (type: string) => {
    const config = FILE_TYPES[type as keyof typeof FILE_TYPES] || FILE_TYPES.doc;
    return <config.icon size={24} color={config.color} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Documents
          </Text>
          <TouchableOpacity style={[styles.newBtn, { backgroundColor: '#3B82F6' }]}>
            <FilePlus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search documents..."
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
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterChip,
                selectedFilter === filter && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Text style={[
                styles.filterText,
                { color: selectedFilter === filter ? '#fff' : theme.colors.text }
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Folders */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Folders
          </Text>
          <View style={styles.foldersGrid}>
            {FOLDERS.map((folder, i) => (
              <Animated.View key={folder.id} entering={FadeInUp.delay(i * 50)}>
                <TouchableOpacity style={[styles.folderCard, { backgroundColor: theme.colors.background }]}>
                  <View style={styles.folderHeader}>
                    <Folder size={28} color="#F59E0B" />
                    <Text style={[styles.folderCount, { color: theme.colors.textSecondary }]}>
                      {folder.count}
                    </Text>
                  </View>
                  <Text style={[styles.folderName, { color: theme.colors.text }]}>
                    {folder.name}
                  </Text>
                  <Text style={[styles.folderUpdated, { color: theme.colors.textSecondary }]}>
                    Updated {folder.updated}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Documents */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recent Documents
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: '#3B82F6' }]}>See All</Text>
            </TouchableOpacity>
          </View>

          {DOCUMENTS.map((doc, i) => (
            <Animated.View key={doc.id} entering={FadeInUp.delay(i * 50)}>
              <TouchableOpacity
                style={[styles.docCard, { backgroundColor: theme.colors.background }]}
                onPress={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
              >
                <View style={styles.docHeader}>
                  <View style={styles.docLeft}>
                    <View style={styles.docIcon}>
                      {getFileIcon(doc.type)}
                    </View>
                    <View>
                      <View style={styles.docNameRow}>
                        <Text style={[styles.docName, { color: theme.colors.text }]}>
                          {doc.name}
                        </Text>
                        {doc.starred && (
                          <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        )}
                      </View>
                      <Text style={[styles.docMeta, { color: theme.colors.textSecondary }]}>
                        {doc.size} • {doc.version}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreBtn}>
                    <MoreVertical size={18} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </View>

                {/* AI Summary */}
                <View style={styles.aiSection}>
                  <View style={styles.aiBadge}>
                    <Zap size={12} color="#8B5CF6" />
                    <Text style={[styles.aiText, { color: '#8B5CF6' }]}>AI Summary</Text>
                  </View>
                  <Text style={[styles.aiSummary, { color: theme.colors.textSecondary }]}>
                    {doc.aiSummary}
                  </Text>
                </View>

                {/* Doc Footer */}
                <View style={styles.docFooter}>
                  <View style={styles.collaborators}>
                    {doc.collaborators.slice(0, 3).map((user, j) => (
                      <View key={j} style={[styles.collabAvatar, { backgroundColor: '#3B82F6', marginLeft: j > 0 ? -8 : 0, zIndex: 3 - j }]}>
                        <Text style={styles.collabText}>{user.charAt(0)}</Text>
                      </View>
                    ))}
                    {doc.collaborators.length > 3 && (
                      <View style={[styles.moreCollabs, { backgroundColor: theme.colors.background }]}>
                        <Text style={[styles.moreCollabsText, { color: theme.colors.text }]}>
                          +{doc.collaborators.length - 3}
                        </Text>
                      </View>
                    )}
                    <Text style={[styles.authorText, { color: theme.colors.textSecondary }]}>
                      by {doc.author}
                    </Text>
                  </View>
                  <View style={styles.docStats}>
                    <View style={styles.statItem}>
                      <MessageSquare size={14} color={theme.colors.textSecondary} />
                      <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
                        {doc.comments}
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Clock size={14} color={theme.colors.textSecondary} />
                      <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
                        {doc.updated}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Expanded Actions */}
                {selectedDoc === doc.id && (
                  <View style={styles.expandedActions}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#3B82F615' }]}>
                      <Edit3 size={16} color="#3B82F6" />
                      <Text style={[styles.actionText, { color: '#3B82F6' }]}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#10B98115' }]}>
                      <Share2 size={16} color="#10B981" />
                      <Text style={[styles.actionText, { color: '#10B981' }]}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B15' }]}>
                      <Download size={16} color="#F59E0B" />
                      <Text style={[styles.actionText, { color: '#F59E0B' }]}>Download</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF444415' }]}>
                      <Trash2 size={16} color="#EF4444" />
                      <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={[styles.section, { backgroundColor: theme.colors.card, marginBottom: 30 }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Activity
          </Text>
          {RECENT_ACTIVITY.map((activity, i) => (
            <Animated.View key={i} entering={FadeInUp.delay(i * 50)}>
              <View style={[styles.activityRow, { backgroundColor: theme.colors.background }]}>
                <View style={styles.activityLeft}>
                  <View style={styles.activityAvatar}>
                    <Text style={styles.activityAvatarText}>{activity.user.charAt(0)}</Text>
                  </View>
                  <Text style={[styles.activityText, { color: theme.colors.text }]}>
                    <Text style={{ fontWeight: '600' }}>{activity.user}</Text> {activity.action}{' '}
                    <Text style={{ fontWeight: '600' }}>{activity.document}</Text>
                  </Text>
                </View>
                <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                  {activity.time}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', flex: 1, marginLeft: 12 },
  newBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  filterScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  filterText: { fontSize: 13, fontWeight: '600' },
  content: {},
  section: { marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  seeAll: { fontSize: 14, fontWeight: '600' },
  foldersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  folderCard: { width: '47%', padding: 14, borderRadius: 12 },
  folderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  folderCount: { fontSize: 14, fontWeight: '600' },
  folderName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  folderUpdated: { fontSize: 11 },
  docCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  docHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  docLeft: { flexDirection: 'row', gap: 12, flex: 1 },
  docIcon: { width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  docNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  docName: { fontSize: 15, fontWeight: '600' },
  docMeta: { fontSize: 12, marginTop: 2 },
  moreBtn: { padding: 4 },
  aiSection: { marginBottom: 12 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  aiText: { fontSize: 11, fontWeight: '700' },
  aiSummary: { fontSize: 12, lineHeight: 18 },
  docFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  collaborators: { flexDirection: 'row', alignItems: 'center' },
  collabAvatar: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  collabText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  moreCollabs: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff', marginLeft: -8 },
  moreCollabsText: { fontSize: 10, fontWeight: '700' },
  authorText: { fontSize: 12, marginLeft: 8 },
  docStats: { flexDirection: 'row', gap: 12 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 12 },
  expandedActions: { flexDirection: 'row', gap: 8, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  actionText: { fontSize: 12, fontWeight: '600' },
  activityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 8 },
  activityLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  activityAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' },
  activityAvatarText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  activityText: { flex: 1, fontSize: 13, lineHeight: 18 },
  activityTime: { fontSize: 12 },
});
