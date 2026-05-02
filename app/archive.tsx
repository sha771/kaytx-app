 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Archive, Search, ListFilter, Download, Upload, Trash2, Star, Calendar } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function ArchiveScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filters = ['all', 'documents', 'images', 'videos', 'audio', 'other'];

  const archivedItems = [
    {
      id: '1',
      name: 'Q4 Marketing Report.pdf',
      type: 'documents',
      size: '2.4 MB',
      dateArchived: '2024-01-10T14:30:00Z',
      originalDate: '2023-12-31T23:59:00Z',
      category: 'Reports',
      tags: ['marketing', 'quarterly', 'analysis'],
      starred: true,
    },
    {
      id: '2',
      name: 'Campaign Images.zip',
      type: 'images',
      size: '15.7 MB',
      dateArchived: '2024-01-08T09:15:00Z',
      originalDate: '2023-12-15T16:20:00Z',
      category: 'Media',
      tags: ['campaign', 'social media', 'assets'],
      starred: false,
    },
    {
      id: '3',
      name: 'Team Meeting Recording.mp4',
      type: 'videos',
      size: '124.3 MB',
      dateArchived: '2024-01-05T11:45:00Z',
      originalDate: '2023-12-20T10:00:00Z',
      category: 'Meetings',
      tags: ['team', 'meeting', 'recording'],
      starred: false,
    },
    {
      id: '4',
      name: 'Customer Feedback Audio.mp3',
      type: 'audio',
      size: '8.9 MB',
      dateArchived: '2024-01-03T16:20:00Z',
      originalDate: '2023-12-18T14:30:00Z',
      category: 'Feedback',
      tags: ['customer', 'feedback', 'interview'],
      starred: true,
    },
    {
      id: '5',
      name: 'Old Website Backup.zip',
      type: 'other',
      size: '45.2 MB',
      dateArchived: '2023-12-28T08:00:00Z',
      originalDate: '2023-11-30T12:00:00Z',
      category: 'Backups',
      tags: ['website', 'backup', 'legacy'],
      starred: false,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'documents': return '📄';
      case 'images': return '🖼️';
      case 'videos': return '🎥';
      case 'audio': return '🎵';
      default: return '📁';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'documents': return theme.colors.primary;
      case 'images': return theme.colors.success;
      case 'videos': return theme.colors.error;
      case 'audio': return theme.colors.warning;
      default: return theme.colors.secondaryText;
    }
  };

  const filteredItems = archivedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleStar = (itemId: string) => {
    console.log(`Toggle star for item ${itemId}`);
  };

  const totalSize = archivedItems.reduce((acc, item) => {
    const size = parseFloat(item.size.split(' ')[0]);
    const unit = item.size.split(' ')[1];
    const sizeInMB = unit === 'GB' ? size * 1024 : size;
    return acc + sizeInMB;
  }, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Archive</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Upload size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Archive size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Archive Storage</Text>
          </View>
          <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
            Manage your archived files and documents
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Archive size={20} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {archivedItems.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Total Items
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Download size={20} color={theme.colors.success} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {totalSize.toFixed(1)} MB
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Total Size
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Star size={20} color={theme.colors.warning} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {archivedItems.filter(item => item.starred).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Starred
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.searchContainer}>
            <View style={[styles.searchInput, { borderColor: theme.colors.border }]}>
              <Search size={20} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Search archived items..."
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {filters.map((Filter) => (
                <TouchableOpacity
                  key={Filter}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: selectedFilter === Filter ? theme.colors.primary : 'transparent',
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setSelectedFilter(Filter)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      {
                        color: selectedFilter === Filter ? '#FFFFFF' : theme.colors.text,
                      },
                    ]}
                  >
                    {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {selectedItems.length > 0 && (
          <View style={[styles.actionBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.selectedCount, { color: theme.colors.text }]}>
              {selectedItems.length} selected
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
              >
                <Download size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
              >
                <Trash2 size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Archived Items ({filteredItems.length})
          </Text>
          
          <View style={styles.itemsList}>
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemCard,
                  {
                    borderColor: selectedItems.includes(item.id) ? theme.colors.primary : theme.colors.border,
                    backgroundColor: selectedItems.includes(item.id) ? `${theme.colors.primary}10` : 'transparent',
                  },
                ]}
                onPress={() => toggleItemSelection(item.id)}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.typeIcon}>{getTypeIcon(item.type)}</Text>
                    <View style={styles.itemDetails}>
                      <Text style={[styles.itemName, { color: theme.colors.text }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.itemCategory, { color: theme.colors.secondaryText }]}>
                        {item.category} • {item.size}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.starButton}
                    onPress={() => toggleStar(item.id)}
                  >
                    <Star 
                      size={20} 
                      color={item.starred ? theme.colors.warning : theme.colors.secondaryText}
                      fill={item.starred ? theme.colors.warning : 'none'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.itemMeta}>
                  <View style={styles.itemDates}>
                    <View style={styles.dateItem}>
                      <Calendar size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.dateText, { color: theme.colors.secondaryText }]}>
                        Archived: {new Date(item.dateArchived).toLocaleDateString()}
                      </Text>
                    </View>
                    <Text style={[styles.dateText, { color: theme.colors.secondaryText }]}>
                      Original: {new Date(item.originalDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemTags}>
                  {item.tags.map((tag, index) => (
                    <View 
                      key={index} 
                      style={[styles.tag, { backgroundColor: getTypeColor(item.type) }]}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <ListFilter size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Archive Tips</Text>
          </View>
          
          <View style={styles.tipsList}>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Use tags to organize and find archived items quickly
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Star important items for easy access later
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Regularly clean up old archived items to save space
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Download important files before deleting from archive
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Use search to quickly locate specific archived content
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  itemsList: {
    gap: 12,
  },
  itemCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 14,
  },
  starButton: {
    padding: 4,
  },
  itemMeta: {
    marginBottom: 12,
  },
  itemDates: {
    gap: 4,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
  },
  itemTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});