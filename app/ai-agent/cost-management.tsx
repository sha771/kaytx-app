import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  TriangleAlert,
  ChartPie,
  Calendar,
  Download,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Save,
  Plus,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { allAgents, agentCategories } from '@/constants/aiAgentHierarchy';

export default function CostManagementScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [budget, setBudget] = useState({
    monthly: 5000,
    alertThreshold: 80,
    autoPause: true,
  });

  const [showBudgetEditor, setShowBudgetEditor] = useState(false);

  // Calculate costs from all agents
  const totalHumanCost = allAgents.reduce((sum, a) => {
    const cost = parseInt(a.humanCostEquivalent?.replace(/[^0-9]/g, '') || '0');
    return sum + cost;
  }, 0);

  const totalAICost = allAgents.reduce((sum, a) => {
    const cost = parseInt(a.aiCost?.replace(/[^0-9]/g, '') || '0');
    return sum + cost;
  }, 0);

  const savings = totalHumanCost - totalAICost;
  const savingsPercent = ((savings / totalHumanCost) * 100).toFixed(0);

  const currentMonthCost = 2840;
  const budgetUsedPercent = (currentMonthCost / budget.monthly) * 100;

  const costBreakdown = [
    { category: 'Customer Experience', cost: 450, color: '#3B82F6' },
    { category: 'Sales & Revenue', cost: 680, color: '#10B981' },
    { category: 'Marketing & Growth', cost: 520, color: '#F59E0B' },
    { category: 'Accounting & Finance', cost: 620, color: '#8B5CF6' },
    { category: 'Operations', cost: 340, color: '#EC4899' },
    { category: 'Data Intelligence', cost: 230, color: '#14B8A6' },
  ];

  const topExpensiveAgents = allAgents
    .map(a => ({
      ...a,
      numericCost: parseInt(a.aiCost?.replace(/[^0-9]/g, '') || '0'),
    }))
    .sort((a, b) => b.numericCost - a.numericCost)
    .slice(0, 5);

  const monthlyTrend = [
    { month: 'Jan', cost: 2100 },
    { month: 'Feb', cost: 2350 },
    { month: 'Mar', cost: 2580 },
    { month: 'Apr', cost: 2420 },
    { month: 'May', cost: 2680 },
    { month: 'Jun', cost: 2840 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Wallet size={22} color={colors.primary} />
            <Text style={[styles.titleText, { color: colors.text }]}>Cost Management</Text>
          </View>
          <TouchableOpacity onPress={() => setShowBudgetEditor(true)}>
            <Save size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Budget Overview */}
        <View style={[styles.budgetCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.budgetHeader}>
            <View>
              <Text style={[styles.budgetLabel, { color: colors.text + '60' }]}>Monthly Budget</Text>
              <Text style={[styles.budgetAmount, { color: colors.text }]}>${budget.monthly.toLocaleString()}</Text>
            </View>
            <View style={[styles.budgetBadge, { backgroundColor: budgetUsedPercent > 80 ? '#EF4444' + '15' : '#10B981' + '15' }]}>
              <Text style={[styles.badgeText, { color: budgetUsedPercent > 80 ? '#EF4444' : '#10B981' }]}>
                {budgetUsedPercent.toFixed(0)}% used
              </Text>
            </View>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { 
              backgroundColor: budgetUsedPercent > 80 ? '#EF4444' : budgetUsedPercent > 60 ? '#F59E0B' : '#10B981',
              width: `${Math.min(budgetUsedPercent, 100)}%`
            }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.text + '60' }]}>
            ${currentMonthCost.toLocaleString()} of ${budget.monthly.toLocaleString()}
          </Text>
          {budgetUsedPercent > budget.alertThreshold && (
            <View style={styles.budgetAlert}>
              <TriangleAlert size={16} color="#F59E0B" />
              <Text style={[styles.alertText, { color: '#F59E0B' }]}>
                Approaching budget limit ({budget.alertThreshold}% threshold)
              </Text>
            </View>
          )}
        </View>

        {/* Savings Overview */}
        <View style={styles.savingsGrid}>
          <Animated.View entering={FadeInUp} style={[styles.savingsCard, { backgroundColor: '#10B981' + '15' }]}>
            <TrendingDown size={24} color="#10B981" />
            <Text style={[styles.savingsValue, { color: '#10B981' }]}>${(savings / 1000).toFixed(1)}K</Text>
            <Text style={[styles.savingsLabel, { color: colors.text + '60' }]}>Annual Savings</Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(50)} style={[styles.savingsCard, { backgroundColor: colors.primary + '15' }]}>
            <ArrowUpRight size={24} color={colors.primary} />
            <Text style={[styles.savingsValue, { color: colors.primary }]}>{savingsPercent}%</Text>
            <Text style={[styles.savingsLabel, { color: colors.text + '60' }]}>Cost Reduction</Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(100)} style={[styles.savingsCard, { backgroundColor: '#8B5CF6' + '15' }]}>
            <User size={24} color="#8B5CF6" />
            <Text style={[styles.savingsValue, { color: '#8B5CF6' }]}>{allAgents.length}</Text>
            <Text style={[styles.savingsLabel, { color: colors.text + '60' }]}>Active Agents</Text>
          </Animated.View>
        </View>

        {/* Cost Comparison */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>COST COMPARISON</Text>
        <View style={[styles.comparisonCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Text style={[styles.comparisonLabel, { color: colors.text + '60' }]}>Human Staff Cost</Text>
              <Text style={[styles.comparisonValue, { color: colors.text }]}>${(totalHumanCost / 1000).toFixed(1)}K/yr</Text>
            </View>
            <ArrowDownRight size={20} color="#10B981" />
            <View style={styles.comparisonItem}>
              <Text style={[styles.comparisonLabel, { color: colors.text + '60' }]}>AI Agents Cost</Text>
              <Text style={[styles.comparisonValue, { color: '#10B981' }]}>${(totalAICost / 1000).toFixed(1)}K/yr</Text>
            </View>
          </View>
          <View style={styles.savingsHighlight}>
            <Text style={[styles.savingsText, { color: '#10B981' }]}>
              You save ${(savings / 1000).toFixed(1)}K annually ({savingsPercent}%)
            </Text>
          </View>
        </View>

        {/* Cost Breakdown */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>COST BY CATEGORY</Text>
        <View style={[styles.breakdownCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {costBreakdown.map((item, idx) => (
            <View key={item.category} style={[styles.breakdownRow, idx !== costBreakdown.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                <Text style={[styles.categoryName, { color: colors.text }]}>{item.category}</Text>
              </View>
              <Text style={[styles.categoryCost, { color: colors.text }]}>${item.cost}/mo</Text>
            </View>
          ))}
        </View>

        {/* Top Agents by Cost */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>TOP AGENTS BY COST</Text>
        {topExpensiveAgents.map((agent, idx) => (
          <Animated.View entering={FadeInUp.delay(idx * 50)} key={agent.id}>
            <View style={[styles.agentCostCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
                <agent.icon size={20} color={agent.color} />
              </View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentCategory, { color: colors.text + '60' }]}>{agent.category}</Text>
              </View>
              <View style={styles.agentCostInfo}>
                <Text style={[styles.agentCostValue, { color: agent.color }]}>{agent.aiCost}</Text>
                <Text style={[styles.agentHumanCost, { color: colors.text + '40' }]}>vs {agent.humanCostEquivalent}</Text>
              </View>
            </View>
          </Animated.View>
        ))}

        {/* Monthly Trend */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>6-MONTH TREND</Text>
        <View style={[styles.trendCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.chartContainer}>
            {monthlyTrend.map((data, idx) => (
              <View key={data.month} style={styles.chartColumn}>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { 
                    backgroundColor: colors.primary,
                    height: `${(data.cost / 3000) * 100}%`
                  }]} />
                </View>
                <Text style={[styles.barLabel, { color: colors.text + '60' }]}>{data.month}</Text>
                <Text style={[styles.barValue, { color: colors.text }]}>${(data.cost / 1000).toFixed(1)}K</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Export */}
        <TouchableOpacity style={[styles.exportButton, { backgroundColor: colors.primary + '15' }]}>
          <Download size={18} color={colors.primary} />
          <Text style={[styles.exportText, { color: colors.primary }]}>Export Cost Report</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Budget Editor Modal */}
      {showBudgetEditor && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Budget</Text>
              <TouchableOpacity onPress={() => setShowBudgetEditor(false)}>
                <Text style={{ fontSize: 24, color: colors.text }}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <Text style={[styles.inputLabel, { color: colors.text + '60' }]}>Monthly Budget ($)</Text>
              <TextInput
                style={[styles.input, { color: colors.text, backgroundColor: colors.border + '30' }]}
                value={String(budget.monthly)}
                onChangeText={(v) => setBudget({ ...budget, monthly: parseInt(v) || 0 })}
                keyboardType="numeric"
              />
              <Text style={[styles.inputLabel, { color: colors.text + '60' }]}>Alert Threshold (%)</Text>
              <TextInput
                style={[styles.input, { color: colors.text, backgroundColor: colors.border + '30' }]}
                value={String(budget.alertThreshold)}
                onChangeText={(v) => setBudget({ ...budget, alertThreshold: parseInt(v) || 0 })}
                keyboardType="numeric"
              />
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.text }]}>Auto-pause agents when budget exceeded</Text>
                <Switch
                  value={budget.autoPause}
                  onValueChange={(v) => setBudget({ ...budget, autoPause: v })}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={budget.autoPause ? colors.primary : '#f4f3f4'}
                />
              </View>
              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: colors.primary }]} 
                onPress={() => setShowBudgetEditor(false)}
              >
                <Text style={styles.saveButtonText}>Save Budget</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleText: { fontSize: 18, fontWeight: '600' },
  content: { padding: 16 },
  budgetCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  budgetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  budgetLabel: { fontSize: 12 },
  budgetAmount: { fontSize: 28, fontWeight: '700', marginTop: 4 },
  budgetBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  progressBar: { height: 8, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: 8, borderRadius: 4 },
  progressText: { fontSize: 12 },
  budgetAlert: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  alertText: { fontSize: 13 },
  savingsGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  savingsCard: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  savingsValue: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  savingsLabel: { fontSize: 11, marginTop: 4 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 10, marginTop: 10 },
  comparisonCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  comparisonRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  comparisonItem: { flex: 1 },
  comparisonLabel: { fontSize: 12 },
  comparisonValue: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  savingsHighlight: { backgroundColor: '#10B981' + '15', padding: 12, borderRadius: 10, alignItems: 'center' },
  savingsText: { fontSize: 14, fontWeight: '600' },
  breakdownCard: { borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  breakdownLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  categoryDot: { width: 12, height: 12, borderRadius: 6 },
  categoryName: { fontSize: 14 },
  categoryCost: { fontSize: 14, fontWeight: '600' },
  agentCostCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 14, marginBottom: 10 },
  agentIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 15, fontWeight: '600' },
  agentCategory: { fontSize: 12, marginTop: 2 },
  agentCostInfo: { alignItems: 'flex-end' },
  agentCostValue: { fontSize: 16, fontWeight: '700' },
  agentHumanCost: { fontSize: 11, marginTop: 2 },
  trendCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', height: 150, alignItems: 'flex-end' },
  chartColumn: { flex: 1, alignItems: 'center' },
  barContainer: { width: 30, height: 100, justifyContent: 'flex-end' },
  bar: { width: 30, borderRadius: 4 },
  barLabel: { fontSize: 11, marginTop: 8 },
  barValue: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  exportButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 12, marginBottom: 20 },
  exportText: { fontSize: 14, fontWeight: '600' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#00000010' },
  modalTitle: { fontSize: 18, fontWeight: '600' },
  modalContent: { padding: 20 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  input: { padding: 12, borderRadius: 10, fontSize: 15, marginBottom: 16 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  toggleLabel: { fontSize: 14, flex: 1, marginRight: 12 },
  saveButton: { padding: 14, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
