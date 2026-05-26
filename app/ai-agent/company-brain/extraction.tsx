import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Brain, Target, Users, Briefcase, Database, TrendingUp, CheckCircle, Bot, Settings, Zap, Eye, Sparkles } from 'lucide-react-native';

export default function KnowledgeExtractionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const EXTRACTION_CATEGORIES = [
    { 
      id: 'processes',
      name: 'Processes & SOPs',
      icon: Target,
      color: '#3B82F6',
      extracted: '342',
      accuracy: '94%'
    },
    { 
      id: 'decisions',
      name: 'Decision Records',
      icon: Brain,
      color: '#7C3AED',
      extracted: '567',
      accuracy: '91%'
    },
    { 
      id: 'clients',
      name: 'Client Information',
      icon: Users,
      color: '#10B981',
      extracted: '1,234',
      accuracy: '96%'
    },
    { 
      id: 'projects',
      name: 'Project Context',
      icon: Briefcase,
      color: '#F59E0B',
      extracted: '456',
      accuracy: '89%'
    },
    { 
      id: 'technical',
      name: 'Technical Knowledge',
      icon: Database,
      color: '#EC4899',
      extracted: '289',
      accuracy: '92%'
    },
    { 
      id: 'tribal',
      name: 'Tribal Knowledge',
      icon: Sparkles,
      color: '#06B6D4',
      extracted: '178',
      accuracy: '82%'
    }
  ];

  const ENTITY_TYPES = [
    { type: 'People', count: 892, color: '#3B82F6' },
    { type: 'Projects', count: 234, color: '#7C3AED' },
    { type: 'Products', count: 156, color: '#10B981' },
    { type: 'Technologies', count: 89, color: '#F59E0B' },
    { type: 'Metrics/KPIs', count: 67, color: '#EC4899' },
    { type: 'Dates/Timelines', count: 445, color: '#06B6D4' }
  ];

  const RECENT_EXTRACTIONS = [
    { title: 'Q4 Product Launch Process', category: 'Process', source: 'Slack #product', confidence: 96 },
    { title: 'AWS Migration Decision Log', category: 'Decision', source: 'Confluence', confidence: 94 },
    { title: 'Acme Corp Preferences', category: 'Client', source: 'CRM', confidence: 98 },
    { title: 'Sprint 48 Timeline', category: 'Project', source: 'Jira', confidence: 91 },
    { title: 'API Authentication Pattern', category: 'Technical', source: 'GitHub', confidence: 95 }
  ];

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
        {/* Overall Stats */}
        <View style={styles.overallStats}>
          <View style={[styles.overallCard, { backgroundColor: '#7C3AED20' }]}>
            <Brain size={32} color="#7C3AED" />
            <Text style={styles.overallValue}>3,066</Text>
            <Text style={styles.overallLabel}>Total Extracted</Text>
          </View>
          <View style={[styles.overallCard, { backgroundColor: '#10B98120' }]}>
            <TrendingUp size={32} color="#10B981" />
            <Text style={styles.overallValue}>93%</Text>
            <Text style={styles.overallLabel}>Avg Accuracy</Text>
          </View>
        </View>

        {/* Extraction Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extraction Categories</Text>
          <View style={styles.categoriesGrid}>
            {EXTRACTION_CATEGORIES.map((cat, index) => (
              <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                  <cat.icon size={24} color={cat.color} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <View style={styles.categoryStats}>
                  <Text style={styles.categoryExtracted}>{cat.extracted} extracted</Text>
                  <View style={[styles.accuracyBadge, { backgroundColor: cat.color + '20' }]}>
                    <CheckCircle size={10} color={cat.color} />
                    <Text style={[styles.accuracyText, { color: cat.color }]}>{cat.accuracy}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Entity Recognition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entity Recognition</Text>
          <View style={styles.entityGrid}>
            {ENTITY_TYPES.map((entity, index) => (
              <View key={index} style={[styles.entityCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.entityDot, { backgroundColor: entity.color }]} />
                <Text style={styles.entityType}>{entity.type}</Text>
                <Text style={styles.entityCount}>{entity.count.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* AI Extraction Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extraction AI Agents</Text>
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
                <View style={[styles.agentStatusBadge, { backgroundColor: '#10B98120' }]}>
                  <Text style={styles.agentStatusText}>{agent.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Extractions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Extractions</Text>
          {RECENT_EXTRACTIONS.map((item, index) => (
            <View key={index} style={[styles.extractionCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.extractionInfo}>
                <View style={styles.extractionHeader}>
                  <View style={[styles.categoryTag, { backgroundColor: '#3B82F620' }]}>
                    <Text style={styles.categoryTagText}>{item.category}</Text>
                  </View>
                  <Text style={styles.extractionSource}>{item.source}</Text>
                </View>
                <Text style={styles.extractionTitle}>{item.title}</Text>
              </View>
              <View style={styles.confidenceBadge}>
                <Eye size={12} color="#10B981" />
                <Text style={styles.confidenceText}>{item.confidence}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3B82F620' }]}>
              <Zap size={18} color="#3B82F6" />
              <Text style={styles.actionButtonText}>Run Full Extraction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#7C3AED20' }]}>
              <Settings size={18} color="#7C3AED" />
              <Text style={styles.actionButtonText}>Configure Models</Text>
            </TouchableOpacity>
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
  overallStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  overallCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center'
  },
  overallValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8
  },
  overallLabel: {
    fontSize: 12,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  categoryCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12
  },
  categoryIcon: {
    width: 40,
    height: 40,
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
    fontSize: 10,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6
  },
  entityType: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center'
  },
  entityCount: {
    fontSize: 16,
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
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  agentInfo: {
    flex: 1,
    marginLeft: 12
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  agentRole: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2
  },
  agentStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  agentStatusText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500'
  },
  extractionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8
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
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  categoryTagText: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '500'
  },
  extractionSource: {
    fontSize: 10,
    color: '#6B7280'
  },
  extractionTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500'
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10B98120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  confidenceText: {
    fontSize: 12,
    color: '#10B981',
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
  }
};