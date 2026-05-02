 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Shield,
  FileText,
  CircleCheck,
  TriangleAlert,
  Lock,
  Eye,
  Database,
  Globe,
  Server,
  FileCheck,
  CircleAlert,
  Download,
  Settings,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  score: number;
  lastAudit: string;
  icon: React.ComponentType<any>;
  color: string;
  requirements: number;
  met: number;
}

interface DataProtectionRule {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  category: string;
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'failed';
  details: string;
}

const complianceFrameworks: ComplianceFramework[] = [
  {
    id: '1',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    status: 'compliant',
    score: 98,
    lastAudit: '2 days ago',
    icon: Globe,
    color: '#34C759',
    requirements: 50,
    met: 49,
  },
  {
    id: '2',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    status: 'compliant',
    score: 95,
    lastAudit: '1 week ago',
    icon: Shield,
    color: '#007AFF',
    requirements: 45,
    met: 43,
  },
  {
    id: '3',
    name: 'SOC 2',
    description: 'Service Organization Control 2',
    status: 'partial',
    score: 87,
    lastAudit: '3 days ago',
    icon: Server,
    color: '#FF9500',
    requirements: 60,
    met: 52,
  },
  {
    id: '4',
    name: 'ISO 27001',
    description: 'Information Security Management',
    status: 'compliant',
    score: 92,
    lastAudit: '5 days ago',
    icon: Lock,
    color: '#AF52DE',
    requirements: 114,
    met: 105,
  },
];

const dataProtectionRules: DataProtectionRule[] = [
  {
    id: '1',
    name: 'Data Encryption at Rest',
    enabled: true,
    description: 'All data stored is encrypted using AES-256',
    category: 'Encryption',
  },
  {
    id: '2',
    name: 'Data Encryption in Transit',
    enabled: true,
    description: 'TLS 1.3 enforced for all communications',
    category: 'Encryption',
  },
  {
    id: '3',
    name: 'Access Logging',
    enabled: true,
    description: 'All data access is logged and audited',
    category: 'Monitoring',
  },
  {
    id: '4',
    name: 'Data Retention Policy',
    enabled: true,
    description: 'Automatic data deletion after retention period',
    category: 'Retention',
  },
  {
    id: '5',
    name: 'Right to be Forgotten',
    enabled: true,
    description: 'Users can request complete data deletion',
    category: 'Privacy',
  },
  {
    id: '6',
    name: 'Data Portability',
    enabled: true,
    description: 'Users can export their data in standard formats',
    category: 'Privacy',
  },
];

const auditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'User data exported',
    user: 'admin@company.com',
    timestamp: '10 min ago',
    status: 'success',
    details: 'GDPR data export request completed',
  },
  {
    id: '2',
    action: 'Security policy updated',
    user: 'security@company.com',
    timestamp: '1 hour ago',
    status: 'success',
    details: 'Password policy strengthened',
  },
  {
    id: '3',
    action: 'Failed access attempt',
    user: 'unknown@external.com',
    timestamp: '2 hours ago',
    status: 'warning',
    details: 'Multiple failed login attempts detected',
  },
];

export default function ComplianceScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'frameworks' | 'protection' | 'audit'>('frameworks');
  const [rules, setRules] = useState(dataProtectionRules);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#34C759';
      case 'partial': return '#FF9500';
      case 'non-compliant': return '#FF3B30';
      case 'success': return '#34C759';
      case 'warning': return '#FF9500';
      case 'failed': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CircleCheck;
      case 'partial': return TriangleAlert;
      case 'non-compliant': return CircleAlert;
      case 'success': return CircleCheck;
      case 'warning': return TriangleAlert;
      case 'failed': return CircleAlert;
      default: return FileCheck;
    }
  };

  const renderFramework = ({ item }: { item: ComplianceFramework }) => {
    const IconComponent = item.icon;
    const StatusIcon = getStatusIcon(item.status);
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity 
        style={[styles.frameworkCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
      >
        <View style={styles.frameworkHeader}>
          <View style={[styles.frameworkIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={28} color={item.color} />
          </View>
          <View style={styles.frameworkInfo}>
            <Text style={[styles.frameworkName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.frameworkDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
          </View>
        </View>

        <View style={styles.frameworkDetails}>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text style={[styles.scoreText, { color: statusColor }]}>{item.score}%</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <StatusIcon size={14} color={statusColor} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
              </Text>
            </View>
          </View>

          <View style={styles.requirementsContainer}>
            <View style={styles.requirementRow}>
              <Text style={[styles.requirementLabel, { color: theme.colors.secondaryText }]}>
                Requirements Met
              </Text>
              <Text style={[styles.requirementValue, { color: theme.colors.text }]}>
                {item.met} / {item.requirements}
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { backgroundColor: statusColor, width: `${(item.met / item.requirements) * 100}%` }
                ]} 
              />
            </View>
          </View>

          <View style={styles.frameworkFooter}>
            <Text style={[styles.lastAudit, { color: theme.colors.secondaryText }]}>
              Last audit: {item.lastAudit}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewDetails, { color: theme.colors.primary }]}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderProtectionRule = ({ item }: { item: DataProtectionRule }) => (
    <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.ruleHeader}>
        <View style={styles.ruleInfo}>
          <Text style={[styles.ruleName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.ruleDescription, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
          <View style={[styles.categoryBadge, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.categoryText, { color: theme.colors.primary }]}>{item.category}</Text>
          </View>
        </View>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleRule(item.id)}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={item.enabled ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderAuditLog = ({ item }: { item: AuditLog }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);

    return (
      <View style={[styles.auditCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.auditHeader}>
          <View style={[styles.auditIcon, { backgroundColor: `${statusColor}20` }]}>
            <StatusIcon size={20} color={statusColor} />
          </View>
          <View style={styles.auditInfo}>
            <Text style={[styles.auditAction, { color: theme.colors.text }]}>{item.action}</Text>
            <Text style={[styles.auditUser, { color: theme.colors.secondaryText }]}>{item.user}</Text>
            <Text style={[styles.auditDetails, { color: theme.colors.secondaryText }]}>{item.details}</Text>
          </View>
          <Text style={[styles.auditTimestamp, { color: theme.colors.secondaryText }]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Compliance & Audit</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Settings size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {(['frameworks', 'protection', 'audit'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? 'white' : theme.colors.secondaryText },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'frameworks' && (
          <View style={styles.section}>
            <View style={styles.overviewCard}>
              <Shield size={32} color={theme.colors.primary} />
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>
                Compliance Overview
              </Text>
              <Text style={[styles.overviewDescription, { color: theme.colors.secondaryText }]}>
                4 active compliance frameworks with 269 total requirements
              </Text>
            </View>

            <FlatList
              data={complianceFrameworks}
              renderItem={renderFramework}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.frameworksList}
            />
          </View>
        )}

        {selectedTab === 'protection' && (
          <View style={styles.section}>
            <View style={styles.overviewCard}>
              <Lock size={32} color={theme.colors.primary} />
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>
                Data Protection Rules
              </Text>
              <Text style={[styles.overviewDescription, { color: theme.colors.secondaryText }]}>
                Configure and manage data protection policies
              </Text>
            </View>

            <FlatList
              data={rules}
              renderItem={renderProtectionRule}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.rulesList}
            />
          </View>
        )}

        {selectedTab === 'audit' && (
          <View style={styles.section}>
            <View style={styles.overviewCard}>
              <Eye size={32} color={theme.colors.primary} />
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>
                Audit Trail
              </Text>
              <Text style={[styles.overviewDescription, { color: theme.colors.secondaryText }]}>
                Complete audit log of all system activities
              </Text>
              <TouchableOpacity style={[styles.exportButton, { backgroundColor: theme.colors.primary }]}>
                <Download size={16} color="#FFFFFF" />
                <Text style={styles.exportButtonText}>Export Logs</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={auditLogs}
              renderItem={renderAuditLog}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.auditList}
            />
          </View>
        )}
      </ScrollView>
    </View>
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
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingBottom: 20,
  },
  overviewCard: {
    backgroundColor: 'rgba(0,122,255,0.1)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  overviewDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  frameworksList: {
    gap: 16,
  },
  frameworkCard: {
    padding: 20,
    borderRadius: 16,
  },
  frameworkHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  frameworkIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  frameworkInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  frameworkName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  frameworkDescription: {
    fontSize: 14,
  },
  frameworkDetails: {
    gap: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  requirementsContainer: {
    gap: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requirementLabel: {
    fontSize: 14,
  },
  requirementValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  frameworkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastAudit: {
    fontSize: 13,
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '600',
  },
  rulesList: {
    gap: 12,
  },
  ruleCard: {
    padding: 16,
    borderRadius: 12,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleInfo: {
    flex: 1,
    marginRight: 16,
  },
  ruleName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  ruleDescription: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  auditList: {
    gap: 12,
  },
  auditCard: {
    padding: 16,
    borderRadius: 12,
  },
  auditHeader: {
    flexDirection: 'row',
  },
  auditIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  auditInfo: {
    flex: 1,
  },
  auditAction: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  auditUser: {
    fontSize: 13,
    marginBottom: 4,
  },
  auditDetails: {
    fontSize: 13,
    lineHeight: 18,
  },
  auditTimestamp: {
    fontSize: 12,
  },
});
