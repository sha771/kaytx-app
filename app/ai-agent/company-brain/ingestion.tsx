import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Database, FileText, MessageSquare, Mail, Link2, Github, Cloud, Video, Bot, CheckCircle, Clock, Upload, Plus } from 'lucide-react-native';

export default function KnowledgeIngestionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const DATA_SOURCES = [
    { 
      id: 'documents',
      name: 'Document Upload', 
      icon: FileText, 
      color: '#3B82F6',
      description: 'PDF, DOCX, PPTX, TXT, MD, CSV with OCR',
      status: 'connected',
      lastSync: '2 min ago',
      items: '1,247 documents'
    },
    { 
      id: 'slack',
      name: 'Slack Integration', 
      icon: MessageSquare, 
      color: '#4A154B',
      description: 'Public & private channels with permission',
      status: 'connected',
      lastSync: '5 min ago',
      items: '45 channels'
    },
    { 
      id: 'email',
      name: 'Email Integration', 
      icon: Mail, 
      color: '#EA4335',
      description: 'Gmail, Outlook, Exchange support',
      status: 'connected',
      lastSync: '10 min ago',
      items: '8,934 emails'
    },
    { 
      id: 'jira',
      name: 'Project Tools', 
      icon: Link2, 
      color: '#0052CC',
      description: 'Jira, Asana, Trello board sync',
      status: 'connected',
      lastSync: '15 min ago',
      items: '23 projects'
    },
    { 
      id: 'github',
      name: 'GitHub/GitLab', 
      icon: Github, 
      color: '#6E5494',
      description: 'Repository docs & code comments',
      status: 'connected',
      lastSync: '30 min ago',
      items: '156 repos'
    },
    { 
      id: 'drive',
      name: 'Cloud Storage', 
      icon: Cloud, 
      color: '#4285F4',
      description: 'Google Drive, SharePoint, OneDrive',
      status: 'pending',
      lastSync: 'Not connected',
      items: '0 files'
    },
    { 
      id: 'meetings',
      name: 'Video Meetings', 
      icon: Video, 
      color: '#00897B',
      description: 'Zoom, Google Meet transcription import',
      status: 'disconnected',
      lastSync: 'Never',
      items: '0 meetings'
    },
    { 
      id: 'agents',
      name: 'AI Agent Activity', 
      icon: Bot, 
      color: '#7C3AED',
      description: 'Auto-capture agent conversations & decisions',
      status: 'connected',
      lastSync: '1 min ago',
      items: '12,456 interactions'
    }
  ];

  const RECENT_IMPORTS = [
    { source: 'Slack', title: '#engineering Q4 Architecture Discussion', time: '12 min ago', type: 'channel' },
    { source: 'Documents', title: 'AWS Migration Playbook v2.3.pdf', time: '25 min ago', type: 'document' },
    { source: 'Jira', title: 'Sprint 47 Board Updates', time: '1 hr ago', type: 'project' },
    { source: 'Email', title: 'Acme Corp Contract Negotiation Thread', time: '2 hr ago', type: 'email' },
    { source: 'GitHub', title: 'API Documentation Updates', time: '3 hr ago', type: 'code' }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Ingestion</Text>
          <Text style={styles.headerSubtitle}>Auto-capture from all data sources</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>53,247</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Active Sources</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>2,341</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
        </View>

        {/* Data Sources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Sources</Text>
          {DATA_SOURCES.map((source, index) => (
            <TouchableOpacity key={source.id} style={[styles.sourceCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.sourceIcon, { backgroundColor: source.color + '20' }]}>
                <source.icon size={24} color={source.color} />
              </View>
              <View style={styles.sourceInfo}>
                <View style={styles.sourceHeader}>
                  <Text style={styles.sourceName}>{source.name}</Text>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: source.status === 'connected' ? '#10B98120' : source.status === 'pending' ? '#F59E0B20' : '#EF444420'
                  }]}>
                    <View style={[styles.statusDot, { 
                      backgroundColor: source.status === 'connected' ? '#10B981' : source.status === 'pending' ? '#F59E0B' : '#EF4444'
                    }]} />
                    <Text style={[styles.statusText, { 
                      color: source.status === 'connected' ? '#10B981' : source.status === 'pending' ? '#F59E0B' : '#EF4444'
                    }]}>{source.status}</Text>
                  </View>
                </View>
                <Text style={styles.sourceDesc}>{source.description}</Text>
                <View style={styles.sourceMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{source.lastSync}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Database size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{source.items}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Source */}
        <TouchableOpacity style={[styles.addButton, { backgroundColor: '#3B82F620' }]}>
          <Plus size={20} color="#3B82F6" />
          <Text style={styles.addButtonText}>Add New Data Source</Text>
        </TouchableOpacity>

        {/* Recent Imports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Imports</Text>
          {RECENT_IMPORTS.map((item, index) => (
            <View key={index} style={[styles.importCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.importIcon}>
                {item.type === 'channel' && <MessageSquare size={16} color="#4A154B" />}
                {item.type === 'document' && <FileText size={16} color="#3B82F6" />}
                {item.type === 'project' && <Link2 size={16} color="#0052CC" />}
                {item.type === 'email' && <Mail size={16} color="#EA4335" />}
                {item.type === 'code' && <Github size={16} color="#6E5494" />}
              </View>
              <View style={styles.importInfo}>
                <Text style={styles.importSource}>{item.source}</Text>
                <Text style={styles.importTitle} numberOfLines={1}>{item.title}</Text>
              </View>
              <Text style={styles.importTime}>{item.time}</Text>
            </View>
          ))}
        </View>

        {/* AI Processing Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingestion AI Agents</Text>
          <View style={styles.agentsGrid}>
            {[
              { name: 'Document Parser', color: '#3B82F6', status: 'active', processed: '12.4K' },
              { name: 'Channel Monitor', color: '#4A154B', status: 'active', processed: '8.2K' },
              { name: 'Email Scanner', color: '#EA4335', status: 'active', processed: '15.7K' },
              { name: 'OCR Engine', color: '#10B981', status: 'active', processed: '3.1K' }
            ].map((agent, index) => (
              <View key={index} style={[styles.agentCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
                  <Bot size={20} color={agent.color} />
                </View>
                <Text style={styles.agentName}>{agent.name}</Text>
                <Text style={styles.agentProcessed}>{agent.processed} processed</Text>
                <View style={[styles.agentStatus, { backgroundColor: '#10B98120' }]}>
                  <Text style={styles.agentStatusText}>Active</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0F172A',
    gap: 12
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    flex: 1
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12
  },
  sourceCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8
  },
  sourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sourceInfo: {
    flex: 1,
    marginLeft: 12
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sourceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500'
  },
  sourceDesc: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4
  },
  sourceMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  metaText: {
    fontSize: 11,
    color: '#6B7280'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6'
  },
  importCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 6
  },
  importIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center'
  },
  importInfo: {
    flex: 1,
    marginLeft: 10
  },
  importSource: {
    fontSize: 10,
    color: '#6B7280'
  },
  importTitle: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 2
  },
  importTime: {
    fontSize: 11,
    color: '#6B7280'
  },
  agentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  agentCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12
  },
  agentIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  agentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  agentProcessed: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2
  },
  agentStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 8
  },
  agentStatusText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '500'
  }
};