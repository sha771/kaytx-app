import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Brain, FileText, MessageSquare, Link2, Users, BarChart3, Target, Shield, Zap, BookOpen, Calendar, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Settings, Database, Network, Bot, Lightbulb, Clock, Star, Eye } from 'lucide-react-native';
import { useTheme } from '../../../contexts/ThemeContext';

// Knowledge Health Card Component
const HealthCard = ({ title, value, trend, color }: { title: string; value: string; trend: string; color: string }) => (
  <View style={[styles.healthCard, { backgroundColor: color + '15' }]}>
    <Text style={[styles.healthValue, { color }]}>{value}</Text>
    <Text style={styles.healthTitle}>{title}</Text>
    <Text style={[styles.healthTrend, { color: trend.startsWith('+') ? '#10B981' : '#EF4444' }]}>{trend}</Text>
  </View>
);

// Feature Card Component
const FeatureCard = ({ title, description, icon: Icon, color, route, agents = 0 }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={[styles.featureCard, { backgroundColor: '#1E293B' }]} onPress={() => router.push(route)}>
      <View style={[styles.featureIcon, { backgroundColor: color + '20' }]}>
        <Icon size={24} color={color} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
      {agents > 0 && (
        <View style={styles.featureAgents}>
          <Bot size={12} color="#9CA3AF" />
          <Text style={styles.featureAgentsText}>{agents} AI Agents</Text>
        </View>
      )}
      <ArrowRight size={16} color="#6B7280" style={styles.featureArrow} />
    </TouchableOpacity>
  );
};

// Knowledge Node Card
const KnowledgeCard = ({ title, type, source, updated, views }: any) => (
  <View style={[styles.knowledgeCard, { backgroundColor: '#1E293B' }]}>
    <View style={styles.knowledgeHeader}>
      <View style={[styles.typeBadge, { backgroundColor: '#3B82F620' }]}>
        <Text style={styles.typeText}>{type}</Text>
      </View>
      <Text style={styles.knowledgeSource}>{source}</Text>
    </View>
    <Text style={styles.knowledgeTitle}>{title}</Text>
    <View style={styles.knowledgeFooter}>
      <View style={styles.knowledgeMeta}>
        <Clock size={12} color="#6B7280" />
        <Text style={styles.knowledgeMetaText}>{updated}</Text>
      </View>
      <View style={styles.knowledgeMeta}>
        <Eye size={12} color="#6B7280" />
        <Text style={styles.knowledgeMetaText}>{views} views</Text>
      </View>
    </View>
  </View>
);

// Expert Card
const ExpertCard = ({ name, role, expertise, score }: any) => (
  <View style={[styles.expertCard, { backgroundColor: '#1E293B' }]}>
    <View style={[styles.expertAvatar, { backgroundColor: '#7C3AED' }]}>
      <Text style={styles.expertInitial}>{name[0]}</Text>
    </View>
    <View style={styles.expertInfo}>
      <Text style={styles.expertName}>{name}</Text>
      <Text style={styles.expertRole}>{role}</Text>
      <View style={styles.expertExpertise}>
        {expertise.map((exp: string, i: number) => (
          <View key={i} style={styles.expertiseTag}>
            <Text style={styles.expertiseText}>{exp}</Text>
          </View>
        ))}
      </View>
    </View>
    <View style={styles.expertScore}>
      <Star size={14} color="#F59E0B" fill="#F59E0B" />
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  </View>
);

export default function CompanyBrainScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const FEATURES = [
    {
      title: 'Knowledge Ingestion',
      description: 'Auto-capture from documents, Slack, email, and meetings',
      icon: Database,
      color: '#3B82F6',
      route: '/ai-agent/company-brain/ingestion',
      agents: 12
    },
    {
      title: 'Knowledge Extraction',
      description: 'AI-powered categorization and entity recognition',
      icon: Brain,
      color: '#7C3AED',
      route: '/ai-agent/company-brain/extraction',
      agents: 8
    },
    {
      title: 'Knowledge Graph',
      description: 'Visual representation of information connections',
      icon: Network,
      color: '#10B981',
      route: '/ai-agent/company-brain/graph',
      agents: 6
    },
    {
      title: 'Smart Search',
      description: 'Natural language search with contextual results',
      icon: Search,
      color: '#F59E0B',
      route: '/ai-agent/company-brain/search',
      agents: 4
    },
    {
      title: 'Knowledge Continuity',
      description: 'Onboarding assistant and departure protection',
      icon: Shield,
      color: '#EC4899',
      route: '/ai-agent/company-brain/continuity',
      agents: 10
    },
    {
      title: 'Analytics & Insights',
      description: 'Knowledge health metrics and usage analytics',
      icon: BarChart3,
      color: '#06B6D4',
      route: '/ai-agent/company-brain/analytics',
      agents: 6
    },
    {
      title: 'Team Spaces',
      description: 'Department and project-specific knowledge bases',
      icon: Users,
      color: '#8B5CF6',
      route: '/ai-agent/company-brain/team-spaces',
      agents: 4
    },
    {
      title: 'Knowledge Contributions',
      description: 'Manual notes, peer review, and expert validation',
      icon: BookOpen,
      color: '#10B981',
      route: '/ai-agent/company-brain/contributions',
      agents: 3
    }
  ];

  const KNOWLEDGE_NODES = [
    { title: 'Q4 Product Launch Strategy', type: 'Process', source: 'Slack #product', updated: '2h ago', views: 234 },
    { title: 'Client Refund Policy v2.3', type: 'Decision', source: 'Google Docs', updated: '1d ago', views: 567 },
    { title: 'AWS Migration Playbook', type: 'Technical', source: 'Confluence', updated: '3d ago', views: 891 },
    { title: 'Acme Corp Preferences', type: 'Client', source: 'CRM', updated: '5h ago', views: 156 },
    { title: 'Sprint 45 Goals & Timeline', type: 'Project', source: 'Jira', updated: '4h ago', views: 423 },
    { title: 'Hiring Interview Process', type: 'Process', source: 'Notion', updated: '1w ago', views: 789 }
  ];

  const EXPERTS = [
    { name: 'Sarah Chen', role: 'VP Engineering', expertise: ['Architecture', 'AWS', 'Microservices'], score: 98 },
    { name: 'Mike Johnson', role: 'Sales Director', expertise: ['Negotiations', 'Enterprise', 'Q4'], score: 95 },
    { name: 'Emily Davis', role: 'Product Manager', expertise: ['Strategy', 'Roadmap', 'Launches'], score: 92 },
    { name: 'James Wilson', role: 'Legal Counsel', expertise: ['Contracts', 'Compliance', 'IP'], score: 97 }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTitleRow}>
          <View style={[styles.headerIcon, { backgroundColor: '#7C3AED20' }]}>
            <Brain size={24} color="#7C3AED" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Company Brain</Text>
            <Text style={styles.headerSubtitle}>Your Company's Collective Intelligence</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: '#1E293B' }]}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Ask anything about your company..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Knowledge Health Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Health</Text>
          <View style={styles.healthGrid}>
            <HealthCard title="Coverage" value="87%" trend="+5%" color="#10B981" />
            <HealthCard title="Freshness" value="92%" trend="+3%" color="#3B82F6" />
            <HealthCard title="Connections" value="2.4K" trend="+156" color="#7C3AED" />
            <HealthCard title="At Risk" value="12" trend="-3" color="#F59E0B" />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <FileText size={20} color="#3B82F6" />
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Knowledge Nodes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Users size={20} color="#7C3AED" />
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Contributors</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <MessageSquare size={20} color="#10B981" />
            <Text style={styles.statValue}>892</Text>
            <Text style={styles.statLabel}>Daily Queries</Text>
          </View>
        </View>

        {/* Core Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Features</Text>
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </View>
        </View>

        {/* Recent Knowledge Nodes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Knowledge</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.knowledgeScroll}>
            {KNOWLEDGE_NODES.map((node, index) => (
              <KnowledgeCard key={index} {...node} />
            ))}
          </ScrollView>
        </View>

        {/* Organization Experts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Organization Experts</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {EXPERTS.map((expert, index) => (
            <ExpertCard key={index} {...expert} />
          ))}
        </View>

        {/* AI Agents for Company Brain */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Brain AI Agents</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Knowledge Curator', color: '#3B82F6' },
              { name: 'Content Analyzer', color: '#7C3AED' },
              { name: 'Search Optimizer', color: '#10B981' },
              { name: 'Risk Detector', color: '#F59E0B' }
            ].map((agent, index) => (
              <TouchableOpacity key={index} style={[styles.agentChip, { backgroundColor: agent.color + '20' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <Zap size={20} color="#F59E0B" />
              <Text style={styles.actionText}>New Knowledge Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <Target size={20} color="#10B981" />
              <Text style={styles.actionText}>Run Knowledge Audit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <AlertTriangle size={20} color="#EF4444" />
              <Text style={styles.actionText}>View At-Risk Knowledge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1E293B' }]}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.actionText}>Integration Settings</Text>
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
    padding: 16,
    backgroundColor: '#0F172A'
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF'
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12
  },
  seeAll: {
    fontSize: 14,
    color: '#3B82F6'
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  healthCard: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  healthValue: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  healthTitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4
  },
  healthTrend: {
    fontSize: 11,
    marginTop: 2
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  featureCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    position: 'relative'
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4
  },
  featureDesc: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 8
  },
  featureAgents: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  featureAgentsText: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  featureArrow: {
    position: 'absolute',
    top: 16,
    right: 16
  },
  knowledgeScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  knowledgeCard: {
    width: 200,
    padding: 12,
    borderRadius: 12,
    marginRight: 12
  },
  knowledgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  typeText: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '500'
  },
  knowledgeSource: {
    fontSize: 10,
    color: '#6B7280'
  },
  knowledgeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8
  },
  knowledgeFooter: {
    flexDirection: 'row',
    gap: 12
  },
  knowledgeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  knowledgeMetaText: {
    fontSize: 10,
    color: '#6B7280'
  },
  expertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8
  },
  expertAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  expertInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  expertInfo: {
    flex: 1,
    marginLeft: 12
  },
  expertName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  expertRole: {
    fontSize: 12,
    color: '#9CA3AF'
  },
  expertExpertise: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4
  },
  expertiseTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  expertiseText: {
    fontSize: 10,
    color: '#D1D5DB'
  },
  expertScore: {
    alignItems: 'center'
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
    marginTop: 2
  },
  agentsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  agentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6
  },
  agentChipText: {
    fontSize: 13,
    fontWeight: '500'
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  actionCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  actionText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500'
  }
};