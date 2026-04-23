 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Plus,
  Users,
  Phone,
  Mail,
  Building,
  Tag,
  Calendar,
  TrendingUp,
  Filter,
  X,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  Clock,
  DollarSign,
  AlertCircle,
  Link2,
} from 'lucide-react-native';
import { mockNegotiationContacts, mockDeals, mockIntegrations } from '@/utils/mockNegotiationData';
import type { NegotiationContact } from '@/types/negotiation';

export default function CRMScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<NegotiationContact | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'lead' | 'prospect' | 'customer' | 'lost'>('all');
  const [filterStage, setFilterStage] = useState<'all' | 'discovery' | 'negotiation' | 'proposal' | 'closing' | 'won' | 'lost'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredContacts = useMemo(
    () =>
      mockNegotiationContacts.filter(contact => {
        const matchesSearch =
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
        const matchesStage = filterStage === 'all' || contact.dealStage === filterStage;
        return matchesSearch && matchesStatus && matchesStage;
      }),
    [searchQuery, filterStatus, filterStage],
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer':
        return '#34C759';
      case 'prospect':
        return '#007AFF';
      case 'lead':
        return '#FF9500';
      case 'lost':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'won':
        return '#34C759';
      case 'closing':
        return '#5AC8FA';
      case 'proposal':
        return '#007AFF';
      case 'negotiation':
        return '#FF9500';
      case 'discovery':
        return '#AF52DE';
      case 'lost':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const totalContacts = mockNegotiationContacts.length;
  const totalValue = mockNegotiationContacts.reduce((sum, c) => sum + c.dealValue, 0);
  const customersCount = mockNegotiationContacts.filter(c => c.status === 'customer').length;
  const prospectsCount = mockNegotiationContacts.filter(c => c.status === 'prospect').length;

  const pipelineByStage = useMemo(
    () => {
      const stageMap: Record<string, number> = {};
      mockDeals.forEach(deal => {
        stageMap[deal.stage] = (stageMap[deal.stage] ?? 0) + deal.value;
      });
      return Object.entries(stageMap)
        .map(([stage, value]) => ({ stage, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 4);
    },
    [],
  );

  const integrationStatuses = useMemo(
    () =>
      mockIntegrations.slice(0, 4).map(integration => ({
        id: integration.id,
        name: integration.name,
        category: integration.category,
        status: integration.isConnected ? 'Connected' : 'Pending',
        color: integration.isConnected ? '#34C759' : '#FF9500',
        lastSync: integration.lastSync ?? '—',
      })),
    [],
  );

  const riskAlerts = useMemo(
    () =>
      mockDeals
        .filter(deal => deal.stage === 'negotiation' && deal.probability < 80)
        .map(deal => ({
          id: deal.id,
          title: deal.title,
          detail: `${deal.customerCompany} • ${deal.probability}% probability`,
          value: `$${(deal.value / 1000).toFixed(0)}K`,
        })),
    [],
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'CRM Contacts',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.headerButton}>
                <Filter size={22} color="#FF2D92" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.headerButton}>
                <Plus size={24} color="#FF2D92" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.topSection}>
          <View style={styles.searchBar}>
            <Search size={18} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>

          {showFilters && (
            <View style={styles.filtersSection}>
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Status:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
                  {['all', 'lead', 'prospect', 'customer', 'lost'].map(status => (
                    <TouchableOpacity
                      key={status}
                      style={[styles.filterChip, filterStatus === status && styles.filterChipActive]}
                      onPress={() => setFilterStatus(status as typeof filterStatus)}
                    >
                      <Text style={[styles.filterChipText, filterStatus === status && styles.filterChipTextActive]}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Stage:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
                  {['all', 'discovery', 'negotiation', 'proposal', 'closing', 'won', 'lost'].map(stage => (
                    <TouchableOpacity
                      key={stage}
                      style={[styles.filterChip, filterStage === stage && styles.filterChipActive]}
                      onPress={() => setFilterStage(stage as typeof filterStage)}
                    >
                      <Text style={[styles.filterChipText, filterStage === stage && styles.filterChipTextActive]}>
                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#E8F5FF' }]}
              testID="crm-stat-contacts"
            >
              <Users size={20} color="#007AFF" />
              <Text style={[styles.statValue, { color: '#007AFF' }]}>{totalContacts}</Text>
              <Text style={styles.statLabel}>Total Contacts</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#F0FFF0' }]}
              testID="crm-stat-pipeline"
            >
              <DollarSign size={20} color="#34C759" />
              <Text style={[styles.statValue, { color: '#34C759' }]}>{`$${(totalValue / 1000).toFixed(0)}K`}</Text>
              <Text style={styles.statLabel}>Pipeline Value</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFF5F0' }]}
              testID="crm-stat-customers"
            >
              <Star size={20} color="#FF9500" />
              <Text style={[styles.statValue, { color: '#FF9500' }]}>{customersCount}</Text>
              <Text style={styles.statLabel}>Customers</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#F5F0FF' }]}
              testID="crm-stat-prospects"
            >
              <TrendingUp size={20} color="#AF52DE" />
              <Text style={[styles.statValue, { color: '#AF52DE' }]}>{prospectsCount}</Text>
              <Text style={styles.statLabel}>Prospects</Text>
            </View>
          </View>
        </View>

        <View style={styles.pipelineSection}
          testID="pipeline-overview"
        >
          <Text style={styles.pipelineTitle}>Pipeline Momentum</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pipelineByStage.map(stage => (
              <View key={stage.stage} style={styles.pipelineCard}>
                <Text style={styles.pipelineStage}>{stage.stage.toUpperCase()}</Text>
                <Text style={styles.pipelineValue}>{`$${(stage.value / 1000).toFixed(0)}K`}</Text>
                <View style={styles.pipelineBarBackground}>
                  <View style={[styles.pipelineBarFill, { width: `${Math.min(stage.value / 2000, 1) * 100}%` }]} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.integrationsSection}
          testID="integration-health"
        >
          <Text style={styles.pipelineTitle}>Connected Systems</Text>
          {integrationStatuses.map(integration => (
            <View key={integration.id} style={styles.integrationRow}>
              <View style={[styles.integrationBadge, { backgroundColor: `${integration.color}15` }]}> 
                <Link2 size={16} color={integration.color} />
              </View>
              <View style={styles.integrationInfo}>
                <Text style={styles.integrationName}>{integration.name}</Text>
                <Text style={styles.integrationMeta}>{integration.category.toUpperCase()} • Sync {integration.lastSync}</Text>
              </View>
              <Text style={[styles.integrationStatus, { color: integration.color }]}>{integration.status}</Text>
            </View>
          ))}
        </View>

        {riskAlerts.length > 0 && (
          <View style={styles.alertSection}
            testID="crm-risk-alerts"
          >
            <Text style={styles.pipelineTitle}>Risk Alerts</Text>
            {riskAlerts.map(alert => (
              <View key={alert.id} style={styles.alertCard}>
                <AlertCircle size={18} color="#FF3B30" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertMeta}>{alert.detail}</Text>
                </View>
                <Text style={styles.alertValue}>{alert.value}</Text>
              </View>
            ))}
          </View>
        )}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.contactsList}>
            {filteredContacts.map(contact => (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactCard}
                onPress={() => setSelectedContact(contact)}
              >
                <View style={styles.contactHeader}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{contact.name.split(' ').map(n => n[0]).join('')}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <View style={styles.companyRow}>
                      <Building size={14} color="#8E8E93" />
                      <Text style={styles.companyText}>{contact.company}</Text>
                    </View>
                    <Text style={styles.roleText}>{contact.role}</Text>
                  </View>
                </View>

                <View style={styles.badgesRow}>
                  <View style={[styles.badge, { backgroundColor: getStatusColor(contact.status) + '20' }]}> 
                    <Text style={[styles.badgeText, { color: getStatusColor(contact.status) }]}>{contact.status}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: getStageColor(contact.dealStage) + '20' }]}> 
                    <Text style={[styles.badgeText, { color: getStageColor(contact.dealStage) }]}>{contact.dealStage}</Text>
                  </View>
                </View>

                <View style={styles.contactMeta}>
                  <View style={styles.metaItem}>
                    <DollarSign size={14} color="#34C759" />
                    <Text style={styles.metaText}>{`$${(contact.dealValue / 1000).toFixed(0)}K`}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={14} color="#8E8E93" />
                    <Text style={styles.metaText}>Last: {new Date(contact.lastContact).toLocaleDateString()}</Text>
                  </View>
                </View>

                <View style={styles.tagsRow}>
                  {contact.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                      <Tag size={10} color="#8E8E93" />
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.contactActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Phone size={16} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Mail size={16} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Calendar size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal visible={selectedContact !== null} animationType="slide" transparent={false} onRequestClose={() => setSelectedContact(null)}>
          {selectedContact && (
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeaderBar}>
                <Text style={styles.modalTitleBar}>Contact Details</Text>
                <View style={styles.modalHeaderActions}>
                  <TouchableOpacity style={styles.modalHeaderButton}>
                    <Edit size={20} color="#FF2D92" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalHeaderButton}>
                    <Trash2 size={20} color="#FF3B30" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedContact(null)}>
                    <X size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.modalContentArea}>
                <View style={styles.modalContactHeader}>
                  <View style={styles.modalAvatarCircle}>
                    <Text style={styles.modalAvatarText}>{selectedContact.name.split(' ').map(n => n[0]).join('')}</Text>
                  </View>
                  <Text style={styles.modalContactName}>{selectedContact.name}</Text>
                  <Text style={styles.modalContactRole}>{selectedContact.role}</Text>
                  <Text style={styles.modalContactCompany}>{selectedContact.company}</Text>

                  <View style={styles.modalBadgesRow}>
                    <View style={[styles.badge, { backgroundColor: getStatusColor(selectedContact.status) + '20' }]}> 
                      <Text style={[styles.badgeText, { color: getStatusColor(selectedContact.status) }]}>{selectedContact.status}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: getStageColor(selectedContact.dealStage) + '20' }]}> 
                      <Text style={[styles.badgeText, { color: getStageColor(selectedContact.dealStage) }]}>{selectedContact.dealStage}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalActionsRow}>
                  <TouchableOpacity style={styles.modalActionButton}>
                    <Phone size={20} color="#FFFFFF" />
                    <Text style={styles.modalActionText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: '#34C759' }]}>
                    <Mail size={20} color="#FFFFFF" />
                    <Text style={styles.modalActionText}>Email</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Contact Information</Text>
                  <View style={styles.infoRow}>
                    <Phone size={18} color="#8E8E93" />
                    <Text style={styles.infoText}>{selectedContact.phone}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Mail size={18} color="#8E8E93" />
                    <Text style={styles.infoText}>{selectedContact.email}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Building size={18} color="#8E8E93" />
                    <Text style={styles.infoText}>{selectedContact.company}</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Deal Information</Text>
                  <View style={styles.dealInfoCard}
                    testID="contact-deal-card"
                  >
                    <View style={styles.dealInfoRow}>
                      <Text style={styles.dealInfoLabel}>Deal Value</Text>
                      <Text style={styles.dealInfoValue}>${selectedContact.dealValue.toLocaleString()}</Text>
                    </View>
                    <View style={styles.dealInfoRow}>
                      <Text style={styles.dealInfoLabel}>Stage</Text>
                      <Text style={[styles.dealInfoValue, { color: getStageColor(selectedContact.dealStage) }]}>{selectedContact.dealStage}</Text>
                    </View>
                    <View style={styles.dealInfoRow}>
                      <Text style={styles.dealInfoLabel}>Last Contact</Text>
                      <Text style={styles.dealInfoValue}>{new Date(selectedContact.lastContact).toLocaleDateString()}</Text>
                    </View>
                    {selectedContact.nextFollowUp && (
                      <View style={styles.dealInfoRow}>
                        <Text style={styles.dealInfoLabel}>Next Follow-up</Text>
                        <Text style={[styles.dealInfoValue, { color: '#FF9500' }]}>{new Date(selectedContact.nextFollowUp).toLocaleDateString()}</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Tags</Text>
                  <View style={styles.modalTagsRow}>
                    {selectedContact.tags.map(tag => (
                      <View key={tag} style={styles.modalTag}>
                        <Text style={styles.modalTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {selectedContact.notes && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Notes</Text>
                    <View style={styles.notesCard}>
                      <Text style={styles.notesText}>{selectedContact.notes}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Activity Timeline</Text>
                  <View style={styles.timelineCard}
                    testID="contact-timeline"
                  >
                    <View style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineTitle}>Last Contact</Text>
                        <Text style={styles.timelineDate}>{new Date(selectedContact.lastContact).toLocaleDateString()}</Text>
                      </View>
                    </View>
                    {selectedContact.nextFollowUp && (
                      <View style={styles.timelineItem}>
                        <View style={[styles.timelineDot, { backgroundColor: '#FF9500' }]} />
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineTitle}>Follow-up Scheduled</Text>
                          <Text style={styles.timelineDate}>{new Date(selectedContact.nextFollowUp).toLocaleDateString()}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>

        <Modal visible={showAddModal} animationType="slide" transparent={false} onRequestClose={() => setShowAddModal(false)}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeaderBar}>
              <Text style={styles.modalTitleBar}>Add New Contact</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContentArea}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Company</Text>
                <TextInput style={styles.input} placeholder="Acme Corp" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Role</Text>
                <TextInput style={styles.input} placeholder="CEO" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="john@example.com" placeholderTextColor="#8E8E93" keyboardType="email-address" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput style={styles.input} placeholder="+1 (555) 123-4567" placeholderTextColor="#8E8E93" keyboardType="phone-pad" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Deal Value</Text>
                <TextInput style={styles.input} placeholder="50000" placeholderTextColor="#8E8E93" keyboardType="numeric" />
              </View>

              <TouchableOpacity style={styles.createButton}>
                <CheckCircle size={20} color="#FFFFFF" />
                <Text style={styles.createButtonText}>Create Contact</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  filterRow: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#FF2D92',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
  statLabel: {
    fontSize: 10,
    color: '#8E8E93',
    textAlign: 'center',
  },
  pipelineSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  pipelineTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 12,
    color: '#1A1A1A',
  },
  pipelineCard: {
    width: 180,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EFEFF4',
  },
  pipelineStage: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: '#8E8E93',
  },
  pipelineValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    marginVertical: 8,
    color: '#1A1A1A',
  },
  pipelineBarBackground: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#F2F2F7',
  },
  pipelineBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FF2D92',
  },
  integrationsSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  integrationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFF4',
    gap: 12,
  },
  integrationBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  integrationMeta: {
    fontSize: 11,
    color: '#8E8E93',
  },
  integrationStatus: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  alertSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEFEF',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  alertMeta: {
    fontSize: 11,
    color: '#8E8E93',
  },
  alertValue: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: '#FF3B30',
  },
  content: {
    flex: 1,
  },
  contactsList: {
    padding: 16,
    gap: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  contactHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF2D92',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  companyText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  roleText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  contactMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#8E8E93',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  modalHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitleBar: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  modalHeaderActions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  modalHeaderButton: {
    padding: 4,
  },
  modalContentArea: {
    flex: 1,
    padding: 16,
  },
  modalContactHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  modalAvatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF2D92',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalAvatarText: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  modalContactName: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  modalContactRole: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 2,
  },
  modalContactCompany: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  modalBadgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  modalActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#007AFF',
    borderRadius: 12,
  },
  modalActionText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#1A1A1A',
    flex: 1,
  },
  dealInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  dealInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dealInfoLabel: {
    fontSize: 15,
    color: '#8E8E93',
  },
  dealInfoValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  modalTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  modalTagText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  notesText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF2D92',
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 13,
    color: '#8E8E93',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF2D92',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});
