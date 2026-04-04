import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import {
  MessageSquare,
  DollarSign,
  TrendingUp,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Target,
  BarChart3,
  AlertCircle,
  Save,
  X,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NegotiationRule {
  id: string;
  name: string;
  minPrice: number;
  maxDiscount: number;
  autoApprove: boolean;
  requiresApproval: boolean;
  isActive: boolean;
}

interface NegotiationSession {
  id: string;
  customerName: string;
  productName: string;
  originalPrice: number;
  proposedPrice: number;
  currentOffer: number;
  status: 'active' | 'completed' | 'rejected';
  messages: number;
  startedAt: string;
  summary: string;
}

export default function AINegoitationAssistantScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'sessions' | 'rules' | 'analytics'>('sessions');
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [editingRule, setEditingRule] = useState<NegotiationRule | null>(null);
  const [newRule, setNewRule] = useState({
    name: '',
    minPrice: '',
    maxDiscount: '',
    autoApprove: false,
    requiresApproval: true,
  });

  const [rules, setRules] = useState<NegotiationRule[]>([
    {
      id: '1',
      name: 'Standard Discount',
      minPrice: 100,
      maxDiscount: 15,
      autoApprove: true,
      requiresApproval: false,
      isActive: true,
    },
    {
      id: '2',
      name: 'Premium Products',
      minPrice: 500,
      maxDiscount: 10,
      autoApprove: false,
      requiresApproval: true,
      isActive: true,
    },
    {
      id: '3',
      name: 'Bulk Orders',
      minPrice: 1000,
      maxDiscount: 25,
      autoApprove: true,
      requiresApproval: false,
      isActive: true,
    },
  ]);

  const [sessions, setSessions] = useState<NegotiationSession[]>([
    {
      id: '1',
      customerName: 'John Smith',
      productName: 'Enterprise Plan',
      originalPrice: 999,
      proposedPrice: 849,
      currentOffer: 899,
      status: 'active',
      messages: 8,
      startedAt: '2 hours ago',
      summary: 'Customer requesting 15% discount for annual commitment. AI suggested counter-offer at 10%.',
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      productName: 'Pro Package',
      originalPrice: 499,
      proposedPrice: 449,
      currentOffer: 474,
      status: 'completed',
      messages: 5,
      startedAt: '5 hours ago',
      summary: 'Successfully negotiated 5% discount. Customer accepted and completed purchase.',
    },
    {
      id: '3',
      customerName: 'Mike Davis',
      productName: 'Starter Kit',
      originalPrice: 199,
      proposedPrice: 149,
      currentOffer: 179,
      status: 'active',
      messages: 12,
      startedAt: '1 hour ago',
      summary: 'Extended negotiation. Customer wants 25% off. AI holding at 10% based on rules.',
    },
  ]);

  const handleSaveRule = () => {
    if (!newRule.name || !newRule.minPrice || !newRule.maxDiscount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingRule) {
      setRules(prev =>
        prev.map(rule =>
          rule.id === editingRule.id
            ? {
                ...rule,
                name: newRule.name,
                minPrice: parseFloat(newRule.minPrice),
                maxDiscount: parseFloat(newRule.maxDiscount),
                autoApprove: newRule.autoApprove,
                requiresApproval: newRule.requiresApproval,
              }
            : rule
        )
      );
    } else {
      const rule: NegotiationRule = {
        id: Date.now().toString(),
        name: newRule.name,
        minPrice: parseFloat(newRule.minPrice),
        maxDiscount: parseFloat(newRule.maxDiscount),
        autoApprove: newRule.autoApprove,
        requiresApproval: newRule.requiresApproval,
        isActive: true,
      };
      setRules(prev => [...prev, rule]);
    }

    setShowRuleModal(false);
    setEditingRule(null);
    setNewRule({
      name: '',
      minPrice: '',
      maxDiscount: '',
      autoApprove: false,
      requiresApproval: true,
    });
  };

  const handleEditRule = (rule: NegotiationRule) => {
    setEditingRule(rule);
    setNewRule({
      name: rule.name,
      minPrice: rule.minPrice.toString(),
      maxDiscount: rule.maxDiscount.toString(),
      autoApprove: rule.autoApprove,
      requiresApproval: rule.requiresApproval,
    });
    setShowRuleModal(true);
  };

  const handleDeleteRule = (ruleId: string) => {
    Alert.alert('Delete Rule', 'Are you sure you want to delete this rule?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setRules(prev => prev.filter(r => r.id !== ruleId)),
      },
    ]);
  };

  const toggleRuleActive = (ruleId: string) => {
    setRules(prev =>
      prev.map(rule => (rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule))
    );
  };

  const renderSessions = () => (
    <View style={styles.tabContent}>
      {sessions.map(session => (
        <View
          key={session.id}
          style={[styles.sessionCard, { backgroundColor: theme.colors.cardBackground }]}
        >
          <View style={styles.sessionHeader}>
            <View style={styles.sessionInfo}>
              <View style={styles.sessionTitleRow}>
                <User size={16} color={theme.colors.text} />
                <Text style={[styles.sessionCustomer, { color: theme.colors.text }]}>
                  {session.customerName}
                </Text>
              </View>
              <Text style={[styles.sessionProduct, { color: theme.colors.secondaryText }]}>
                {session.productName}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    session.status === 'completed'
                      ? '#34C75920'
                      : session.status === 'active'
                      ? '#007AFF20'
                      : '#FF3B3020',
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      session.status === 'completed'
                        ? '#34C759'
                        : session.status === 'active'
                        ? '#007AFF'
                        : '#FF3B30',
                  },
                ]}
              >
                {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.priceSection}>
            <View style={styles.priceItem}>
              <Text style={[styles.priceLabel, { color: theme.colors.secondaryText }]}>
                Original
              </Text>
              <Text style={[styles.priceValue, { color: theme.colors.text }]}>
                ${session.originalPrice}
              </Text>
            </View>
            <View style={styles.priceArrow}>
              <TrendingUp size={16} color={theme.colors.primary} />
            </View>
            <View style={styles.priceItem}>
              <Text style={[styles.priceLabel, { color: theme.colors.secondaryText }]}>
                Current Offer
              </Text>
              <Text style={[styles.priceValue, { color: theme.colors.primary }]}>
                ${session.currentOffer}
              </Text>
            </View>
            <View style={styles.priceArrow}>
              <Target size={16} color={theme.colors.secondaryText} />
            </View>
            <View style={styles.priceItem}>
              <Text style={[styles.priceLabel, { color: theme.colors.secondaryText }]}>
                Proposed
              </Text>
              <Text style={[styles.priceValue, { color: '#FF9500' }]}>
                ${session.proposedPrice}
              </Text>
            </View>
          </View>

          <View style={[styles.summaryBox, { backgroundColor: theme.colors.background }]}>
            <AlertCircle size={14} color={theme.colors.primary} />
            <Text style={[styles.summaryText, { color: theme.colors.secondaryText }]}>
              {session.summary}
            </Text>
          </View>

          <View style={styles.sessionFooter}>
            <View style={styles.sessionMeta}>
              <MessageSquare size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {session.messages} messages
              </Text>
            </View>
            <View style={styles.sessionMeta}>
              <Clock size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {session.startedAt}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRules = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowRuleModal(true)}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Rule</Text>
      </TouchableOpacity>

      {rules.map(rule => (
        <View
          key={rule.id}
          style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}
        >
          <View style={styles.ruleHeader}>
            <View style={styles.ruleInfo}>
              <Text style={[styles.ruleName, { color: theme.colors.text }]}>{rule.name}</Text>
              <View style={styles.ruleDetails}>
                <View style={styles.ruleDetail}>
                  <DollarSign size={12} color={theme.colors.secondaryText} />
                  <Text style={[styles.ruleDetailText, { color: theme.colors.secondaryText }]}>
                    Min: ${rule.minPrice}
                  </Text>
                </View>
                <View style={styles.ruleDetail}>
                  <Target size={12} color={theme.colors.secondaryText} />
                  <Text style={[styles.ruleDetailText, { color: theme.colors.secondaryText }]}>
                    Max Discount: {rule.maxDiscount}%
                  </Text>
                </View>
              </View>
            </View>
            <Switch
              value={rule.isActive}
              onValueChange={() => toggleRuleActive(rule.id)}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={rule.isActive ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.ruleTags}>
            {rule.autoApprove && (
              <View style={[styles.ruleTag, { backgroundColor: '#34C75920' }]}>
                <CheckCircle size={12} color="#34C759" />
                <Text style={[styles.ruleTagText, { color: '#34C759' }]}>Auto-approve</Text>
              </View>
            )}
            {rule.requiresApproval && (
              <View style={[styles.ruleTag, { backgroundColor: '#FF950020' }]}>
                <AlertCircle size={12} color="#FF9500" />
                <Text style={[styles.ruleTagText, { color: '#FF9500' }]}>Requires Approval</Text>
              </View>
            )}
          </View>

          <View style={styles.ruleActions}>
            <TouchableOpacity
              style={[styles.ruleActionButton, { backgroundColor: theme.colors.background }]}
              onPress={() => handleEditRule(rule)}
            >
              <Edit size={16} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ruleActionButton, { backgroundColor: theme.colors.background }]}
              onPress={() => handleDeleteRule(rule.id)}
            >
              <Trash2 size={16} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={[styles.statsGrid, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statCard}>
          <BarChart3 size={24} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>156</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Total Negotiations
          </Text>
        </View>
        <View style={styles.statCard}>
          <CheckCircle size={24} color="#34C759" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>89%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Success Rate
          </Text>
        </View>
        <View style={styles.statCard}>
          <DollarSign size={24} color="#FF9500" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>$45.2K</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Total Value
          </Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={24} color="#007AFF" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>12.5%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Avg Discount
          </Text>
        </View>
      </View>

      <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
          Negotiation Performance
        </Text>
        <Text style={[styles.chartSubtitle, { color: theme.colors.secondaryText }]}>
          Last 30 days
        </Text>
        <View style={styles.chartPlaceholder}>
          <BarChart3 size={48} color={theme.colors.secondaryText} />
          <Text style={[styles.chartPlaceholderText, { color: theme.colors.secondaryText }]}>
            Chart visualization would appear here
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'AI Negotiation Assistant',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.colors.text }]}>AI Negotiation Assistant</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
              Automated pricing negotiations with intelligent limits
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.configButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.push('/ai-agent/negotiation-config')}
          >
            <Settings size={20} color="white" />
            <Text style={styles.configButtonText}>Configure</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'sessions' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('sessions')}
        >
          <MessageSquare
            size={20}
            color={activeTab === 'sessions' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'sessions' ? theme.colors.primary : theme.colors.secondaryText,
              },
            ]}
          >
            Sessions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'rules' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('rules')}
        >
          <Settings
            size={20}
            color={activeTab === 'rules' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'rules' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Rules
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'analytics' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('analytics')}
        >
          <BarChart3
            size={20}
            color={activeTab === 'analytics' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'analytics' ? theme.colors.primary : theme.colors.secondaryText,
              },
            ]}
          >
            Analytics
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'sessions' && renderSessions()}
        {activeTab === 'rules' && renderRules()}
        {activeTab === 'analytics' && renderAnalytics()}
      </ScrollView>

      <Modal visible={showRuleModal} animationType="slide" transparent onRequestClose={() => setShowRuleModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingRule ? 'Edit Rule' : 'Add New Rule'}
              </Text>
              <TouchableOpacity onPress={() => setShowRuleModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Rule Name</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="e.g., Standard Discount"
                placeholderTextColor={theme.colors.secondaryText}
                value={newRule.name}
                onChangeText={text => setNewRule(prev => ({ ...prev, name: text }))}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                Minimum Price ($)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="100"
                placeholderTextColor={theme.colors.secondaryText}
                value={newRule.minPrice}
                onChangeText={text => setNewRule(prev => ({ ...prev, minPrice: text }))}
                keyboardType="numeric"
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                Maximum Discount (%)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="15"
                placeholderTextColor={theme.colors.secondaryText}
                value={newRule.maxDiscount}
                onChangeText={text => setNewRule(prev => ({ ...prev, maxDiscount: text }))}
                keyboardType="numeric"
              />

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
                  Auto-approve within limits
                </Text>
                <Switch
                  value={newRule.autoApprove}
                  onValueChange={value => setNewRule(prev => ({ ...prev, autoApprove: value }))}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={newRule.autoApprove ? '#fff' : '#f4f3f4'}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
                  Requires manual approval
                </Text>
                <Switch
                  value={newRule.requiresApproval}
                  onValueChange={value =>
                    setNewRule(prev => ({ ...prev, requiresApproval: value }))
                  }
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={newRule.requiresApproval ? '#fff' : '#f4f3f4'}
                />
              </View>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSaveRule}
              >
                <Save size={20} color="white" />
                <Text style={styles.saveButtonText}>Save Rule</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  configButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  configButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  sessionCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sessionCustomer: {
    fontSize: 16,
    fontWeight: '600',
  },
  sessionProduct: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceItem: {
    flex: 1,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  priceArrow: {
    marginHorizontal: 4,
  },
  summaryBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  summaryText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  ruleCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ruleInfo: {
    flex: 1,
  },
  ruleName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  ruleDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  ruleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ruleDetailText: {
    fontSize: 12,
  },
  ruleTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  ruleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ruleTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ruleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  ruleActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCard: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  chartCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
