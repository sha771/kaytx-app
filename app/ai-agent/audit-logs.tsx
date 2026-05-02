import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Shield,
  Eye,
  EyeOff,
  TriangleAlert,
  CircleCheck,
  Clock,
  User,
  MessageSquare,
  FileText,
  Settings,
  LogIn,
  LogOut,
  Pencil,
  Trash2,
  Download,
  ListFilter,
  Search,
  Calendar,
  ChevronDown,
  Lock,
  LockOpen,
  EllipsisVertical,
  RefreshCw,
  Zap,
  Globe,
  Database,
  Key,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'user' | 'agent' | 'system';
  action: string;
  resource: string;
  resourceType: string;
  status: 'success' | 'failure' | 'warning';
  ip?: string;
  details?: string;
}

interface SecurityEvent {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  description: string;
  source: string;
  resolved: boolean;
}

// Mock Data
const AUDIT_LOGS: AuditLog[] = [
  {
    id: '1',
    timestamp: '2026-03-01 09:23:15',
    actor: 'john.smith@kaytx.com',
    actorType: 'user',
    action: 'AGENT_CREATED',
    resource: 'Support AI Pro',
    resourceType: 'agent',
    status: 'success',
    ip: '192.168.1.105',
    details: 'Created new agent with GPT-4 model',
  },
  {
    id: '2',
    timestamp: '2026-03-01 09:20:00',
    actor: 'Sales & Revenue AI',
    actorType: 'agent',
    action: 'DATA_EXPORTED',
    resource: 'Q1 Sales Report',
    resourceType: 'document',
    status: 'success',
    details: 'Exported 1,245 records to CSV',
  },
  {
    id: '3',
    timestamp: '2026-03-01 09:15:30',
    actor: 'sarah.jones@kaytx.com',
    actorType: 'user',
    action: 'API_KEY_REVOKED',
    resource: 'Production Key #342',
    resourceType: 'api_key',
    status: 'success',
    ip: '192.168.1.108',
    details: 'Key revoked due to security policy update',
  },
  {
    id: '4',
    timestamp: '2026-03-01 09:10:00',
    actor: 'system',
    actorType: 'system',
    action: 'AUTOMATED_BACKUP',
    resource: 'Agent Configurations',
    resourceType: 'backup',
    status: 'success',
    details: 'Daily backup completed successfully',
  },
  {
    id: '5',
    timestamp: '2026-03-01 08:55:22',
    actor: 'mike.wong@kaytx.com',
    actorType: 'user',
    action: 'INTEGRATION_CONNECTED',
    resource: 'Slack',
    resourceType: 'integration',
    status: 'failure',
    ip: '192.168.1.112',
    details: 'Connection failed: Invalid OAuth token',
  },
  {
    id: '6',
    timestamp: '2026-03-01 08:45:00',
    actor: 'Customer Experience AI',
    actorType: 'agent',
    action: 'CONVERSATION_ESCALATED',
    resource: 'Ticket #4521',
    resourceType: 'conversation',
    status: 'success',
    details: 'Escalated to human support agent',
  },
  {
    id: '7',
    timestamp: '2026-03-01 08:30:15',
    actor: 'admin@kaytx.com',
    actorType: 'user',
    action: 'PERMISSION_CHANGED',
    resource: 'HR Team',
    resourceType: 'team',
    status: 'success',
    ip: '192.168.1.100',
    details: 'Added agent creation permission',
  },
];

const SECURITY_EVENTS: SecurityEvent[] = [
  {
    id: '1',
    timestamp: '2026-03-01 09:00:00',
    severity: 'high',
    type: 'Failed Login',
    description: 'Multiple failed login attempts detected',
    source: '192.168.1.250',
    resolved: true,
  },
  {
    id: '2',
    timestamp: '2026-03-01 08:30:00',
    severity: 'medium',
    type: 'API Rate Limit',
    description: 'API rate limit approaching threshold',
    source: 'Sales & Revenue AI',
    resolved: false,
  },
  {
    id: '3',
    timestamp: '2026-03-01 07:15:00',
    severity: 'critical',
    type: 'Data Access Anomaly',
    description: 'Unusual bulk data access pattern detected',
    source: 'Marketing & Growth AI',
    resolved: true,
  },
  {
    id: '4',
    timestamp: '2026-03-01 06:00:00',
    severity: 'low',
    type: 'Config Change',
    description: 'Agent configuration modified',
    source: 'john.smith@kaytx.com',
    resolved: true,
  },
];

const SEVERITY_COLORS = {
  critical: '#EF4444',
  high: '#F97316',
  medium: '#F59E0B',
  low: '#3B82F6',
};

const STATUS_COLORS = {
  success: '#10B981',
  failure: '#EF4444',
  warning: '#F59E0B',
};

const ACTOR_TYPE_ICONS = {
  user: User,
  agent: Settings,
};

export default function AuditLogsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'logs' | 'security' | 'compliance'>('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredLogs = AUDIT_LOGS.filter(log =>
    log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActionIcon = (action: string) => {
    if (action.includes('LOGIN')) return LogIn;
    if (action.includes('LOGOUT')) return LogOut;
    if (action.includes('CREATE')) return Pencil;
    if (action.includes('DELETE')) return Trash2;
    if (action.includes('EXPORT')) return Download;
    if (action.includes('CONVERSATION')) return MessageSquare;
    if (action.includes('INTEGRATION')) return Globe;
    if (action.includes('API')) return Key;
    return FileText;
  };

  const renderLogRow = (log: AuditLog, index: number) => {
    const ActorIcon = ACTOR_TYPE_ICONS[log.actorType];
    const ActionIcon = getActionIcon(log.action);

    return (
      <Animated.View
        key={log.id}
        entering={FadeInUp.delay(index * 30)}
        style={[styles.logRow, { backgroundColor: colors.card }]}
      >
        <View style={styles.logHeader}>
          <View style={styles.actorInfo}>
            <View style={[styles.actorIcon, { backgroundColor: colors.tint + '15' }]}>
              <ActorIcon size={16} color={colors.tint} />
            </View>
            <View>
              <Text style={[styles.actorName, { color: colors.text }]}>
                {log.actor}
              </Text>
              <Text style={[styles.timestamp, { color: colors.icon }]}>
                {log.timestamp}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: STATUS_COLORS[log.status] + '15' },
            ]}
          >
            {log.status === 'success' ? (
              <CircleCheck size={12} color={STATUS_COLORS[log.status]} />
            ) : log.status === 'failure' ? (
              <TriangleAlert size={12} color={STATUS_COLORS[log.status]} />
            ) : (
              <Clock size={12} color={STATUS_COLORS[log.status]} />
            )}
            <Text
              style={[
                styles.statusText,
                { color: STATUS_COLORS[log.status] },
              ]}
            >
              {log.status}
            </Text>
          </View>
        </View>

        <View style={styles.logBody}>
          <View style={[styles.actionIcon, { backgroundColor: colors.tint + '10' }]}>
            <ActionIcon size={18} color={colors.tint} />
          </View>
          <View style={styles.logDetails}>
            <Text style={[styles.actionText, { color: colors.text }]}>
              {log.action.replace(/_/g, ' ')}
            </Text>
            <Text style={[styles.resourceText, { color: colors.icon }]}>
              {log.resource} ({log.resourceType})
            </Text>
            {log.details && (
              <Text style={[styles.detailText, { color: colors.icon }]}>
                {log.details}
              </Text>
            )}
          </View>
        </View>

        {log.ip && (
          <View style={styles.logFooter}>
            <Globe size={12} color={colors.icon} />
            <Text style={[styles.ipText, { color: colors.icon }]}>
              IP: {log.ip}
            </Text>
          </View>
        )}
      </Animated.View>
    );
  };

  const renderSecurityEvent = (event: SecurityEvent, index: number) => (
    <Animated.View
      key={event.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.eventCard, { backgroundColor: colors.card }]}
    >
      <View style={styles.eventHeader}>
        <View style={[styles.severityBadge, { backgroundColor: SEVERITY_COLORS[event.severity] + '15' }]}>
          <TriangleAlert size={14} color={SEVERITY_COLORS[event.severity]} />
          <Text style={[styles.severityText, { color: SEVERITY_COLORS[event.severity] }]}>
            {event.severity.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.eventTime, { color: colors.icon }]}>
          {event.timestamp}
        </Text>
      </View>

      <Text style={[styles.eventType, { color: colors.text }]}>
        {event.type}
      </Text>
      <Text style={[styles.eventDescription, { color: colors.icon }]}>
        {event.description}
      </Text>

      <View style={styles.eventFooter}>
        <View style={styles.eventSource}>
          <Zap size={12} color={colors.icon} />
          <Text style={[styles.sourceText, { color: colors.icon }]}>
            {event.source}
          </Text>
        </View>
        <View
          style={[
            styles.resolvedBadge,
            { backgroundColor: event.resolved ? '#10B981' + '15' : '#F59E0B' + '15' },
          ]}
        >
          {event.resolved ? (
            <CircleCheck size={12} color="#10B981" />
          ) : (
            <Clock size={12} color="#F59E0B" />
          )}
          <Text
            style={[
              styles.resolvedText,
              { color: event.resolved ? '#10B981' : '#F59E0B' },
            ]}
          >
            {event.resolved ? 'Resolved' : 'Active'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Audit & Security
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Monitor activity and security events
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.exportButton, { backgroundColor: colors.tint + '15' }]}>
          <Download size={20} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>1,247</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Total Logs</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#EF4444' + '10' }]}>
          <Text style={[styles.statValue, { color: '#EF4444' }]}>2</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Active Alerts</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#10B981' + '10' }]}>
          <Text style={[styles.statValue, { color: '#10B981' }]}>99.8%</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Success Rate</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'logs' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('logs')}
        >
          <FileText size={16} color={activeTab === 'logs' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'logs' ? 'white' : colors.text }]}>
            Audit Logs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'security' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('security')}
        >
          <Shield size={16} color={activeTab === 'security' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'security' ? 'white' : colors.text }]}>
            Security
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'compliance' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('compliance')}
        >
          <Lock size={16} color={activeTab === 'compliance' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'compliance' ? 'white' : colors.text }]}>
            Compliance
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search & Filter */}
      {activeTab === 'logs' && (
        <View style={styles.searchContainer}>
          <View style={[styles.searchInput, { backgroundColor: colors.card }]}>
            <Search size={18} color={colors.icon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Search logs..."
              placeholderTextColor={colors.icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.card }]}>
            <ListFilter size={18} color={colors.icon} />
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'logs' && (
          <>
            {filteredLogs.map((log, index) => renderLogRow(log, index))}
            {filteredLogs.length === 0 && (
              <View style={styles.emptyState}>
                <FileText size={48} color={colors.icon} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No logs found
                </Text>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  Try adjusting your search or filters
                </Text>
              </View>
            )}
          </>
        )}

        {activeTab === 'security' && (
          <>
            <View style={[styles.securitySummary, { backgroundColor: colors.card }]}>
              <View style={styles.summaryHeader}>
                <Shield size={24} color={colors.tint} />
                <Text style={[styles.summaryTitle, { color: colors.text }]}>
                  Security Status
                </Text>
              </View>
              <View style={styles.securityStats}>
                <View style={styles.securityStat}>
                  <Text style={[styles.securityStatValue, { color: '#EF4444' }]}>0</Text>
                  <Text style={[styles.securityStatLabel, { color: colors.icon }]}>
                    Critical
                  </Text>
                </View>
                <View style={styles.securityStat}>
                  <Text style={[styles.securityStatValue, { color: '#F59E0B' }]}>1</Text>
                  <Text style={[styles.securityStatLabel, { color: colors.icon }]}>
                    High
                  </Text>
                </View>
                <View style={styles.securityStat}>
                  <Text style={[styles.securityStatValue, { color: colors.text }]}>3</Text>
                  <Text style={[styles.securityStatLabel, { color: colors.icon }]}>
                    Resolved
                  </Text>
                </View>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Security Events
            </Text>
            {SECURITY_EVENTS.map((event, index) => renderSecurityEvent(event, index))}
          </>
        )}

        {activeTab === 'compliance' && (
          <Animated.View entering={FadeInUp} style={styles.complianceContent}>
            <View style={[styles.complianceCard, { backgroundColor: colors.card }]}>
              <View style={styles.complianceHeader}>
                <Lock size={24} color="#10B981" />
                <Text style={[styles.complianceTitle, { color: colors.text }]}>
                  Compliance Overview
                </Text>
              </View>

              <View style={styles.complianceItems}>
                <View style={styles.complianceItem}>
                  <View style={[styles.checkIcon, { backgroundColor: '#10B981' + '15' }]}>
                    <CircleCheck size={16} color="#10B981" />
                  </View>
                  <View style={styles.complianceInfo}>
                    <Text style={[styles.complianceName, { color: colors.text }]}>
                      GDPR Compliant
                    </Text>
                    <Text style={[styles.complianceDesc, { color: colors.icon }]}>
                      Data protection measures in place
                    </Text>
                  </View>
                </View>

                <View style={styles.complianceItem}>
                  <View style={[styles.checkIcon, { backgroundColor: '#10B981' + '15' }]}>
                    <CircleCheck size={16} color="#10B981" />
                  </View>
                  <View style={styles.complianceInfo}>
                    <Text style={[styles.complianceName, { color: colors.text }]}>
                      SOC 2 Type II
                    </Text>
                    <Text style={[styles.complianceDesc, { color: colors.icon }]}>
                      Security controls validated
                    </Text>
                  </View>
                </View>

                <View style={styles.complianceItem}>
                  <View style={[styles.checkIcon, { backgroundColor: '#10B981' + '15' }]}>
                    <CircleCheck size={16} color="#10B981" />
                  </View>
                  <View style={styles.complianceInfo}>
                    <Text style={[styles.complianceName, { color: colors.text }]}>
                      Data Encryption
                    </Text>
                    <Text style={[styles.complianceDesc, { color: colors.icon }]}>
                      AES-256 encryption at rest
                    </Text>
                  </View>
                </View>

                <View style={styles.complianceItem}>
                  <View style={[styles.checkIcon, { backgroundColor: '#F59E0B' + '15' }]}>
                    <Clock size={16} color="#F59E0B" />
                  </View>
                  <View style={styles.complianceInfo}>
                    <Text style={[styles.complianceName, { color: colors.text }]}>
                      Data Retention
                    </Text>
                    <Text style={[styles.complianceDesc, { color: colors.icon }]}>
                      Retention policy review pending
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.retentionCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.retentionTitle, { color: colors.text }]}>
                Data Retention Settings
              </Text>
              <View style={styles.retentionRow}>
                <Text style={[styles.retentionLabel, { color: colors.icon }]}>
                  Audit Logs
                </Text>
                <Text style={[styles.retentionValue, { color: colors.text }]}>
                  90 days
                </Text>
              </View>
              <View style={styles.retentionRow}>
                <Text style={[styles.retentionLabel, { color: colors.icon }]}>
                  Conversation History
                </Text>
                <Text style={[styles.retentionValue, { color: colors.text }]}>
                  1 year
                </Text>
              </View>
              <View style={styles.retentionRow}>
                <Text style={[styles.retentionLabel, { color: colors.icon }]}>
                  Training Data
                </Text>
                <Text style={[styles.retentionValue, { color: colors.text }]}>
                  Indefinite
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  logRow: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actorIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actorName: {
    fontSize: 14,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  logBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logDetails: {
    flex: 1,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  resourceText: {
    fontSize: 13,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    lineHeight: 16,
  },
  logFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  ipText: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
  securitySummary: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  securityStats: {
    flexDirection: 'row',
    gap: 24,
  },
  securityStat: {
    alignItems: 'center',
  },
  securityStatValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  securityStatLabel: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  eventCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  eventTime: {
    fontSize: 12,
  },
  eventType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sourceText: {
    fontSize: 12,
  },
  resolvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  resolvedText: {
    fontSize: 11,
    fontWeight: '600',
  },
  complianceContent: {
    gap: 16,
  },
  complianceCard: {
    padding: 20,
    borderRadius: 16,
  },
  complianceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  complianceTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  complianceItems: {
    gap: 16,
  },
  complianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  complianceInfo: {
    flex: 1,
  },
  complianceName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  complianceDesc: {
    fontSize: 13,
  },
  retentionCard: {
    padding: 20,
    borderRadius: 16,
  },
  retentionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  retentionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  retentionLabel: {
    fontSize: 14,
  },
  retentionValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
