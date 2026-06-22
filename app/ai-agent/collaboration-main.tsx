import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

// ============================================
// EMPLOYEE-AI COLLABORATION SCREEN
// Management of Human-on-the-Loop oversight
// ============================================

const EmployeeAICollaborationScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'workflows' | 'oversight' | 'teams'>('workflows');

  const workflows = [
    {
      id: '1',
      title: 'Customer Refund Processing',
      agent: 'AI Ticket Resolution',
      autonomyLevel: 'Supervised',
      status: 'Monitoring',
      confidence: 0.92,
      color: '#FF3B30'
    },
    {
      id: '2',
      title: 'Strategic Sales Proposal',
      agent: 'AI Proposal Generator',
      autonomyLevel: 'Autonomous',
      status: 'Auto-Approved',
      confidence: 0.87,
      color: '#007AFF'
    },
    {
      id: '3',
      title: 'Monthly Audit Review',
      agent: 'AI Audit Agent',
      autonomyLevel: 'Manual',
      status: 'Flagged for Review',
      confidence: 0.65,
      color: '#34C759'
    }
  ];

  const renderWorkflows = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Agent Operations</Text>
      {workflows.map((wf) => (
        <TouchableOpacity key={wf.id} style={[styles.workflowCard, { backgroundColor: colors.card }]}>
          <View style={[styles.workflowAccent, { backgroundColor: wf.color }]} />
          <View style={styles.workflowContent}>
            <View style={styles.workflowHeader}>
              <Text style={[styles.workflowTitle, { color: colors.text }]}>{wf.title}</Text>
              <View style={[styles.typeBadge, { backgroundColor: `${wf.color}15` }]}>
                <Text style={[styles.typeBadgeText, { color: wf.color }]}>{wf.autonomyLevel}</Text>
              </View>
            </View>
            
            <View style={styles.collabRow}>
              <View style={styles.collabEntity}>
                <Icons.Bot size={16} color={colors.textSecondary} />
                <Text style={[styles.entityName, { color: colors.textSecondary }]}>{wf.agent}</Text>
              </View>
              <View style={styles.collabEntity}>
                <Icons.Activity size={16} color={wf.confidence >= 0.8 ? '#34C759' : wf.confidence >= 0.6 ? '#FF9500' : '#FF3B30'} />
                <Text style={[styles.entityName, { color: colors.textSecondary }]}>{(wf.confidence * 100).toFixed(0)}% Confidence</Text>
              </View>
            </View>

            <View style={styles.workflowFooter}>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: wf.color }]} />
                <Text style={[styles.statusText, { color: colors.textSecondary }]}>{wf.status}</Text>
              </View>
              <Icons.ChevronRight size={18} color={colors.border} />
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={[styles.createButton, { borderColor: colors.primary, borderWidth: 1, borderStyle: 'dashed' }]}>
        <Icons.Plus size={20} color={colors.primary} />
        <Text style={[styles.createButtonText, { color: colors.primary }]}>Configure New Agent</Text>
      </TouchableOpacity>
    </View>
  );

  const renderApprovals = () => (
    <View style={styles.section}>
      <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: '#34C759' }]}>156</Text>
          <Text style={[styles.statLab, { color: colors.textSecondary }]}>Auto-Approved</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.primary }]}>12</Text>
          <Text style={[styles.statLab, { color: colors.textSecondary }]}>Flagged</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: '#FF9500' }]}>3</Text>
          <Text style={[styles.statLab, { color: colors.textSecondary }]}>Intervened</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Oversight Monitoring Events</Text>
      {[
        { id: 'e1', action: 'Bulk Email Launch', agent: 'AI Email Marketing', time: '5m ago', decision: 'auto_approved', confidence: 0.92, risk: 'Low' },
        { id: 'e2', action: 'Inventory Order > $5k', agent: 'AI Resource Planner', time: '12m ago', decision: 'flagged', confidence: 0.68, risk: 'High' },
        { id: 'e3', action: 'New Employee Access', agent: 'AI Task Coordinator', time: '45m ago', decision: 'intervened', confidence: 0.45, risk: 'Medium' },
      ].map((item) => (
        <View key={item.id} style={[styles.approvalItem, { backgroundColor: colors.card }]}>
          <View style={styles.approvalInfo}>
            <Text style={[styles.approvalAction, { color: colors.text }]}>{item.action}</Text>
            <Text style={[styles.approvalMeta, { color: colors.textSecondary }]}>
              {item.agent} • {item.time} • {(item.confidence * 100).toFixed(0)}% confidence
            </Text>
          </View>
          <View style={[styles.decisionBadge, { 
            backgroundColor: item.decision === 'auto_approved' ? '#34C75915' : 
                           item.decision === 'flagged' ? '#FF950015' : '#FF3B3015' 
          }]}>
            <Text style={[styles.decisionText, { 
              color: item.decision === 'auto_approved' ? '#34C759' : 
                     item.decision === 'flagged' ? '#FF9500' : '#FF3B30' 
            }]}>
              {item.decision === 'auto_approved' ? 'Auto' : item.decision === 'flagged' ? 'Flagged' : 'Intervened'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#FF9500', '#FF2D55']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Human-on-the-Loop Oversight</Text>
          <TouchableOpacity style={styles.backButton}>
            <Icons.ShieldCheck color="#FFF" size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerOverview}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>24</Text>
            <Text style={styles.headerStatLab}>Active Agents</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>92%</Text>
            <Text style={styles.headerStatLab}>Auto-Approve</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>0.2s</Text>
            <Text style={styles.headerStatLab}>Avg Response</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabBar}>
        {['workflows', 'oversight', 'teams'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={[
              styles.tab,
              activeTab === tab && { borderBottomColor: '#FF2D55', borderBottomWidth: 3 }
            ]}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? '#FF2D55' : colors.textSecondary }
            ]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'workflows' ? renderWorkflows() : activeTab === 'oversight' ? renderApprovals() : null}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  headerStat: {
    alignItems: 'center',
  },
  headerStatVal: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },
  headerStatLab: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 20,
  },
  section: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  workflowCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  workflowAccent: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  workflowContent: {
    flex: 1,
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workflowTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  collabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  collabEntity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  entityName: {
    fontSize: 13,
    fontWeight: '600',
  },
  workflowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLab: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  approvalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  approvalInfo: {
    flex: 1,
  },
  approvalAction: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  approvalMeta: {
    fontSize: 12,
    fontWeight: '600',
  },
  approvalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decisionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  decisionText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default EmployeeAICollaborationScreen;
