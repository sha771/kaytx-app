 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { FileText, Plus, Download, Share2, Folder, Clock, Eye } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SharedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  sharedBy: string;
  sharedWith: string[];
  uploadedAt: string;
  views: number;
  downloads: number;
  folder: string;
}

export default function FileSharingScreen() {
  const insets = useSafeAreaInsets();
  const [files] = useState<SharedFile[]>([
    {
      id: '1',
      name: 'Q4 Marketing Plan.pdf',
      type: 'PDF',
      size: '2.4 MB',
      sharedBy: 'John Smith',
      sharedWith: ['Marketing Team', 'Sales Team'],
      uploadedAt: '2 hours ago',
      views: 45,
      downloads: 12,
      folder: 'Marketing',
    },
    {
      id: '2',
      name: 'Sales Report 2024.xlsx',
      type: 'Excel',
      size: '1.8 MB',
      sharedBy: 'Sarah Johnson',
      sharedWith: ['Management', 'Sales Team'],
      uploadedAt: '1 day ago',
      views: 78,
      downloads: 23,
      folder: 'Reports',
    },
    {
      id: '3',
      name: 'Product Demo Video.mp4',
      type: 'Video',
      size: '45.2 MB',
      sharedBy: 'Mike Wilson',
      sharedWith: ['Everyone'],
      uploadedAt: '3 days ago',
      views: 156,
      downloads: 45,
      folder: 'Media',
    },
    {
      id: '4',
      name: 'Brand Guidelines.pdf',
      type: 'PDF',
      size: '5.1 MB',
      sharedBy: 'Emily Brown',
      sharedWith: ['Marketing Team', 'Design Team'],
      uploadedAt: '1 week ago',
      views: 234,
      downloads: 67,
      folder: 'Design',
    },
  ]);

  const getFileIcon = (type: string) => {
    return <FileText size={24} color="#60A5FA" />;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'PDF': '#EF4444',
      'Excel': '#10B981',
      'Video': '#F59E0B',
      'Document': '#60A5FA',
    };
    return colors[type] || '#6B7280';
  };

  const totalSize = files.reduce((sum, file) => {
    const size = parseFloat(file.size);
    return sum + size;
  }, 0);

  const totalViews = files.reduce((sum, file) => sum + file.views, 0);
  const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'File Sharing',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Shared Files</Text>
            <Text style={styles.headerSubtitle}>{files.length} files • {totalSize.toFixed(1)} MB</Text>
          </View>
          <TouchableOpacity style={styles.uploadButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <FileText size={18} color="#60A5FA" />
          <Text style={styles.statValue}>{files.length}</Text>
          <Text style={styles.statLabel}>Files</Text>
        </View>
        <View style={styles.statCard}>
          <Eye size={18} color="#10B981" />
          <Text style={styles.statValue}>{totalViews}</Text>
          <Text style={styles.statLabel}>Views</Text>
        </View>
        <View style={styles.statCard}>
          <Download size={18} color="#F59E0B" />
          <Text style={styles.statValue}>{totalDownloads}</Text>
          <Text style={styles.statLabel}>Downloads</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {files.map((file) => (
          <TouchableOpacity key={file.id} style={styles.fileCard}>
            <View style={styles.fileHeader}>
              <View style={styles.fileIconContainer}>
                {getFileIcon(file.type)}
              </View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{file.name}</Text>
                <View style={styles.fileMetaRow}>
                  <View style={[styles.typeBadge, { backgroundColor: getTypeColor(file.type) + '20' }]}>
                    <Text style={[styles.typeText, { color: getTypeColor(file.type) }]}>
                      {file.type}
                    </Text>
                  </View>
                  <Text style={styles.fileSize}>{file.size}</Text>
                </View>
              </View>
            </View>

            <View style={styles.fileDetails}>
              <View style={styles.detailItem}>
                <Folder size={14} color="#9CA3AF" />
                <Text style={styles.detailText}>{file.folder}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={14} color="#9CA3AF" />
                <Text style={styles.detailText}>{file.uploadedAt}</Text>
              </View>
            </View>

            <View style={styles.sharedInfo}>
              <Text style={styles.sharedLabel}>Shared by:</Text>
              <Text style={styles.sharedValue}>{file.sharedBy}</Text>
            </View>

            <View style={styles.sharedWithSection}>
              <Text style={styles.sharedWithLabel}>Shared with:</Text>
              <View style={styles.sharedWithList}>
                {file.sharedWith.map((team, index) => (
                  <View key={index} style={styles.teamChip}>
                    <Text style={styles.teamText}>{team}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.fileStats}>
              <View style={styles.fileStat}>
                <Eye size={14} color="#60A5FA" />
                <Text style={styles.fileStatText}>{file.views} views</Text>
              </View>
              <View style={styles.fileStat}>
                <Download size={14} color="#10B981" />
                <Text style={styles.fileStatText}>{file.downloads} downloads</Text>
              </View>
            </View>

            <View style={styles.fileActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Eye size={16} color="#60A5FA" />
                <Text style={styles.actionButtonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Download size={16} color="#10B981" />
                <Text style={[styles.actionButtonText, { color: '#10B981' }]}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={16} color="#F59E0B" />
                <Text style={[styles.actionButtonText, { color: '#F59E0B' }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.uploadCard}>
          <Plus size={32} color="#60A5FA" />
          <Text style={styles.uploadCardTitle}>Upload New File</Text>
          <Text style={styles.uploadCardDescription}>Share files with your team</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60A5FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  fileCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  fileHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  fileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  fileMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  fileSize: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  fileDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  sharedInfo: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  sharedLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  sharedValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  sharedWithSection: {
    marginBottom: 12,
  },
  sharedWithLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  sharedWithList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  teamChip: {
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  teamText: {
    fontSize: 11,
    color: '#93C5FD',
  },
  fileStats: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
    marginBottom: 12,
  },
  fileStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fileStatText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  fileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#60A5FA',
  },
  uploadCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  uploadCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  uploadCardDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
