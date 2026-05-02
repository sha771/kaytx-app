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
  Phone,
  Calendar,
  Clock,
  Save,
  Plus,
  Pencil,
  Trash2,
  X,
  BookOpen,
  Shield,
  MessageSquare,
  ChartBar,
  CircleAlert,
  Users,
  Mic,
  Volume2,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

interface GreetingScript {
  id: string;
  name: string;
  script: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'anytime';
  language: string;
}

interface CallHandlingRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
}

interface BookingSlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  maxBookings: number;
  enabled: boolean;
}

export default function ReceptionistConfigScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'training' | 'rules' | 'schedule' | 'behavior'>('training');
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [aiConfig, setAiConfig] = useState({
    enabled: true,
    autoAnswer: true,
    recordCalls: true,
    transcribeCalls: true,
    voiceType: 'professional',
    speakingSpeed: 1.0,
    emotionalTone: 'friendly',
    holdMusic: true,
    maxCallDuration: 15,
    transferToHuman: true,
    transferThreshold: 3,
    businessHoursOnly: true,
    sendSummaryEmail: true,
  });

  const [newScript, setNewScript] = useState<{
    name: string;
    script: string;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'anytime';
    language: string;
  }>({
    name: '',
    script: '',
    timeOfDay: 'anytime' as const,
    language: 'English',
  });

  const [newRule, setNewRule] = useState({
    name: '',
    condition: '',
    action: '',
    priority: '1',
    enabled: true,
  });

  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
    maxBookings: '10',
    enabled: true,
  });

  const [greetingScripts, setGreetingScripts] = useState<GreetingScript[]>([
    {
      id: '1',
      name: 'Standard Greeting',
      script: 'Thank you for calling [Company Name]. This is your AI receptionist. How may I help you today?',
      timeOfDay: 'anytime',
      language: 'English',
    },
    {
      id: '2',
      name: 'Morning Greeting',
      script: 'Good morning! Thank you for calling [Company Name]. How can I assist you this morning?',
      timeOfDay: 'morning',
      language: 'English',
    },
    {
      id: '3',
      name: 'After Hours',
      script: 'Thank you for calling [Company Name]. Our office is currently closed. Please leave a message or call back during business hours.',
      timeOfDay: 'evening',
      language: 'English',
    },
  ]);

  const [callRules, setCallRules] = useState<CallHandlingRule[]>([
    {
      id: '1',
      name: 'VIP Customer',
      condition: 'Caller is in VIP list',
      action: 'Transfer immediately to manager',
      priority: 1,
      enabled: true,
    },
    {
      id: '2',
      name: 'Sales Inquiry',
      condition: 'Caller mentions pricing or purchase',
      action: 'Transfer to sales team',
      priority: 2,
      enabled: true,
    },
    {
      id: '3',
      name: 'Support Request',
      condition: 'Caller mentions problem or issue',
      action: 'Create support ticket and schedule callback',
      priority: 3,
      enabled: true,
    },
  ]);

  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([
    {
      id: '1',
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
      maxBookings: 10,
      enabled: true,
    },
    {
      id: '2',
      dayOfWeek: 'Tuesday',
      startTime: '09:00',
      endTime: '17:00',
      maxBookings: 10,
      enabled: true,
    },
    {
      id: '3',
      dayOfWeek: 'Wednesday',
      startTime: '09:00',
      endTime: '17:00',
      maxBookings: 10,
      enabled: true,
    },
  ]);

  const handleSaveScript = () => {
    if (!newScript.name || !newScript.script) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingItem) {
      setGreetingScripts(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                name: newScript.name,
                script: newScript.script,
                timeOfDay: newScript.timeOfDay,
                language: newScript.language,
              }
            : item
        )
      );
    } else {
      const script: GreetingScript = {
        id: Date.now().toString(),
        name: newScript.name,
        script: newScript.script,
        timeOfDay: newScript.timeOfDay,
        language: newScript.language,
      };
      setGreetingScripts(prev => [...prev, script]);
    }

    setShowScriptModal(false);
    setEditingItem(null);
    setNewScript({ name: '', script: '', timeOfDay: 'anytime' as const, language: 'English' });
  };

  const handleSaveRule = () => {
    if (!newRule.name || !newRule.condition || !newRule.action) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingItem) {
      setCallRules(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                name: newRule.name,
                condition: newRule.condition,
                action: newRule.action,
                priority: parseInt(newRule.priority),
                enabled: newRule.enabled,
              }
            : item
        )
      );
    } else {
      const rule: CallHandlingRule = {
        id: Date.now().toString(),
        name: newRule.name,
        condition: newRule.condition,
        action: newRule.action,
        priority: parseInt(newRule.priority),
        enabled: newRule.enabled,
      };
      setCallRules(prev => [...prev, rule]);
    }

    setShowRuleModal(false);
    setEditingItem(null);
    setNewRule({ name: '', condition: '', action: '', priority: '1', enabled: true });
  };

  const handleSaveSlot = () => {
    if (!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingItem) {
      setBookingSlots(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                dayOfWeek: newSlot.dayOfWeek,
                startTime: newSlot.startTime,
                endTime: newSlot.endTime,
                maxBookings: parseInt(newSlot.maxBookings),
                enabled: newSlot.enabled,
              }
            : item
        )
      );
    } else {
      const slot: BookingSlot = {
        id: Date.now().toString(),
        dayOfWeek: newSlot.dayOfWeek,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        maxBookings: parseInt(newSlot.maxBookings),
        enabled: newSlot.enabled,
      };
      setBookingSlots(prev => [...prev, slot]);
    }

    setShowSlotModal(false);
    setEditingItem(null);
    setNewSlot({ dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00', maxBookings: '10', enabled: true });
  };

  const handleEditScript = (item: GreetingScript) => {
    setEditingItem(item);
    setNewScript({
      name: item.name,
      script: item.script,
      timeOfDay: item.timeOfDay,
      language: item.language,
    });
    setShowScriptModal(true);
  };

  const handleEditRule = (item: CallHandlingRule) => {
    setEditingItem(item);
    setNewRule({
      name: item.name,
      condition: item.condition,
      action: item.action,
      priority: item.priority.toString(),
      enabled: item.enabled,
    });
    setShowRuleModal(true);
  };

  const handleEditSlot = (item: BookingSlot) => {
    setEditingItem(item);
    setNewSlot({
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      maxBookings: item.maxBookings.toString(),
      enabled: item.enabled,
    });
    setShowSlotModal(true);
  };

  const handleDeleteScript = (id: string) => {
    Alert.alert('Delete Script', 'Are you sure you want to delete this greeting script?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setGreetingScripts(prev => prev.filter(item => item.id !== id)),
      },
    ]);
  };

  const handleDeleteRule = (id: string) => {
    Alert.alert('Delete Rule', 'Are you sure you want to delete this call handling rule?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setCallRules(prev => prev.filter(item => item.id !== id)),
      },
    ]);
  };

  const handleDeleteSlot = (id: string) => {
    Alert.alert('Delete Slot', 'Are you sure you want to delete this booking slot?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setBookingSlots(prev => prev.filter(item => item.id !== id)),
      },
    ]);
  };

  const renderTraining = () => (
    <View style={styles.tabContent}>
      <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Mic size={24} color={theme.colors.primary} />
        <View style={styles.infoContent}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Greeting Scripts</Text>
          <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
            Customize how your AI receptionist greets callers based on time of day and language.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowScriptModal(true)}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add Greeting Script</Text>
      </TouchableOpacity>

      {greetingScripts.map(item => (
        <View
          key={item.id}
          style={[styles.scriptCard, { backgroundColor: theme.colors.cardBackground }]}
        >
          <View style={styles.scriptHeader}>
            <Text style={[styles.scriptName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.scriptActions}>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleEditScript(item)}>
                <Pencil size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteScript(item.id)}
              >
                <Trash2 size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.scriptText, { color: theme.colors.secondaryText }]}>
            {item.script}
          </Text>
          <View style={styles.scriptMeta}>
            <View
              style={[
                styles.timeBadge,
                {
                  backgroundColor:
                    item.timeOfDay === 'morning'
                      ? '#FF950020'
                      : item.timeOfDay === 'afternoon'
                      ? '#007AFF20'
                      : item.timeOfDay === 'evening'
                      ? '#AF52DE20'
                      : '#34C75920',
                },
              ]}
            >
              <Clock size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.timeText, { color: theme.colors.secondaryText }]}>
                {item.timeOfDay.charAt(0).toUpperCase() + item.timeOfDay.slice(1)}
              </Text>
            </View>
            <View style={[styles.langBadge, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.langText, { color: theme.colors.secondaryText }]}>
                {item.language}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRules = () => (
    <View style={styles.tabContent}>
      <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Shield size={24} color={theme.colors.primary} />
        <View style={styles.infoContent}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Call Handling Rules</Text>
          <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
            Define how the AI receptionist should handle different types of calls and situations.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowRuleModal(true)}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add Call Rule</Text>
      </TouchableOpacity>

      {callRules
        .sort((a, b) => a.priority - b.priority)
        .map(item => (
          <View key={item.id} style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.ruleHeader}>
              <View style={styles.ruleInfo}>
                <Text style={[styles.ruleName, { color: theme.colors.text }]}>{item.name}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                  <Text style={[styles.priorityText, { color: theme.colors.primary }]}>
                    Priority {item.priority}
                  </Text>
                </View>
              </View>
              <View style={styles.ruleActions}>
                <Switch
                  value={item.enabled}
                  onValueChange={value =>
                    setCallRules(prev =>
                      prev.map(rule => (rule.id === item.id ? { ...rule, enabled: value } : rule))
                    )
                  }
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={item.enabled ? '#fff' : '#f4f3f4'}
                />
                <TouchableOpacity style={styles.iconButton} onPress={() => handleEditRule(item)}>
                  <Pencil size={16} color={theme.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDeleteRule(item.id)}
                >
                  <Trash2 size={16} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ruleDetails}>
              <Text style={[styles.ruleLabel, { color: theme.colors.secondaryText }]}>Condition:</Text>
              <Text style={[styles.ruleValue, { color: theme.colors.text }]}>{item.condition}</Text>
            </View>
            <View style={styles.ruleDetails}>
              <Text style={[styles.ruleLabel, { color: theme.colors.secondaryText }]}>Action:</Text>
              <Text style={[styles.ruleValue, { color: theme.colors.text }]}>{item.action}</Text>
            </View>
          </View>
        ))}
    </View>
  );

  const renderSchedule = () => (
    <View style={styles.tabContent}>
      <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Calendar size={24} color={theme.colors.primary} />
        <View style={styles.infoContent}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Booking Schedule</Text>
          <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
            Configure available time slots for the AI receptionist to schedule appointments.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowSlotModal(true)}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add Time Slot</Text>
      </TouchableOpacity>

      {bookingSlots.map(item => (
        <View key={item.id} style={[styles.slotCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.slotHeader}>
            <Text style={[styles.slotDay, { color: theme.colors.text }]}>{item.dayOfWeek}</Text>
            <View style={styles.slotActions}>
              <Switch
                value={item.enabled}
                onValueChange={value =>
                  setBookingSlots(prev =>
                    prev.map(slot => (slot.id === item.id ? { ...slot, enabled: value } : slot))
                  )
                }
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={item.enabled ? '#fff' : '#f4f3f4'}
              />
              <TouchableOpacity style={styles.iconButton} onPress={() => handleEditSlot(item)}>
                <Pencil size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteSlot(item.id)}
              >
                <Trash2 size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slotDetails}>
            <View style={styles.slotDetail}>
              <Clock size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.slotDetailText, { color: theme.colors.secondaryText }]}>
                {item.startTime} - {item.endTime}
              </Text>
            </View>
            <View style={styles.slotDetail}>
              <Users size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.slotDetailText, { color: theme.colors.secondaryText }]}>
                Max {item.maxBookings} bookings
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderBehavior = () => (
    <View style={styles.tabContent}>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>
          AI Receptionist Behavior
        </Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Enable AI Receptionist</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Automatically answer and handle incoming calls
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
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Answer Calls</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Answer calls immediately without ringing
            </Text>
          </View>
          <Switch
            value={aiConfig.autoAnswer}
            onValueChange={value => setAiConfig(prev => ({ ...prev, autoAnswer: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.autoAnswer ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Record Calls</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Record all calls for quality and training
            </Text>
          </View>
          <Switch
            value={aiConfig.recordCalls}
            onValueChange={value => setAiConfig(prev => ({ ...prev, recordCalls: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.recordCalls ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Transcribe Calls</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Generate text transcripts of all calls
            </Text>
          </View>
          <Switch
            value={aiConfig.transcribeCalls}
            onValueChange={value => setAiConfig(prev => ({ ...prev, transcribeCalls: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.transcribeCalls ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Transfer to Human</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Transfer complex calls to human agents
            </Text>
          </View>
          <Switch
            value={aiConfig.transferToHuman}
            onValueChange={value => setAiConfig(prev => ({ ...prev, transferToHuman: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.transferToHuman ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Business Hours Only</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Only answer calls during business hours
            </Text>
          </View>
          <Switch
            value={aiConfig.businessHoursOnly}
            onValueChange={value => setAiConfig(prev => ({ ...prev, businessHoursOnly: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.businessHoursOnly ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Send Summary Email</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Email call summaries to team members
            </Text>
          </View>
          <Switch
            value={aiConfig.sendSummaryEmail}
            onValueChange={value => setAiConfig(prev => ({ ...prev, sendSummaryEmail: value }))}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={aiConfig.sendSummaryEmail ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.voiceSection}>
          <Text style={[styles.voiceLabel, { color: theme.colors.text }]}>Voice Type</Text>
          <View style={styles.voiceButtons}>
            {['professional', 'friendly', 'casual'].map(voice => (
              <TouchableOpacity
                key={voice}
                style={[
                  styles.voiceButton,
                  {
                    backgroundColor:
                      aiConfig.voiceType === voice ? theme.colors.primary : theme.colors.background,
                  },
                ]}
                onPress={() => setAiConfig(prev => ({ ...prev, voiceType: voice }))}
              >
                <Text
                  style={[
                    styles.voiceButtonText,
                    { color: aiConfig.voiceType === voice ? 'white' : theme.colors.text },
                  ]}
                >
                  {voice.charAt(0).toUpperCase() + voice.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.voiceSection}>
          <Text style={[styles.voiceLabel, { color: theme.colors.text }]}>Emotional Tone</Text>
          <View style={styles.voiceButtons}>
            {['friendly', 'neutral', 'formal'].map(tone => (
              <TouchableOpacity
                key={tone}
                style={[
                  styles.voiceButton,
                  {
                    backgroundColor:
                      aiConfig.emotionalTone === tone ? theme.colors.primary : theme.colors.background,
                  },
                ]}
                onPress={() => setAiConfig(prev => ({ ...prev, emotionalTone: tone }))}
              >
                <Text
                  style={[
                    styles.voiceButtonText,
                    { color: aiConfig.emotionalTone === tone ? 'white' : theme.colors.text },
                  ]}
                >
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Receptionist AI Configuration',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>AI Receptionist Configuration</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          Train and configure your AI receptionist assistant
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
          <Mic
            size={20}
            color={activeTab === 'training' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'training' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Scripts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'rules' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('rules')}
        >
          <Shield
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
            activeTab === 'schedule' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('schedule')}
        >
          <Calendar
            size={20}
            color={activeTab === 'schedule' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'schedule' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Schedule
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
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'training' && renderTraining()}
        {activeTab === 'rules' && renderRules()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'behavior' && renderBehavior()}
      </ScrollView>

      <Modal
        visible={showScriptModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowScriptModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingItem ? 'Edit Greeting Script' : 'Add Greeting Script'}
              </Text>
              <TouchableOpacity onPress={() => setShowScriptModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Script Name</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="e.g., Morning Greeting"
                placeholderTextColor={theme.colors.secondaryText}
                value={newScript.name}
                onChangeText={text => setNewScript(prev => ({ ...prev, name: text }))}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Script Text</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="Enter the greeting script..."
                placeholderTextColor={theme.colors.secondaryText}
                value={newScript.script}
                onChangeText={text => setNewScript(prev => ({ ...prev, script: text }))}
                multiline
                numberOfLines={4}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Time of Day</Text>
              <View style={styles.timeButtons}>
                {(['anytime', 'morning', 'afternoon', 'evening'] as const).map(time => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeButton,
                      {
                        backgroundColor:
                          newScript.timeOfDay === time ? theme.colors.primary : theme.colors.background,
                      },
                    ]}
                    onPress={() => setNewScript(prev => ({ ...prev, timeOfDay: time }))}
                  >
                    <Text
                      style={[
                        styles.timeButtonText,
                        { color: newScript.timeOfDay === time ? 'white' : theme.colors.text },
                      ]}
                    >
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Language</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="English"
                placeholderTextColor={theme.colors.secondaryText}
                value={newScript.language}
                onChangeText={text => setNewScript(prev => ({ ...prev, language: text }))}
              />

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSaveScript}
              >
                <Save size={20} color="white" />
                <Text style={styles.saveButtonText}>Save Script</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showRuleModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowRuleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingItem ? 'Edit Call Rule' : 'Add Call Rule'}
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
                placeholder="e.g., VIP Customer"
                placeholderTextColor={theme.colors.secondaryText}
                value={newRule.name}
                onChangeText={text => setNewRule(prev => ({ ...prev, name: text }))}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Condition</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="When should this rule apply..."
                placeholderTextColor={theme.colors.secondaryText}
                value={newRule.condition}
                onChangeText={text => setNewRule(prev => ({ ...prev, condition: text }))}
                multiline
                numberOfLines={2}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Action</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="What should the AI do..."
                placeholderTextColor={theme.colors.secondaryText}
                value={newRule.action}
                onChangeText={text => setNewRule(prev => ({ ...prev, action: text }))}
                multiline
                numberOfLines={2}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Priority</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="1"
                placeholderTextColor={theme.colors.secondaryText}
                value={newRule.priority}
                onChangeText={text => setNewRule(prev => ({ ...prev, priority: text }))}
                keyboardType="numeric"
              />

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Enable Rule</Text>
                <Switch
                  value={newRule.enabled}
                  onValueChange={value => setNewRule(prev => ({ ...prev, enabled: value }))}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={newRule.enabled ? '#fff' : '#f4f3f4'}
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

      <Modal
        visible={showSlotModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSlotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingItem ? 'Edit Time Slot' : 'Add Time Slot'}
              </Text>
              <TouchableOpacity onPress={() => setShowSlotModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Day of Week</Text>
              <View style={styles.dayButtons}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                  day => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayButton,
                        {
                          backgroundColor:
                            newSlot.dayOfWeek === day ? theme.colors.primary : theme.colors.background,
                        },
                      ]}
                      onPress={() => setNewSlot(prev => ({ ...prev, dayOfWeek: day }))}
                    >
                      <Text
                        style={[
                          styles.dayButtonText,
                          { color: newSlot.dayOfWeek === day ? 'white' : theme.colors.text },
                        ]}
                      >
                        {day.slice(0, 3)}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Start Time</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="09:00"
                placeholderTextColor={theme.colors.secondaryText}
                value={newSlot.startTime}
                onChangeText={text => setNewSlot(prev => ({ ...prev, startTime: text }))}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>End Time</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="17:00"
                placeholderTextColor={theme.colors.secondaryText}
                value={newSlot.endTime}
                onChangeText={text => setNewSlot(prev => ({ ...prev, endTime: text }))}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Max Bookings</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="10"
                placeholderTextColor={theme.colors.secondaryText}
                value={newSlot.maxBookings}
                onChangeText={text => setNewSlot(prev => ({ ...prev, maxBookings: text }))}
                keyboardType="numeric"
              />

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Enable Slot</Text>
                <Switch
                  value={newSlot.enabled}
                  onValueChange={value => setNewSlot(prev => ({ ...prev, enabled: value }))}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={newSlot.enabled ? '#fff' : '#f4f3f4'}
                />
              </View>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSaveSlot}
              >
                <Save size={20} color="white" />
                <Text style={styles.saveButtonText}>Save Slot</Text>
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
  scriptCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scriptName: {
    fontSize: 16,
    fontWeight: '600',
  },
  scriptActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  scriptText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  scriptMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  langBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  langText: {
    fontSize: 11,
    fontWeight: '500',
  },
  ruleCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ruleName: {
    fontSize: 16,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ruleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ruleDetails: {
    marginBottom: 8,
  },
  ruleLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  ruleValue: {
    fontSize: 14,
    lineHeight: 20,
  },
  slotCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  slotDay: {
    fontSize: 16,
    fontWeight: '600',
  },
  slotActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slotDetails: {
    gap: 8,
  },
  slotDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slotDetailText: {
    fontSize: 13,
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
  voiceSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  voiceLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  voiceButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  voiceButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  voiceButtonText: {
    fontSize: 14,
    fontWeight: '500',
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
  timeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  timeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dayButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  dayButtonText: {
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
