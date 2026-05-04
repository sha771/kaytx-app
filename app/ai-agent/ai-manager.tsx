import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Shield, TriangleAlert, Zap, Layers, Activity, Users, Target, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { aiEmployees } from '@/constants/aiEmployees';
import { router } from 'expo-router';

export default function AIManagerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-manager') ?? aiEmployees[0];
  
  // Fetch AI manager data from backend
  const { data: analytics, isLoading: analyticsLoading, error, refetch } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id,
    timeRange: '7d' 
  });
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'operations-management' });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isPremiumLocked = useMemo(() => {
    return agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter');
  }, [agent.isPremium, subscription]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPremiumLocked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isPremiumLocked, fadeAnim]);

  const managerData = analytics as any;

  if (analyticsLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Failed to load AI Manager data
        </Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => refetch()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderOperationsTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.warningCard, { backgroundColor: managerData?.autonomousCommandActive ? '#FF3B3010' : '#10B98110', borderColor: managerData?.autonomousCommandActive ? '#FF3B3030' : '#10B98130', borderWidth: 1 }]}>
          <TriangleAlert size={24} color={managerData?.autonomousCommandActive ? "#FF3B30" : "#10B981"} />
          <View style={styles.warningContent}>
            <Text style={[styles.warningTitle, { color: managerData?.autonomousCommandActive ? '#FF3B30' : '#10B981' }]}>
              {managerData?.autonomousCommandActive ? 'Autonomous Command Active' : 'Autonomous Command Monitoring'}
            </Text>
            <Text style={[styles.warningText, { color: theme.colors.text }]}>
              AI Manager is currently {managerData?.autonomousCommandActive ? 'enforcing' : 'monitoring'} execution protocols across all active departments.
            </Text>
          </View>
        </View>

        <View style={[styles.departmentCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Managed Resources</Text>
          {managerData?.managedResources?.map((dept: any, i: number) => (
            <View key={i} style={styles.deptRow}>
              <View style={styles.deptInfo}>
                <Text style={[styles.deptName, { color: theme.colors.text }]}>{dept.name}</Text>
                <Text style={[styles.deptStatus, { color: theme.colors.secondaryText }]}>{dept.status}</Text>
              </View>
              <View style={styles.efficiencyBox}>
                <Text style={[styles.effValue, { color: theme.colors.primary }]}>{dept.efficiency}%</Text>
                <Text style={styles.effLabel}>EFFICIENCY</Text>
              </View>
            </View>
          )) || [
            { name: 'Customer Experience', status: 'Optimal', efficiency: 98 },
            { name: 'Sales Pipeline', status: 'Accelerated', efficiency: 94 },
            { name: 'Marketing Ops', status: 'Scaling', efficiency: 91 }
          ].map((dept, i) => (
            <View key={i} style={styles.deptRow}>
              <View style={styles.deptInfo}>
                <Text style={[styles.deptName, { color: theme.colors.text }]}>{dept.name}</Text>
                <Text style={[styles.deptStatus, { color: theme.colors.secondaryText }]}>{dept.status}</Text>
              </View>
              <View style={styles.efficiencyBox}>
                <Text style={[styles.effValue, { color: theme.colors.primary }]}>{dept.efficiency}%</Text>
                <Text style={styles.effLabel}>EFFICIENCY</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>
              The AI Manager is part of our Enterprise suite. Upgrade your plan to activate this agent.
            </Text>
            <TouchableOpacity 
              style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]}
              onPress={() => router.push('/enterprise/billing')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [
    { id: 'ops', label: 'Operations', icon: Layers, component: renderOperationsTab }
  ];

  return (
    <EnterpriseAgentShell
      agent={agent}
      customTabs={customTabs}
      customActions={
        <TouchableOpacity style={styles.killBtn}>
          <Text style={styles.killBtnText}>EMERGENCY STOP</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, textAlign: 'center', marginHorizontal: 20, marginBottom: 12 },
  retryButton: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  retryButtonText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  tabContent: { paddingBottom: 20 },
  warningCard: { flexDirection: 'row', padding: 20, borderRadius: 20, gap: 15, marginBottom: 25 },
  warningContent: { flex: 1 },
  warningTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  warningText: { fontSize: 13, lineHeight: 18, fontWeight: '500' },
  departmentCard: { padding: 24, borderRadius: 24 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
  deptRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(150,150,150,0.1)' },
  deptInfo: { flex: 1 },
  deptName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  deptStatus: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  efficiencyBox: { alignItems: 'flex-end' },
  effValue: { fontSize: 18, fontWeight: '900' },
  effLabel: { fontSize: 9, fontWeight: '700', opacity: 0.5 },
  noDataText: { textAlign: 'center', fontStyle: 'italic' },
  killBtn: { backgroundColor: '#FF3B30', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, marginRight: 10 },
  killBtnText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  lockCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  lockDesc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  upgradeBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
