import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Crown,
  Zap,
  Users,
  Bot,
  ChevronLeft,
  CircleCheck,
  CircleX,
  ArrowUp,
  Activity,
  Briefcase,
  Cpu,
  Clock,
  CircleAlert,
  Shield,
  ArrowRight,
  Check,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  useCommandCenter,
  AuthorityRole,
  ROLE_CONFIGS,
  PendingDecision,
} from '@/providers/CommandCenterProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ROLE_DATA = [
  {
    ...ROLE_CONFIGS.CDOO,
    iconComponent: Crown,
  },
  {
    ...ROLE_CONFIGS.DDO,
    iconComponent: Zap,
  },
  {
    ...ROLE_CONFIGS.WOL,
    iconComponent: Users,
  },
  {
    ...ROLE_CONFIGS.AOD,
    iconComponent: Bot,
  },
];

export default function CommandCenterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const {
    activeRole,
    setActiveRole,
    pendingDecisions,
    approveDecision,
    rejectDecision,
    escalateDecision,
    getDecisionsForRole,
    canActOnDecision,
  } = useCommandCenter();

  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const handleActivateRole = (role: AuthorityRole) => {
    setActiveRole(role);
    Alert.alert(
      'Role Activated',
      `You are now operating as ${ROLE_CONFIGS[role!].fullTitle} (${role})`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleApprove = (decision: PendingDecision) => {
    if (activeRole && canActOnDecision(decision, activeRole)) {
      approveDecision(decision.id, activeRole);
      Alert.alert('Approved', `Decision "${decision.title}" has been approved.`);
    } else {
      Alert.alert('Unauthorized', 'You do not have authority to approve this decision.');
    }
  };

  const handleReject = (decision: PendingDecision) => {
    if (activeRole && canActOnDecision(decision, activeRole)) {
      rejectDecision(decision.id, activeRole);
      Alert.alert('Rejected', `Decision "${decision.title}" has been rejected.`);
    } else {
      Alert.alert('Unauthorized', 'You do not have authority to reject this decision.');
    }
  };

  const handleEscalate = (decision: PendingDecision) => {
    escalateDecision(decision.id);
    Alert.alert('Escalated', `Decision "${decision.title}" has been escalated to higher authority.`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'activation': return Activity;
      case 'assignment': return Briefcase;
      case 'configuration': return Cpu;
      case 'approval': return Shield;
      default: return CircleCheck;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  const filteredDecisions = pendingDecisions.filter(d => {
    if (selectedTab === 'all') return true;
    return d.status === selectedTab;
  });

  const pendingCount = pendingDecisions.filter(d => d.status === 'pending').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0f172a' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Command Center</Text>
          <Text style={styles.headerSubtitle}>
            {activeRole 
              ? `Operating as ${ROLE_CONFIGS[activeRole].title}` 
              : 'Select a role to activate'
            }
          </Text>
        </View>
        {activeRole && (
          <View style={[styles.activeBadge, { backgroundColor: ROLE_CONFIGS[activeRole].color + '30' }]}>
            <View style={[styles.activeDot, { backgroundColor: ROLE_CONFIGS[activeRole].color }]} />
            <Text style={[styles.activeText, { color: ROLE_CONFIGS[activeRole].color }]}>
              {ROLE_CONFIGS[activeRole].title}
            </Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hierarchy Diagram */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.hierarchyContainer}>
          <Text style={styles.sectionTitle}>Chain of Command</Text>
          <View style={[styles.hierarchyDiagram, isDesktop && styles.hierarchyDiagramDesktop]}>
            {/* CDOO */}
            <View style={[styles.hierarchyNode, { borderColor: ROLE_CONFIGS.CDOO.color }]}>
              <Crown size={20} color={ROLE_CONFIGS.CDOO.color} />
              <Text style={[styles.hierarchyNodeText, { color: ROLE_CONFIGS.CDOO.color }]}>CDOO</Text>
            </View>
            
            <ArrowRight size={20} color="#64748b" style={styles.arrow} />
            
            {/* DDO */}
            <View style={[styles.hierarchyNode, { borderColor: ROLE_CONFIGS.DDO.color }]}>
              <Zap size={20} color={ROLE_CONFIGS.DDO.color} />
              <Text style={[styles.hierarchyNodeText, { color: ROLE_CONFIGS.DDO.color }]}>DDO</Text>
            </View>
            
            <ArrowRight size={20} color="#64748b" style={styles.arrow} />
            
            {/* WOL + AOD Row */}
            <View style={styles.parallelNodes}>
              <View style={[styles.hierarchyNode, { borderColor: ROLE_CONFIGS.WOL.color }]}>
                <Users size={18} color={ROLE_CONFIGS.WOL.color} />
                <Text style={[styles.hierarchyNodeText, { color: ROLE_CONFIGS.WOL.color }]}>WOL</Text>
              </View>
              <View style={[styles.hierarchyNode, { borderColor: ROLE_CONFIGS.AOD.color }]}>
                <Bot size={18} color={ROLE_CONFIGS.AOD.color} />
                <Text style={[styles.hierarchyNodeText, { color: ROLE_CONFIGS.AOD.color }]}>AOD</Text>
              </View>
            </View>
            
            <ArrowRight size={20} color="#64748b" style={styles.arrow} />
            
            {/* Final Layer */}
            <View style={styles.parallelNodes}>
              <View style={[styles.hierarchyNode, { borderColor: '#94a3b8' }]}>
                <Users size={16} color="#94a3b8" />
                <Text style={[styles.hierarchyNodeText, { color: '#94a3b8', fontSize: 10 }]}>Employees</Text>
              </View>
              <View style={[styles.hierarchyNode, { borderColor: '#94a3b8' }]}>
                <Bot size={16} color="#94a3b8" />
                <Text style={[styles.hierarchyNodeText, { color: '#94a3b8', fontSize: 10 }]}>Agents</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Authority Role Cards */}
        <View style={styles.rolesSection}>
          <Text style={styles.sectionTitle}>Authority Roles</Text>
          <View style={[styles.rolesGrid, isDesktop && styles.rolesGridDesktop]}>
            {ROLE_DATA.map((role, index) => {
              const IconComponent = role.iconComponent;
              const isActive = activeRole === role.code;
              
              return (
                <Animated.View
                  key={role.code}
                  entering={FadeInUp.delay(index * 100)}
                  style={[
                    styles.roleCard,
                    { borderColor: role.color, backgroundColor: role.bgColor },
                    isActive && styles.roleCardActive,
                  ]}
                >
                  {/* Role Badge */}
                  <View style={[styles.roleBadge, { backgroundColor: role.color }]}>
                    <IconComponent size={24} color="#fff" />
                  </View>
                  
                  {/* Role Info */}
                  <View style={styles.roleInfo}>
                    <Text style={[styles.roleCode, { color: role.color }]}>{role.code}</Text>
                    <Text style={styles.roleFullTitle}>{role.fullTitle}</Text>
                    <Text style={styles.roleDescription}>{role.description}</Text>
                  </View>
                  
                  {/* Activate Button */}
                  <TouchableOpacity
                    style={[
                      styles.activateButton,
                      { backgroundColor: isActive ? role.color : 'transparent', borderColor: role.color },
                    ]}
                    onPress={() => handleActivateRole(role.code)}
                  >
                    {isActive ? (
                      <>
                        <Check size={16} color="#fff" />
                        <Text style={[styles.activateButtonText, { color: '#fff' }]}>Active</Text>
                      </>
                    ) : (
                      <Text style={[styles.activateButtonText, { color: role.color }]}>Activate</Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>

        {/* Decision Queue */}
        <View style={styles.decisionSection}>
          <View style={styles.decisionHeader}>
            <Text style={styles.sectionTitle}>Decision Queue</Text>
            {pendingCount > 0 && (
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>{pendingCount} Pending</Text>
              </View>
            )}
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
            {(['pending', 'all', 'approved', 'rejected'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && styles.tabActive,
                ]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.tabTextActive,
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Decision List */}
          <View style={styles.decisionList}>
            {filteredDecisions.length === 0 ? (
              <View style={styles.emptyState}>
                <CircleCheck size={48} color="#64748b" />
                <Text style={styles.emptyText}>No decisions in this queue</Text>
              </View>
            ) : (
              filteredDecisions.map((decision, index) => {
                const TypeIcon = getTypeIcon(decision.type);
                const canAct = activeRole && canActOnDecision(decision, activeRole);
                const roleConfig = ROLE_CONFIGS[decision.requiredRole!];

                return (
                  <Animated.View
                    key={decision.id}
                    entering={FadeInUp.delay(index * 50)}
                    style={[
                      styles.decisionCard,
                      decision.status === 'approved' && styles.decisionCardApproved,
                      decision.status === 'rejected' && styles.decisionCardRejected,
                    ]}
                  >
                    {/* Decision Header */}
                    <View style={styles.decisionCardHeader}>
                      <View style={[styles.typeIcon, { backgroundColor: getPriorityColor(decision.priority) + '20' }]}>
                        <TypeIcon size={18} color={getPriorityColor(decision.priority)} />
                      </View>
                      <View style={styles.decisionTitleContainer}>
                        <Text style={styles.decisionTitle}>{decision.title}</Text>
                        <Text style={styles.decisionDescription}>{decision.description}</Text>
                      </View>
                      <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(decision.priority) + '20' }]}>
                        <Text style={[styles.priorityText, { color: getPriorityColor(decision.priority) }]}>
                          {decision.priority}
                        </Text>
                      </View>
                    </View>

                    {/* Decision Meta */}
                    <View style={styles.decisionMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#64748b" />
                        <Text style={styles.metaText}>{formatTime(decision.requestedAt)}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Shield size={14} color={roleConfig?.color || '#64748b'} />
                        <Text style={[styles.metaText, { color: roleConfig?.color }]}>
                          Requires {decision.requiredRole}
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons (only for pending decisions) */}
                    {decision.status === 'pending' && (
                      <View style={styles.actionButtons}>
                        {canAct ? (
                          <>
                            <TouchableOpacity
                              style={[styles.actionBtn, styles.approveBtn]}
                              onPress={() => handleApprove(decision)}
                            >
                              <CircleCheck size={16} color="#fff" />
                              <Text style={styles.actionBtnText}>Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.actionBtn, styles.rejectBtn]}
                              onPress={() => handleReject(decision)}
                            >
                              <CircleX size={16} color="#fff" />
                              <Text style={styles.actionBtnText}>Reject</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <TouchableOpacity
                            style={[styles.actionBtn, styles.escalateBtn]}
                            onPress={() => handleEscalate(decision)}
                          >
                            <ArrowUp size={16} color="#fff" />
                            <Text style={styles.actionBtnText}>Escalate</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}

                    {/* Status Badge */}
                    {decision.status !== 'pending' && (
                      <View style={[
                        styles.statusBadge,
                        decision.status === 'approved' && { backgroundColor: '#10B98120' },
                        decision.status === 'rejected' && { backgroundColor: '#EF444420' },
                        decision.status === 'escalated' && { backgroundColor: '#F59E0B20' },
                      ]}>
                        <Text style={[
                          styles.statusBadgeText,
                          decision.status === 'approved' && { color: '#10B981' },
                          decision.status === 'rejected' && { color: '#EF4444' },
                          decision.status === 'escalated' && { color: '#F59E0B' },
                        ]}>
                          {decision.status.toUpperCase()}
                        </Text>
                      </View>
                    )}
                  </Animated.View>
                );
              })
            )}
          </View>
        </View>

        {/* Quick Navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.navGrid}>
            <TouchableOpacity 
              style={styles.navCard}
              onPress={() => router.push('/ai-agent/employees')}
            >
              <View style={[styles.navIcon, { backgroundColor: ROLE_CONFIGS.WOL.color + '20' }]}>
                <Users size={24} color={ROLE_CONFIGS.WOL.color} />
              </View>
              <Text style={styles.navTitle}>Workforce</Text>
              <Text style={styles.navSubtitle}>Manage Employees</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navCard}
              onPress={() => router.push('/ai-agent')}
            >
              <View style={[styles.navIcon, { backgroundColor: ROLE_CONFIGS.AOD.color + '20' }]}>
                <Bot size={24} color={ROLE_CONFIGS.AOD.color} />
              </View>
              <Text style={styles.navTitle}>AI Agents</Text>
              <Text style={styles.navSubtitle}>Manage Agents</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  
  // Hierarchy Diagram
  hierarchyContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  hierarchyDiagram: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    backgroundColor: '#1e293b',
    borderRadius: 16,
  },
  hierarchyDiagramDesktop: {
    justifyContent: 'center',
    gap: 16,
  },
  hierarchyNode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    gap: 6,
    backgroundColor: '#0f172a',
  },
  hierarchyNodeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  arrow: {
    marginHorizontal: 4,
  },
  parallelNodes: {
    flexDirection: 'row',
    gap: 8,
  },
  
  // Roles Section
  rolesSection: {
    padding: 20,
  },
  rolesGrid: {
    gap: 12,
  },
  rolesGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roleCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleCardActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  roleBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleInfo: {
    flex: 1,
  },
  roleCode: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  roleFullTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 2,
  },
  roleDescription: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 4,
  },
  activateButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  
  // Decision Section
  decisionSection: {
    padding: 20,
  },
  decisionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pendingBadge: {
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadgeText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
  },
  tabContainer: {
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#1e293b',
  },
  tabActive: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  decisionList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 12,
  },
  decisionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  decisionCardApproved: {
    borderLeftColor: '#10B981',
    opacity: 0.8,
  },
  decisionCardRejected: {
    borderLeftColor: '#EF4444',
    opacity: 0.8,
  },
  decisionCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decisionTitleContainer: {
    flex: 1,
  },
  decisionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  decisionDescription: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  decisionMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  approveBtn: {
    backgroundColor: '#10B981',
  },
  rejectBtn: {
    backgroundColor: '#EF4444',
  },
  escalateBtn: {
    backgroundColor: '#F59E0B',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  
  // Navigation Section
  navigationSection: {
    padding: 20,
  },
  navGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  navCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  navIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  navTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  navSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
});
