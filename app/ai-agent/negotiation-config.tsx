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
  Settings,
  Brain,
  Target,
  DollarSign,
  TrendingUp,
  Save,
  Plus,
  Edit,
  Trash2,
  X,
  BookOpen,
  Zap,
  Shield,
  MessageSquare,
  BarChart3,
  AlertCircle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

interface TrainingData {
  id: string;
  scenario: string;
  expectedResponse: string;
  category: string;
}

interface NegotiationLimit {
  id: string;
  productCategory: string;
  minPrice: number;
  maxDiscount: number;
  autoApproveThreshold: number;
  requiresManagerApproval: boolean;
}

export default function NegotiationConfigScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'training' | 'limits' | 'behavior' | 'analytics'>('training');
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [aiConfig, setAiConfig] = useState({
    enabled: true,
    autoLearn: true,
    aggressiveness: 50,
    customerSatisfactionPriority: 70,
    profitMarginPriority: 60,
    responseDelay: 2,
    useEmotionalIntelligence: true,
    escalateToHuman: true,
    escalationThreshold: 3,
  });

  const [newTraining, setNewTraining] = useState({
    scenario: '',
    expectedResponse: '',
    category: 'pricing',
  });

  const [newLimit, setNewLimit] = useState({
    productCategory: '',
    minPrice: '',
    maxDiscount: '',
    autoApproveThreshold: '',
    requiresManagerApproval: false,
  });

  const [trainingData, setTrainingData] = useState<TrainingData[]>([
    {
      id: '1',
      scenario: 'Customer requests 20% discount on enterprise plan',
      expectedResponse: 'Offer 10% discount with annual commitment, counter with added features',
      category: 'pricing',
    },
    {
      id: '2',
      scenario: 'Customer compares with competitor pricing',
      expectedResponse: 'Highlight unique value propositions, offer price match with conditions',
      category: 'competition',
    },
    {
      id: '3',
      scenario: 'Customer threatens to leave',
      expectedResponse: 'Understand pain points, offer retention discount up to 15%, escalate if needed',
      category: 'retention',
    },
  ]);

  const [limits, setLimits] = useState<NegotiationLimit[]>([
    {
      id: '1',
      productCategory: 'Enterprise Plans',
      minPrice: 5000,
      maxDiscount: 20,
      autoApproveThreshold: 10,
      requiresManagerApproval: true,
    },
    {
      id: '2',
      productCategory: 'Professional Plans',
      minPrice: 1000,
      maxDiscount: 15,
      autoApproveThreshold: 10,
      requiresManagerApproval: false,
    },
    {
      id: '3',
      productCategory: 'Starter Plans',
      minPrice: 100,
      maxDiscount: 10,
      autoApproveThreshold: 10,
      requiresManagerApproval: false,
    },
  ]);

  const handleSaveTraining = () => {
    if (!newTraining.scenario || !newTraining.expectedResponse) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingItem) {
      setTrainingData(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                scenario: newTraining.scenario,
                expectedResponse: newTraining.expectedResponse,
                category: newTraining.category,
              }
            : item
        )
      );
    } else {
      const training: TrainingData = {
        id: Date.now().toString(),
        scenario: newTraining.scenario,
        expectedResponse: newTraining.expectedResponse,
        category: newTraining.category,
      };
      setTrainingData(prev => [...prev, training]);
    }

    setShowTrainingModal(false);
    setEditingItem(null);
    setNewTraining({ scenario: '', expectedResponse: '', category: 'pricing' });
  };

  const handleSaveLimit = () => {
    if (!newLimit.productCategory || !newLimit.minPrice || !newLimit.maxDiscount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingItem) {
      setLimits(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                productCategory: newLimit.productCategory,
                minPrice: parseFloat(newLimit.minPrice),
                maxDiscount: parseFloat(newLimit.maxDiscount),
                autoApproveThreshold: parseFloat(newLimit.autoApproveThreshold),
                requiresManagerApproval: newLimit.requiresManagerApproval,
              }
            : item
        )
      );
    } else {
      const limit: NegotiationLimit = {
        id: Date.now().toString(),
        productCategory: newLimit.productCategory,
        minPrice: parseFloat(newLimit.minPrice),
        maxDiscount: parseFloat(newLimit.maxDiscount),
        autoApproveThreshold: parseFloat(newLimit.autoApproveThreshold),
        requiresManagerApproval: newLimit.requiresManagerApproval,
      };
      setLimits(prev => [...prev, limit]);
    }

    setShowLimitModal(false);
    setEditingItem(null);
    setNewLimit({
      productCategory: '',
      minPrice: '',
      maxDiscount: '',
      autoApproveThreshold: '',
      requiresManagerApproval: false,
    });
  };

  const handleEditTraining = (item: TrainingData) => {
    setEditingItem(item);
    setNewTraining({
      scenario: item.scenario,
      expectedResponse: item.expectedResponse,
      category: item.category,
    });
    setShowTrainingModal(true);
  };

  const handleEditLimit = (item: NegotiationLimit) => {
    setEditingItem(item);
    setNewLimit({
      productCategory: item.productCategory,
      minPrice: item.minPrice.toString(),
      maxDiscount: item.maxDiscount.toString(),
      autoApproveThreshold: item.autoApproveThreshold.toString(),
      requiresManagerApproval: item.requiresManagerApproval,
    });
    setShowLimitModal(true);
  };

  const handleDeleteTraining = (id: string) => {
    Alert.alert('Delete Training Data', 'Are you sure you want to delete this training data?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTrainingData(prev => prev.filter(item => item.id !== id)),
      },
    ]);
  };

  const handleDeleteLimit = (id: string) => {
    Alert.alert('Delete Limit', 'Are you sure you want to delete this limit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setLimits(prev => prev.filter(item => item.id !== id)),
      },
    ]);
  };

  const renderTraining = () => (
    <View style={styles.tabContent}>
      <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Brain size={24} color={theme.colors.primary} />
        <View style={styles.infoContent}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>AI Training</Text>
          <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
            Train your AI negotiation assistant with real scenarios and expected responses to improve
            negotiation outcomes.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowTrainingModal(true)}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add Training Data</Text>
      </TouchableOpacity>

      {trainingData.map(item => (
        <View
          key={item.id}
          style={[styles.trainingCard, { backgroundColor: theme.colors.cardBackground }]}
        >
          <View style={styles.trainingHeader}>
            <View
              style={[
                styles.categoryBadge,
                {
                  backgroundColor:
                    item.category === 'pricing'
                      ? '#007AFF20'
                      : item.category === 'competition'
                      ? '#FF950020'
                      : '#34C75920',
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      item.category === 'pricing'
                        ? '#007AFF'
                        : item.category === 'competition'
                        ? '#FF9500'
                        : '#34C759',
                  },
                ]}
              >
                {item.category.toUpperCase()}
              </Text>
            </View>
            <View style={styles.trainingActions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleEditTraining(item)}
              >
                <Edit size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteTraining(item.id)}
              >
                <Trash2 size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.trainingScenario, { color: theme.colors.text }]}>
            Scenario: {item.scenario}
          </Text>
          <Text style={[styles.trainingResponse, { color: theme.colors.secondaryText }]}>
            Expected Response: {item.expectedResponse}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderLimits = () => (
    <View style={styles.tabContent}>
      <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Shield size={24} color={theme.colors.primary} />
        <View style={styles.infoContent}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Negotiation Limits</Text>
          <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
            Set boundaries for AI negotiations to protect profit margins and ensure business rules are
            followed.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowLimitModal(true)}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add Limit</Text>
      </TouchableOpacity>

      {limits.map(item => (
        <View key={item.id} style={[styles.limitCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.limitHeader}>
            <Text style={[styles.limitCategory, { color: theme.colors.text }]}>
              {item.productCategory}
            </Text>
            <View style={styles.limitActions}>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleEditLimit(item)}>
                <Edit size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteLimit(item.id)}
              >
                <Trash2 size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.limitDetails}>
            <View style={styles.limitDetail}>
              <DollarSign size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.limitDetailText, { color: theme.colors.secondaryText }]}>
                Min Price: ${item.minPrice}
              </Text>
            </View>
            <View style={styles.limitDetail}>
              <Target size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.limitDetailText, { color: theme.colors.secondaryText }]}>
                Max Discount: {item.maxDiscount}%
              </Text>
            </View>
            <View style={styles.limitDetail}>
              <Zap size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.limitDetailText, { color: theme.colors.secondaryText }]}>
                Auto-approve: {item.autoApproveThreshold}%
              </Text>
            </View>
          </View>
          {item.requiresManagerApproval && (
            <View style={[styles.approvalBadge, { backgroundColor: '#FF950020' }]}>
              <AlertCircle size={12} color="#FF9500" />
              <Text style={[styles.approvalText, { color: '#FF9500' }]}>
                Requires Manager Approval
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderBehavior = () => (
    <View style={styles.tabContent}>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>AI Behavior Settings</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Enable AI Assistant</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Allow AI to handle negotiations automatically
            </Text>
          </View>
          <Switch
            value={aiConfig.enabled}
            onValueChange={value => setAiConfig(prev => ({ ...prev, enabled: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Learning</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              AI learns from successful negotiations
            </Text>
          </View>
          <Switch
            value={aiConfig.autoLearn}
            onValueChange={value => setAiConfig(prev => ({ ...prev, autoLearn: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.autoLearn ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Emotional Intelligence
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Detect and respond to customer emotions
            </Text>
          </View>
          <Switch
            value={aiConfig.useEmotionalIntelligence}
            onValueChange={value =>
              setAiConfig(prev => ({ ...prev, useEmotionalIntelligence: value }))
            }
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.useEmotionalIntelligence ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Escalate to Human
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Transfer complex negotiations to human agents
            </Text>
          </View>
          <Switch
            value={aiConfig.escalateToHuman}
            onValueChange={value => setAiConfig(prev => ({ ...prev, escalateToHuman: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.escalateToHuman ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.sliderSection}>
          <Text style={[styles.sliderLabel, { color: theme.colors.text }]}>
            Negotiation Aggressiveness: {aiConfig.aggressiveness}%
          </Text>
          <Text style={[styles.sliderDescription, { color: theme.colors.secondaryText }]}>
            Higher values mean more aggressive discount resistance
          </Text>
        </View>

        <View style={styles.sliderSection}>
          <Text style={[styles.sliderLabel, { color: theme.colors.text }]}>
            Customer Satisfaction Priority: {aiConfig.customerSatisfactionPriority}%
          </Text>
          <Text style={[styles.sliderDescription, { color: theme.colors.secondaryText }]}>
            Balance between customer happiness and profit
          </Text>
        </View>

        <View style={styles.sliderSection}>
          <Text style={[styles.sliderLabel, { color: theme.colors.text }]}>
            Response Delay: {aiConfig.responseDelay}s
          </Text>
          <Text style={[styles.sliderDescription, { color: theme.colors.secondaryText }]}>
            Simulate human thinking time
          </Text>
        </View>
      </View>
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={[styles.statsGrid, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statCard}>
          <MessageSquare size={24} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>156</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Total Negotiations
          </Text>
        </View>
        <View style={styles.statCard}>
          <Target size={24} color="#34C759" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>89%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
        </View>
        <View style={styles.statCard}>
          <DollarSign size={24} color="#FF9500" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>$45.2K</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total Value</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={24} color="#007AFF" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>12.5%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Discount</Text>
        </View>
      </View>

      <View style={[styles.performanceCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.performanceTitle, { color: theme.colors.text }]}>
          Training Performance
        </Text>
        <Text style={[styles.performanceDescription, { color: theme.colors.secondaryText }]}>
          Your AI assistant has been trained on {trainingData.length} scenarios and is performing at
          89% accuracy.
        </Text>
        <View style={styles.performanceMetrics}>
          <View style={styles.performanceMetric}>
            <Text style={[styles.performanceMetricLabel, { color: theme.colors.secondaryText }]}>
              Pricing Scenarios
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme.colors.text }]}>92%</Text>
          </View>
          <View style={styles.performanceMetric}>
            <Text style={[styles.performanceMetricLabel, { color: theme.colors.secondaryText }]}>
              Competition Scenarios
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme.colors.text }]}>87%</Text>
          </View>
          <View style={styles.performanceMetric}>
            <Text style={[styles.performanceMetricLabel, { color: theme.colors.secondaryText }]}>
              Retention Scenarios
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme.colors.text }]}>88%</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Negotiation AI Configuration',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Negotiation Configuration
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          Train and configure your AI negotiation assistant
        </Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'training' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('training')}
        >
          <BookOpen
            size={20}
            color={activeTab === 'training' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'training' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Training
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'limits' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('limits')}
        >
          <Shield
            size={20}
            color={activeTab === 'limits' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'limits' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Limits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'behavior' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('behavior')}
        >
          <Settings
            size={20}
            color={activeTab === 'behavior' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'behavior' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Behavior
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
              { color: activeTab === 'analytics' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Analytics
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'training' && renderTraining()}
        {activeTab === 'limits' && renderLimits()}
        {activeTab === 'behavior' && renderBehavior()}
        {activeTab === 'analytics' && renderAnalytics()}
      </ScrollView>

      <Modal
        visible={showTrainingModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowTrainingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingItem ? 'Edit Training Data' : 'Add Training Data'}
              </Text>
              <TouchableOpacity onPress={() => setShowTrainingModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Category</Text>
              <View style={styles.categoryButtons}>
                {['pricing', 'competition', 'retention'].map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      {
                        backgroundColor:
                          newTraining.category === cat
                            ? theme.colors.primary
                            : theme.colors.background,
                      },
                    ]}
                    onPress={() => setNewTraining(prev => ({ ...prev, category: cat }))}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        {
                          color:
                            newTraining.category === cat ? 'white' : theme.colors.text,
                        },
                      ]}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Scenario</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="Describe the negotiation scenario..."
                placeholderTextColor={theme.colors.secondaryText}
                value={newTraining.scenario}
                onChangeText={text => setNewTraining(prev => ({ ...prev, scenario: text }))}
                multiline
                numberOfLines={3}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Expected Response</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="How should the AI respond..."
                placeholderTextColor={theme.colors.secondaryText}
                value={newTraining.expectedResponse}
                onChangeText={text => setNewTraining(prev => ({ ...prev, expectedResponse: text }))}
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSaveTraining}
              >
                <Save size={20} color="white" />
                <Text style={styles.saveButtonText}>Save Training Data</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showLimitModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLimitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingItem ? 'Edit Limit' : 'Add Limit'}
              </Text>
              <TouchableOpacity onPress={() => setShowLimitModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Product Category</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="e.g., Enterprise Plans"
                placeholderTextColor={theme.colors.secondaryText}
                value={newLimit.productCategory}
                onChangeText={text => setNewLimit(prev => ({ ...prev, productCategory: text }))}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Minimum Price ($)</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="1000"
                placeholderTextColor={theme.colors.secondaryText}
                value={newLimit.minPrice}
                onChangeText={text => setNewLimit(prev => ({ ...prev, minPrice: text }))}
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
                value={newLimit.maxDiscount}
                onChangeText={text => setNewLimit(prev => ({ ...prev, maxDiscount: text }))}
                keyboardType="numeric"
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                Auto-approve Threshold (%)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="10"
                placeholderTextColor={theme.colors.secondaryText}
                value={newLimit.autoApproveThreshold}
                onChangeText={text => setNewLimit(prev => ({ ...prev, autoApproveThreshold: text }))}
                keyboardType="numeric"
              />

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
                  Requires Manager Approval
                </Text>
                <Switch
                  value={newLimit.requiresManagerApproval}
                  onValueChange={value =>
                    setNewLimit(prev => ({ ...prev, requiresManagerApproval: value }))
                  }
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={newLimit.requiresManagerApproval ? '#fff' : '#f4f3f4'}
                />
              </View>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSaveLimit}
              >
                <Save size={20} color="white" />
                <Text style={styles.saveButtonText}>Save Limit</Text>
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
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
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
  trainingCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  trainingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  trainingScenario: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  trainingResponse: {
    fontSize: 13,
    lineHeight: 18,
  },
  limitCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  limitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  limitCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  limitActions: {
    flexDirection: 'row',
    gap: 8,
  },
  limitDetails: {
    gap: 8,
    marginBottom: 12,
  },
  limitDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  limitDetailText: {
    fontSize: 13,
  },
  approvalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  approvalText: {
    fontSize: 12,
    fontWeight: '600',
  },
  settingsCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  sliderSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  sliderDescription: {
    fontSize: 13,
    lineHeight: 18,
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
  performanceCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  performanceDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  performanceMetrics: {
    gap: 12,
  },
  performanceMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  performanceMetricLabel: {
    fontSize: 14,
  },
  performanceMetricValue: {
    fontSize: 16,
    fontWeight: '600',
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
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
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
