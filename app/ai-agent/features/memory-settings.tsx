import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Brain,
  Database,
  HardDrive,
  RefreshCw,
  Trash2,
  Save,
  Download,
  Upload,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Cpu,
  MemoryStick
} from 'lucide-react-native';

interface MemoryStats {
  totalMemories: number;
  shortTerm: number;
  longTerm: number;
  archived: number;
  memorySize: string;
  lastBackup: string;
}

interface SettingSection {
  title: string;
  icon: any;
  items: {
    label: string;
    value?: string;
    type: 'toggle' | 'navigate' | 'action';
    enabled?: boolean;
  }[];
}

export default function MemorySettingsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { agentId, agentName } = useLocalSearchParams<{ agentId: string; agentName: string }>();

  const [memoryStats, setMemoryStats] = useState<MemoryStats>({
    totalMemories: 15423,
    shortTerm: 2847,
    longTerm: 12531,
    archived: 45,
    memorySize: '2.4 GB',
    lastBackup: '2 hours ago',
  });

  const [settings, setSettings] = useState({
    autoSave: true,
    continuousLearning: true,
    memoryCompression: true,
    backupEnabled: true,
    dataEncryption: true,
    showArchived: false,
    debugMode: false,
  });

  const memoryCategories = [
    { name: 'Conversations', count: 8947, size: '1.2 GB', icon: Brain },
    { name: 'Knowledge Base', count: 4123, size: '856 MB', icon: Database },
    { name: 'User Preferences', count: 1856, size: '234 MB', icon: Save },
    { name: 'System Logs', count: 497, size: '145 MB', icon: Cpu },
  ];

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Memory & Settings</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            {agentName || 'AI Agent'} Configuration
          </Text>
        </View>
      </View>

      {/* Memory Overview */}
      <View style={[styles.memoryBanner, { backgroundColor: theme.colors.primary + '12' }]}>
        <View style={[styles.memoryIcon, { backgroundColor: theme.colors.primary }]}>
          <Brain size={32} color="#fff" />
        </View>
        <View style={styles.memoryInfo}>
          <Text style={[styles.memoryTitle, { color: theme.colors.text }]}>Memory Status</Text>
          <Text style={[styles.memorySubtitle, { color: theme.colors.textSecondary }]}>
            {memoryStats.memorySize} used • {memoryStats.totalMemories.toLocaleString()} memories
          </Text>
        </View>
        <View style={styles.memoryHealth}>
          <CheckCircle2 size={20} color="#34C759" />
          <Text style={[styles.healthText, { color: '#34C759' }]}>Healthy</Text>
        </View>
      </View>

      {/* Memory Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <MemoryStick size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{memoryStats.shortTerm.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Short-term</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Database size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{memoryStats.longTerm.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Long-term</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <HardDrive size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{memoryStats.archived}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Archived</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <RefreshCw size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{memoryStats.lastBackup}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Last Backup</Text>
        </View>
      </View>

      {/* Memory Categories */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Memory Categories</Text>
        {memoryCategories.map((cat, index) => (
          <View key={index} style={styles.categoryRow}>
            <View style={styles.categoryLeft}>
              <View style={[styles.categoryIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                <cat.icon size={18} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={[styles.categoryName, { color: theme.colors.text }]}>{cat.name}</Text>
                <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
                  {cat.count.toLocaleString()} entries
                </Text>
              </View>
            </View>
            <Text style={[styles.categorySize, { color: theme.colors.primary }]}>{cat.size}</Text>
          </View>
        ))}
      </View>

      {/* Core Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#34C75915' }]}>
              <Save size={18} color="#34C759" />
            </View>
            <View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Save Memory</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>
                Automatically save interactions
              </Text>
            </View>
          </View>
          <Switch
            value={settings.autoSave}
            onValueChange={() => toggleSetting('autoSave')}
            trackColor={{ false: '#E5E5EA', true: theme.colors.primary + '80' }}
            thumbColor={settings.autoSave ? theme.colors.primary : '#fff'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#007AFF15' }]}>
              <Brain size={18} color="#007AFF" />
            </View>
            <View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Continuous Learning</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>
                Learn from each interaction
              </Text>
            </View>
          </View>
          <Switch
            value={settings.continuousLearning}
            onValueChange={() => toggleSetting('continuousLearning')}
            trackColor={{ false: '#E5E5EA', true: theme.colors.primary + '80' }}
            thumbColor={settings.continuousLearning ? theme.colors.primary : '#fff'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#FF950015' }]}>
              <Database size={18} color="#FF9500" />
            </View>
            <View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Memory Compression</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>
                Compress old memories
              </Text>
            </View>
          </View>
          <Switch
            value={settings.memoryCompression}
            onValueChange={() => toggleSetting('memoryCompression')}
            trackColor={{ false: '#E5E5EA', true: theme.colors.primary + '80' }}
            thumbColor={settings.memoryCompression ? theme.colors.primary : '#fff'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#AF52DE15' }]}>
              <Shield size={18} color="#AF52DE" />
            </View>
            <View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Data Encryption</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>
                Encrypt stored memories
              </Text>
            </View>
          </View>
          <Switch
            value={settings.dataEncryption}
            onValueChange={() => toggleSetting('dataEncryption')}
            trackColor={{ false: '#E5E5EA', true: theme.colors.primary + '80' }}
            thumbColor={settings.dataEncryption ? theme.colors.primary : '#fff'}
          />
        </View>
      </View>

      {/* Data Management */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data Management</Text>
        
        <TouchableOpacity style={styles.actionRow}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#34C75915' }]}>
              <Download size={18} color="#34C759" />
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.text }]}>Export Memory</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionRow}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#007AFF15' }]}>
              <Upload size={18} color="#007AFF" />
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.text }]}>Import Memory</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionRow}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#FF950015' }]}>
              <RefreshCw size={18} color="#FF9500" />
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.text }]}>Backup Now</Text>
          </View>
          <Text style={[styles.actionValue, { color: theme.colors.textSecondary }]}>Last: {memoryStats.lastBackup}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionRow, styles.dangerRow]}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#FF3B3015' }]}>
              <Trash2 size={18} color="#FF3B30" />
            </View>
            <Text style={[styles.actionLabel, { color: '#FF3B30' }]}>Clear All Memory</Text>
          </View>
          <AlertCircle size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* Version Info */}
      <View style={styles.versionBox}>
        <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
          Memory System v2.4.1 • AI Core v7.2
        </Text>
      </View>
    
      <AgentFeatures agentId="memory-settings" agentName="Memory Settings" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E5EA' 
  },
  backButton: { padding: 4 },
  headerContent: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  memoryBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 16, 
    padding: 16, 
    borderRadius: 16 
  },
  memoryIcon: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  memoryInfo: { flex: 1, marginLeft: 12 },
  memoryTitle: { fontSize: 17, fontWeight: '600' },
  memorySubtitle: { fontSize: 13, marginTop: 2 },
  memoryHealth: { alignItems: 'center' },
  healthText: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  statsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 16, 
    gap: 12, 
    marginBottom: 16 
  },
  statCard: { 
    flex: 1, 
    minWidth: '22%', 
    alignItems: 'center', 
    padding: 14, 
    borderRadius: 12 
  },
  statValue: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { margin: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  categoryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 14 
  },
  categoryLeft: { flexDirection: 'row', alignItems: 'center' },
  categoryIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  categoryName: { fontSize: 15, fontWeight: '500' },
  categoryCount: { fontSize: 12, marginTop: 2 },
  categorySize: { fontSize: 14, fontWeight: '600' },
  settingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 16 
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  settingDesc: { fontSize: 12, marginTop: 2 },
  actionRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 14 
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center' },
  actionIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  actionLabel: { fontSize: 15, fontWeight: '500' },
  actionValue: { fontSize: 13 },
  dangerRow: { marginBottom: 0 },
  versionBox: { alignItems: 'center', padding: 16, marginBottom: 24 },
  versionText: { fontSize: 12 },
});