import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router, useLocalSearchParams } from 'expo-router';
import {
  AIAgent,
  allSubAgents,
} from '@/constants/aiAgentHierarchy';

const { width } = Dimensions.get('window');

// ============================================
// AI SUB-AGENT DETAIL SCREEN
// Individual screen for every single specialist agent
// ============================================

const SubAgentDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { agentId } = useLocalSearchParams<{ agentId: string }>();
  
  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'a2a' | 'performance'>('overview');
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    if (agentId) {
      const foundAgent = allSubAgents.find(a => a.id === agentId);
      if (foundAgent) {
        setAgent(foundAgent);
      }
    }
  }, [agentId]);

  if (!agent) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading Agent Profile...</Text>
      </View>
    );
  }

  const AgentIcon = (Icons[agent.icon as keyof typeof Icons] || Icons.Bot) as unknown as React.ComponentType<any>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About {agent.name}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{agent.description}</Text>
            
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Title</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{agent.title}</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Division</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{agent.parentCategory}</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Version</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>v{agent.version}</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Cost Efficiency</Text>
            <View style={styles.roiGrid}>
              <View style={[styles.roiCard, { backgroundColor: colors.card }]}>
                <Icons.User size={20} color={colors.textSecondary} />
                <Text style={[styles.roiValue, { color: colors.text }]}>{agent.humanCostEquivalent}</Text>
                <Text style={[styles.roiLabel, { color: colors.textSecondary }]}>Human Equivalent</Text>
              </View>
              <View style={[styles.roiCard, { backgroundColor: colors.card }]}>
                <Icons.Cpu size={20} color={agent.color} />
                <Text style={[styles.roiValue, { color: agent.color }]}>{agent.aiCost}</Text>
                <Text style={[styles.roiLabel, { color: colors.textSecondary }]}>AI Operating Cost</Text>
              </View>
            </View>
            <View style={[styles.efficiencyBanner, { backgroundColor: `${agent.color}15` }]}>
              <Icons.Zap size={20} color={agent.color} />
              <Text style={[styles.efficiencyText, { color: agent.color }]}>{agent.efficiency}</Text>
            </View>
          </View>
        );
      case 'capabilities':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesList}>
              {agent.capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityItem, { backgroundColor: colors.card }]}>
                  <Icons.CheckCircle size={18} color={agent.color} />
                  <Text style={[styles.capabilityText, { color: colors.text }]}>{cap}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      case 'a2a':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Agent-to-Agent Network</Text>
            <View style={[styles.a2aCard, { backgroundColor: colors.card }]}>
              <View style={styles.a2aStatusRow}>
                <Icons.Network size={24} color={agent.color} />
                <View style={styles.a2aStatusInfo}>
                  <Text style={[styles.a2aStatusTitle, { color: colors.text }]}>Network Status</Text>
                  <Text style={[styles.a2aStatusSub, { color: colors.textSecondary }]}>Fully Integrated</Text>
                </View>
                <View style={[styles.activeIndicator, { backgroundColor: '#34C759' }]} />
              </View>
              
              <View style={styles.a2aGrid}>
                <View style={styles.a2aStat}>
                  <Icons.MessageSquare size={18} color={colors.textSecondary} />
                  <Text style={[styles.a2aStatValue, { color: colors.text }]}>{agent.a2aCapabilities.maxConcurrentConsultations}</Text>
                  <Text style={[styles.a2aStatLabel, { color: colors.textSecondary }]}>Max Channels</Text>
                </View>
                <View style={styles.a2aStat}>
                  <Icons.Timer size={18} color={colors.textSecondary} />
                  <Text style={[styles.a2aStatValue, { color: colors.text }]}>{agent.a2aCapabilities.averageResponseTime}s</Text>
                  <Text style={[styles.a2aStatLabel, { color: colors.textSecondary }]}>Response Time</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.sectionSubtitle, { color: colors.text }]}>Expertise Areas</Text>
            <View style={styles.tagsContainer}>
              {agent.consulting.expertiseAreas.map((area, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: `${agent.color}15` }]}>
                  <Text style={[styles.tagText, { color: agent.color }]}>{area}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      case 'performance':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Operational Performance</Text>
            <View style={styles.performanceGrid}>
              <View style={[styles.perfItem, { backgroundColor: colors.card }]}>
                <Text style={[styles.perfLabel, { color: colors.textSecondary }]}>Success Rate</Text>
                <Text style={[styles.perfValue, { color: '#34C759' }]}>{agent.performance.successRate}%</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressBar, { width: `${agent.performance.successRate}%`, backgroundColor: '#34C759' }]} />
                </View>
              </View>
              <View style={[styles.perfItem, { backgroundColor: colors.card }]}>
                <Text style={[styles.perfLabel, { color: colors.textSecondary }]}>Satisfaction</Text>
                <Text style={[styles.perfValue, { color: '#FF9500' }]}>{agent.performance.customerSatisfaction}/5.0</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressBar, { width: `${(agent.performance.customerSatisfaction/5)*100}%`, backgroundColor: '#FF9500' }]} />
                </View>
              </View>
            </View>
            
            <View style={[styles.statRow, { backgroundColor: colors.card }]}>
              <View style={styles.statDetail}>
                <Text style={[styles.statDetailLabel, { color: colors.textSecondary }]}>Total Tasks</Text>
                <Text style={[styles.statDetailValue, { color: colors.text }]}>
                  {agent.performance.tasksCompleted.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statDetail}>
                <Text style={[styles.statDetailLabel, { color: colors.textSecondary }]}>Uptime</Text>
                <Text style={[styles.statDetailValue, { color: colors.text }]}>{agent.performance.uptime}</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Header */}
        <LinearGradient
          colors={[agent.color, `${agent.color}CC`]}
          style={[styles.hero, { paddingTop: insets.top + 20 }]}
        >
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Icons.ArrowLeft color="#FFF" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton}>
              <Icons.Share2 color="#FFF" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.heroContent}>
            <View style={styles.iconCircle}>
              <AgentIcon size={40} color={agent.color} />
            </View>
            <Text style={styles.agentNameHero}>{agent.name}</Text>
            <Text style={styles.agentTitleHero}>{agent.title}</Text>
            
            <View style={[styles.statusBadgeHero, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <View style={styles.statusDot} />
              <Text style={styles.statusTextHero}>{agent.status.toUpperCase()}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Tab Switcher */}
        <View style={[styles.tabBar, { backgroundColor: colors.card }]}>
          {['overview', 'capabilities', 'a2a', 'performance'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={[
                styles.tab,
                activeTab === tab && { borderBottomColor: agent.color, borderBottomWidth: 3 }
              ]}
            >
              <Text style={[
                styles.tabText,
                { color: activeTab === tab ? agent.color : colors.textSecondary }
              ]}>
                {tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>

      {/* Fixed Footer Actions */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={[styles.secondaryAction, { borderColor: colors.border, borderWidth: 1 }]}
          onPress={() => router.push({
            pathname: '/ai-agent/configuration',
            params: { agentId: agent.id }
          })}
        >
          <Icons.Settings color={colors.text} size={20} />
          <Text style={[styles.secondaryActionText, { color: colors.text }]}>Configure</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.primaryAction, { backgroundColor: agent.color }]}
          onPress={() => setIsActivating(true)}
        >
          {isActivating ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Icons.Play color="#FFF" size={20} />
              <Text style={styles.primaryActionText}>Launch Agent</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  hero: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  heroContent: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  agentNameHero: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  agentTitleHero: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  statusBadgeHero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  statusTextHero: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tabContent: {
    padding: 20,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  roiGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  roiCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  roiValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  roiLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  efficiencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 10,
  },
  efficiencyText: {
    fontSize: 16,
    fontWeight: '700',
  },
  capabilitiesList: {
    gap: 10,
  },
  capabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  capabilityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  a2aCard: {
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  a2aStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  a2aStatusInfo: {
    flex: 1,
  },
  a2aStatusTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  a2aStatusSub: {
    fontSize: 12,
  },
  activeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  a2aGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 20,
  },
  a2aStat: {
    alignItems: 'center',
    gap: 4,
  },
  a2aStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  a2aStatLabel: {
    fontSize: 11,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  performanceGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  perfItem: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  perfLabel: {
    fontSize: 12,
  },
  perfValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 2,
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  statRow: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
  },
  statDetail: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDetailLabel: {
    fontSize: 12,
  },
  statDetailValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  primaryAction: {
    flex: 2,
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  primaryActionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SubAgentDetailScreen;
