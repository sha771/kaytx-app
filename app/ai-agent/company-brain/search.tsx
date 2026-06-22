import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, useSafeAreaInsets, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Search, Filter, Mic, Image as ImageIcon, Clock, User, FileText, MessageSquare, Star, Zap, ArrowRight, TrendingUp, Shield, Sparkles, BookOpen } from 'lucide-react-native';

export default function SmartSearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Search state
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((params.query as string) || '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Dynamic search results
  const [results, setResults] = useState<any[]>([]);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const DATABASE_NODES = [
    { id: 1, title: 'Client Refund Policy v2.3', type: 'Decision', source: 'Google Docs', confidence: 96, snippet: 'To process a client refund, the account executive must provide the unique order identifier within 30 calendar days of transaction completion. Escalations above $500 require VP approval.', updated: '2 days ago', tag: 'refund' },
    { id: 2, title: 'AWS Migration Playbook', type: 'Technical', source: 'Confluence', confidence: 94, snippet: 'Lift-and-shift server blueprints. Relies on VPC endpoints, transit gateways, and RDS PostgreSQL replication. Phase 1 deployment finalized in US-West-2.', updated: '5 hours ago', tag: 'aws' },
    { id: 3, title: 'Acme Corp Account Preferences', type: 'Client', source: 'CRM', confidence: 98, snippet: 'Acme Corp requires single-tenant deployment structures. Principal contact is Sarah Rivera. Billing reviews occur on a quarterly frequency.', updated: '3 days ago', tag: 'acme' },
    { id: 4, title: 'Sprint 47 Retrospective SOP', type: 'Process', source: 'Jira', confidence: 91, snippet: 'Standard sprint reviews occur every second Thursday at 10 AM EST. Action items must be logged in the centralized engineering ticket queue.', updated: '1 week ago', tag: 'sprint' },
    { id: 5, title: 'API Gateway Authentication Pattern', type: 'Technical', source: 'GitHub', confidence: 95, snippet: 'Uses JWT token verification with Redis-backed caching for rate limiting. Key rotations occur automatically every 90 days.', updated: '4 hours ago', tag: 'aws' },
    { id: 6, title: 'Q4 Product Launch Timeline', type: 'Project', source: 'Notion', updated: '2 weeks ago', confidence: 93, snippet: 'Phased rollout calendar starting Oct 1st. Marketing materials due Sept 15. Security compliance certification must sign off prior to release.', tag: 'launch' },
  ];

  // Run RAG Search Simulator
  const performSearch = (queryStr: string) => {
    if (!queryStr.trim()) {
      setResults([]);
      setAiAnswer(null);
      return;
    }

    setIsSearching(true);
    setSearchStep('Querying Pinecone vector embeddings...');
    setAiAnswer(null);

    setTimeout(() => {
      setSearchStep('Synthesizing institutional context...');
      
      setTimeout(() => {
        setIsSearching(false);
        const query = queryStr.toLowerCase();
        
        // Match logic
        const matches = DATABASE_NODES.filter(node => 
          node.title.toLowerCase().includes(query) || 
          node.snippet.toLowerCase().includes(query) || 
          node.tag.includes(query)
        );

        setResults(matches);

        // Synthesis generation
        if (query.includes('aws') || query.includes('migr')) {
          setAiAnswer('Company Brain Synthesis: Our AWS migration is currently on Phase 1, managed by Sarah Chen. It uses RDS PostgreSQL replication and VPC endpoints in US-West-2. API gateways are governed by Redis-backed JWT token rate limiting.');
        } else if (query.includes('refund') || query.includes('policy')) {
          setAiAnswer('Company Brain Synthesis: Client refunds are capped at 30 days post-purchase, requiring a unique order ID. Transactions exceeding $500 are routed to the VP of Engineering for manual overrides.');
        } else if (query.includes('acme')) {
          setAiAnswer('Company Brain Synthesis: Acme Corp is a high-priority enterprise client requiring single-tenant server isolating configurations. Sarah Rivera is the key stakeholder.');
        } else {
          setAiAnswer(`Company Brain Synthesis: Found ${matches.length} institutional entries relating to "${queryStr}". Relevant authors include Sarah Chen and James Wilson.`);
        }
      }, 500);
    }, 600);
  };

  // Perform search on mount if parameter exists
  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, []);

  const handleQuerySubmit = () => {
    performSearch(searchQuery);
  };

  const handleSuggestedClick = (text: string) => {
    setSearchQuery(text);
    performSearch(text);
  };

  const FILTERS = [
    { id: 'all', label: 'All Context' },
    { id: 'document', label: 'Documents' },
    { id: 'slack', label: 'Slack Logs' },
    { id: 'decision', label: 'Decisions' },
    { id: 'client', label: 'Client Hubs' }
  ];

  const RECENT_SEARCHES = [
    'AWS migration best practices',
    'Client onboarding process',
    'Q4 sales targets',
    'Security compliance requirements'
  ];

  const SUGGESTED_FOLLOWUPS = [
    'How do we handle enterprise clients?',
    'What was the decision timeline?',
    'Who owns this process?',
    'When was this last updated?'
  ];

  // Filtered results
  const displayedResults = results.filter(r => 
    activeFilter === 'all' || r.type.toLowerCase() === activeFilter.toLowerCase() || r.source.toLowerCase().includes(activeFilter.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Smart Search</Text>
          <Text style={styles.headerSubtitle}>Semantic queries powered by vector embeddings</Text>
        </View>
      </View>

      {/* Search Input Section */}
      <View style={styles.searchSection}>
        <View style={[styles.searchContainer, { backgroundColor: '#1E293B' }]}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Ask anything about your company (e.g. AWS Migration, Client refunds)..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleQuerySubmit}
            autoFocus
          />
          <View style={styles.searchActions}>
            <TouchableOpacity style={styles.searchAction} onPress={() => handleSuggestedClick('AWS migration')}>
              <Mic size={18} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchAction} onPress={() => handleSuggestedClick('refund policy')}>
              <ImageIcon size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {FILTERS.map((filter) => (
            <TouchableOpacity 
              key={filter.id} 
              style={[
                styles.filterChip, 
                { backgroundColor: activeFilter === filter.id ? '#3B82F6' : '#1E293B' }
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[styles.filterText, { color: activeFilter === filter.id ? '#FFFFFF' : '#9CA3AF' }]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Progress State */}
        {isSearching && (
          <View style={styles.searchProgress}>
            <ActivityIndicator size="small" color="#3B82F6" />
            <Text style={styles.progressText}>{searchStep}</Text>
          </View>
        )}

        {/* RAG Synthesis Result Card */}
        {aiAnswer && !isSearching && (
          <View style={styles.synthesisContainer}>
            <View style={styles.synthesisHeader}>
              <Sparkles size={16} color="#7C3AED" />
              <Text style={styles.synthesisTitle}>Autonomous RAG Synthesis</Text>
            </View>
            <Text style={styles.synthesisBody}>{aiAnswer}</Text>
            <View style={styles.synthesisFooter}>
              <Shield size={10} color="#10B981" />
              <Text style={styles.synthesisBadgeText}>Confidence high • Source verified</Text>
            </View>
          </View>
        )}

        {/* Search Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>892</Text>
            <Text style={styles.statLabel}>Daily Queries</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>Precision Rating</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>0.4s</Text>
            <Text style={styles.statLabel}>Avg Query Latency</Text>
          </View>
        </View>

        {/* Search Results */}
        {displayedResults.length > 0 && !isSearching && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Relevant Knowledge Nodes ({displayedResults.length})</Text>
            {displayedResults.map((result, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.resultCard, { backgroundColor: '#1E293B' }]}
                onPress={() => router.push(`/ai-agent/company-brain/graph`)}
              >
                <View style={styles.resultHeader}>
                  <View style={[styles.typeBadge, { backgroundColor: '#3B82F615' }]}>
                    <Text style={styles.typeText}>{result.type}</Text>
                  </View>
                  <View style={styles.resultMeta}>
                    <Text style={styles.resultSource}>{result.source}</Text>
                    <Text style={styles.resultDot}>•</Text>
                    <Text style={styles.resultTime}>{result.updated}</Text>
                  </View>
                </View>
                <Text style={styles.resultTitle}>{result.title}</Text>
                <Text style={styles.resultSnippet} numberOfLines={3}>{result.snippet}</Text>
                
                <View style={styles.resultFooter}>
                  <View style={styles.confidenceRow}>
                    <Zap size={12} color="#F59E0B" />
                    <Text style={styles.confidenceText}>{result.confidence}% vector confidence</Text>
                  </View>
                  <ArrowRight size={14} color="#6B7280" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Empty Fallback */}
        {searchQuery && displayedResults.length === 0 && !isSearching && (
          <View style={styles.emptyContainer}>
            <BookOpen size={24} color="#6B7280" />
            <Text style={styles.emptyText}>No explicit matches. Try broad terms like "AWS" or "Refund".</Text>
          </View>
        )}

        {/* Suggested Follow-ups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conversational Follow-ups</Text>
          <View style={styles.followUps}>
            {SUGGESTED_FOLLOWUPS.map((followup, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.followUpItem, { backgroundColor: '#1E293B' }]}
                onPress={() => handleSuggestedClick(followup)}
              >
                <MessageSquare size={14} color="#3B82F6" />
                <Text style={styles.followUpText}>{followup}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearText}>Clear Feed</Text>
            </TouchableOpacity>
          </View>
          {RECENT_SEARCHES.map((search, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.recentItem, { backgroundColor: '#1E293B' }]}
              onPress={() => handleSuggestedClick(search)}
            >
              <Clock size={14} color="#6B7280" />
              <Text style={styles.recentText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Corporate Queries</Text>
          <View style={styles.trendingRow}>
            {[
              { topic: 'AWS Migration Phase 1', trend: '+45%' },
              { topic: 'Single-tenant policies', trend: '+32%' },
              { topic: 'Quarterly compliance checklist', trend: '+28%' },
              { topic: 'Onboarding mentors list', trend: '+21%' }
            ].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.trendingCard, { backgroundColor: '#1E293B' }]}
                onPress={() => handleSuggestedClick(item.topic)}
              >
                <TrendingUp size={14} color="#10B981" />
                <Text style={styles.trendingTopic}>{item.topic}</Text>
                <Text style={styles.trendingTrend}>{item.trend}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 60 }} />
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
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 8
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF'
  },
  searchActions: {
    flexDirection: 'row',
    gap: 8
  },
  searchAction: {
    padding: 4
  },
  filters: {
    marginTop: 12
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8
  },
  filterText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  searchProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    gap: 8
  },
  progressText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600'
  },
  synthesisContainer: {
    backgroundColor: '#7C3AED10',
    borderColor: '#7C3AED30',
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  synthesisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8
  },
  synthesisTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#7C3AED',
    textTransform: 'uppercase'
  },
  synthesisBody: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18
  },
  synthesisFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12
  },
  synthesisBadgeText: {
    fontSize: 10,
    color: '#10B981',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12
  },
  clearText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500'
  },
  resultCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#37415130'
  },
  resultHeader: {
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
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  resultSource: {
    fontSize: 10,
    color: '#6B7280'
  },
  resultDot: {
    fontSize: 10,
    color: '#6B7280'
  },
  resultTime: {
    fontSize: 10,
    color: '#6B7280'
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6
  },
  resultSnippet: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#37415140',
    paddingTop: 10
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  confidenceText: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '600'
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
    gap: 10
  },
  recentText: {
    fontSize: 13,
    color: '#FFFFFF'
  },
  followUps: {
    gap: 8
  },
  followUpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 10
  },
  followUpText: {
    fontSize: 13,
    color: '#FFFFFF',
    flex: 1
  },
  trendingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8
  },
  trendingTopic: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500'
  },
  trendingTrend: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600'
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#1E293B40',
    borderRadius: 12,
    marginBottom: 20
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center'
  },
};