import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  AIEmployeeProfile,
  cSuiteExecutives,
  vpDirectors,
  managers,
  teamLeads,
  specialists,
  AI_WORKFORCE_COMPLETE_STATS,
  departmentNames,
  departmentColors,
} from '@/constants/aiAgentHierarchyIndex';

const { width, height } = Dimensions.get('window');

// ============================================
// ENHANCED AI WORKFORCE ARCHITECTURE DASHBOARD
// Complete hierarchy visualization with A2A & Counseling
// ============================================

type ViewMode = 'hierarchy' | 'a2a-network' | 'counseling' | 'departments' | 'matrix';
type HierarchyLevel = 'all' | 'c_level' | 'vp_director' | 'manager' | 'team_lead' | 'specialist';

const AIWorkforceArchitectureDashboard = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [viewMode, setViewMode] = useState<ViewMode>('hierarchy');
  const [selectedLevel, setSelectedLevel] = useState<HierarchyLevel>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<AIEmployeeProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAgentModal, setShowAgentModal] = useState(false);

  // Combine all agents
  const allAgents = useMemo(() => [
    ...cSuiteExecutives,
    ...vpDirectors,
    ...managers,
    ...teamLeads,
    ...specialists,
  ], []);

  // Filter agents based on search and filters
  const filteredAgents = useMemo(() => {
    return allAgents.filter(agent => {
      const matchesSearch = 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLevel = selectedLevel === 'all' || agent.level === selectedLevel;
      const matchesDept = selectedDepartment === 'all' || agent.department === selectedDepartment;
      
      return matchesSearch && matchesLevel && matchesDept;
    });
  }, [allAgents, searchQuery, selectedLevel, selectedDepartment]);

  // Get agents by level for hierarchy view
  const agentsByLevel = useMemo(() => ({
    cSuite: allAgents.filter(a => a.level === 'c_level'),
    vpDirectors: allAgents.filter(a => a.level === 'vp_director'),
    managers: allAgents.filter(a => a.level === 'manager'),
    teamLeads: allAgents.filter(a => a.level === 'team_lead'),
    specialists: allAgents.filter(a => a.level === 'specialist'),
  }), [allAgents]);

  // Get department stats
  const departmentStats = useMemo(() => {
    const stats = new Map<string, number>();
    allAgents.forEach(agent => {
      stats.set(agent.department, (stats.get(agent.department) || 0) + 1);
    });
    return Array.from(stats.entries()).map(([dept, count]) => ({
      id: dept,
      name: departmentNames[dept] || dept,
      count,
      color: departmentColors[dept] || '#999',
    }));
  }, [allAgents]);

  // A2A connections for network view
  const a2aConnections = useMemo(() => {
    const connections: {from: string; to: string; type: string; strength: number}[] = [];
    
    allAgents.forEach(agent => {
      // Add escalation paths
      if (agent.canEscalateTo) {
        agent.canEscalateTo.forEach(targetId => {
          connections.push({
            from: agent.id,
            to: targetId,
            type: 'escalation',
            strength: 0.8,
          });
        });
      }
      
      // Add peer relationships
      if (agent.orgChart?.peerPositions) {
        agent.orgChart.peerPositions.forEach(peerId => {
          if (connections.find(c => 
            (c.from === agent.id && c.to === peerId) || 
            (c.from === peerId && c.to === agent.id)
          )) return;
          
          connections.push({
            from: agent.id,
            to: peerId,
            type: 'peer',
            strength: 0.5,
          });
        });
      }
      
      // Add consultation paths based on department
      const sameDeptAgents = allAgents.filter(a => 
        a.department === agent.department && a.id !== agent.id
      );
      
      sameDeptAgents.slice(0, 3).forEach(peer => {
        if (!connections.find(c => 
          (c.from === agent.id && c.to === peer.id) || 
          (c.from === peer.id && c.to === agent.id)
        )) {
          connections.push({
            from: agent.id,
            to: peer.id,
            type: 'consultation',
            strength: 0.4,
          });
        }
      });
    });
    
    return connections;
  }, [allAgents]);

  const onAgentPress = useCallback((agent: AIEmployeeProfile) => {
    setSelectedAgent(agent);
    setShowAgentModal(true);
  }, []);

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const renderHeader = () => (
    <LinearGradient
      colors={[colors.primary, '#5856D6']}
      style={[styles.header, { paddingTop: insets.top + 20 }]}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icons.ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Workforce Architecture</Text>
          <Text style={styles.headerSubtitle}>106 Agents • 14 Departments • 5 Levels</Text>
        </View>
        <TouchableOpacity style={styles.backButton}>
          <Icons.Settings color="#FFF" size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
        <Icons.Search size={20} color="#FFF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search agents, roles, departments..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* View Mode Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.viewTabs}
      >
        {[
          { id: 'hierarchy', label: 'Hierarchy', icon: Icons.GitBranch },
          { id: 'a2a-network', label: 'A2A Network', icon: Icons.Network },
          { id: 'counseling', label: 'Counseling', icon: Icons.MessagesSquare },
          { id: 'departments', label: 'Departments', icon: Icons.Building2 },
          { id: 'matrix', label: 'Matrix', icon: Icons.Grid3x3 },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.viewTab,
              viewMode === tab.id && styles.viewTabActive
            ]}
            onPress={() => setViewMode(tab.id as ViewMode)}
          >
            <tab.icon size={16} color={viewMode === tab.id ? '#FFF' : 'rgba(255,255,255,0.7)'} />
            <Text style={[
              styles.viewTabText,
              viewMode === tab.id && styles.viewTabTextActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );

  const renderHierarchyView = () => (
    <View style={styles.hierarchyContainer}>
      {/* Level Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.levelFilters}
      >
        {[
          { id: 'all', label: 'All Levels', count: allAgents.length },
          { id: 'c_level', label: 'C-Suite', count: agentsByLevel.cSuite.length },
          { id: 'vp_director', label: 'VP/Directors', count: agentsByLevel.vpDirectors.length },
          { id: 'manager', label: 'Managers', count: agentsByLevel.managers.length },
          { id: 'team_lead', label: 'Team Leads', count: agentsByLevel.teamLeads.length },
          { id: 'specialist', label: 'Specialists', count: agentsByLevel.specialists.length },
        ].map(level => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.levelFilter,
              selectedLevel === level.id && { backgroundColor: colors.primary }
            ]}
            onPress={() => setSelectedLevel(level.id as HierarchyLevel)}
          >
            <Text style={[
              styles.levelFilterText,
              selectedLevel === level.id && { color: '#FFF', fontWeight: '700' }
            ]}>
              {level.label}
            </Text>
            <View style={[
              styles.levelCount,
              selectedLevel === level.id && { backgroundColor: 'rgba(255,255,255,0.3)' }
            ]}>
              <Text style={[
                styles.levelCountText,
                selectedLevel === level.id && { color: '#FFF' }
              ]}>
                {level.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Hierarchy Visualization */}
      <ScrollView style={styles.hierarchyScroll}>
        {/* C-Suite Level */}
        {(selectedLevel === 'all' || selectedLevel === 'c_level') && (
          <View style={styles.hierarchyLevel}>
            <View style={styles.levelHeader}>
              <View style={[styles.levelBadge, { backgroundColor: '#1A237E' }]}>
                <Icons.Crown size={14} color="#FFF" />
              </View>
              <Text style={[styles.levelTitle, { color: colors.text }]}>C-Suite Executives</Text>
              <Text style={[styles.levelSubtitle, { color: colors.textSecondary }]}>
                Strategic Leadership
              </Text>
            </View>
            <View style={styles.agentRow}>
              {agentsByLevel.cSuite.map(agent => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onPress={() => onAgentPress(agent)}
                  colors={colors}
                />
              ))}
            </View>
          </View>
        )}

        {/* VP/Directors Level */}
        {(selectedLevel === 'all' || selectedLevel === 'vp_director') && (
          <View style={styles.hierarchyLevel}>
            <View style={[styles.connectorLine, { backgroundColor: colors.border }]} />
            <View style={styles.levelHeader}>
              <View style={[styles.levelBadge, { backgroundColor: '#303F9F' }]}>
                <Icons.Briefcase size={14} color="#FFF" />
              </View>
              <Text style={[styles.levelTitle, { color: colors.text }]}>VP / Directors</Text>
              <Text style={[styles.levelSubtitle, { color: colors.textSecondary }]}>
                Department Leadership
              </Text>
            </View>
            <View style={styles.agentGrid}>
              {agentsByLevel.vpDirectors.map(agent => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onPress={() => onAgentPress(agent)}
                  colors={colors}
                  compact
                />
              ))}
            </View>
          </View>
        )}

        {/* Managers Level */}
        {(selectedLevel === 'all' || selectedLevel === 'manager') && (
          <View style={styles.hierarchyLevel}>
            <View style={[styles.connectorLine, { backgroundColor: colors.border }]} />
            <View style={styles.levelHeader}>
              <View style={[styles.levelBadge, { backgroundColor: '#1976D2' }]}>
                <Icons.Users size={14} color="#FFF" />
              </View>
              <Text style={[styles.levelTitle, { color: colors.text }]}>Managers</Text>
              <Text style={[styles.levelSubtitle, { color: colors.textSecondary }]}>
                Operations Management
              </Text>
            </View>
            <View style={styles.agentGrid}>
              {agentsByLevel.managers.slice(0, 8).map(agent => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onPress={() => onAgentPress(agent)}
                  colors={colors}
                  compact
                />
              ))}
            </View>
            {agentsByLevel.managers.length > 8 && (
              <TouchableOpacity style={styles.seeMoreButton}>
                <Text style={[styles.seeMoreText, { color: colors.primary }]}
                  >
                  +{agentsByLevel.managers.length - 8} more managers
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Team Leads Level */}
        {(selectedLevel === 'all' || selectedLevel === 'team_lead') && (
          <View style={styles.hierarchyLevel}>
            <View style={[styles.connectorLine, { backgroundColor: colors.border }]} />
            <View style={styles.levelHeader}>
              <View style={[styles.levelBadge, { backgroundColor: '#00796B' }]}>
                <Icons.UserCheck size={14} color="#FFF" />
              </View>
              <Text style={[styles.levelTitle, { color: colors.text }]}>Team Leads</Text>
              <Text style={[styles.levelSubtitle, { color: colors.textSecondary }]}>
                Technical Leadership
              </Text>
            </View>
            <View style={styles.agentGrid}>
              {agentsByLevel.teamLeads.slice(0, 8).map(agent => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onPress={() => onAgentPress(agent)}
                  colors={colors}
                  compact
                />
              ))}
            </View>
            {agentsByLevel.teamLeads.length > 8 && (
              <TouchableOpacity style={styles.seeMoreButton}>
                <Text style={[styles.seeMoreText, { color: colors.primary }]}
                  >
                  +{agentsByLevel.teamLeads.length - 8} more team leads
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Specialists Level */}
        {(selectedLevel === 'all' || selectedLevel === 'specialist') && (
          <View style={styles.hierarchyLevel}>
            <View style={[styles.connectorLine, { backgroundColor: colors.border }]} />
            <View style={styles.levelHeader}>
              <View style={[styles.levelBadge, { backgroundColor: '#388E3C' }]}>
                <Icons.Bot size={14} color="#FFF" />
              </View>
              <Text style={[styles.levelTitle, { color: colors.text }]}>Specialists</Text>
              <Text style={[styles.levelSubtitle, { color: colors.textSecondary }]}>
                Individual Contributors
              </Text>
            </View>
            <View style={styles.agentGrid}>
              {agentsByLevel.specialists.slice(0, 8).map(agent => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onPress={() => onAgentPress(agent)}
                  colors={colors}
                  compact
                />
              ))}
            </View>
            {agentsByLevel.specialists.length > 8 && (
              <TouchableOpacity style={styles.seeMoreButton}>
                <Text style={[styles.seeMoreText, { color: colors.primary }]}
                  >
                  +{agentsByLevel.specialists.length - 8} more specialists
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );

  const renderA2ANetworkView = () => (
    <View style={styles.a2aContainer}>
      {/* Network Stats */}
      <View style={[styles.networkStatsCard, { backgroundColor: colors.card }]}>
        <View style={styles.networkStat}>
          <View style={[styles.networkStatIcon, { backgroundColor: `${colors.primary}15` }]}>
            <Icons.Network size={20} color={colors.primary} />
          </View>
          <Text style={[styles.networkStatValue, { color: colors.text }]}>{a2aConnections.length}</Text>
          <Text style={[styles.networkStatLabel, { color: colors.textSecondary }]}>Connections</Text>
        </View>
        <View style={styles.networkStatDivider} />
        <View style={styles.networkStat}>
          <View style={[styles.networkStatIcon, { backgroundColor: '#FF980015' }]}>
            <Icons.Zap size={20} color="#FF9800" />
          </View>
          <Text style={[styles.networkStatValue, { color: colors.text }]}>1.2k</Text>
          <Text style={[styles.networkStatLabel, { color: colors.textSecondary }]}>Messages/hr</Text>
        </View>
        <View style={styles.networkStatDivider} />
        <View style={styles.networkStat}>
          <View style={[styles.networkStatIcon, { backgroundColor: '#4CAF5015' }]}>
            <Icons.Activity size={20} color="#4CAF50" />
          </View>
          <Text style={[styles.networkStatValue, { color: colors.text }]}>99.9%</Text>
          <Text style={[styles.networkStatLabel, { color: colors.textSecondary }]}>Uptime</Text>
        </View>
      </View>

      {/* Connection Types Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>Escalation</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2196F3' }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>Peer</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>Consultation</Text>
        </View>
      </View>

      {/* A2A Connections List */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Connections</Text>
      <FlatList
        data={a2aConnections.slice(0, 20)}
        keyExtractor={(item, index) => `${item.from}-${item.to}-${index}`}
        renderItem={({ item }) => {
          const fromAgent = allAgents.find(a => a.id === item.from);
          const toAgent = allAgents.find(a => a.id === item.to);
          if (!fromAgent || !toAgent) return null;

          const connectionColor = 
            item.type === 'escalation' ? '#F44336' :
            item.type === 'peer' ? '#2196F3' : '#4CAF50';

          return (
            <View style={[styles.connectionCard, { backgroundColor: colors.card }]}>
              <View style={styles.connectionAgents}>
                <View style={styles.connectionAgent}>
                  <View style={[styles.connectionAgentIcon, { backgroundColor: `${fromAgent.color}15` }]}>
                    <Icons.Bot size={16} color={fromAgent.color} />
                  </View>
                  <Text style={[styles.connectionAgentName, { color: colors.text }]} numberOfLines={1}>
                    {fromAgent.name}
                  </Text>
                </View>
                
                <View style={styles.connectionPath}>
                  <View style={[styles.connectionLine, { backgroundColor: connectionColor }]} />
                  <View style={[styles.connectionArrow, { backgroundColor: connectionColor }]}>
                    <Icons.ArrowRight size={12} color="#FFF" />
                  </View>
                  <Text style={[styles.connectionType, { color: connectionColor }]}>{item.type}</Text>
                </View>
                
                <View style={styles.connectionAgent}>
                  <View style={[styles.connectionAgentIcon, { backgroundColor: `${toAgent.color}15` }]}>
                    <Icons.Bot size={16} color={toAgent.color} />
                  </View>
                  <Text style={[styles.connectionAgentName, { color: colors.text }]} numberOfLines={1}>
                    {toAgent.name}
                  </Text>
                </View>
              </View>
              
              <View style={styles.connectionMeta}>
                <View style={styles.strengthIndicator}>
                  <Text style={[styles.strengthLabel, { color: colors.textSecondary }]}>Strength</Text>
                  <View style={styles.strengthBar}>
                    <View 
                      style={[
                        styles.strengthFill, 
                        { 
                          width: `${item.strength * 100}%`,
                          backgroundColor: connectionColor 
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.connectionsList}
      />
    </View>
  );

  const renderCounselingView = () => (
    <View style={styles.counselingContainer}>
      {/* Counseling Overview */}
      <View style={[styles.counselingOverview, { backgroundColor: colors.card }]}>
        <View style={styles.counselingStat}>
          <View style={[styles.counselingIcon, { backgroundColor: '#9C27B015' }]}>
            <Icons.MessagesSquare size={24} color="#9C27B0" />
          </View>
          <Text style={[styles.counselingStatValue, { color: colors.text }]}>847</Text>
          <Text style={[styles.counselingStatLabel, { color: colors.textSecondary }]}>Sessions Today</Text>
        </View>
        <View style={styles.counselingStatDivider} />
        <View style={styles.counselingStat}>
          <View style={[styles.counselingIcon, { backgroundColor: '#FF980015' }]}>
            <Icons.Clock size={24} color="#FF9800" />
          </View>
          <Text style={[styles.counselingStatValue, { color: colors.text }]}>4.2m</Text>
          <Text style={[styles.counselingStatLabel, { color: colors.textSecondary }]}>Avg Duration</Text>
        </View>
        <View style={styles.counselingStatDivider} />
        <View style={styles.counselingStat}>
          <View style={[styles.counselingIcon, { backgroundColor: '#4CAF5015' }]}>
            <Icons.ThumbsUp size={24} color="#4CAF50" />
          </View>
          <Text style={[styles.counselingStatValue, { color: colors.text }]}>96%</Text>
          <Text style={[styles.counselingStatLabel, { color: colors.textSecondary }]}>Satisfaction</Text>
        </View>
      </View>

      {/* Consulting Styles Distribution */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Consulting Styles</Text>
      <View style={styles.consultingStyles}>
        {[
          { style: 'analytical', count: 28, color: '#2196F3', icon: Icons.BarChart3 },
          { style: 'directive', count: 24, color: '#F44336', icon: Icons.Target },
          { style: 'collaborative', count: 32, color: '#4CAF50', icon: Icons.Users },
          { style: 'supportive', count: 22, color: '#9C27B0', icon: Icons.Heart },
        ].map(item => (
          <View key={item.style} style={[styles.consultingStyleCard, { backgroundColor: colors.card }]}>
            <View style={[styles.consultingStyleIcon, { backgroundColor: `${item.color}15` }]}>
              <item.icon size={20} color={item.color} />
            </View>
            <Text style={[styles.consultingStyleCount, { color: colors.text }]}>{item.count}</Text>
            <Text style={[styles.consultingStyleLabel, { color: colors.textSecondary }]}>
              {item.style.charAt(0).toUpperCase() + item.style.slice(1)}
            </Text>
            <View style={[styles.consultingStyleBar, { backgroundColor: `${item.color}30` }]}>
              <View 
                style={[
                  styles.consultingStyleFill, 
                  { width: `${(item.count / 106) * 100}%`, backgroundColor: item.color }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Recent Counseling Sessions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Sessions</Text>
      <View style={styles.sessionsList}>
        {[
          { 
            counselor: 'AI Finance Manager', 
            counselee: 'AI FP&A Team Lead', 
            topic: 'Budget Variance Analysis',
            duration: '5m',
            outcome: 'Resolved',
            type: 'analytical'
          },
          { 
            counselor: 'AI Sales Manager', 
            counselee: 'AI AE Team Lead', 
            topic: 'Deal Strategy Review',
            duration: '8m',
            outcome: 'Action Plan',
            type: 'directive'
          },
          { 
            counselor: 'AI CS Team Lead', 
            counselee: 'AI CS Specialist', 
            topic: 'Customer Escalation',
            duration: '4m',
            outcome: 'Resolved',
            type: 'supportive'
          },
          { 
            counselor: 'AI Creative Lead', 
            counselee: 'AI Content Lead', 
            topic: 'Campaign Ideation',
            duration: '12m',
            outcome: 'In Progress',
            type: 'collaborative'
          },
        ].map((session, index) => (
          <View key={index} style={[styles.sessionCard, { backgroundColor: colors.card }]}>
            <View style={styles.sessionHeader}>
              <View style={styles.sessionParticipants}>
                <View style={[styles.sessionAvatar, { backgroundColor: '#2196F315' }]}>
                  <Icons.Bot size={16} color="#2196F3" />
                </View>
                <View style={styles.sessionArrow}>
                  <Icons.ArrowRight size={14} color={colors.textSecondary} />
                </View>
                <View style={[styles.sessionAvatar, { backgroundColor: '#4CAF5015' }]}>
                  <Icons.Bot size={16} color="#4CAF50" />
                </View>
              </View>
              <View style={[styles.sessionOutcome, { 
                backgroundColor: 
                  session.outcome === 'Resolved' ? '#4CAF5015' : 
                  session.outcome === 'Action Plan' ? '#FF980015' : '#2196F315'
              }]}>
                <Text style={[styles.sessionOutcomeText, { 
                  color: 
                    session.outcome === 'Resolved' ? '#4CAF50' : 
                    session.outcome === 'Action Plan' ? '#FF9800' : '#2196F3'
                }]}>
                  {session.outcome}
                </Text>
              </View>
            </View>
            <Text style={[styles.sessionTopic, { color: colors.text }]}>{session.topic}</Text>
            <View style={styles.sessionMeta}>
              <Text style={[styles.sessionParticipant, { color: colors.textSecondary }]}>
                {session.counselor} → {session.counselee}
              </Text>
              <View style={styles.sessionDuration}>
                <Icons.Clock size={12} color={colors.textSecondary} />
                <Text style={[styles.sessionDurationText, { color: colors.textSecondary }]}>
                  {session.duration}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAgentModal = () => (
    <Modal
      visible={showAgentModal}
      animationType="slide"
      transparent
      onRequestClose={() => setShowAgentModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          {selectedAgent && (
            <>
              <View style={styles.modalHeader}>
                <View 
                  style={[
                    styles.modalAgentIcon, 
                    { backgroundColor: `${selectedAgent.color}20` }
                  ]}
                >
                  <Icons.Bot size={32} color={selectedAgent.color} />
                </View>
                <TouchableOpacity 
                  style={styles.modalClose}
                  onPress={() => setShowAgentModal(false)}
                >
                  <Icons.X size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.modalAgentName, { color: colors.text }]}>
                {selectedAgent.name}
              </Text>
              <Text style={[styles.modalAgentTitle, { color: colors.textSecondary }]}>
                {selectedAgent.title}
              </Text>
              
              <View style={styles.modalBadges}>
                <View 
                  style={[
                    styles.modalBadge, 
                    { backgroundColor: `${selectedAgent.color}15` }
                  ]}
                >
                  <Text style={[styles.modalBadgeText, { color: selectedAgent.color }]}>
                    {selectedAgent.level.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
                <View style={[styles.modalBadge, { backgroundColor: colors.card }]}>
                  <Text style={[styles.modalBadgeText, { color: colors.textSecondary }]}>
                    {departmentNames[selectedAgent.department] || selectedAgent.department}
                  </Text>
                </View>
              </View>

              <ScrollView style={styles.modalBody}>
                <Text style={[styles.modalSectionTitle, { color: colors.text }]}>
                  Description
                </Text>
                <Text style={[styles.modalDescription, { color: colors.textSecondary }]}>
                  {selectedAgent.description}
                </Text>

                <Text style={[styles.modalSectionTitle, { color: colors.text }]}>
                  Capabilities
                </Text>
                <View style={styles.modalCapabilities}>
                  {selectedAgent.capabilities.slice(0, 6).map((cap, i) => (
                    <View key={i} style={[styles.modalCapability, { backgroundColor: colors.card }]}>
                      <Icons.CheckCircle size={14} color={colors.primary} />
                      <Text style={[styles.modalCapabilityText, { color: colors.text }]}>
                        {cap}
                      </Text>
                    </View>
                  ))}
                </View>

                <Text style={[styles.modalSectionTitle, { color: colors.text }]}>
                  A2A Communication
                </Text>
                <View style={styles.modalA2A}>
                  <View style={styles.modalA2AItem}>
                    <Icons.ArrowUp size={16} color="#F44336" />
                    <Text style={[styles.modalA2ALabel, { color: colors.textSecondary }]}>
                      Escalates to:
                    </Text>
                    <Text style={[styles.modalA2AValue, { color: colors.text }]}>
                      {selectedAgent.canEscalateTo?.length || 0} agents
                    </Text>
                  </View>
                  <View style={styles.modalA2AItem}>
                    <Icons.ArrowDown size={16} color="#4CAF50" />
                    <Text style={[styles.modalA2ALabel, { color: colors.textSecondary }]}>
                      Receives from:
                    </Text>
                    <Text style={[styles.modalA2AValue, { color: colors.text }]}>
                      {selectedAgent.canReceiveEscalationFrom?.length || 0} agents
                    </Text>
                  </View>
                </View>

                <Text style={[styles.modalSectionTitle, { color: colors.text }]}>
                  Consulting Style
                </Text>
                <View style={[styles.modalConsultingStyle, { backgroundColor: `${selectedAgent.color}10` }]}>
                  <Text style={[styles.modalConsultingStyleText, { color: selectedAgent.color }]}>
                    {selectedAgent.consultationStyle?.charAt(0).toUpperCase() + 
                     selectedAgent.consultationStyle?.slice(1)}
                  </Text>
                </View>
              </ScrollView>

              <TouchableOpacity 
                style={[styles.modalAction, { backgroundColor: colors.primary }]}
                onPress={() => {
                  setShowAgentModal(false);
                  router.push({
                    pathname: '/ai-agent/agent/[agentId]',
                    params: { agentId: selectedAgent.id }
                  });
                }}
              >
                <Text style={styles.modalActionText}>View Full Profile</Text>
                <Icons.ArrowRight size={18} color="#FFF" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      
      <View style={styles.content}>
        {viewMode === 'hierarchy' && renderHierarchyView()}
        {viewMode === 'a2a-network' && renderA2ANetworkView()}
        {viewMode === 'counseling' && renderCounselingView()}
      </View>

      {renderAgentModal()}
    </View>
  );
};

// ============================================
// AGENT CARD COMPONENT
// ============================================

const AgentCard = ({ 
  agent, 
  onPress, 
  colors, 
  compact = false 
}: { 
  agent: AIEmployeeProfile; 
  onPress: () => void; 
  colors: any;
  compact?: boolean;
}) => (
  <TouchableOpacity 
    style={[
      styles.agentCard,
      compact && styles.agentCardCompact,
      { backgroundColor: colors.card }
    ]}
    onPress={onPress}
  >
    <View style={[styles.agentCardIcon, { backgroundColor: `${agent.color}15` }]}>
      <Icons.Bot size={compact ? 20 : 24} color={agent.color} />
    </View>
    <View style={styles.agentCardInfo}>
      <Text 
        style={[styles.agentCardName, { color: colors.text }]} 
        numberOfLines={1}
      >
        {agent.name}
      </Text>
      <Text 
        style={[styles.agentCardTitle, { color: colors.textSecondary }]} 
        numberOfLines={1}
      >
        {compact ? agent.level.replace('_', ' ') : agent.title}
      </Text>
    </View>
    {agent.isPremium && (
      <View style={[styles.premiumBadge, { backgroundColor: '#FFD70020' }]}>
        <Icons.Star size={12} color="#FFD700" />
      </View>
    )}
  </TouchableOpacity>
);

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 46,
    borderRadius: 14,
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
  },
  viewTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  viewTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  viewTabActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  viewTabText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  viewTabTextActive: {
    color: '#FFF',
  },
  content: {
    flex: 1,
  },

  // Hierarchy View
  hierarchyContainer: {
    flex: 1,
  },
  levelFilters: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  levelFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  levelFilterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  levelCount: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  levelCountText: {
    fontSize: 10,
    fontWeight: '700',
  },
  hierarchyScroll: {
    flex: 1,
    padding: 16,
  },
  hierarchyLevel: {
    marginBottom: 24,
  },
  connectorLine: {
    width: 2,
    height: 24,
    marginLeft: 19,
    marginBottom: 8,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  levelBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  levelSubtitle: {
    fontSize: 12,
    marginLeft: 'auto',
  },
  agentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingLeft: 40,
  },
  agentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingLeft: 40,
  },
  seeMoreButton: {
    marginLeft: 40,
    marginTop: 8,
    paddingVertical: 8,
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Agent Card
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  agentCardCompact: {
    minWidth: 140,
    padding: 10,
  },
  agentCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentCardInfo: {
    flex: 1,
  },
  agentCardName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  agentCardTitle: {
    fontSize: 11,
  },
  premiumBadge: {
    padding: 4,
    borderRadius: 6,
  },

  // A2A Network View
  a2aContainer: {
    flex: 1,
    padding: 16,
  },
  networkStatsCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  networkStat: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  networkStatIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  networkStatValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  networkStatLabel: {
    fontSize: 11,
  },
  networkStatDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  connectionsList: {
    gap: 10,
    paddingBottom: 20,
  },
  connectionCard: {
    padding: 14,
    borderRadius: 16,
  },
  connectionAgents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  connectionAgent: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  connectionAgentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionAgentName: {
    fontSize: 12,
    fontWeight: '600',
  },
  connectionPath: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  connectionLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
  },
  connectionArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -12,
  },
  connectionType: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  connectionMeta: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 10,
  },
  strengthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  strengthLabel: {
    fontSize: 11,
  },
  strengthBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Counseling View
  counselingContainer: {
    flex: 1,
    padding: 16,
  },
  counselingOverview: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  counselingStat: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  counselingIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counselingStatValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  counselingStatLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  counselingStatDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  consultingStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  consultingStyleCard: {
    width: (width - 52) / 2,
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  consultingStyleIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  consultingStyleCount: {
    fontSize: 24,
    fontWeight: '800',
  },
  consultingStyleLabel: {
    fontSize: 13,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  consultingStyleBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  consultingStyleFill: {
    height: '100%',
    borderRadius: 3,
  },
  sessionsList: {
    gap: 10,
  },
  sessionCard: {
    padding: 14,
    borderRadius: 16,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sessionParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sessionAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionArrow: {
    padding: 2,
  },
  sessionOutcome: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sessionOutcomeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sessionTopic: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  sessionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionParticipant: {
    fontSize: 12,
  },
  sessionDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sessionDurationText: {
    fontSize: 11,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalAgentIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalAgentName: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalAgentTitle: {
    fontSize: 15,
    marginBottom: 16,
  },
  modalBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  modalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  modalBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  modalBody: {
    maxHeight: 300,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 16,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalCapabilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalCapability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modalCapabilityText: {
    fontSize: 12,
  },
  modalA2A: {
    gap: 10,
  },
  modalA2AItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalA2ALabel: {
    fontSize: 13,
  },
  modalA2AValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  modalConsultingStyle: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  modalConsultingStyleText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  modalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  modalActionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AIWorkforceArchitectureDashboard;
