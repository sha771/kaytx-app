import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
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
} from '@/constants/aiAgentHierarchyIndex';

const { width } = Dimensions.get('window');

// ============================================
// ENHANCED A2A NETWORK HUB SCREEN
// Complete visualization with 106-agent hierarchy
// ============================================

const A2ANetworkScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { colors } = theme;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'topology' | 'logs' | 'protocols' | 'matrix'>('topology');
  const [selectedAgent, setSelectedAgent] = useState<AIEmployeeProfile | null>(null);

  // Combine all 106 agents
  const allAgents = useMemo(() => [
    ...cSuiteExecutives,
    ...vpDirectors,
    ...managers,
    ...teamLeads,
    ...specialists,
  ], []);

  const filteredAgents = allAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate A2A connections based on hierarchy
  const networkConnections = useMemo(() => {
    const connections: {
      from: AIEmployeeProfile;
      to: AIEmployeeProfile;
      type: 'escalation' | 'peer' | 'consultation' | 'reporting';
      strength: number;
    }[] = [];

    allAgents.forEach(agent => {
      // Escalation paths (upward)
      if (agent.canEscalateTo) {
        agent.canEscalateTo.forEach(targetId => {
          const target = allAgents.find(a => a.id === targetId);
          if (target) {
            connections.push({
              from: agent,
              to: target,
              type: 'escalation',
              strength: 0.9,
            });
          }
        });
      }

      // Reporting lines (downward)
      if (agent.orgChart?.directReports) {
        agent.orgChart.directReports.forEach(reportId => {
          const report = allAgents.find(a => a.id === reportId);
          if (report && !connections.find(c => c.from.id === agent.id && c.to.id === report.id)) {
            connections.push({
              from: agent,
              to: report,
              type: 'reporting',
              strength: 0.7,
            });
          }
        });
      }

      // Peer relationships
      if (agent.orgChart?.peerPositions) {
        agent.orgChart.peerPositions.forEach(peerId => {
          const peer = allAgents.find(a => a.id === peerId);
          if (peer) {
            // Check if connection already exists
            const exists = connections.find(c => 
              (c.from.id === agent.id && c.to.id === peer.id) ||
              (c.from.id === peer.id && c.to.id === agent.id)
            );
            if (!exists) {
              connections.push({
                from: agent,
                to: peer,
                type: 'peer',
                strength: 0.5,
              });
            }
          }
        });
      }

      // Cross-department consultation (same level, different dept)
      const sameLevelOtherDept = allAgents.filter(a => 
        a.level === agent.level && 
        a.department !== agent.department &&
        a.id !== agent.id
      );
      
      // Add a few consultation connections
      sameLevelOtherDept.slice(0, 2).forEach(other => {
        const exists = connections.find(c => 
          (c.from.id === agent.id && c.to.id === other.id) ||
          (c.from.id === other.id && c.to.id === agent.id)
        );
        if (!exists) {
          connections.push({
            from: agent,
            to: other,
            type: 'consultation',
            strength: 0.3,
          });
        }
      });
    });

    return connections;
  }, [allAgents]);

  // Stats for display
  const networkStats = useMemo(() => ({
    totalConnections: networkConnections.length,
    escalationPaths: networkConnections.filter(c => c.type === 'escalation').length,
    peerConnections: networkConnections.filter(c => c.type === 'peer').length,
    consultationPaths: networkConnections.filter(c => c.type === 'consultation').length,
    activeAgents: allAgents.filter(a => a.status === 'active').length,
  }), [networkConnections, allAgents]);

  const renderTopology = () => (
    <View style={styles.section}>
      {/* Network Overview Card */}
      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <View style={styles.hubHeader}>
          <View style={[styles.hubIcon, { backgroundColor: `${colors.primary}15` }]}>
            <Icons.Network size={32} color={colors.primary} />
          </View>
          <View style={styles.hubInfo}>
            <Text style={[styles.hubTitle, { color: colors.text }]}>A2A Communication Mesh</Text>
            <Text style={[styles.hubSubtitle, { color: colors.textSecondary }]}>
              {networkStats.totalConnections} connections • {networkStats.activeAgents} active agents
            </Text>
          </View>
        </View>
        
        <View style={styles.connectionStats}>
          <View style={styles.connectionStat}>
            <View style={[styles.connectionStatIcon, { backgroundColor: '#F4433615' }]}>
              <Icons.ArrowUp size={16} color="#F44336" />
            </View>
            <Text style={[styles.connectionStatValue, { color: colors.text }]}>
              {networkStats.escalationPaths}
            </Text>
            <Text style={[styles.connectionStatLabel, { color: colors.textSecondary }]}>Escalations</Text>
          </View>
          
          <View style={styles.connectionStat}>
            <View style={[styles.connectionStatIcon, { backgroundColor: '#2196F315' }]}>
              <Icons.Users size={16} color="#2196F3" />
            </View>
            <Text style={[styles.connectionStatValue, { color: colors.text }]}>
              {networkStats.peerConnections}
            </Text>
            <Text style={[styles.connectionStatLabel, { color: colors.textSecondary }]}>Peer</Text>
          </View>
          
          <View style={styles.connectionStat}>
            <View style={[styles.connectionStatIcon, { backgroundColor: '#4CAF5015' }]}>
              <Icons.MessageSquare size={16} color="#4CAF50" />
            </View>
            <Text style={[styles.connectionStatValue, { color: colors.text }]}>
              {networkStats.consultationPaths}
            </Text>
            <Text style={[styles.connectionStatLabel, { color: colors.textSecondary }]}>Consult</Text>
          </View>
        </View>

        <View style={[styles.networkHealth, { backgroundColor: '#4CAF5015' }]}>
          <Icons.Activity size={16} color="#4CAF50" />
          <Text style={[styles.networkHealthText, { color: '#4CAF50' }]}>
            Network Health: Excellent (99.9% uptime)
          </Text>
        </View>
      </View>

      {/* Agent Network Grid */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Communication Nodes</Text>
      <View style={styles.nodeGrid}>
        {(searchQuery ? filteredAgents : allAgents.slice(0, 12)).map((agent) => (
          <TouchableOpacity 
            key={agent.id} 
            style={[styles.nodeCard, { backgroundColor: colors.card }]}
            onPress={() => {
              setSelectedAgent(agent);
              router.push({
                pathname: '/ai-agent/agent/[agentId]',
                params: { agentId: agent.id }
              });
            }}
          >
            <View style={[styles.nodeIcon, { backgroundColor: `${agent.color}15` }]}>
              <Icons.Bot size={20} color={agent.color} />
            </View>
            <Text style={[styles.nodeName, { color: colors.text }]} numberOfLines={1}>
              {agent.name}
            </Text>
            <Text style={[styles.nodeLevel, { color: colors.textSecondary }]} numberOfLines={1}>
              {agent.level.replace('_', ' ')}
            </Text>
            
            {/* Connection indicators */}
            <View style={styles.nodeConnections}>
              {agent.canEscalateTo && agent.canEscalateTo.length > 0 && (
                <View style={[styles.nodeBadge, { backgroundColor: '#F4433615' }]}>
                  <Icons.ArrowUp size={10} color="#F44336" />
                  <Text style={[styles.nodeBadgeText, { color: '#F44336' }]}>
                    {agent.canEscalateTo.length}
                  </Text>
                </View>
              )}
              {agent.orgChart?.directReports && agent.orgChart.directReports.length > 0 && (
                <View style={[styles.nodeBadge, { backgroundColor: '#2196F315' }]}>
                  <Icons.ArrowDown size={10} color="#2196F3" />
                  <Text style={[styles.nodeBadgeText, { color: '#2196F3' }]}>
                    {agent.orgChart.directReports.length}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.nodeStatus}>
              <View style={[styles.statusDot, { backgroundColor: 
                agent.status === 'active' ? '#4CAF50' : '#FFC107' 
              }]} />
              <Text style={[styles.statusText, { color: colors.textSecondary }]}>
                {agent.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {filteredAgents.length === 0 && searchQuery && (
        <View style={styles.emptyState}>
          <Icons.Search size={48} color={colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No agents found</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Try adjusting your search query
          </Text>
        </View>
      )}
    </View>
  );

  const renderLogs = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Real-time A2A Communication</Text>
      
      {/* Live Activity Indicator */}
      <View style={[styles.liveIndicator, { backgroundColor: '#4CAF5015' }]}>
        <View style={styles.pulseDot} />
        <Text style={[styles.liveText, { color: '#4CAF50' }]}>Live • 127 messages/hour</Text>
      </View>

      {[
        { 
          from: 'AI Finance Manager', 
          to: 'AI CFO', 
          type: 'escalation', 
          message: 'Budget variance exceeds threshold',
          time: 'Just now', 
          status: 'Success' 
        },
        { 
          from: 'AI Support Specialist', 
          to: 'AI Tier 2 Lead', 
          type: 'escalation', 
          message: 'Technical issue requires expert review',
          time: '2m ago', 
          status: 'Success' 
        },
        { 
          from: 'AI Sales Manager', 
          to: 'AI AE Lead', 
          type: 'consultation', 
          message: 'Deal strategy brainstorming',
          time: '5m ago', 
          status: 'Success' 
        },
        { 
          from: 'AI Marketing Manager', 
          to: 'AI Creative Lead', 
          type: 'peer', 
          message: 'Campaign asset review',
          time: '8m ago', 
          status: 'Success' 
        },
        { 
          from: 'AI CS Specialist', 
          to: 'AI Retention Lead', 
          type: 'escalation', 
          message: 'At-risk customer intervention',
          time: '12m ago', 
          status: 'Pending' 
        },
        { 
          from: 'AI DevOps Manager', 
          to: 'AI SRE Lead', 
          type: 'reporting', 
          message: 'Incident status update',
          time: '15m ago', 
          status: 'Success' 
        },
      ].map((log, i) => {
        const typeColors: Record<string, string> = {
          escalation: '#F44336',
          consultation: '#4CAF50',
          peer: '#2196F3',
          reporting: '#FF9800',
        };

        return (
          <View key={i} style={[styles.logItem, { backgroundColor: colors.card }]}>
            <View style={styles.logHeader}>
              <View style={styles.logConnection}>
                <View style={styles.logAgent}>
                  <View style={[styles.logAgentIcon, { backgroundColor: `${typeColors[log.type]}15` }]}>
                    <Icons.Bot size={14} color={typeColors[log.type]} />
                  </View>
                  <Text style={[styles.logAgentName, { color: colors.text }]} numberOfLines={1}>
                    {log.from}
                  </Text>
                </View>
                
                <View style={styles.logArrow}>
                  <View style={[styles.logArrowLine, { backgroundColor: typeColors[log.type] }]} />
                  <Icons.ChevronRight size={14} color={typeColors[log.type]} />
                </View>
                
                <View style={styles.logAgent}>
                  <View style={[styles.logAgentIcon, { backgroundColor: '#9C27B015' }]}>
                    <Icons.Bot size={14} color="#9C27B0" />
                  </View>
                  <Text style={[styles.logAgentName, { color: colors.text }]} numberOfLines={1}>
                    {log.to}
                  </Text>
                </View>
              </View>
              <Text style={[styles.logTime, { color: colors.textSecondary }]}>{log.time}</Text>
            </View>
            
            <Text style={[styles.logMessage, { color: colors.text }]} numberOfLines={1}>
              {log.message}
            </Text>
            
            <View style={styles.logFooter}>
              <View style={[styles.logTypeBadge, { backgroundColor: `${typeColors[log.type]}15` }]}>
                <Text style={[styles.logTypeText, { color: typeColors[log.type] }]}>
                  {log.type}
                </Text>
              </View>
              <View style={styles.logStatus}>
                <Icons.CheckCircle size={14} color={log.status === 'Success' ? '#4CAF50' : '#FFC107'} />
                <Text style={[styles.logStatusText, { 
                  color: log.status === 'Success' ? '#4CAF50' : '#FFC107' 
                }]}>
                  {log.status}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderProtocols = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Communication Protocols</Text>
      
      {[
        {
          name: 'Escalation Protocol',
          description: 'Hierarchical escalation for critical issues',
          rules: ['Auto-escalate after 3 failed attempts', 'Notify manager within 5 minutes', 'Escalation path: Specialist → Lead → Manager → VP → C-Suite'],
          icon: Icons.ArrowUp,
          color: '#F44336',
        },
        {
          name: 'Peer Consultation',
          description: 'Cross-functional expert consultation',
          rules: ['Peer agents respond within 2 minutes', 'Consultation sessions logged', 'Best practice sharing enabled'],
          icon: Icons.Users,
          color: '#2196F3',
        },
        {
          name: 'Broadcast Messaging',
          description: 'Department-wide announcements and updates',
          rules: ['C-Suite can broadcast to all', 'VP can broadcast to department', 'Acknowledgment required for critical broadcasts'],
          icon: Icons.Radio,
          color: '#FF9800',
        },
        {
          name: 'Counseling Sessions',
          description: 'One-on-one mentoring and guidance',
          rules: ['Counseling style matching enabled', 'Session duration tracked', 'Outcomes documented'],
          icon: Icons.HeartHandshake,
          color: '#9C27B0',
        },
      ].map((protocol, i) => (
        <View key={i} style={[styles.protocolCard, { backgroundColor: colors.card }]}>
          <View style={[styles.protocolHeader, { backgroundColor: `${protocol.color}10` }]}>
            <View style={[styles.protocolIcon, { backgroundColor: `${protocol.color}20` }]}>
              <protocol.icon size={24} color={protocol.color} />
            </View>
            <View style={styles.protocolInfo}>
              <Text style={[styles.protocolName, { color: colors.text }]}>{protocol.name}</Text>
              <Text style={[styles.protocolDesc, { color: colors.textSecondary }]}>
                {protocol.description}
              </Text>
            </View>
          </View>
          <View style={styles.protocolRules}>
            {protocol.rules.map((rule, j) => (
              <View key={j} style={styles.protocolRule}>
                <Icons.CheckCircle size={14} color={protocol.color} />
                <Text style={[styles.protocolRuleText, { color: colors.text }]}>{rule}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.primary, '#5856D6']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>A2A Network Hub</Text>
            <Text style={styles.headerSubtitle}>Agent-to-Agent Communication</Text>
          </View>
          <TouchableOpacity style={styles.backButton}>
            <Icons.Settings color="#FFF" size={24} />
          </TouchableOpacity>
        </View>

        <View style={[styles.searchBar, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
          <Icons.Search size={20} color="#FFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Find agent, department, or protocol..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabs}>
          {[
            { id: 'topology', icon: Icons.Network, label: 'Topology' },
            { id: 'logs', icon: Icons.Activity, label: 'Live Logs' },
            { id: 'protocols', icon: Icons.Shield, label: 'Protocols' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <tab.icon size={16} color={activeTab === tab.id ? '#FFF' : 'rgba(255,255,255,0.7)'} />
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {activeTab === 'topology' && renderTopology()}
        {activeTab === 'logs' && renderLogs()}
        {activeTab === 'protocols' && renderProtocols()}
      </ScrollView>
    </View>
  );
};

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
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  tabText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFF',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  infoCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  hubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  hubIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubInfo: {
    flex: 1,
  },
  hubTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  hubSubtitle: {
    fontSize: 13,
  },
  connectionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  connectionStat: {
    alignItems: 'center',
    gap: 6,
  },
  connectionStatIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionStatValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  connectionStatLabel: {
    fontSize: 11,
  },
  networkHealth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  networkHealthText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  nodeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  nodeCard: {
    width: (width - 52) / 2,
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  nodeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  nodeName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  nodeLevel: {
    fontSize: 11,
    marginBottom: 8,
  },
  nodeConnections: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  nodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  nodeBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  nodeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  liveText: {
    fontSize: 13,
    fontWeight: '600',
  },
  logItem: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logConnection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logAgent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  logAgentIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logAgentName: {
    fontSize: 12,
    fontWeight: '600',
  },
  logArrow: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  logArrowLine: {
    width: 20,
    height: 2,
    marginBottom: -8,
    borderRadius: 1,
  },
  logTime: {
    fontSize: 11,
  },
  logMessage: {
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 34,
  },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 34,
  },
  logTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  logTypeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  logStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  protocolCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  protocolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
  },
  protocolIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  protocolInfo: {
    flex: 1,
  },
  protocolName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  protocolDesc: {
    fontSize: 13,
  },
  protocolRules: {
    padding: 16,
    paddingTop: 0,
    gap: 8,
  },
  protocolRule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  protocolRuleText: {
    fontSize: 13,
  },
});

export default A2ANetworkScreen;
