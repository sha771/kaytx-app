import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, useSafeAreaInsets, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Database, FileText, MessageSquare, Mail, Link2, Github, Cloud, Video, Bot, CheckCircle, Clock, Upload, Plus, X, Globe, Shield, RefreshCw } from 'lucide-react-native';

export default function KnowledgeIngestionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Core Interactive State
  const [totalItems, setTotalItems] = useState(53247);
  const [activeSources, setActiveSources] = useState(6);
  const [todayItems, setTodayItems] = useState(2341);
  
  const [sources, setSources] = useState([
    { 
      id: 'documents',
      name: 'Document Upload', 
      icon: FileText, 
      color: '#3B82F6',
      description: 'PDF, DOCX, PPTX, TXT, MD, CSV with OCR',
      status: 'connected',
      lastSync: '2 min ago',
      items: '1,247 documents',
      config: { url: '', token: 'LOCAL_STORAGE', frequency: 'Real-Time' }
    },
    { 
      id: 'slack',
      name: 'Slack Integration', 
      icon: MessageSquare, 
      color: '#4A154B',
      description: 'Public & private channels with permission',
      status: 'connected',
      lastSync: '5 min ago',
      items: '45 channels',
      config: { url: 'https://hooks.slack.com/services/KAYTX/K329', token: 'SLACK_OAUTH_TOKEN_V2', frequency: 'Real-Time' }
    },
    { 
      id: 'email',
      name: 'Email Integration', 
      icon: Mail, 
      color: '#EA4335',
      description: 'Gmail, Outlook, Exchange support',
      status: 'connected',
      lastSync: '10 min ago',
      items: '8,934 emails',
      config: { url: 'corp.gmail.com', token: 'GMAIL_WORKSPACE_API_KEY', frequency: 'Hourly' }
    },
    { 
      id: 'jira',
      name: 'Project Tools', 
      icon: Link2, 
      color: '#0052CC',
      description: 'Jira, Asana, Trello board sync',
      status: 'connected',
      lastSync: '15 min ago',
      items: '23 projects',
      config: { url: 'https://kaytx.atlassian.net', token: 'JIRA_BASIC_AUTH_TOKEN', frequency: 'Hourly' }
    },
    { 
      id: 'github',
      name: 'GitHub/GitLab', 
      icon: Github, 
      color: '#6E5494',
      description: 'Repository docs & code comments',
      status: 'connected',
      lastSync: '30 min ago',
      items: '156 repos',
      config: { url: 'https://github.com/kaytx-org', token: 'GH_PAT_89283120', frequency: 'Hourly' }
    },
    { 
      id: 'drive',
      name: 'Cloud Storage', 
      icon: Cloud, 
      color: '#4285F4',
      description: 'Google Drive, SharePoint, OneDrive',
      status: 'pending',
      lastSync: 'Not connected',
      items: '0 files',
      config: { url: '', token: '', frequency: 'Daily' }
    },
    { 
      id: 'meetings',
      name: 'Video Meetings', 
      icon: Video, 
      color: '#00897B',
      description: 'Zoom, Google Meet transcription import',
      status: 'disconnected',
      lastSync: 'Never',
      items: '0 meetings',
      config: { url: '', token: '', frequency: 'Daily' }
    },
    { 
      id: 'agents',
      name: 'AI Agent Activity', 
      icon: Bot, 
      color: '#7C3AED',
      description: 'Auto-capture agent conversations & decisions',
      status: 'connected',
      lastSync: '1 min ago',
      items: '12,456 interactions',
      config: { url: 'AgentOS Pipeline', token: 'AGENTOS_SOCKET_CONN', frequency: 'Real-Time' }
    }
  ]);

  const [recentImports, setRecentImports] = useState([
    { source: 'Slack', title: '#engineering Q4 Architecture Discussion', time: '12 min ago', type: 'channel' },
    { source: 'Documents', title: 'AWS Migration Playbook v2.3.pdf', time: '25 min ago', type: 'document' },
    { source: 'Jira', title: 'Sprint 47 Board Updates', time: '1 hr ago', type: 'project' },
    { source: 'Email', title: 'Acme Corp Contract Negotiation Thread', time: '2 hr ago', type: 'email' },
    { source: 'GitHub', title: 'API Documentation Updates', time: '3 hr ago', type: 'code' }
  ]);

  // Upload Simulation State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrLog, setOcrLog] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Configuration Modal State
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [configUrl, setConfigUrl] = useState('');
  const [configToken, setConfigToken] = useState('');
  const [configFrequency, setConfigFrequency] = useState('Real-Time');
  const [configConnected, setConfigConnected] = useState(true);

  // Mock Upload Selector Options
  const MOCK_FILES = [
    { title: 'Security_SOP_2026.pdf', size: '2.4 MB' },
    { title: 'Refund_Policy_Updates.docx', size: '1.1 MB' },
    { title: 'Acme_CRM_Preferences.csv', size: '480 KB' }
  ];

  // Open Configuration Modal
  const openConfig = (source: any) => {
    setSelectedSource(source);
    setConfigUrl(source.config.url);
    setConfigToken(source.config.token);
    setConfigFrequency(source.config.frequency);
    setConfigConnected(source.status === 'connected');
  };

  // Save Configuration
  const saveConfig = () => {
    if (!selectedSource) return;

    const newStatus = configConnected ? 'connected' : 'disconnected';
    const updatedSources = sources.map(s => {
      if (s.id === selectedSource.id) {
        // Toggle items count based on connection status
        let updatedItems = s.items;
        if (s.status !== 'connected' && newStatus === 'connected') {
          updatedItems = s.id === 'drive' ? '412 files' : '23 meetings';
        } else if (newStatus === 'disconnected') {
          updatedItems = '0 items';
        }
        return {
          ...s,
          status: newStatus,
          lastSync: newStatus === 'connected' ? 'Just now' : 'Never',
          items: updatedItems,
          config: { url: configUrl, token: configToken, frequency: configFrequency }
        };
      }
      return s;
    });

    setSources(updatedSources);

    // Update active source counter
    const activeCount = updatedSources.filter(s => s.status === 'connected').length;
    setActiveSources(activeCount);

    // If connected new, add import log
    if (selectedSource.status !== 'connected' && configConnected) {
      setRecentImports([
        {
          source: selectedSource.name.split(' ')[0],
          title: `Initial sync of connected workspace folder`,
          time: 'Just now',
          type: selectedSource.id === 'drive' ? 'document' : 'email'
        },
        ...recentImports
      ]);
      setTotalItems(t => t + (selectedSource.id === 'drive' ? 412 : 23));
    }

    setSelectedSource(null);
  };

  // Start Mock Upload Simulation
  const simulateUpload = (fileName: string) => {
    setShowUploadModal(false);
    setIsUploading(true);
    setUploadProgress(0);
    setOcrLog('Initializing multi-threaded secure upload...');

    const logs = [
      'Sending file chunks to server...',
      '[OCR] Document received. Commencing image structure rendering...',
      '[OCR] Scanning Page 1: Analyzing page layouts and heading blocks...',
      '[OCR] Found Table Block: Mapping CSV matrix properties...',
      '[Embeddings] Parsing semantic text tokens (Token count: 1,420)...',
      '[Knowledge Node] Generating node representations and graph links...',
      'Ingestion pipeline completed successfully!'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + 15;
        if (next >= 100) {
          clearInterval(interval);
          setOcrLog(logs[logs.length - 1]);
          setTimeout(() => {
            setIsUploading(false);
            setTotalItems(prevCount => prevCount + 1);
            setTodayItems(prevCount => prevCount + 1);
            setRecentImports([
              { source: 'Documents', title: fileName, time: 'Just now', type: 'document' },
              ...recentImports
            ]);
          }, 600);
          return 100;
        }
        // Rotate OCR logs as progress advances
        if (currentLogIndex < logs.length - 2) {
          setOcrLog(logs[currentLogIndex]);
          currentLogIndex++;
        }
        return next;
      });
    }, 450);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Ingestion</Text>
          <Text style={styles.headerSubtitle}>Auto-capture from all corporate integrations</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload Status Overlay Bar */}
        {isUploading && (
          <View style={styles.uploadStatusWidget}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <ActivityIndicator size="small" color="#3B82F6" />
                <Text style={styles.uploadWidgetTitle}>Uploading & Parsing Document...</Text>
              </View>
              <Text style={styles.uploadWidgetPct}>{uploadProgress}%</Text>
            </View>
            <View style={styles.uploadProgressBg}>
              <View style={[styles.uploadProgressFill, { width: `${uploadProgress}%` }]} />
            </View>
            <Text style={styles.ocrLogText}>{ocrLog}</Text>
          </View>
        )}

        {/* Stats Overview */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>{totalItems.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Ingested Nodes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>{activeSources}</Text>
            <Text style={styles.statLabel}>Active Integrations</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>{todayItems.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Ingested Today</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: '#3B82F6' }]}
          onPress={() => setShowUploadModal(true)}
        >
          <Upload size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Upload Mock Document</Text>
        </TouchableOpacity>

        {/* Data Sources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Corporate Connectors</Text>
          {sources.map((source, index) => (
            <TouchableOpacity 
              key={source.id} 
              style={[styles.sourceCard, { backgroundColor: '#1E293B' }]}
              onPress={() => openConfig(source)}
            >
              <View style={[styles.sourceIcon, { backgroundColor: source.color + '20' }]}>
                <source.icon size={22} color={source.color} />
              </View>
              <View style={styles.sourceInfo}>
                <View style={styles.sourceHeader}>
                  <Text style={styles.sourceName}>{source.name}</Text>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: source.status === 'connected' ? '#10B98115' : source.status === 'pending' ? '#F59E0B15' : '#EF444415'
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
                    <Clock size={11} color="#6B7280" />
                    <Text style={styles.metaText}>{source.lastSync}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Database size={11} color="#6B7280" />
                    <Text style={styles.metaText}>{source.items}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <RefreshCw size={11} color="#6B7280" />
                    <Text style={styles.metaText}>{source.config.frequency}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Imports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-time Ingestion Feed</Text>
          {recentImports.map((item, index) => (
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

        {/* AI Ingestion Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dedicated Parser Agents</Text>
          <View style={styles.agentsGrid}>
            {[
              { name: 'Document Parser', color: '#3B82F6', status: 'active', processed: '12.4K' },
              { name: 'Channel Monitor', color: '#4A154B', status: 'active', processed: '8.2K' },
              { name: 'Email Scanner', color: '#EA4335', status: 'active', processed: '15.7K' },
              { name: 'OCR Engine', color: '#10B981', status: 'active', processed: '3.1K' }
            ].map((agent, index) => (
              <View key={index} style={[styles.agentCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
                  <Bot size={18} color={agent.color} />
                </View>
                <Text style={styles.agentName}>{agent.name}</Text>
                <Text style={styles.agentProcessed}>{agent.processed} items parsed</Text>
                <View style={[styles.agentStatus, { backgroundColor: '#10B98115' }]}>
                  <Text style={styles.agentStatusText}>Active</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* MOCK FILE UPLOAD OVERLAY MODAL */}
      {showUploadModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Document to Upload</Text>
              <TouchableOpacity onPress={() => setShowUploadModal(false)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalHelpText}>Choose a mock document to test OCR & embedding pipelines:</Text>
            {MOCK_FILES.map((file, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={styles.fileOptionCard} 
                onPress={() => simulateUpload(file.title)}
              >
                <FileText size={18} color="#3B82F6" />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.fileOptionTitle}>{file.title}</Text>
                  <Text style={styles.fileOptionSub}>{file.size} • PDF/Docx Format</Text>
                </View>
                <Upload size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* INTEGRATION CONFIGURATION OVERLAY MODAL */}
      {selectedSource && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <selectedSource.icon size={20} color={selectedSource.color} />
                <Text style={styles.modalTitle}>{selectedSource.name} Settings</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedSource(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.configFieldRow}>
              <Text style={styles.configLabel}>Connection Status</Text>
              <Switch 
                value={configConnected} 
                onValueChange={setConfigConnected}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor={configConnected ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>

            {configConnected && (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.inputLabel}>Webhook / API Endpoint</Text>
                <TextInput
                  style={styles.configInput}
                  placeholder="https://api.yourcompany.com/..."
                  placeholderTextColor="#4B5563"
                  value={configUrl}
                  onChangeText={setConfigUrl}
                />

                <Text style={styles.inputLabel}>Integration Access Token</Text>
                <TextInput
                  style={styles.configInput}
                  placeholder="Access secret key / OAuth token"
                  placeholderTextColor="#4B5563"
                  value={configToken}
                  secureTextEntry
                  onChangeText={setConfigToken}
                />

                <Text style={styles.inputLabel}>Auto-Sync Frequency</Text>
                <View style={styles.frequencyRow}>
                  {['Real-Time', 'Hourly', 'Daily'].map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      style={[styles.freqBtn, { backgroundColor: configFrequency === freq ? '#3B82F6' : '#374151' }]}
                      onPress={() => setConfigFrequency(freq)}
                    >
                      <Text style={[styles.freqText, { color: configFrequency === freq ? '#FFFFFF' : '#D1D5DB' }]}>
                        {freq}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.btnCancel, { backgroundColor: '#374151' }]} 
                onPress={() => setSelectedSource(null)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.btnSave, { backgroundColor: '#3B82F6' }]} 
                onPress={saveConfig}
              >
                <Text style={styles.btnText}>Save Config</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    marginBottom: 16
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12
  },
  sourceCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#37415130'
  },
  sourceIcon: {
    width: 44,
    height: 44,
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
    fontSize: 14,
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
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  sourceDesc: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    lineHeight: 14
  },
  sourceMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    flexWrap: 'wrap'
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  metaText: {
    fontSize: 10,
    color: '#6B7280'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
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
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '600'
  },
  importTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 1
  },
  importTime: {
    fontSize: 10,
    color: '#6B7280'
  },
  agentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  agentCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12
  },
  agentIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  agentName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  agentProcessed: {
    fontSize: 10,
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
    fontSize: 9,
    color: '#10B981',
    fontWeight: '600'
  },
  uploadStatusWidget: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3B82F640'
  },
  uploadWidgetTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6'
  },
  uploadWidgetPct: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6'
  },
  uploadProgressBg: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8
  },
  uploadProgressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3
  },
  ocrLogText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#9CA3AF',
    lineHeight: 14
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000BA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    zIndex: 999
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#37415150',
    paddingBottom: 10
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  modalHelpText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 14
  },
  fileOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#37415140',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#37415160'
  },
  fileOptionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  fileOptionSub: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2
  },
  configFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  configLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 12,
    marginBottom: 6
  },
  configInput: {
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#374151'
  },
  frequencyRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4
  },
  freqBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  freqText: {
    fontSize: 11,
    fontWeight: '600'
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#37415150',
    paddingTop: 14
  },
  btnCancel: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnSave: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  }
};