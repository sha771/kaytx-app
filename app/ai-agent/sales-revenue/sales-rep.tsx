
/**
 * AI Sales Rep
 * Department: Sales & Revenue
 * Level: specialist
 * Sub-Agents: 3
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  ArrowLeft, Crown, Star, Target, Bot, Users,
  TrendingUp, Settings, Bell, BarChart3, Zap, Shield,
  ChevronRight, Activity, CheckCircle2, Briefcase
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DEPT_COLOR = '#FFA000';

export default function SalesRepScreen() {
  const ins = useSafeAreaInsets();
  const { theme } = useTheme();
  const { colors } = theme;
  const [activeTab, setActiveTab] = useState('overview');
  const [isActive, setIsActive] = useState(true);

  const agentData = {
    id: 'sales-rep',
    name: 'AI Sales Rep',
    title: 'Sales Rep',
    level: 'specialist',
    department: 'Sales & Revenue',
    efficiency: '89%',
    aiCost: '$99/mo',
    subAgents: 3,
  };

  const getLevelIcon = () => {
    switch (agentData.level) {
      case 'c_level': return Crown;
      case 'vp_director': return Star;
      case 'manager': return Users;
      case 'team_lead': return Target;
      default: return Bot;
    }
  };

  const LevelIcon = getLevelIcon();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: ins.top }]}>
      <LinearGradient colors={[DEPT_COLOR, DEPT_COLOR + 'DD']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction}><Bell size={20} color="#fff" /></TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}><Settings size={20} color="#fff" /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <LevelIcon size={40} color="#fff" />
          </View>
          <Text style={styles.headerName}>{agentData.name}</Text>
          <Text style={styles.headerTitle}>{agentData.title}</Text>
          <View style={styles.headerMeta}>
            <View style={styles.metaBadge}>
              <Zap size={12} color="#fff" />
              <Text style={styles.metaText}>{agentData.efficiency} Efficiency</Text>
            </View>
            <View style={styles.metaBadge}>
              <Shield size={12} color="#4CAF50" />
              <Text style={styles.metaText}>{agentData.aiCost}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={[styles.tabBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {[
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'subagents', label: 'Sub-Agents', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && { borderBottomColor: DEPT_COLOR, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} color={activeTab === tab.id ? DEPT_COLOR : colors.secondaryText} />
            <Text style={[styles.tabText, { color: activeTab === tab.id ? DEPT_COLOR : colors.secondaryText }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
              <View style={styles.statusHeader}>
                <View style={[styles.statusIndicator, { backgroundColor: isActive ? '#4CAF50' : '#FF5722' }]}>
                  <Activity size={16} color="#fff" />
                </View>
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusTitle, { color: colors.text }]}>Agent Status</Text>
                  <Text style={[styles.statusValue, { color: isActive ? '#4CAF50' : '#FF5722' }]}>
                    {isActive ? 'Active & Operating' : 'Paused'}
                  </Text>
                </View>
                <Switch value={isActive} onValueChange={setIsActive} />
              </View>
            </View>
            <View style={styles.metricsGrid}>
              <View style={[styles.metricBox, { backgroundColor: colors.card }]}>
                <Text style={[styles.metricValue, { color: DEPT_COLOR }]}>{agentData.subAgents}</Text>
                <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>Sub-Agents</Text>
              </View>
              <View style={[styles.metricBox, { backgroundColor: colors.card }]}>
                <Text style={[styles.metricValue, { color: colors.success }]}>{agentData.efficiency}</Text>
                <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>Efficiency</Text>
              </View>
              <View style={[styles.metricBox, { backgroundColor: colors.card }]}>
                <Text style={[styles.metricValue, { color: colors.primary }]}>{agentData.aiCost}</Text>
                <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>Cost</Text>
              </View>
            </View>
          </View>
        )}
        {activeTab === 'subagents' && (
          <View style={styles.tabContent}>
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
              {agentData.subAgents} Sub-Agents
            </Text>
            <Text style={[styles.comingSoon, { color: colors.secondaryText }]}>
              Sub-agent details will appear here
            </Text>
          </View>
        )}
        {activeTab === 'analytics' && (
          <View style={styles.tabContent}>
            <Text style={[styles.comingSoon, { color: colors.secondaryText }]}>
              Analytics dashboard will appear here
            </Text>
          </View>
        )}
        {activeTab === 'settings' && (
          <View style={styles.tabContent}>
            <Text style={[styles.comingSoon, { color: colors.secondaryText }]}>
              Settings will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 },
  backButton: { padding: 8 },
  headerActions: { flexDirection: 'row', gap: 12 },
  headerAction: { padding: 8 },
  headerContent: { alignItems: 'center', marginTop: 16 },
  avatarContainer: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  headerName: { fontSize: 24, fontWeight: '700', color: '#fff' },
  headerTitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  headerMeta: { flexDirection: 'row', gap: 12, marginTop: 16 },
  metaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12,
  },
  metaText: { fontSize: 12, color: '#fff', fontWeight: '600' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 14 },
  tabText: { fontSize: 13, fontWeight: '600' },
  scrollContent: { padding: 16 },
  tabContent: { paddingBottom: 32 },
  statusCard: { borderRadius: 16, padding: 16, marginBottom: 16 },
  statusHeader: { flexDirection: 'row', alignItems: 'center' },
  statusIndicator: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  statusInfo: { flex: 1, marginLeft: 12 },
  statusTitle: { fontSize: 13, opacity: 0.7 },
  statusValue: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  metricsGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  metricBox: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center' },
  metricValue: { fontSize: 24, fontWeight: '700' },
  metricLabel: { fontSize: 11, marginTop: 4 },
  subtitle: { fontSize: 14, marginBottom: 16 },
  comingSoon: { fontSize: 16, textAlign: 'center', marginTop: 40 },
});
