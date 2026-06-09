import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Brain, FileText, MessageSquare, Link2, Users, BarChart3, Target, Shield, Zap, BookOpen, Calendar, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Settings, Database, Network, Bot, Lightbulb, Clock, Star, Eye, Mail, Video } from 'lucide-react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export default function CompanyBrainScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Interactive State
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStep, setAuditStep] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  
  // Dynamic Health Metrics State
  const [metrics, setMetrics] = useState({
    coverage: { value: 87, trend: '+5%', color: '#10B981' },
    freshness: { value: 92, trend: '+3%', color: '#3B82F6' },
    connections: { value: 2456, trend: '+156', color: '#7C3AED' },
    atRisk: { value: 12, trend: '-3', color: '#F59E0B' }
  });

  const [recentNodes, setRecentNodes] = useState([
    { id: 1, title: 'Q4 Product Launch Strategy', type: 'Process', source: 'Slack #product', updated: '2h ago', views: 234 },
    { id: 2, title: 'Client Refund Policy v2.3', type: 'Decision', source: 'Google Docs', updated: '1d ago', views: 567 },
    { id: 3, title: 'AWS Migration Playbook', type: 'Technical', source: 'Confluence', updated: '3d ago', views: 891 },
    { id: 4, title: 'Acme Corp Preferences', type: 'Client', source: 'CRM', updated: '5h ago', views: 156 },
    { id: 5, title: 'Sprint 45 Goals & Timeline', type: 'Project', source: 'Jira', updated: '4h ago', views: 423 },
    { id: 6, title: 'Hiring Interview Process', type: 'Process', source: 'Notion', updated: '1w ago', views: 789 }
  ]);

  const [activeExperts, setActiveExperts] = useState([
    { name: 'Sarah Chen', role: 'VP Engineering', expertise: ['Architecture', 'AWS', 'Microservices'], score: 98, verified: true },
    { name: 'Mike Johnson', role: 'Sales Director', expertise: ['Negotiations', 'Enterprise', 'Q4'], score: 95, verified: true },
    { name: 'Emily Davis', role: 'Product Manager', expertise: ['Strategy', 'Roadmap', 'Launches'], score: 92, verified: true },
    { name: 'James Wilson', role: 'Legal Counsel', expertise: ['Contracts', 'Compliance', 'IP'], score: 97, verified: true }
  ]);

  // Handle Search Submission & Redirect
  const handleSearchSubmit = () => {
    router.push(`/ai-agent/company-brain/search?query=${encodeURIComponent(searchQuery)}`);
  };

  // Run Knowledge Diagnostics Simulator
  const runHealthDiagnostics = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditProgress(0);
    setShowAlert(false);

    const steps = [
      { text: 'Scanning 53k institutional nodes...', progress: 25 },
      { text: 'Validating semantic connections...', progress: 50 },
      { text: 'Analyzing department departure risk indicators...', progress: 75 },
      { text: 'Finalizing knowledge integrity report...', progress: 100 }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAuditStep(step.text);
        setAuditProgress(step.progress);
        
        if (step.progress === 100) {
          setTimeout(() => {
            setIsAuditing(false);
            setShowAlert(true);
            // Upgrade metrics in real-time
            setMetrics({
              coverage: { value: 89, trend: '+7%', color: '#10B981' },
              freshness: { value: 95, trend: '+6%', color: '#3B82F6' },
              connections: { value: 2612, trend: '+312', color: '#7C3AED' },
              atRisk: { value: 8, trend: '-7', color: '#10B981' }
            });
            // Automatically clear success alert after 4 seconds
            setTimeout(() => setShowAlert(false), 4000);
          }, 600);
        }
      }, (index + 1) * 800);
    });
  };

  const FEATURES = [
    {
      title: 'Knowledge Ingestion',
      description: 'Auto-capture from documents, Slack, email, and meetings',
      icon: Database,
      color: '#3B82F6',
      route: '/ai-agent/company-brain/ingestion',
      agents: 12,
      status: 'active'
    },
    {
      title: 'Knowledge Extraction',
      description: 'AI-powered categorization and entity recognition',
      icon: Brain,
      color: '#7C3AED',
      route: '/ai-agent/company-brain/extraction',
      agents: 8,
      status: 'active'
    },
    {
      title: 'Knowledge Graph',
      description: 'Visual representation of information connections',
      icon: Network,
      color: '#10B981',
      route: '/ai-agent/company-brain/graph',
      agents: 6,
      status: 'active'
    },
    {
      title: 'Smart Search',
      description: 'Natural language search with contextual results',
      icon: Search,
      color: '#F59E0B',
      route: '/ai-agent/company-brain/search',
      agents: 4,
      status: 'active'
    },
    {
      title: 'Knowledge Continuity',
      description: 'Onboarding assistant and departure protection',
      icon: Shield,
      color: '#EC4899',
      route: '/ai-agent/company-brain/continuity',
      agents: 10,
      status: 'active'
    },
    {
      title: 'Analytics & Insights',
      description: 'Knowledge health metrics and usage analytics',
      icon: BarChart3,
      color: '#06B6D4',
      route: '/ai-agent/company-brain/analytics',
      agents: 6,
      status: 'active'
    },
    {
      title: 'Team Spaces',
      description: 'Department and project-specific knowledge bases',
      icon: Users,
      color: '#8B5CF6',
      route: '/ai-agent/company-brain/team-spaces',
      agents: 4,
      status: 'active'
    },
    {
      title: 'Knowledge Contributions',
      description: 'Manual notes, peer review, and expert validation',
      icon: BookOpen,
      color: '#10B981',
      route: '/ai-agent/company-brain/contributions',
      agents: 3,
      status: 'active'
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTitleRow}>
          <View style={[styles.headerIcon, { backgroundColor: '#7C3AED20' }]}>
            <Brain size={24} color="#7C3AED" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.headerTitle}>Company Brain</Text>
              <View style={styles.enterpriseBadge}>
                <Shield size={10} color="#10B981" />
                <Text style={styles.enterpriseText}>Enterprise Tier</Text>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>Your Company's Collective Intelligence</Text>
          </View>
          <TouchableOpacity 
            style={[styles.settingsButton, { backgroundColor: '#1E293B' }]}
            onPress={() => router.push('/ai-agent/company-brain/analytics')}
          >
            <Settings size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar - Interactive Redirection */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: '#1E293B' }]}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Ask anything about your company (e.g. AWS migration, refund policy)..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            onFocus={() => {
              // Redirect to Search Screen if focused empty
              if (!searchQuery) router.push('/ai-agent/company-brain/search');
            }}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={handleSearchSubmit} style={styles.searchSubmitBtn}>
              <ArrowRight size={16} color="#3B82F6" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success / Alert Banner */}
        {showAlert && (
          <View style={styles.alertBanner}>
            <CheckCircle size={18} color="#10B981" />
            <Text style={styles.alertText}>Diagnostics complete. Knowledge base refreshed successfully!</Text>
          </View>
        )}

        {/* Departure Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Departure Alerts</Text>
            <TouchableOpacity onPress={() => router.push('/ai-agent/company-brain/continuity')}>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.alertCard, { backgroundColor: '#EF444415', borderColor: '#EF444425' }]}>
            <View style={styles.alertContent}>
              <AlertTriangle size={20} color="#EF4444" />
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>2 Employees at Risk</Text>
                <Text style={styles.alertDescription}>Knowledge preservation workflows initiated</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.alertAction}>
              <Text style={styles.alertActionText}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ingestion Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ingestion Status</Text>
            <TouchableOpacity onPress={() => router.push('/ai-agent/company-brain/ingestion')}>
              <Text style={styles.seeAll}>Configure</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ingestionGrid}>
            <View style={[styles.ingestionCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.ingestionIcon, { backgroundColor: '#3B82F620' }]}>
                <Database size={20} color="#3B82F6" />
              </View>
              <Text style={styles.ingestionTitle}>Slack</Text>
              <View style={styles.ingestionStatusRow}>
                <View style={[styles.ingestionDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.ingestionStatusText}>Active</Text>
              </View>
              <Text style={styles.ingestionMeta}>2.3k messages today</Text>
            </View>
            <View style={[styles.ingestionCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.ingestionIcon, { backgroundColor: '#7C3AED20' }]}>
                <Mail size={20} color="#7C3AED" />
              </View>
              <Text style={styles.ingestionTitle}>Email</Text>
              <View style={styles.ingestionStatusRow}>
                <View style={[styles.ingestionDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.ingestionStatusText}>Active</Text>
              </View>
              <Text style={styles.ingestionMeta}>156 emails today</Text>
            </View>
            <View style={[styles.ingestionCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.ingestionIcon, { backgroundColor: '#F59E0B20' }]}>
                <Video size={20} color="#F59E0B" />
              </View>
              <Text style={styles.ingestionTitle}>Zoom</Text>
              <View style={styles.ingestionStatusRow}>
                <View style={[styles.ingestionDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.ingestionStatusText}>Pending</Text>
              </View>
              <Text style={styles.ingestionMeta}>Setup required</Text>
            </View>
            <View style={[styles.ingestionCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.ingestionIcon, { backgroundColor: '#64748B20' }]}>
                <Users size={20} color="#64748B" />
              </View>
              <Text style={styles.ingestionTitle}>Teams</Text>
              <View style={styles.ingestionStatusRow}>
                <View style={[styles.ingestionDot, { backgroundColor: '#64748B' }]} />
                <Text style={styles.ingestionStatusText}>Inactive</Text>
              </View>
              <Text style={styles.ingestionMeta}>Not configured</Text>
            </View>
          </View>
        </View>

        {/* Live Knowledge Health Diagnostics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Knowledge Health Diagnostics</Text>
            <TouchableOpacity 
              disabled={isAuditing}
              onPress={runHealthDiagnostics}
              style={[styles.runAuditBtn, { backgroundColor: isAuditing ? '#374151' : '#7C3AED20' }]}
            >
              {isAuditing ? (
                <ActivityIndicator size="small" color="#7C3AED" style={{ marginRight: 6 }} />
              ) : (
                <Zap size={14} color="#7C3AED" style={{ marginRight: 6 }} />
              )}
              <Text style={[styles.runAuditText, { color: isAuditing ? '#9CA3AF' : '#7C3AED' }]}>
                {isAuditing ? 'Auditing...' : 'Run Diagnostics'}
              </Text>
            </TouchableOpacity>
          </View>

          {isAuditing && (
            <View style={styles.auditProgressContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${auditProgress}%` }]} />
              </View>
              <Text style={styles.auditStepText}>{auditStep} ({auditProgress}%)</Text>
            </View>
          )}

          <View style={styles.healthGrid}>
            <View style={[styles.healthCard, { backgroundColor: metrics.coverage.color + '10', borderColor: metrics.coverage.color + '20' }]}>
              <Text style={[styles.healthValue, { color: metrics.coverage.color }]}>{metrics.coverage.value}%</Text>
              <Text style={styles.healthTitle}>Knowledge Coverage</Text>
              <Text style={[styles.healthTrend, { color: '#10B981' }]}>{metrics.coverage.trend}</Text>
            </View>
            
            <View style={[styles.healthCard, { backgroundColor: metrics.freshness.color + '10', borderColor: metrics.freshness.color + '20' }]}>
              <Text style={[styles.healthValue, { color: metrics.freshness.color }]}>{metrics.freshness.value}%</Text>
              <Text style={styles.healthTitle}>Freshness Index</Text>
              <Text style={[styles.healthTrend, { color: '#10B981' }]}>{metrics.freshness.trend}</Text>
            </View>

            <View style={[styles.healthCard, { backgroundColor: metrics.connections.color + '10', borderColor: metrics.connections.color + '20' }]}>
              <Text style={[styles.healthValue, { color: metrics.connections.color }]}>{(metrics.connections.value / 1000).toFixed(1)}k</Text>
              <Text style={styles.healthTitle}>Graph Relationships</Text>
              <Text style={[styles.healthTrend, { color: '#10B981' }]}>{metrics.connections.trend}</Text>
            </View>

            <View style={[styles.healthCard, { backgroundColor: metrics.atRisk.color + '10', borderColor: metrics.atRisk.color + '20' }]}>
              <Text style={[styles.healthValue, { color: metrics.atRisk.color }]}>{metrics.atRisk.value}</Text>
              <Text style={styles.healthTitle}>At Risk SOP Holders</Text>
              <Text style={[styles.healthTrend, { color: metrics.atRisk.value <= 8 ? '#10B981' : '#EF4444' }]}>{metrics.atRisk.trend}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <FileText size={18} color="#3B82F6" />
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Documents Indexed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Users size={18} color="#7C3AED" />
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Verified Experts</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <MessageSquare size={18} color="#10B981" />
            <Text style={styles.statValue}>892</Text>
            <Text style={styles.statLabel}>Queries Solved</Text>
          </View>
        </View>

        {/* Core Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enterprise Modules</Text>
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.featureCard, { backgroundColor: '#1E293B' }]} 
                onPress={() => router.push(feature.route)}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <feature.icon size={22} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc} numberOfLines={2}>{feature.description}</Text>
                {feature.agents > 0 && (
                  <View style={styles.featureAgents}>
                    <Bot size={12} color="#9CA3AF" />
                    <Text style={styles.featureAgentsText}>{feature.agents} Active Agents</Text>
                  </View>
                )}
                <ArrowRight size={14} color="#6B7280" style={styles.featureArrow} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Knowledge Nodes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Extracted Intelligence</Text>
            <TouchableOpacity onPress={() => router.push('/ai-agent/company-brain/extraction')}>
              <Text style={styles.seeAll}>Manage Nodes</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.knowledgeScroll}>
            {recentNodes.map((node, index) => (
              <TouchableOpacity 
                key={node.id} 
                style={[styles.knowledgeCard, { backgroundColor: '#1E293B' }]}
                onPress={() => router.push(`/ai-agent/company-brain/search?query=${encodeURIComponent(node.title)}`)}
              >
                <View style={styles.knowledgeHeader}>
                  <View style={[styles.typeBadge, { backgroundColor: '#3B82F620' }]}>
                    <Text style={styles.typeText}>{node.type}</Text>
                  </View>
                  <Text style={styles.knowledgeSource} numberOfLines={1}>{node.source}</Text>
                </View>
                <Text style={styles.knowledgeTitle} numberOfLines={2}>{node.title}</Text>
                <View style={styles.knowledgeFooter}>
                  <View style={styles.knowledgeMeta}>
                    <Clock size={11} color="#6B7280" />
                    <Text style={styles.knowledgeMetaText}>{node.updated}</Text>
                  </View>
                  <View style={styles.knowledgeMeta}>
                    <Eye size={11} color="#6B7280" />
                    <Text style={styles.knowledgeMetaText}>{node.views}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Organization Experts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Internal Knowledge Leaders</Text>
            <TouchableOpacity onPress={() => router.push('/ai-agent/company-brain/contributions')}>
              <Text style={styles.seeAll}>Verify Contributions</Text>
            </TouchableOpacity>
          </View>
          {activeExperts.map((expert, index) => (
            <View key={index} style={[styles.expertCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.expertAvatar, { backgroundColor: '#7C3AED' }]}>
                <Text style={styles.expertInitial}>{expert.name[0]}</Text>
              </View>
              <View style={styles.expertInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.expertName}>{expert.name}</Text>
                  <CheckCircle size={12} color="#10B981" />
                </View>
                <Text style={styles.expertRole}>{expert.role}</Text>
                <View style={styles.expertExpertise}>
                  {expert.expertise.map((exp: string, i: number) => (
                    <View key={i} style={styles.expertiseTag}>
                      <Text style={styles.expertiseText}>{exp}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.expertScore}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.scoreText}>{expert.score}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* AI Agents for Company Brain */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autonomous Knowledge Workers</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Knowledge Curator', color: '#3B82F6', action: 'Connected' },
              { name: 'Content Analyzer', color: '#7C3AED', action: 'Analyzing Confluence' },
              { name: 'Search Optimizer', color: '#10B981', action: 'Optimizing indexes' },
              { name: 'Risk Detector', color: '#EF4444', action: 'Departure safety audit' }
            ].map((agent, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.agentChip, { backgroundColor: agent.color + '15', borderColor: agent.color + '25', borderWidth: 1 }]}
                onPress={() => router.push('/ai-agent/company-brain/analytics')}
              >
                <View style={[styles.agentDot, { backgroundColor: agent.color }]} />
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Direct Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#1E293B' }]}
              onPress={() => router.push('/ai-agent/company-brain/contributions')}
            >
              <Zap size={18} color="#F59E0B" />
              <Text style={styles.actionText}>Add Knowledge Node</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#1E293B' }]}
              onPress={runHealthDiagnostics}
              disabled={isAuditing}
            >
              <Target size={18} color="#10B981" />
              <Text style={styles.actionText}>Trigger Integrity Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#1E293B' }]}
              onPress={() => router.push('/ai-agent/company-brain/continuity')}
            >
              <AlertTriangle size={18} color="#EF4444" />
              <Text style={styles.actionText}>Resolve Holder Risks</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#1E293B' }]}
              onPress={() => router.push('/ai-agent/company-brain/ingestion')}
            >
              <Settings size={18} color="#9CA3AF" />
              <Text style={styles.actionText}>Source Integrations</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 60 }} />
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  enterpriseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98115',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4
  },
  enterpriseText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600'
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF'
  },
  searchSubmitBtn: {
    padding: 6,
    backgroundColor: '#3B82F620',
    borderRadius: 8
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98115',
    borderWidth: 1,
    borderColor: '#10B98125',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10
  },
  alertText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '500',
    flex: 1
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  runAuditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  runAuditText: {
    fontSize: 12,
    fontWeight: '600'
  },
  auditProgressContainer: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 3
  },
  auditStepText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    fontWeight: '500'
  },
  seeAll: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '500'
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  healthCard: {
    flex: 1,
    minWidth: '45%',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1
  },
  healthValue: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  healthTitle: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
    fontWeight: '500'
  },
  healthTrend: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600'
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#37415140'
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 6
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
    textAlign: 'center'
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  featureCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#37415130'
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4
  },
  featureDesc: {
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 14,
    marginBottom: 8
  },
  featureAgents: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  featureAgentsText: {
    fontSize: 10,
    color: '#9CA3AF'
  },
  featureArrow: {
    position: 'absolute',
    top: 14,
    right: 14
  },
  knowledgeScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  knowledgeCard: {
    width: 210,
    padding: 14,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#37415130'
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
    fontSize: 9,
    color: '#3B82F6',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  knowledgeSource: {
    fontSize: 10,
    color: '#6B7280',
    flex: 1,
    textAlign: 'right',
    marginLeft: 8
  },
  knowledgeTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    height: 36,
    lineHeight: 18,
    marginBottom: 8
  },
  knowledgeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#37415140',
    paddingTop: 8
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
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#37415130'
  },
  expertAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  expertInitial: {
    fontSize: 16,
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
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 1
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
    fontSize: 9,
    color: '#D1D5DB'
  },
  expertScore: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8
  },
  scoreText: {
    fontSize: 12,
    fontWeight: 'bold',
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
  agentDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  agentChipText: {
    fontSize: 12,
    fontWeight: '600'
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  actionCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#37415130'
  },
  actionText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  alertInfo: {
    flex: 1
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2
  },
  alertDescription: {
    fontSize: 12,
    color: '#9CA3AF'
  },
  alertAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EF4444',
    borderRadius: 8
  },
  alertActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  ingestionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  ingestionCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#37415130'
  },
  ingestionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  ingestionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6
  },
  ingestionStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4
  },
  ingestionDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  ingestionStatusText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500'
  },
  ingestionMeta: {
    fontSize: 10,
    color: '#6B7280'
  }
};