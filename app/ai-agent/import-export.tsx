import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Upload,
  Download,
  FileCode,
  FileSpreadsheet,
  CircleCheck,
  CircleAlert,
  Clock,
  EllipsisVertical,
  Folder,
  File,
  Trash2,
  RefreshCw,
  Globe,
  Database,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  GitBranch,
  ChartBar,
  Settings,
  Users,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface ImportJob {
  id: string;
  name: string;
  type: 'agent' | 'workflow' | 'knowledge' | 'settings';
  format: 'json' | 'yaml' | 'csv';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  itemsTotal: number;
  itemsProcessed: number;
  startedAt: string;
  errors: string[];
}

interface ExportJob {
  id: string;
  name: string;
  type: 'agent' | 'workflow' | 'knowledge' | 'analytics';
  format: 'json' | 'yaml' | 'csv' | 'pdf';
  status: 'queued' | 'generating' | 'ready' | 'expired';
  size: string;
  createdAt: string;
  expiresAt: string;
  downloadUrl?: string;
}

// Mock Data
const IMPORT_JOBS: ImportJob[] = [
  {
    id: '1',
    name: 'Sales Agent Configuration',
    type: 'agent',
    format: 'json',
    status: 'completed',
    progress: 100,
    itemsTotal: 1,
    itemsProcessed: 1,
    startedAt: '2026-03-01 09:30:00',
    errors: [],
  },
  {
    id: '2',
    name: 'Customer FAQ Dataset',
    type: 'knowledge',
    format: 'csv',
    status: 'processing',
    progress: 67,
    itemsTotal: 245,
    itemsProcessed: 164,
    startedAt: '2026-03-01 09:45:00',
    errors: [],
  },
  {
    id: '3',
    name: 'Workflow Definitions',
    type: 'workflow',
    format: 'yaml',
    status: 'failed',
    progress: 45,
    itemsTotal: 12,
    itemsProcessed: 5,
    startedAt: '2026-03-01 09:15:00',
    errors: ['Invalid workflow schema in file: onboarding-v2.yaml'],
  },
];

const EXPORT_JOBS: ExportJob[] = [
  {
    id: '1',
    name: 'Complete Agent Backup',
    type: 'agent',
    format: 'json',
    status: 'ready',
    size: '24.5 MB',
    createdAt: '2026-03-01 08:00:00',
    expiresAt: '2026-03-08 08:00:00',
    downloadUrl: '#',
  },
  {
    id: '2',
    name: 'Q1 Performance Report',
    type: 'analytics',
    format: 'pdf',
    status: 'generating',
    size: '-',
    createdAt: '2026-03-01 09:00:00',
    expiresAt: '2026-03-08 09:00:00',
  },
  {
    id: '3',
    name: 'Knowledge Base Export',
    type: 'knowledge',
    format: 'json',
    status: 'expired',
    size: '8.2 MB',
    createdAt: '2026-02-20 10:00:00',
    expiresAt: '2026-02-27 10:00:00',
  },
];

const STATUS_COLORS = {
  pending: '#9CA3AF',
  processing: '#3B82F6',
  completed: '#10B981',
  failed: '#EF4444',
  queued: '#9CA3AF',
  generating: '#F59E0B',
  ready: '#10B981',
  expired: '#6B7280',
};

const TYPE_ICONS = {
  agent: GitBranch,
  knowledge: Database,
  settings: Settings,
  analytics: ChartBar,
};

const FORMAT_ICONS = {
  json: FileCode,
  yaml: FileCode,
  csv: FileSpreadsheet,
  pdf: FileText,
};

export default function ImportExportScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'templates'>('import');
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'ready':
        return <CircleCheck size={16} color="#10B981" />;
      case 'failed':
        return <CircleAlert size={16} color="#EF4444" />;
      case 'processing':
      case 'generating':
        return <Clock size={16} color="#F59E0B" />;
      default:
        return <Clock size={16} color="#9CA3AF" />;
    }
  };

  const renderImportJobCard = (job: ImportJob, index: number) => {
    const TypeIcon = TYPE_ICONS[job.type];
    const FormatIcon = FORMAT_ICONS[job.format];

    return (
      <Animated.View
        key={job.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.jobCard, { backgroundColor: colors.card }]}
      >
        <View style={styles.jobHeader}>
          <View style={[styles.typeIcon, { backgroundColor: colors.tint + '15' }]}>
            <TypeIcon size={20} color={colors.tint} />
          </View>
          <View style={styles.jobInfo}>
            <Text style={[styles.jobName, { color: colors.text }]}>{job.name}</Text>
            <View style={styles.jobMeta}>
              <View style={[styles.formatBadge, { backgroundColor: colors.background }]}>
                <FormatIcon size={12} color={colors.icon} />
                <Text style={[styles.formatText, { color: colors.icon }]}>
                  {job.format.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.jobTime, { color: colors.icon }]}>
                {job.startedAt}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: STATUS_COLORS[job.status] + '15' },
            ]}
          >
            {getStatusIcon(job.status)}
            <Text
              style={[
                styles.statusText,
                { color: STATUS_COLORS[job.status] },
              ]}
            >
              {job.status}
            </Text>
          </View>
        </View>

        {(job.status === 'processing' || job.status === 'pending') && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${job.progress}%`, backgroundColor: colors.tint },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.tint }]}>
              {job.progress}% ({job.itemsProcessed}/{job.itemsTotal})
            </Text>
          </View>
        )}

        {job.errors.length > 0 && (
          <View style={[styles.errorContainer, { backgroundColor: '#EF4444' + '10' }]}>
            <CircleAlert size={14} color="#EF4444" />
            <Text style={[styles.errorText, { color: '#EF4444' }]}>
              {job.errors[0]}
            </Text>
          </View>
        )}

        {job.status === 'failed' && (
          <View style={styles.jobActions}>
            <TouchableOpacity style={[styles.retryButton, { backgroundColor: colors.tint + '15' }]}>
              <RefreshCw size={14} color={colors.tint} />
              <Text style={[styles.retryText, { color: colors.tint }]}>Retry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Trash2 size={14} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    );
  };

  const renderExportJobCard = (job: ExportJob, index: number) => {
    const TypeIcon = TYPE_ICONS[job.type];
    const FormatIcon = FORMAT_ICONS[job.format];

    return (
      <Animated.View
        key={job.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.jobCard, { backgroundColor: colors.card }]}
      >
        <View style={styles.jobHeader}>
          <View style={[styles.typeIcon, { backgroundColor: colors.tint + '15' }]}>
            <TypeIcon size={20} color={colors.tint} />
          </View>
          <View style={styles.jobInfo}>
            <Text style={[styles.jobName, { color: colors.text }]}>{job.name}</Text>
            <View style={styles.jobMeta}>
              <View style={[styles.formatBadge, { backgroundColor: colors.background }]}>
                <FormatIcon size={12} color={colors.icon} />
                <Text style={[styles.formatText, { color: colors.icon }]}>
                  {job.format.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.jobSize, { color: colors.icon }]}>
                {job.size}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: STATUS_COLORS[job.status] + '15' },
            ]}
          >
            {getStatusIcon(job.status)}
            <Text
              style={[
                styles.statusText,
                { color: STATUS_COLORS[job.status] },
              ]}
            >
              {job.status}
            </Text>
          </View>
        </View>

        <View style={styles.exportFooter}>
          <View>
            <Text style={[styles.footerLabel, { color: colors.icon }]}>
              Created: {job.createdAt}
            </Text>
            <Text style={[styles.footerLabel, { color: colors.icon }]}>
              Expires: {job.expiresAt}
            </Text>
          </View>

          {job.status === 'ready' && (
            <View style={styles.exportActions}>
              <TouchableOpacity style={[styles.downloadButton, { backgroundColor: colors.tint }]}>
                <Download size={14} color="white" />
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.copyButton, { backgroundColor: colors.background }]}>
                <Copy size={14} color={colors.icon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Import / Export
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Manage data migration
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'import' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('import')}
        >
          <Upload size={18} color={activeTab === 'import' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'import' ? 'white' : colors.text }]}>
            Import
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'export' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('export')}
        >
          <Download size={18} color={activeTab === 'export' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'export' ? 'white' : colors.text }]}>
            Export
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'templates' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('templates')}
        >
          <File size={18} color={activeTab === 'templates' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'templates' ? 'white' : colors.text }]}>
            Templates
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'import' && (
          <>
            {/* Upload Area */}
            <TouchableOpacity style={[styles.uploadCard, { backgroundColor: colors.tint + '10', borderColor: colors.tint }]}>
              <View style={[styles.uploadIcon, { backgroundColor: colors.tint + '15' }]}>
                <Upload size={28} color={colors.tint} />
              </View>
              <Text style={[styles.uploadTitle, { color: colors.text }]}>
                Upload Files
              </Text>
              <Text style={[styles.uploadSubtitle, { color: colors.icon }]}>
                Drag and drop or click to select files
              </Text>
              <Text style={[styles.uploadFormats, { color: colors.icon }]}>
                Supports: JSON, YAML, CSV
              </Text>
            </TouchableOpacity>

            {/* Format Selection */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Supported Formats
            </Text>
            <View style={styles.formatGrid}>
              {(['json', 'yaml', 'csv'] as const).map((format) => {
                const FormatIcon = FORMAT_ICONS[format];
                return (
                  <TouchableOpacity
                    key={format}
                    style={[
                      styles.formatCard,
                      { backgroundColor: colors.card },
                      selectedFormat === format && { borderColor: colors.tint, borderWidth: 2 },
                    ]}
                    onPress={() => setSelectedFormat(selectedFormat === format ? null : format)}
                  >
                    <View style={[styles.formatIcon, { backgroundColor: colors.tint + '15' }]}>
                      <FormatIcon size={24} color={colors.tint} />
                    </View>
                    <Text style={[styles.formatName, { color: colors.text }]}>
                      {format.toUpperCase()}
                    </Text>
                    <Text style={[styles.formatDesc, { color: colors.icon }]}>
                      {format === 'json' && 'Best for agents & workflows'}
                      {format === 'yaml' && 'Human-readable config'}
                      {format === 'csv' && 'Best for bulk data'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Recent Imports */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Imports
            </Text>
            {IMPORT_JOBS.map((job, index) => renderImportJobCard(job, index))}
          </>
        )}

        {activeTab === 'export' && (
          <>
            {/* Quick Export */}
            <View style={[styles.quickExportCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.quickExportTitle, { color: colors.text }]}>
                Quick Export
              </Text>
              <View style={styles.exportOptions}>
                <TouchableOpacity style={[styles.exportOption, { backgroundColor: colors.tint + '15' }]}>
                  <User size={20} color={colors.tint} />
                  <Text style={[styles.exportOptionText, { color: colors.tint }]}>
                    All Agents
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.exportOption, { backgroundColor: '#10B981' + '15' }]}>
                  <GitBranch size={20} color="#10B981" />
                  <Text style={[styles.exportOptionText, { color: '#10B981' }]}>
                    Workflows
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.exportOption, { backgroundColor: '#F59E0B' + '15' }]}>
                  <Database size={20} color="#F59E0B" />
                  <Text style={[styles.exportOptionText, { color: '#F59E0B' }]}>
                    Knowledge Base
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recent Exports */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Exports
            </Text>
            {EXPORT_JOBS.map((job, index) => renderExportJobCard(job, index))}
          </>
        )}

        {activeTab === 'templates' && (
          <>
            <View style={[styles.templatesCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.templatesTitle, { color: colors.text }]}>
                Download Templates
              </Text>
              <Text style={[styles.templatesSubtitle, { color: colors.icon }]}>
                Use these templates to format your data correctly
              </Text>

              <View style={styles.templateList}>
                <TouchableOpacity style={styles.templateRow}>
                  <View style={[styles.templateIcon, { backgroundColor: '#3B82F6' + '15' }]}>
                    <User size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.templateInfo}>
                    <Text style={[styles.templateName, { color: colors.text }]}>
                      Agent Configuration Template
                    </Text>
                    <Text style={[styles.templateFormat, { color: colors.icon }]}>
                      JSON format
                    </Text>
                  </View>
                  <Download size={18} color={colors.tint} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.templateRow}>
                  <View style={[styles.templateIcon, { backgroundColor: '#10B981' + '15' }]}>
                    <GitBranch size={18} color="#10B981" />
                  </View>
                  <View style={styles.templateInfo}>
                    <Text style={[styles.templateName, { color: colors.text }]}>
                      Workflow Definition Template
                    </Text>
                    <Text style={[styles.templateFormat, { color: colors.icon }]}>
                      YAML format
                    </Text>
                  </View>
                  <Download size={18} color={colors.tint} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.templateRow}>
                  <View style={[styles.templateIcon, { backgroundColor: '#F59E0B' + '15' }]}>
                    <Database size={18} color="#F59E0B" />
                  </View>
                  <View style={styles.templateInfo}>
                    <Text style={[styles.templateName, { color: colors.text }]}>
                      Knowledge Base Import Template
                    </Text>
                    <Text style={[styles.templateFormat, { color: colors.icon }]}>
                      CSV format
                    </Text>
                  </View>
                  <Download size={18} color={colors.tint} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.templateRow}>
                  <View style={[styles.templateIcon, { backgroundColor: '#8B5CF6' + '15' }]}>
                    <Users size={18} color="#8B5CF6" />
                  </View>
                  <View style={styles.templateInfo}>
                    <Text style={[styles.templateName, { color: colors.text }]}>
                      Team Member Import Template
                    </Text>
                    <Text style={[styles.templateFormat, { color: colors.icon }]}>
                      CSV format
                    </Text>
                  </View>
                  <Download size={18} color={colors.tint} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.docsCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.docsTitle, { color: colors.text }]}>
                Documentation
              </Text>
              <Text style={[styles.docsSubtitle, { color: colors.icon }]}>
                Learn more about importing and exporting data
              </Text>

              <TouchableOpacity style={styles.docsLink}>
                <FileText size={18} color={colors.tint} />
                <Text style={[styles.docsLinkText, { color: colors.tint }]}>
                  Import/Export Guide
                </Text>
                <ExternalLink size={16} color={colors.tint} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.docsLink}>
                <Globe size={18} color={colors.tint} />
                <Text style={[styles.docsLinkText, { color: colors.tint }]}>
                  API Documentation
                </Text>
                <ExternalLink size={16} color={colors.tint} />
              </TouchableOpacity>
            </View>
          </>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  uploadCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  uploadFormats: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  formatGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  formatCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  formatIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  formatName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  formatDesc: {
    fontSize: 11,
    textAlign: 'center',
  },
  jobCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  formatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  formatText: {
    fontSize: 11,
    fontWeight: '500',
  },
  jobTime: {
    fontSize: 12,
  },
  jobSize: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 60,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  errorText: {
    fontSize: 12,
    flex: 1,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  retryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
  },
  quickExportCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  quickExportTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  exportOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  exportOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  exportOptionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  exportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  exportActions: {
    flexDirection: 'row',
    gap: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  downloadText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  copyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templatesCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  templatesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  templatesSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  templateList: {
    gap: 12,
  },
  templateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  templateFormat: {
    fontSize: 12,
  },
  docsCard: {
    padding: 20,
    borderRadius: 16,
  },
  docsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  docsSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  docsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  docsLinkText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
});
