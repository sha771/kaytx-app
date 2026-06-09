import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Brain, Target, Users, Briefcase, Database, TrendingUp, CheckCircle, Bot, Settings, Zap, Eye, Sparkles, X, Trash2, Award, Clock } from 'lucide-react-native';

export default function KnowledgeExtractionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Dynamic States
  const [totalExtracted, setTotalExtracted] = useState(3066);
  const [avgAccuracy, setAvgAccuracy] = useState(93);
  const [isExtracting, setIsExtracting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState('');
  
  const [categories, setCategories] = useState([
    { id: 'processes', name: 'Processes & SOPs', icon: Target, color: '#3B82F6', extracted: 342, accuracy: 94 },
    { id: 'decisions', name: 'Decision Records', icon: Brain, color: '#7C3AED', extracted: 567, accuracy: 91 },
    { id: 'clients', name: 'Client Information', icon: Users, color: '#10B981', extracted: 1234, accuracy: 96 },
    { id: 'projects', name: 'Project Context', icon: Briefcase, color: '#F59E0B', extracted: 456, accuracy: 89 },
    { id: 'technical', name: 'Technical Knowledge', icon: Database, color: '#EC4899', extracted: 289, accuracy: 92 },
    { id: 'tribal', name: 'Tribal Knowledge', icon: Sparkles, color: '#06B6D4', extracted: 178, accuracy: 82 }
  ]);

  const [extractions, setExtractions] = useState([
    { id: 1, title: 'Q4 Product Launch Process', category: 'Process', source: 'Slack #product', confidence: 96, verified: false },
    { id: 2, title: 'AWS Migration Decision Log', category: 'Decision', source: 'Confluence', confidence: 94, verified: false },
    { id: 3, title: 'Acme Corp Preferences', category: 'Client', source: 'CRM', confidence: 98, verified: true },
    { id: 4, title: 'Sprint 48 Timeline', category: 'Project', source: 'Jira', confidence: 91, verified: false },
    { id: 5, title: 'API Authentication Pattern', category: 'Technical', source: 'GitHub', confidence: 95, verified: true }
  ]);

  // Entity modal state
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Simulated live sync logs
  const runLiveExtractionSync = () => {
    if (isExtracting) return;
    setIsExtracting(true);
    setTerminalLogs([]);
    setCurrentStep('Connecting to integrations...');

    const logs = [
      'Scanning connected channels & workspaces...',
      '[Slack] Found 14 unparsed messages in channel #product-launches',
      '[AI Classifier] Classifying: Decision log regarding Acme client refunds...',
      '[AI OCR Parser] Processing "Acme_Escalation_SOP_v2.docx"...',
      '[Entity Recognition] Identified People: "James Wilson", "Sarah Chen"',
      '[Entity Recognition] Identified Projects: "AWS Infrastructure Migrations"',
      '[Relations Mapper] Establishing influence chain: James Wilson -> Contract Terms -> Legal Approval',
      'Ingesting 1 new Decision Node: Acme Refund SOP into local DB...',
      'Knowledge extraction completed!'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        setCurrentStep(log);

        if (index === logs.length - 1) {
          setTimeout(() => {
            setIsExtracting(false);
            setTotalExtracted(prev => prev + 1);
            
            // Add new extraction dynamically
            const newRecord = {
              id: Date.now(),
              title: 'Acme Refund Escalation SOP',
              category: 'Decision',
              source: 'Word Doc',
              confidence: 97,
              verified: false
            };
            setExtractions(prev => [newRecord, ...prev]);

            // Update category counts
            setCategories(prevCats => prevCats.map(c => {
              if (c.id === 'decisions') {
                return { ...c, extracted: c.extracted + 1, accuracy: Math.min(c.accuracy + 1, 99) };
              }
              return c;
            }));
            
            // Recalculate average accuracy
            setAvgAccuracy(prev => Math.min(prev + 1, 98));
          }, 600);
        }
      }, (index + 1) * 600);
    });
  };

  // Click handler to verify node
  const verifyExtractionNode = (id: number) => {
    setExtractions(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, verified: true, confidence: 99 };
      }
      return item;
    }));
    setAvgAccuracy(prev => Math.min(prev + 1, 99));
  };

  // Click handler to delete node
  const deleteExtractionNode = (id: number, catName?: string) => {
    setExtractions(prev => prev.filter(item => item.id !== id));
    setTotalExtracted(prev => prev - 1);
    
    if (catName) {
      setCategories(prevCats => prevCats.map(c => {
        if (c.name.toLowerCase().includes(catName.toLowerCase()) || catName.toLowerCase().includes(c.id)) {
          return { ...c, extracted: Math.max(c.extracted - 1, 0) };
        }
        return c;
      }));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Extraction</Text>
          <Text style={styles.headerSubtitle}>AI-powered categorization & entity recognition</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live Extraction Terminal Widget */}
        {isExtracting && (
          <View style={styles.terminalContainer}>
            <View style={styles.terminalHeader}>
              <View style={styles.terminalDotRow}>
                <View style={[styles.terminalDot, { backgroundColor: '#EF4444' }]} />
                <View style={[styles.terminalDot, { backgroundColor: '#F59E0B' }]} />
                <View style={[styles.terminalDot, { backgroundColor: '#10B981' }]} />
              </View>
              <Text style={styles.terminalTitle}>Extraction Logs</Text>
              <ActivityIndicator size="small" color="#10B981" />
            </View>
            <ScrollView style={styles.terminalBody} contentContainerStyle={{ padding: 12 }}>
              {terminalLogs.map((log, idx) => (
                <Text key={idx} style={styles.terminalText}>{`> ${log}`}</Text>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Overall Stats */}
        <View style={styles.overallStats}>
          <View style={[styles.overallCard, { backgroundColor: '#7C3AED15', borderColor: '#7C3AED25', borderWidth: 1 }]}>
            <Brain size={32} color="#7C3AED" />
            <Text style={styles.overallValue}>{totalExtracted.toLocaleString()}</Text>
            <Text style={styles.overallLabel}>Extracted Entities</Text>
          </View>
          <View style={[styles.overallCard, { backgroundColor: '#10B98115', borderColor: '#10B98125', borderWidth: 1 }]}>
            <TrendingUp size={32} color="#10B981" />
            <Text style={styles.overallValue}>{avgAccuracy}%</Text>
            <Text style={styles.overallLabel}>Average Precision</Text>
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extraction Categories (Click to Review)</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                style={[styles.categoryCard, { backgroundColor: '#1E293B' }]}
                onPress={() => setSelectedCategory(cat)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                  <cat.icon size={22} color={cat.color} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <View style={styles.categoryStats}>
                  <Text style={styles.categoryExtracted}>{cat.extracted} nodes</Text>
                  <View style={[styles.accuracyBadge, { backgroundColor: cat.color + '15' }]}>
                    <CheckCircle size={10} color={cat.color} />
                    <Text style={[styles.accuracyText, { color: cat.color }]}>{cat.accuracy}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Entity Recognition Counts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mapped Entities</Text>
          <View style={styles.entityGrid}>
            {[
              { type: 'People', count: 892, color: '#3B82F6' },
              { type: 'Projects', count: 234, color: '#7C3AED' },
              { type: 'Products', count: 156, color: '#10B981' },
              { type: 'Technologies', count: 89, color: '#F59E0B' },
              { type: 'Metrics/KPIs', count: 67, color: '#EC4899' },
              { type: 'Dates/Timelines', count: 445, color: '#06B6D4' }
            ].map((entity, index) => (
              <View key={index} style={[styles.entityCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.entityDot, { backgroundColor: entity.color }]} />
                <Text style={styles.entityType}>{entity.type}</Text>
                <Text style={styles.entityCount}>{entity.count.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Extraction AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autonomous Extraction Workers</Text>
          <View style={styles.agentsList}>
            {[
              { name: 'Process Analyzer', role: 'Identifies SOPs and workflows', status: 'active', color: '#3B82F6' },
              { name: 'Decision Logger', role: 'Extracts decision context and rationale', status: 'active', color: '#7C3AED' },
              { name: 'Client Profiler', role: 'Maps client preferences and history', status: 'active', color: '#10B981' },
              { name: 'Tribal Knowledge Miner', role: 'Finds unwritten rules and shortcuts', status: 'active', color: '#F59E0B' },
              { name: 'Technical Doc Parser', role: 'Extracts code patterns and architecture', status: 'active', color: '#EC4899' }
            ].map((agent, index) => (
              <View key={index} style={[styles.agentCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.agentAvatar, { backgroundColor: agent.color + '20' }]}>
                  <Bot size={20} color={agent.color} />
                </View>
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <Text style={styles.agentRole}>{agent.role}</Text>
                </View>
                <View style={[styles.agentStatusBadge, { backgroundColor: '#10B98115' }]}>
                  <Text style={styles.agentStatusText}>{agent.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Extractions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Verification Queue</Text>
          {extractions.map((item, index) => (
            <View key={item.id} style={[styles.extractionCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.extractionInfo}>
                <View style={styles.extractionHeader}>
                  <View style={[styles.categoryTag, { backgroundColor: '#3B82F615' }]}>
                    <Text style={styles.categoryTagText}>{item.category}</Text>
                  </View>
                  <Text style={styles.extractionSource}>{item.source}</Text>
                </View>
                <Text style={styles.extractionTitle}>{item.title}</Text>
                
                {/* Click Actions */}
                <View style={styles.actionRowInline}>
                  {item.verified ? (
                    <View style={styles.verifiedRow}>
                      <CheckCircle size={12} color="#10B981" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.verifyBtn}
                      onPress={() => verifyExtractionNode(item.id)}
                    >
                      <CheckCircle size={12} color="#10B981" />
                      <Text style={styles.verifyBtnText}>Approve & Link</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    style={styles.deleteBtn}
                    onPress={() => deleteExtractionNode(item.id, item.category)}
                  >
                    <Trash2 size={12} color="#EF4444" />
                    <Text style={styles.deleteBtnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={[styles.confidenceBadge, { backgroundColor: item.verified ? '#10B98115' : '#7C3AED15' }]}>
                <Award size={12} color={item.verified ? '#10B981' : '#7C3AED'} />
                <Text style={[styles.confidenceText, { color: item.verified ? '#10B981' : '#7C3AED' }]}>{item.confidence}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Direct Action triggers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extraction Utility Tools</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
              onPress={runLiveExtractionSync}
              disabled={isExtracting}
            >
              <Zap size={18} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Run Live Extraction Sync</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#1E293B' }]}
              onPress={() => router.push('/ai-agent/company-brain/analytics')}
            >
              <Settings size={18} color="#9CA3AF" />
              <Text style={[styles.actionButtonText, { color: '#9CA3AF' }]}>Model Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* CATEGORY EXPLORER OVERLAY PANEL */}
      {selectedCategory && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <selectedCategory.icon size={20} color={selectedCategory.color} />
                <Text style={styles.modalTitle}>{selectedCategory.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>Displaying all {selectedCategory.extracted} parsed database entities:</Text>
            <ScrollView style={{ maxHeight: 300, marginTop: 10 }}>
              {extractions
                .filter(item => item.category.toLowerCase().includes(selectedCategory.id.substring(0, 4)))
                .map(item => (
                  <View key={item.id} style={styles.entityRowCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.entityRowTitle}>{item.title}</Text>
                      <Text style={styles.entityRowSub}>{item.source} • Precision: {item.confidence}%</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => deleteExtractionNode(item.id, selectedCategory.name)}
                      style={styles.entityTrashBtn}
                    >
                      <Trash2 size={14} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              {extractions.filter(item => item.category.toLowerCase().includes(selectedCategory.id.substring(0, 4))).length === 0 && (
                <View style={{ alignItems: 'center', padding: 24 }}>
                  <Clock size={24} color="#6B7280" />
                  <Text style={{ color: '#9CA3AF', fontSize: 13, marginTop: 8 }}>No pending nodes in this category.</Text>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity 
              style={[styles.btnCloseModal, { backgroundColor: '#374151' }]} 
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={styles.btnCloseText}>Close Reviewer</Text>
            </TouchableOpacity>
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
  terminalContainer: {
    backgroundColor: '#000000',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 20,
    overflow: 'hidden'
  },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#374151'
  },
  terminalDotRow: {
    flexDirection: 'row',
    gap: 6
  },
  terminalDot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  terminalTitle: {
    color: '#D1D5DB',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  terminalBody: {
    height: 120
  },
  terminalText: {
    color: '#10B981',
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 4
  },
  overallStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  overallCard: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center'
  },
  overallValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 6
  },
  overallLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  categoryCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#37415130'
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  categoryExtracted: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  accuracyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3
  },
  accuracyText: {
    fontSize: 9,
    fontWeight: '600'
  },
  entityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  entityCard: {
    width: '31%',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  entityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 6
  },
  entityType: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center'
  },
  entityCount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4
  },
  agentsList: {
    gap: 8
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  agentInfo: {
    flex: 1,
    marginLeft: 12
  },
  agentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  agentRole: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 1
  },
  agentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  agentStatusText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  extractionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#37415130'
  },
  extractionInfo: {
    flex: 1
  },
  extractionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6
  },
  categoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  categoryTagText: {
    fontSize: 9,
    color: '#3B82F6',
    fontWeight: '600'
  },
  extractionSource: {
    fontSize: 10,
    color: '#6B7280'
  },
  extractionTitle: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 10
  },
  actionRowInline: {
    flexDirection: 'row',
    gap: 12
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  verifiedText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600'
  },
  verifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10B98115',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  verifyBtnText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600'
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EF444415',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  deleteBtnText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600'
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '600'
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
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
    maxWidth: 400,
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
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#37415150',
    paddingBottom: 8
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10
  },
  entityRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#37415140'
  },
  entityRowTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  entityRowSub: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2
  },
  entityTrashBtn: {
    padding: 6,
    backgroundColor: '#EF444415',
    borderRadius: 6
  },
  btnCloseModal: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  btnCloseText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF'
  }
};